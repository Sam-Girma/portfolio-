import { ExperienceItem, SkillCategory, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Samuel Girma Megra",
  titles: ["Software Engineer", "Full Stack Developer"],
  email: "samigirma53@gmail.com",
  summary: "A versatile software engineer with extensive experience in full-stack development and real-time computer vision systems. Proven track record of bridging the gap between development and operations, managing product lifecycles, and delivering critical solutions for enterprise clients."
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/samuel-girma-megra/', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/Sam-Girma', icon: 'github' },
  { name: 'Telegram', url: 'https://t.me/SamuelMegra', icon: 'send' },
  { name: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: 'mail' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'divoorah',
    company: 'Divoorah',
    role: 'Full Stack Developer',
    type: 'Full Stack',
    description: 'Provided full-stack development and technical support for a food delivery platform, focusing on live operations and system stability.',
    achievements: [
      'Managed real-time bug fixes for live customers to prevent order cancellations and service disruptions.',
      'Collaborated directly with management via Slack to triage and resolve critical issues in a high-pressure environment.',
      'Identified and fixed a logic error in the backend code that prevented discount coupons from applying during a major marketing campaign.',
      'Transitioned hotfixes into permanent solution tickets to improve long-term system reliability.'
    ],
    highlight: 'Diagnosed and fixed a complex backend logic error preventing discount coupons from applying, directly rescuing a marketing campaign.',
    technologies: ['React', 'Node.js', 'Live Ops', 'Bug Fixing', 'Slack'],
    images: [
      '/divoora/Screenshot 2025-12-16 at 1.53.16 in the afternoon.png',
      '/divoora/Screenshot 2025-12-16 at 1.53.36 in the afternoon.png',
      '/divoora/Screenshot 2025-12-16 at 1.54.49 in the afternoon.png',
      '/divoora/Screenshot 2025-12-16 at 1.55.08 in the afternoon.png',
      '/divoora/Screenshot 2025-12-16 at 1.55.18 in the afternoon.png',
      '/divoora/Screenshot 2025-12-16 at 1.56.03 in the afternoon.png'
    ]
  },
  {
    id: 'escalate',
    company: 'Escalate',
    role: 'Product Manager & Full Stack Developer',
    type: 'Product Management',
    description: 'Led the product workflow and documentation for application development projects. Also developed RateEat, an internal cafeteria rating system for Elunic.',
    achievements: [
      'Developed RateEat: A full-stack rating application using React and NestJS for employee meal feedback at Elunic.',
      'Built an admin dashboard for cafeteria managers to view ratings, comments, and track meal popularity trends.',
      'Authored comprehensive Product Requirements Documents (PRDs) on Confluence, detailing the full application workflow.',
      'Conducted initial phase meetings with customers to gather requirements and validate product ideas.',
      'Established a feedback loop with end-users to continuously improve the application based on real-world usage patterns.',
      'Facilitated constant team communication to ensure development aligned with the product roadmap.'
    ],
    highlight: 'Successfully improved employee satisfaction and cafeteria food quality through data-driven feedback system (RateEat).',
    technologies: ['Product Management', 'React', 'NestJS', 'Confluence', 'Agile', 'User Research', 'Jira'],
    images: [
      '/rateeat/Screenshot 2025-12-16 at 1.21.12 in the afternoon.png',
      '/rateeat/Screenshot 2025-12-16 at 1.21.25 in the afternoon.png',
      '/rateeat/Screenshot 2025-12-16 at 1.21.35 in the afternoon.png',
      '/rateeat/Screenshot 2025-12-16 at 1.21.47 in the afternoon.png',
      '/rateeat/Screenshot 2025-12-16 at 1.22.17 in the afternoon.png'
    ]
  },
  {
  id: 'turing',
    company: 'Turing',
    role: 'AI/ML Engineer',
    type: 'AI/ML',
    description: 'Specialized in SFT (Supervised Fine-Tuning) dataset generation for large language models through RLHF (Reinforcement Learning from Human Feedback), focusing on Gemini\'s visualization capabilities.',
    achievements: [
      'Generated and crafted high-quality datasets for training large language models using RLHF methodologies.',
      'Conducted comparative analysis and evaluations of Gemini\'s data visualization outputs using Matplotlib, Altair, and other visualization libraries.',
      'Performed comprehensive dataset crafting to improve model performance on visualization tasks.',
      'Evaluated agentic workflows of Gemini through simulated APIs, testing autonomous decision-making capabilities.',
      'Contributed to improving LLM performance through systematic evaluation and feedback loops.'
    ],
    highlight: 'Led dataset generation and evaluation for Gemini LLM, focusing on visualization capabilities and agentic workflow assessments.',
    technologies: ['Python', 'RLHF', 'Gemini', 'Matplotlib', 'Altair', 'LLM Evaluation', 'Dataset Generation', 'API Simulation'],
    images: [
      '/turing/Screenshot 2025-12-16 at 2.02.55 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.03.43 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.04.12 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.04.24 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.04.55 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.05.41 in the afternoon.png',
      '/turing/Screenshot 2025-12-16 at 2.07.18 in the afternoon.png'
    ]
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Angular", level: 85 }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "NestJS", level: 95 },
      { name: "Django", level: 95 },
      { name: "Node.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Spring Boot", level: 75 }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "SQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git/GitLab", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Cursor/VS Code", level: 95 },
      { name: "Claude AI", level: 90 },
      { name: "Slack", level: 95 },
      { name: "Jira/Confluence", level: 85 }
    ]
  }
];