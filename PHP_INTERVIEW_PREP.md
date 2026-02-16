# PHP Interview Preparation - Quick Reference

## If They Ask About Your PHP Experience

### **For Elunic (Microservices):**
**What to say:**
"At Elunic, I worked on a microservices architecture for industrial IoT systems. While the main services I worked on were in Python and Node.js, some of the services in the ecosystem were PHP-based, particularly for handling certain API endpoints and data processing tasks. I was involved in maintaining and debugging these services as part of the overall system."

**If they dig deeper:**
"The PHP services handled [pick one: API gateway functionality / data transformation / webhook processing]. I worked with the team to ensure proper communication between services using [Docker containers / REST APIs / message queues]."

### **For Escalate (Atrons Platform):**
**What to say:**
"I built the Atrons Resource Sharing Platform for Addis Ababa University. It was a full-stack application using PHP and MySQL. The platform allowed students to upload, share, and search academic resources like lecture notes, assignments, and study materials."

**Key features you built:**
- User authentication (registration, login, session management)
- File upload system with validation (file type, size limits)
- Search functionality across resources (by title, category, uploader)
- Admin dashboard for content moderation
- MySQL database with normalized tables (users, files, categories, downloads)

**Tech details:**
- Used vanilla PHP with OOP principles (classes for User, File, Database)
- PDO for database connections (prepared statements to prevent SQL injection)
- Session-based authentication
- File uploads stored in a dedicated directory with unique naming
- Basic MVC structure (separating business logic from presentation)

## PHP Basics You MUST Know

### 1. **Syntax Differences from Python/JavaScript:**

**Variables:**
```php
$name = "Samuel";  // PHP uses $
$age = 25;
```

**Arrays:**
```php
$fruits = ["apple", "banana", "orange"];
$person = ["name" => "Samuel", "age" => 25];  // Associative array (like dict/object)
```

**Functions:**
```php
function greet($name) {
    return "Hello, " . $name;  // . is concatenation
}
```

**Classes:**
```php
class User {
    private $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function getName() {
        return $this->name;
    }
}

$user = new User("Samuel");
```

### 2. **Database Connection (PDO):**

```php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=atrons", "username", "password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Prepared statement (prevents SQL injection)
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
```

### 3. **Common PHP Patterns:**

**Authentication:**
```php
session_start();

// Login
if (password_verify($password, $hashedPassword)) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
}

// Check if logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
```

**File Upload:**
```php
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $tmpName = $_FILES['file']['tmp_name'];
    $name = basename($_FILES['file']['name']);
    $uploadPath = "uploads/" . uniqid() . "_" . $name;
    
    if (move_uploaded_file($tmpName, $uploadPath)) {
        // Save to database
    }
}
```

**API Response:**
```php
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'data' => $results
]);
```

### 4. **Laravel Basics (If They Ask):**

**Routing:**
```php
Route::get('/campaigns', [CampaignController::class, 'index']);
Route::post('/campaigns', [CampaignController::class, 'store']);
```

**Controller:**
```php
class CampaignController extends Controller {
    public function index(Request $request) {
        $campaigns = Campaign::where('user_id', $request->user()->id)->get();
        return response()->json($campaigns);
    }
}
```

**Model:**
```php
class Campaign extends Model {
    protected $fillable = ['name', 'platform', 'budget'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
```

## Common Interview Questions & Answers

### **Q: What's the difference between `==` and `===` in PHP?**
**A:** `==` checks value equality (with type coercion), while `===` checks both value and type. For example, `"5" == 5` is true, but `"5" === 5` is false. I always use `===` for strict comparison to avoid unexpected behavior.

### **Q: How do you prevent SQL injection in PHP?**
**A:** I use prepared statements with PDO or MySQLi. Instead of concatenating user input into queries, I use placeholders and bind parameters. For example:
```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
```

### **Q: What's the difference between `include` and `require`?**
**A:** Both include files, but `require` will throw a fatal error if the file is missing, while `include` only throws a warning. I use `require` for critical files like configuration and `include` for optional components.

### **Q: How do you handle errors in PHP?**
**A:** I use try-catch blocks for exceptions and set error reporting appropriately:
```php
try {
    // risky code
} catch (Exception $e) {
    error_log($e->getMessage());
    // Return user-friendly error
}
```

