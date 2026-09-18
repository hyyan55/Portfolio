import { SocialLink } from '../types';

export const initialSocials: SocialLink[] = [
  {
    id: "social-whatsapp",
    platform: "WhatsApp",
    label: "واتساب (WhatsApp)",
    url: "https://wa.me/249912345678",
    active: true
  },
  {
    id: "social-instagram",
    platform: "Instagram",
    label: "انستغرام (Instagram)",
    url: "https://instagram.com",
    active: true
  },
  {
    id: "social-tiktok",
    platform: "TikTok",
    label: "تيك توك (TikTok)",
    url: "https://tiktok.com",
    active: true
  },
  {
    id: "social-github",
    platform: "GitHub",
    label: "جيت هاب (GitHub)",
    url: "https://github.com",
    active: true
  },
  {
    id: "social-email",
    platform: "Email",
    label: "البريد الإلكتروني",
    url: "mailto:hayyan@example.com",
    active: true
  },
  {
    id: "social-linkedin",
    platform: "LinkedIn",
    label: "لينكد إن (LinkedIn)",
    url: "https://linkedin.com",
    active: false
  },
  {
    id: "social-youtube",
    platform: "YouTube",
    label: "يوتيوب (YouTube)",
    url: "https://youtube.com",
    active: false
  }
];
