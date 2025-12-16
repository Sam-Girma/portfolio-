export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period?: string;
  description: string;
  achievements?: string[];
  technologies: string[];
  highlight?: string;
  type: 'Full Stack' | 'Python' | 'Product Management';
}

export interface SkillCategory {
  title: string;
  skills: string[];
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