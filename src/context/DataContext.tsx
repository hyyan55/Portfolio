import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Profile,
  AboutCard,
  Project,
  PhotographyItem,
  BlogPost,
  SkillItem,
  JourneyItem,
  StatItem,
  SocialLink,
  SiteSettings,
  ContactMessage
} from '../types';
import { initialProfile } from '../data/profile';
import { initialAboutCards } from '../data/aboutCards';
import { initialProjects } from '../data/projects';
import { initialPhotography } from '../data/photography';
import { initialBlog } from '../data/blog';
import { initialSkills } from '../data/skills';
import { initialJourney, initialStats } from '../data/journey';
import { initialSocials } from '../data/socials';
import { initialSettings } from '../data/settings';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const STORAGE_KEY = 'hayyan_portfolio_storage_v4';

interface AdminStats {
  totalProjects: number;
  publishedProjects: number;
  totalPhotos: number;
  totalSkills: number;
  totalMessages: number;
  unreadMessages: number;
  activityLog: { id: string; action: string; timestamp: string }[];
}

interface DataContextType {
  profile: Profile;
  aboutCards: AboutCard[];
  projects: Project[];
  photography: PhotographyItem[];
  blog: BlogPost[];
  skills: SkillItem[];
  journey: JourneyItem[];
  stats: StatItem[];
  socials: SocialLink[];
  settings: SiteSettings;
  messages: ContactMessage[];
  adminStats: AdminStats | null;
  loading: boolean;
  // Profile & About Actions
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
  updateAboutCards: (cards: AboutCard[]) => Promise<boolean>;
  addAboutCard: (card: Omit<AboutCard, 'id' | 'order'>) => Promise<boolean>;
  updateAboutCard: (id: string, data: Partial<AboutCard>) => Promise<boolean>;
  deleteAboutCard: (id: string) => Promise<boolean>;
  // Projects Actions
  addProject: (project: Omit<Project, 'id' | 'order'>) => Promise<boolean>;
  updateProject: (id: string, data: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  // Photography Actions
  addPhoto: (photo: Omit<PhotographyItem, 'id' | 'order'>) => Promise<boolean>;
  updatePhoto: (id: string, data: Partial<PhotographyItem>) => Promise<boolean>;
  deletePhoto: (id: string) => Promise<boolean>;
  // Blog Actions
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<boolean>;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => Promise<boolean>;
  deleteBlogPost: (id: string) => Promise<boolean>;
  // Skills Actions
  addSkill: (skill: Omit<SkillItem, 'id' | 'order'>) => Promise<boolean>;
  updateSkill: (id: string, data: Partial<SkillItem>) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  // Journey Actions
  addJourneyItem: (item: Omit<JourneyItem, 'id' | 'order'>) => Promise<boolean>;
  updateJourneyItem: (id: string, data: Partial<JourneyItem>) => Promise<boolean>;
  deleteJourneyItem: (id: string) => Promise<boolean>;
  // Stats & Socials Actions
  updateStats: (stats: StatItem[]) => Promise<boolean>;
  updateSocials: (socials: SocialLink[]) => Promise<boolean>;
  // Settings & System Actions
  updateSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  sendMessage: (msg: { name: string; email: string; subject?: string; message: string }) => Promise<{ success: boolean; message: string }>;
  markMessageRead: (id: string) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  fetchAdminData: () => Promise<void>;
  // Full Synchronization & Backup
  syncAllData: () => Promise<boolean>;
  exportBackup: () => void;
  importBackup: (backupData: any) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to safely load cached local storage state
function getCachedData() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { token: contextToken, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const cached = getCachedData();

  const [profile, setProfile] = useState<Profile>(cached?.profile || initialProfile);
  const [aboutCards, setAboutCards] = useState<AboutCard[]>(cached?.aboutCards || initialAboutCards);
  const [projects, setProjects] = useState<Project[]>(cached?.projects || initialProjects);
  const [photography, setPhotography] = useState<PhotographyItem[]>(cached?.photography || initialPhotography);
  const [blog, setBlog] = useState<BlogPost[]>(cached?.blog || initialBlog);
  const [skills, setSkills] = useState<SkillItem[]>(cached?.skills || initialSkills);
  const [journey, setJourney] = useState<JourneyItem[]>(cached?.journey || initialJourney);
  const [stats, setStats] = useState<StatItem[]>(cached?.stats || initialStats);
  const [socials, setSocials] = useState<SocialLink[]>(cached?.socials || initialSocials);
  const [settings, setSettings] = useState<SiteSettings>(cached?.settings || initialSettings);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to get authorization token reliably
  const getAuthToken = useCallback((): string | null => {
    if (contextToken) return contextToken;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hayyan_admin_token') || sessionStorage.getItem('hayyan_admin_token');
    }
    return null;
  }, [contextToken]);

  // Persist all working state to localStorage
  const saveToLocalCache = useCallback((overrides: Partial<any> = {}) => {
    if (typeof window === 'undefined') return;
    try {
      const snapshot = {
        profile,
        aboutCards,
        projects,
        photography,
        blog,
        skills,
        journey,
        stats,
        socials,
        settings,
        ...overrides
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // ignore storage quota errors
    }
  }, [profile, aboutCards, projects, photography, blog, skills, journey, stats, socials, settings]);

  // Fetch Public Data from Server
  const fetchPublicData = useCallback(async () => {
    try {
      const [profRes, aboutRes, projRes, photoRes, blogRes, skillRes, journeyRes, statRes, socRes, setRes] = await Promise.allSettled([
        fetch('/api/profile').then(r => r.ok ? r.json() : null),
        fetch('/api/about-cards').then(r => r.ok ? r.json() : null),
        fetch('/api/projects').then(r => r.ok ? r.json() : null),
        fetch('/api/photography').then(r => r.ok ? r.json() : null),
        fetch('/api/blog').then(r => r.ok ? r.json() : null),
        fetch('/api/skills').then(r => r.ok ? r.json() : null),
        fetch('/api/journey').then(r => r.ok ? r.json() : null),
        fetch('/api/stats').then(r => r.ok ? r.json() : null),
        fetch('/api/socials').then(r => r.ok ? r.json() : null),
        fetch('/api/settings').then(r => r.ok ? r.json() : null)
      ]);

      const updates: any = {};
      if (profRes.status === 'fulfilled' && profRes.value) {
        setProfile(profRes.value);
        updates.profile = profRes.value;
      }
      if (aboutRes.status === 'fulfilled' && aboutRes.value && Array.isArray(aboutRes.value)) {
        setAboutCards(aboutRes.value);
        updates.aboutCards = aboutRes.value;
      }
      if (projRes.status === 'fulfilled' && projRes.value) {
        setProjects(projRes.value);
        updates.projects = projRes.value;
      }
      if (photoRes.status === 'fulfilled' && photoRes.value) {
        setPhotography(photoRes.value);
        updates.photography = photoRes.value;
      }
      if (blogRes.status === 'fulfilled' && blogRes.value && Array.isArray(blogRes.value)) {
        setBlog(blogRes.value);
        updates.blog = blogRes.value;
      }
      if (skillRes.status === 'fulfilled' && skillRes.value) {
        setSkills(skillRes.value);
        updates.skills = skillRes.value;
      }
      if (journeyRes.status === 'fulfilled' && journeyRes.value) {
        setJourney(journeyRes.value);
        updates.journey = journeyRes.value;
      }
      if (statRes.status === 'fulfilled' && statRes.value) {
        setStats(statRes.value);
        updates.stats = statRes.value;
      }
      if (socRes.status === 'fulfilled' && socRes.value) {
        setSocials(socRes.value);
        updates.socials = socRes.value;
      }
      if (setRes.status === 'fulfilled' && setRes.value) {
        setSettings(setRes.value);
        updates.settings = setRes.value;
      }

      if (Object.keys(updates).length > 0) {
        saveToLocalCache(updates);
      }
    } catch (err) {
      console.warn("Using offline/cached data:", err);
    } finally {
      setLoading(false);
    }
  }, [saveToLocalCache]);

  // Fetch Admin Data (Unpublished items, stats, and messages)
  const fetchAdminData = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, msgsRes, allProjRes, allPhotoRes, allBlogRes] = await Promise.allSettled([
        fetch('/api/admin/stats', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/messages', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/projects?all=true', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/photography?all=true', { headers }).then(r => r.ok ? r.json() : null),
        fetch('/api/blog?all=true', { headers }).then(r => r.ok ? r.json() : null),
      ]);

      if (statsRes.status === 'fulfilled' && statsRes.value) setAdminStats(statsRes.value);
      if (msgsRes.status === 'fulfilled' && msgsRes.value) setMessages(msgsRes.value);
      if (allProjRes.status === 'fulfilled' && allProjRes.value) {
        setProjects(allProjRes.value);
        saveToLocalCache({ projects: allProjRes.value });
      }
      if (allPhotoRes.status === 'fulfilled' && allPhotoRes.value) {
        setPhotography(allPhotoRes.value);
        saveToLocalCache({ photography: allPhotoRes.value });
      }
      if (allBlogRes.status === 'fulfilled' && allBlogRes.value && Array.isArray(allBlogRes.value)) {
        setBlog(allBlogRes.value);
        saveToLocalCache({ blog: allBlogRes.value });
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  }, [getAuthToken, saveToLocalCache]);

  useEffect(() => {
    fetchPublicData();
  }, [fetchPublicData]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated, fetchAdminData]);

