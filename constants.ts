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
    id: 'cowsville',
    company: 'Cowsville - Addis Ababa University Veterinary Campus',
    role: 'Full Stack Developer',
    type: 'Full Stack',
    description: 'Developed a comprehensive cow health and productivity management system aimed at increasing milk production efficiency through controlled monitoring of cow estrus cycles.',
    achievements: [
      'Built a full-stack application to track cow estrus cycles and provide timely alerts for farmers, inseminators, and veterinarians.',
      'Implemented automated notification system using Afro Message API to alert stakeholders when cows need insemination or health checkups.',
      'Developed the backend using Django with MySQL database for reliable data management and tracking.',
      'Initially built the frontend with HTML, CSS, and JavaScript, later migrated to React for improved user experience and maintainability.',
      'Created a dashboard for monitoring multiple cows\' health status and reproductive cycles in real-time.'
    ],
    highlight: 'Successfully developed a livestock management system that helps farmers optimize milk production through timely health monitoring and insemination alerts.',
    technologies: ['Django', 'React', 'JavaScript', 'HTML/CSS', 'MySQL', 'Afro Message API']
  },
  {
    id: 'elunic',
    company: 'Elunic',
    role: 'Full Stack Developer',
    type: 'Full Stack',
    description: 'Worked for a German computer vision company providing AI defect detection services for major automotive and manufacturing clients (VW, BMW, Lego).',
    achievements: [
      'Developed and maintained full-stack web applications using React (frontend) and NestJS (backend) with MySQL databases.',
      'Created and deployed a custom Python script for Lego to automate the collection of box images and barcode data, streamlining the defect analysis pipeline.',
      'Facilitated successful production runs for 4 weeks collecting multiple datasets for AI model training.',
      'Managed remote deployment and configuration of systems on client sites via TeamViewer and Windows remote tools.',
      'Maintained direct on-call communication with client developers to ensure seamless integration and issue resolution.'
    ],
    highlight: 'Successfully developed and deployed a critical data collection script for Lego used in production defect analysis.',
    technologies: ['React', 'NestJS', 'MySQL', 'Python', 'Computer Vision', 'TeamViewer']
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
    technologies: ['Python', 'RLHF', 'Gemini', 'Matplotlib', 'Altair', 'LLM Evaluation', 'Dataset Generation', 'API Simulation']
  },
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
    technologies: ['React', 'Node.js', 'Live Ops', 'Bug Fixing', 'Slack']
  },
  {
    id: 'escalate',
    company: 'Escalate',
    role: 'Product Manager',
    type: 'Product Management',
    description: 'Led the product workflow and documentation for application development projects.',
    achievements: [
      'Authored comprehensive Product Requirements Documents (PRDs) on Confluence, detailing the full application workflow.',
      'Conducted initial phase meetings with customers to gather requirements and validate product ideas.',
      'Established a feedback loop with end-users to continuously improve the application based on real-world usage patterns.',
      'Facilitated constant team communication to ensure development aligned with the product roadmap.'
    ],
    technologies: ['Product Management', 'Confluence', 'Agile', 'User Research', 'Jira']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React.js", "Angular", "TypeScript", "Tailwind CSS", "HTML5/CSS3"]
  },
  {
    title: "Backend",
    skills: ["NestJS", "Node.js", "Python", "Django", "Spring Boot", "MySQL"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Jira", "Trello", "Google Teams", "TeamViewer", "Confluence"]
  },
  {
    title: "Soft Skills",
    skills: ["Technical Support", "Client Communication", "Problem Solving", "Product Management"]
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are an AI assistant for Samuel Girma Megra's personal portfolio website. 
Your goal is to answer questions about Samuel's professional experience, skills, and background based strictly on the provided context.

Context about Samuel:
- Name: Samuel Girma Megra
- Roles: Software Engineer, Full Stack Developer, AI/ML Engineer.
- Key Experience 1: Cowsville at Addis Ababa University Veterinary Campus (Full Stack). Developed a cow health and productivity management system to increase milk production efficiency. Built with Django backend, React frontend, MySQL database, and Afro Message API for notifications. System tracks cow estrus cycles and sends alerts to farmers, inseminators, and veterinarians for timely insemination and health monitoring.
- Key Experience 2: Elunic (Full Stack). Built React/NestJS apps for AI/Computer Vision (clients: VW, BMW, Lego). Developed Python scripts for Lego image collection. Handled remote deployment.
- Key Experience 3: Turing (AI/ML Engineer). Worked on SFT dataset generation for large language models through RLHF. Focused on Gemini's visualization capabilities using Matplotlib and Altair. Conducted comparative analysis, dataset crafting, and evaluations. Evaluated agentic workflows of Gemini through simulated APIs.
- Key Experience 4: Divoorah (Full Stack). Food delivery app support. Fixed critical bugs like broken discount coupons in backend logic.
- Key Experience 5: Escalate (Product Manager). Wrote PRDs on Confluence, managed workflows, conducted user research.

Tone: Professional, helpful, concise, and friendly.
If a user asks for contact info, provide his email: ${PERSONAL_INFO.email}.
If asked about something not in the context, politely say you don't have that information but suggest contacting Samuel directly.
`;