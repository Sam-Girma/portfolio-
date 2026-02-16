# AdMetrics Dashboard - PHP SaaS Project

## Project Overview
A multi-tenant SaaS portal for managing advertising campaigns across Google, Meta, and TikTok platforms. Built with PHP backend and React frontend.

## Why This Project?
- Directly relevant to the Dubai PHP Developer role (SaaS portals for ad management)
- Demonstrates API integration skills (their key requirement)
- Shows understanding of multi-tenant architecture
- Proves ability to build production-ready systems

## Tech Stack
- **Backend:** PHP 8.2+ with Laravel (or Slim for lightweight)
- **Frontend:** React 18 + TypeScript
- **Database:** MySQL 8.0
- **Authentication:** JWT tokens
- **API Design:** RESTful
- **Tools:** Composer, npm, Git, Docker

## Phase 1: MVP (Build in 3-4 days)

### Day 1-2: Backend Foundation
```
/backend
  /src
    /Controllers
      AuthController.php
      CampaignController.php
      TicketController.php
    /Models
      User.php
      Campaign.php
      Ticket.php
    /Middleware
      AuthMiddleware.php
      RateLimitMiddleware.php
    /Services
      CampaignService.php (business logic)
      MetricsService.php
    /Database
      migrations/
      seeds/
  /config
    database.php
    auth.php
  /routes
    api.php
  composer.json
  .env.example
```

**Core API Endpoints:**
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/campaigns/{id}` - Get campaign details
- `PUT /api/campaigns/{id}` - Update campaign
- `DELETE /api/campaigns/{id}` - Delete campaign
- `GET /api/metrics/dashboard` - Get dashboard metrics
- `POST /api/tickets` - Create support ticket
- `GET /api/tickets` - List tickets

### Day 3: Frontend (React)
```
/frontend
  /src
    /components
      Dashboard.tsx
      CampaignList.tsx
      CampaignForm.tsx
      MetricsCard.tsx
      TicketSystem.tsx
    /services
      api.ts (axios wrapper)
      auth.ts
    /hooks
      useCampaigns.ts
      useMetrics.ts
    /types
      campaign.ts
      metrics.ts
```

### Day 4: Integration & Polish
- Connect React to PHP API
- Add loading states and error handling
- Create demo data seeder
- Write README with setup instructions
- Deploy to a free hosting (or run locally with Docker)

## Phase 2: Advanced Features (After Interview)

### Week 1-2:
- **Real API Integration:**
  - Meta Marketing API (test mode)
  - Google Ads API (sandbox)
- **Advanced Features:**
  - Real-time notifications (WebSockets or polling)
  - Export reports (PDF with TCPDF, CSV)
  - Activity logs (audit trail)
  - Email notifications (PHPMailer)

### Week 3:
- **Performance & Security:**
  - Redis caching for metrics
  - Rate limiting
  - SQL injection prevention (prepared statements)
  - XSS protection
  - CORS configuration

## Database Schema (MySQL)

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client', 'viewer') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Campaigns table
CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    platform ENUM('google', 'meta', 'tiktok') NOT NULL,
    status ENUM('active', 'paused', 'ended') DEFAULT 'active',
    budget DECIMAL(10, 2),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Metrics table
CREATE TABLE campaign_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    date DATE NOT NULL,
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    spend DECIMAL(10, 2) DEFAULT 0,
    conversions INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
    UNIQUE KEY unique_campaign_date (campaign_id, date)
);

-- Support tickets table
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'resolved') DEFAULT 'open',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Key PHP Concepts to Demonstrate

1. **MVC Architecture:** Separate Controllers, Models, Services
2. **Dependency Injection:** Use constructor injection for services
3. **PSR Standards:** Follow PSR-4 (autoloading), PSR-12 (coding style)
4. **Security Best Practices:**
   - Prepared statements (PDO)
   - Password hashing (password_hash/password_verify)
   - Input validation and sanitization
   - CSRF protection
5. **API Design:**
   - RESTful conventions
   - Proper HTTP status codes
   - JSON responses
   - Error handling
6. **Testing:** PHPUnit for unit tests (at least for critical services)

## Sample Code Snippets

### CampaignController.php (Laravel example)
```php
<?php

namespace App\Http\Controllers;

