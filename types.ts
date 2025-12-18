export interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  details?: string[];
  tags?: string[];
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'Product' | 'Design' | 'Tools';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  // Detailed fields for the modal
  description?: string;
  background?: string;
  goal?: string;
  process?: string;
  result?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  intro: string[];
}