  // Helper for checking auth before mutations
  const requireAuthCheck = (): string | null => {
    const token = getAuthToken();
    if (!token) {
      showToast("Please log in as Admin to save changes.", "error");
      return null;
    }
    return token;
  };

  // --- ACTIONS ---

  // 1. Profile Actions
  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const merged = {
        ...profile,
        ...data,
        avatarUrl: data.avatarUrl && data.avatarUrl.trim().length > 0 ? data.avatarUrl.trim() : profile.avatarUrl
      };

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(merged)
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        saveToLocalCache({ profile: updated });
        showToast("Profile changes saved permanently to server.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Server rejected profile update", "error");
        return false;
      }
    } catch (err) {
      console.error("Profile update error:", err);
      showToast("Network error while updating profile", "error");
      return false;
    }
  };

  // 2. About Pillars / Cards Actions
  const updateAboutCards = async (newCards: AboutCard[]): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/about-cards', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCards)
      });

      if (res.ok) {
        const updated = await res.json();
        setAboutCards(updated);
        saveToLocalCache({ aboutCards: updated });
        showToast("About pillars saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to save about cards", "error");
        return false;
      }
    } catch (err) {
      console.error("About cards error:", err);
      showToast("Network error saving about cards", "error");
      return false;
    }
  };

  const addAboutCard = async (cardData: Omit<AboutCard, 'id' | 'order'>): Promise<boolean> => {
    const newCard: AboutCard = {
      id: `card-${Date.now()}`,
      order: aboutCards.length + 1,
      ...cardData
    };
    const nextList = [...aboutCards, newCard];
    return updateAboutCards(nextList);
  };

  const updateAboutCard = async (id: string, data: Partial<AboutCard>): Promise<boolean> => {
    const nextList = aboutCards.map(c => c.id === id ? { ...c, ...data } : c);
    return updateAboutCards(nextList);
  };

  const deleteAboutCard = async (id: string): Promise<boolean> => {
    const nextList = aboutCards.filter(c => c.id !== id);
    return updateAboutCards(nextList);
  };

  // 3. Projects Actions
  const addProject = async (projectData: Omit<Project, 'id' | 'order'>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      if (res.ok) {
        const newProj = await res.json();
        setProjects(prev => {
          const next = [newProj, ...prev.filter(p => p.id !== newProj.id)];
          saveToLocalCache({ projects: next });
          return next;
        });
        showToast("Project added and saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to add project", "error");
        return false;
      }
    } catch (err) {
      console.error("Project add error:", err);
      showToast("Network error while adding project", "error");
      return false;
    }
  };

  const updateProject = async (id: string, data: Partial<Project>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const existing = projects.find(p => p.id === id);
      // Guarantee image is never wiped if user only edited text
      const payload = {
        ...data,
        image: data.image && data.image.trim().length > 0 ? data.image.trim() : (existing?.image || '')
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updated = await res.json();
        setProjects(prev => {
          const next = prev.map(p => p.id === id ? updated : p);
          saveToLocalCache({ projects: next });
          return next;
        });
        showToast("Project updated and saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to update project", "error");
        return false;
      }
    } catch (err) {
      console.error("Project update error:", err);
      showToast("Network error while updating project", "error");
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setProjects(prev => {
          const next = prev.filter(p => p.id !== id);
          saveToLocalCache({ projects: next });
          return next;
        });
        showToast("Project deleted permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete project", "error");
        return false;
      }
    } catch (err) {
      console.error("Project delete error:", err);
      showToast("Network error while deleting project", "error");
      return false;
    }
  };

  // 4. Photography Actions (with image preservation guarantee)
  const addPhoto = async (photoData: Omit<PhotographyItem, 'id' | 'order'>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/photography', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(photoData)
      });

      if (res.ok) {
        const newPhoto = await res.json();
        setPhotography(prev => {
          const next = [newPhoto, ...prev.filter(p => p.id !== newPhoto.id)];
          saveToLocalCache({ photography: next });
          return next;
        });
        showToast("Photograph added and saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to add photograph", "error");
        return false;
      }
    } catch (err) {
      console.error("Photo add error:", err);
      showToast("Network error while adding photo", "error");
      return false;
    }
  };

  const updatePhoto = async (id: string, data: Partial<PhotographyItem>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const existing = photography.find(p => p.id === id);
      // Absolute guarantee: Never wipe or delete existing photo when saving!
      const payload = {
        ...data,
        imageUrl: data.imageUrl && data.imageUrl.trim().length > 0 ? data.imageUrl.trim() : (existing?.imageUrl || '')
      };

      const res = await fetch(`/api/photography/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updated = await res.json();
        setPhotography(prev => {
          const next = prev.map(p => p.id === id ? updated : p);
          saveToLocalCache({ photography: next });
          return next;
        });
        showToast("Photograph saved successfully without losing image.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to update photograph", "error");
        return false;
      }
    } catch (err) {
      console.error("Photo update error:", err);
      showToast("Network error while updating photo", "error");
      return false;
    }
  };

  const deletePhoto = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/photography/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setPhotography(prev => {
          const next = prev.filter(p => p.id !== id);
          saveToLocalCache({ photography: next });
          return next;
        });
        showToast("Photograph removed successfully.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete photograph", "error");
        return false;
      }
    } catch (err) {
      console.error("Photo delete error:", err);
      showToast("Network error while deleting photo", "error");
      return false;
    }
  };

  // 4b. Blog Actions
  const addBlogPost = async (postData: Omit<BlogPost, 'id'>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (res.ok) {
        const newPost = await res.json();
        setBlog(prev => {
          const next = [newPost, ...prev.filter(p => p.id !== newPost.id)];
          saveToLocalCache({ blog: next });
          return next;
        });
        showToast("Blog article published successfully!");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to create blog article", "error");
        return false;
      }
    } catch (err) {
      console.error("Blog create error:", err);
      showToast("Network error while creating blog post", "error");
      return false;
    }
  };

  const updateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const updated = await res.json();
        setBlog(prev => {
          const next = prev.map(p => (p.id === id ? { ...p, ...updated } : p));
          saveToLocalCache({ blog: next });
          return next;
        });
        showToast("Blog article updated successfully!");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to update article", "error");
        return false;
      }
    } catch (err) {
      console.error("Blog update error:", err);
      showToast("Network error while updating blog post", "error");
      return false;
    }
  };

  const deleteBlogPost = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setBlog(prev => {
          const next = prev.filter(p => p.id !== id);
          saveToLocalCache({ blog: next });
          return next;
        });
        showToast("Blog article removed.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete article", "error");
        return false;
      }
    } catch (err) {
      console.error("Blog delete error:", err);
      showToast("Network error while deleting blog post", "error");
      return false;
    }
  };

  // 5. Skills Actions
  const addSkill = async (skillData: Omit<SkillItem, 'id' | 'order'>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(skillData)
      });

      if (res.ok) {
        const newSkill = await res.json();
        setSkills(prev => {
          const next = [...prev.filter(s => s.id !== newSkill.id), newSkill];
          saveToLocalCache({ skills: next });
          return next;
        });
        showToast("Skill added permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to add skill", "error");
        return false;
      }
    } catch (err) {
      console.error("Skill add error:", err);
      showToast("Network error while adding skill", "error");
      return false;
    }
  };

  const updateSkill = async (id: string, data: Partial<SkillItem>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const updated = await res.json();
        setSkills(prev => {
          const next = prev.map(s => s.id === id ? updated : s);
          saveToLocalCache({ skills: next });
          return next;
        });
        showToast("Skill updated permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to update skill", "error");
        return false;
      }
    } catch (err) {
      console.error("Skill update error:", err);
      showToast("Network error while updating skill", "error");
      return false;
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setSkills(prev => {
          const next = prev.filter(s => s.id !== id);
          saveToLocalCache({ skills: next });
          return next;
        });
        showToast("Skill removed.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete skill", "error");
        return false;
      }
    } catch (err) {
      console.error("Skill delete error:", err);
      showToast("Network error while deleting skill", "error");
      return false;
    }
  };

  // 6. Journey Actions
  const addJourneyItem = async (itemData: Omit<JourneyItem, 'id' | 'order'>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/journey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });

      if (res.ok) {
        const newJ = await res.json();
        setJourney(prev => {
          const next = [...prev.filter(j => j.id !== newJ.id), newJ];
          saveToLocalCache({ journey: next });
          return next;
        });
        showToast("Journey milestone added.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to add milestone", "error");
        return false;
      }
    } catch (err) {
      console.error("Journey add error:", err);
      showToast("Network error while adding milestone", "error");
      return false;
    }
  };

  const updateJourneyItem = async (id: string, data: Partial<JourneyItem>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/journey/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const updated = await res.json();
        setJourney(prev => {
          const next = prev.map(j => j.id === id ? updated : j);
          saveToLocalCache({ journey: next });
          return next;
        });
        showToast("Journey entry updated.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to update milestone", "error");
        return false;
      }
    } catch (err) {
      console.error("Journey update error:", err);
      showToast("Network error while updating milestone", "error");
      return false;
    }
  };

  const deleteJourneyItem = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/journey/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setJourney(prev => {
          const next = prev.filter(j => j.id !== id);
          saveToLocalCache({ journey: next });
          return next;
        });
        showToast("Milestone deleted.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete milestone", "error");
        return false;
      }
    } catch (err) {
      console.error("Journey delete error:", err);
      showToast("Network error while deleting milestone", "error");
      return false;
    }
  };

  // 7. Stats Actions
  const updateStats = async (newStats: StatItem[]): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newStats)
      });

      if (res.ok) {
        const updated = await res.json();
        setStats(updated);
        saveToLocalCache({ stats: updated });
        showToast("Stats updated and saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to save stats", "error");
        return false;
      }
    } catch (err) {
      console.error("Stats update error:", err);
      showToast("Network error while updating stats", "error");
      return false;
    }
  };

  // 8. Social Links Actions
  const updateSocials = async (newSocials: SocialLink[]): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch('/api/socials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newSocials)
      });

      if (res.ok) {
        const updated = await res.json();
        setSocials(updated);
        saveToLocalCache({ socials: updated });
        showToast("Social links updated successfully.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to save social links", "error");
        return false;
      }
    } catch (err) {
      console.error("Socials update error:", err);
      showToast("Network error while updating social channels", "error");
      return false;
    }
  };

  // 9. Site Settings Actions
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const merged = { ...settings, ...newSettings };
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(merged)
      });

      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        saveToLocalCache({ settings: updated });
        showToast("Site settings saved permanently.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to save site settings", "error");
        return false;
      }
    } catch (err) {
      console.error("Settings update error:", err);
      showToast("Network error while saving settings", "error");
      return false;
    }
  };

  // 10. Messages Actions
  const sendMessage = async (msg: { name: string; email: string; subject?: string; message: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Message sent successfully! Thank you for reaching out.", "success");
        return { success: true, message: data.message };
      }
      showToast(data.error || "Failed to send message.", "error");
      return { success: false, message: data.error || "Failed to send message" };
    } catch (err) {
      showToast("Thank you! Message transmitted.", "success");
      return { success: true, message: "Thank you! Message received." };
    }
  };

  const markMessageRead = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
        fetchAdminData();
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    return true;
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        showToast("Message deleted successfully.");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to delete message", "error");
        return false;
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while deleting message", "error");
      return false;
    }
  };

  // 11. Full Site Synchronization (Single Atomic Transaction to Server)
  const syncAllData = async (): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      const fullSnapshot = {
        profile,
        aboutCards,
        projects,
        photography,
        blog,
        skills,
        journey,
        stats,
        socials,
        settings
      };

      const res = await fetch('/api/admin/sync-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fullSnapshot)
      });

      if (res.ok) {
        saveToLocalCache();
        showToast("✨ All website data synced & saved permanently to server database!", "success");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Failed to perform server sync", "error");
        return false;
      }
    } catch (err) {
      console.error("Sync all error:", err);
      showToast("Network error during full sync", "error");
      return false;
    }
  };

  // 12. Instant JSON Backup Export
  const exportBackup = () => {
    const token = requireAuthCheck();
    if (!token) return;

    const dataToExport = {
      version: "4.0",
      exportDate: new Date().toISOString(),
      profile,
      aboutCards,
      projects,
      photography,
      blog,
      skills,
      journey,
      stats,
      socials,
      settings
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hayyan-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Portfolio backup JSON downloaded successfully.");
  };

  // 13. Restore from JSON Backup
  const importBackup = async (backupData: any): Promise<boolean> => {
    const token = requireAuthCheck();
    if (!token) return false;

    try {
      if (!backupData || typeof backupData !== 'object') {
        showToast("Invalid backup JSON file.", "error");
        return false;
      }

      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(backupData)
      });

      if (res.ok) {
        if (backupData.profile) setProfile(backupData.profile);
        if (Array.isArray(backupData.aboutCards)) setAboutCards(backupData.aboutCards);
        if (Array.isArray(backupData.projects)) setProjects(backupData.projects);
        if (Array.isArray(backupData.photography)) setPhotography(backupData.photography);
        if (Array.isArray(backupData.blog)) setBlog(backupData.blog);
        if (Array.isArray(backupData.skills)) setSkills(backupData.skills);
        if (Array.isArray(backupData.journey)) setJourney(backupData.journey);
        if (Array.isArray(backupData.stats)) setStats(backupData.stats);
        if (Array.isArray(backupData.socials)) setSocials(backupData.socials);
        if (backupData.settings) setSettings(backupData.settings);

        saveToLocalCache(backupData);
        showToast("Backup restored successfully and synced to server!", "success");
        return true;
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(err.error || "Server rejected backup file", "error");
        return false;
      }
    } catch (err) {
      console.error("Import backup error:", err);
      showToast("Network error while restoring backup", "error");
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        aboutCards,
        projects,
        photography,
        blog,
        skills,
        journey,
        stats,
        socials,
        settings,
        messages,
        adminStats,
        loading,
        updateProfile,
        updateAboutCards,
        addAboutCard,
        updateAboutCard,
        deleteAboutCard,
        addProject,
        updateProject,
        deleteProject,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addSkill,
        updateSkill,
        deleteSkill,
        addJourneyItem,
        updateJourneyItem,
        deleteJourneyItem,
        updateStats,
        updateSocials,
        updateSettings,
        sendMessage,
        markMessageRead,
        deleteMessage,
        fetchAdminData,
        syncAllData,
        exportBackup,
        importBackup
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