use App\Services\CampaignService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CampaignController extends Controller
{
    private CampaignService $campaignService;

    public function __construct(CampaignService $campaignService)
    {
        $this->campaignService = $campaignService;
    }

    public function index(Request $request): JsonResponse
    {
        $campaigns = $this->campaignService->getUserCampaigns($request->user()->id);
        return response()->json(['data' => $campaigns]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'platform' => 'required|in:google,meta,tiktok',
            'budget' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $campaign = $this->campaignService->createCampaign($request->user()->id, $validated);
        return response()->json(['data' => $campaign], 201);
    }
}
```

### CampaignService.php (Business Logic)
```php
<?php

namespace App\Services;

use App\Models\Campaign;
use Illuminate\Support\Collection;

class CampaignService
{
    public function getUserCampaigns(int $userId): Collection
    {
        return Campaign::where('user_id', $userId)
            ->with('metrics')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function createCampaign(int $userId, array $data): Campaign
    {
        $campaign = Campaign::create([
            'user_id' => $userId,
            'name' => $data['name'],
            'platform' => $data['platform'],
            'budget' => $data['budget'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'] ?? null,
            'status' => 'active',
        ]);

        // Trigger any side effects (e.g., send notification)
        // event(new CampaignCreated($campaign));

        return $campaign;
    }
}
```

## How to Present This in Your Application

### In Your Proposal:
"I'm currently building **AdMetrics Dashboard**, a SaaS portal for managing multi-platform advertising campaigns (Google, Meta, TikTok). It's built with **PHP 8.2 + Laravel** for the backend and **React + TypeScript** for the frontend. The system includes:
- RESTful API with JWT authentication
- Multi-tenant architecture with role-based access
- Real-time metrics dashboard
- Support ticket system
- MySQL database with optimized queries

This project directly mirrors the type of client portals you're building and demonstrates my ability to architect complete SaaS systems. I can share the GitHub repo and walk through the architecture during our interview."

### In Your Portfolio:
Add a new section in `constants.ts`:

```typescript
{
  title: "AdMetrics Dashboard",
  company: "Personal Project",
  period: "January 2025 - Present",
  role: "Full-Stack Developer",
  description: "A multi-tenant SaaS portal for managing advertising campaigns across Google, Meta, and TikTok platforms. Built to demonstrate modern PHP development practices and API-driven architecture.",
  achievements: [
    "Architected RESTful API with 15+ endpoints using PHP 8.2 and Laravel framework",
    "Implemented JWT-based authentication with role-based access control (Admin, Client, Viewer)",
    "Built React dashboard with real-time metrics visualization and campaign management",
    "Designed normalized MySQL schema with optimized queries for handling 10,000+ campaign records",
    "Integrated support ticket system with status tracking and priority management"
  ],
  technologies: ["PHP", "Laravel", "MySQL", "React", "TypeScript", "JWT", "REST API", "Docker"],
  images: [] // Add screenshots once you build it
}
```

## Timeline

- **Days 1-4:** Build MVP (basic CRUD, auth, dashboard)
- **After application:** Continue building advanced features
- **Before interview:** Have a working demo ready to show

## Repository Structure

```
admetrics-dashboard/
├── backend/          # PHP Laravel project
├── frontend/         # React TypeScript project
├── docker-compose.yml
├── README.md
└── docs/
    ├── API.md        # API documentation
    └── SETUP.md      # Setup instructions
```

## Next Steps

1. **Create the GitHub repo:** `admetrics-dashboard`
2. **Set up Laravel:** `composer create-project laravel/laravel backend`
3. **Set up React:** `npm create vite@latest frontend -- --template react-ts`
4. **Build MVP in 3-4 days**
5. **Update portfolio with this project**
6. **Apply to the job with confidence**

---

## Why This Works

✅ **Relevant:** Matches the job's SaaS portal focus  
✅ **Impressive:** Shows you can build complete systems  
✅ **Honest:** You're genuinely building it (not lying)  
✅ **Strategic:** Gives you talking points in the interview  
✅ **Practical:** You'll learn exactly what they need  

**Remember:** You don't need to finish everything before applying. Having a solid MVP with clean code is better than a half-finished complex system. Focus on code quality, proper structure, and demonstrating best practices.

