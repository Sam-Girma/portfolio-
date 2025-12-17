export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period?: string;
  description: string;
  achievements?: string[];
  technologies: string[];
  highlight?: string;
  type: 'Full Stack' | 'Python' | 'Product Management' | 'AI/ML';
  images?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}