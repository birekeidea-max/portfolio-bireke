export type ProjectCategoryKey = 'all' | 'web' | 'mobile' | 'ai';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  categoryKey: 'web' | 'mobile' | 'ai';
  problemSolved: string;
  solutionProposed: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  status: string;
  note?: string;
}

export interface SkillItem {
  name: string;
  status: 'Pratiqué' | 'En cours d\'apprentissage' | 'Exploration active' | 'En préparation active';
  description: string;
  iconName?: string;
}

export interface SkillCategoryGroup {
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  badge?: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  status: string;
  description: string;
  complementary: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}
