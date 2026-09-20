export interface Profile {
  name: string;
  arabicName?: string;
  alternateNames?: string[];
  titles: string[]; // e.g. ["Sudanese Developer", "Medical Student", "Photographer"]
  heroGreeting: string; // e.g. "Hayyan Mohamed"
  heroDescription: string; // "Welcome to the official website of Hayyan Mohamed, a Sudanese developer, medical student and photographer based in Kassala, Sudan."
  locationBadge: string; // "Kassala, Sudan 🇸🇩"
  aboutIntro: string; // Main introductory text
  aboutBio: string; // Extended bio
  avatarUrl: string;
  heroFloatingTagline?: string;
  heroCtaWorkText?: string;
  heroCtaContactText?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  readingTime?: string;
}

export interface AboutCard {
  id: string;
  badge: string;
  title: string;
  desc: string;
  iconName: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export type PhotoItemCategory = 'Nature' | 'Portraits' | 'Night' | 'Kassala' | 'Street' | 'Other' | 'طبيعة' | 'بورتريه' | 'ليلي' | 'كسلا' | 'شارع' | 'أخرى' | string;
export type PhotoCategory = 'All' | 'الكل' | PhotoItemCategory;

export interface PhotographyItem {
  id: string;
  title: string;
  category: PhotoItemCategory;
  imageUrl: string;
  description: string;
  location?: string;
  cameraInfo?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export type SkillGroup = 'Development' | 'Creative' | 'AI & Technology' | 'Medical' | 'البرمجة والتطوير' | 'الإبداع والتصميم' | 'الذكاء الاصطناعي والتقنية' | 'الطب والعلوم الصحية' | string;

export interface SkillItem {
  id: string;
  name: string;
  group: SkillGroup;
  iconName: string; // Lucide icon name or identifier
  order: number;
}

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  institution?: string;
  description: string;
  order: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description?: string;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: 'WhatsApp' | 'Instagram' | 'TikTok' | 'GitHub' | 'Email' | 'LinkedIn' | 'YouTube';
  label: string;
  url: string;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  logoText: string;
  profileImage: string;
  accentColor: string;
  darkModeDefault: boolean;
  showWhatsAppButton: boolean;
  showPhotographySection: boolean;
  showProjectsSection: boolean;
  showSkillsSection: boolean;
  showJourneySection: boolean;
  showStatsSection: boolean;
  showBlogSection?: boolean;
  githubUsername?: string;
  githubPortfolioRepo?: string;
  whatsAppNumber: string;
  whatsAppMessage?: string;
  whatsappNumber?: string;
  whatsappDefaultMessage?: string;
  footerText?: string;
  footerSubtitle?: string;
  footerCopyright?: string;
  contactEmail?: string;
  contactLocationText?: string;
}

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  username?: string;
  message?: string;
}