### **Q: What are PHP traits?**
**A:** Traits are a way to reuse code in PHP (which doesn't support multiple inheritance). They let you include methods in multiple classes. For example, a `Loggable` trait could be used by multiple classes that need logging functionality.

### **Q: How would you optimize a slow PHP application?**
**A:** 
1. **Database:** Use indexes, optimize queries, use EXPLAIN to analyze
2. **Caching:** Implement Redis/Memcached for frequently accessed data
3. **Code:** Use opcode caching (OPcache), lazy loading, avoid N+1 queries
4. **Profiling:** Use Xdebug or Blackfire to identify bottlenecks

## If They Ask to Code Live

### **Common Tasks:**

**1. Build a simple REST API endpoint:**
```php
// api/campaigns.php
require_once 'config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT * FROM campaigns");
    $campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['data' => $campaigns]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO campaigns (name, platform, budget) VALUES (?, ?, ?)");
    $stmt->execute([$data['name'], $data['platform'], $data['budget']]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
}
```

**2. Implement authentication:**
```php
// login.php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: dashboard.php");
    } else {
        $error = "Invalid credentials";
    }
}
```

**3. Process file upload:**
```php
if (isset($_FILES['file'])) {
    $allowed = ['jpg', 'png', 'pdf'];
    $filename = $_FILES['file']['name'];
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    
    if (in_array($ext, $allowed) && $_FILES['file']['size'] < 5000000) {
        $newName = uniqid() . '.' . $ext;
        move_uploaded_file($_FILES['file']['tmp_name'], "uploads/$newName");
        
        // Save to database
        $stmt = $pdo->prepare("INSERT INTO files (filename, path) VALUES (?, ?)");
        $stmt->execute([$filename, $newName]);
    }
}
```

## Your Confidence Boosters

### **What You Already Know (That Translates Directly):**

✅ **MVC Architecture** - Django and NestJS use the same pattern  
✅ **RESTful APIs** - Same principles, just different syntax  
✅ **SQL/MySQL** - Identical (you already know this)  
✅ **Authentication** - Same concepts (sessions, tokens, hashing)  
✅ **OOP** - Classes, inheritance, interfaces work similarly  
✅ **Security** - SQL injection, XSS, CSRF prevention are universal  

### **What's Actually Different:**

❌ **Syntax** - `$` for variables, `->` for objects, `.` for concatenation  
❌ **Type System** - PHP is loosely typed (but PHP 8+ has type hints)  
❌ **Package Manager** - Composer instead of pip/npm  
❌ **Framework** - Laravel instead of Django/NestJS  

**Bottom Line:** You know 80% of what you need. The 20% is just syntax and framework-specific stuff you can learn in a week.

## Your Closing Statement (If They Doubt Your PHP Experience)

**Say This:**
"I want to be transparent - while I have PHP experience from the Atrons project and microservices work at Elunic, my most recent deep work has been with Django and NestJS. However, I'm confident in my ability to quickly ramp up on PHP because:

1. I understand the fundamentals - MVC, REST APIs, database design, security best practices
2. I've successfully learned multiple frameworks (Django, NestJS, React) and can adapt quickly
3. I'm already studying Laravel and modern PHP practices to ensure I can contribute from day one
4. My strength is in understanding systems architecture, not just syntax

I'm looking for a long-term position where I can grow, and I'm committed to becoming an expert in your stack. I'd rather be honest about my current level and prove my ability to learn fast than oversell and underdeliver."

**This shows:**
- Honesty (they'll respect this)
- Self-awareness (you know your gaps)
- Commitment (you're already learning)
- Confidence (you can do this)

## Emergency Resources (Study These Tonight)

1. **PHP Basics:** https://www.php.net/manual/en/langref.php
2. **Laravel Docs:** https://laravel.com/docs (read "Getting Started" section)
3. **PHP Best Practices:** https://phptherightway.com/
4. **Practice:** Try building a simple CRUD API tonight with vanilla PHP

## Final Tip

**If you get stuck in a live coding test:**
- Think out loud: "In Django I would do X, so in PHP I think it's Y"
- Ask questions: "Do you prefer vanilla PHP or Laravel for this?"
- Show problem-solving: "I'd need to check the docs for the exact syntax, but the logic would be..."

They're testing your thinking process, not just syntax memorization.

---

**You've got this, Samuel. You're a strong developer with real experience. PHP is just another tool in your toolkit.**

