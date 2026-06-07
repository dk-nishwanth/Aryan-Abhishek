export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  description: string;
  summary: string;
  challenges: string[];
  solutions: string[];
  color: string;
  imageAccent?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  company: string;
  rate: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating?: string;
  specialty?: string;
}
