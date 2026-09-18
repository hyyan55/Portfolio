import React from 'react';
import {
  Code2,
  Palette,
  FileCode,
  Atom,
  Zap,
  Flame,
  GitBranch,
  Github,
  Camera,
  Sliders,
  Layout,
  Film,
  Cpu,
  Sparkles,
  Bot,
  Stethoscope,
  BookOpen,
  FileText,
  Globe,
  Terminal,
  Database,
  Layers,
  Smartphone,
  Server,
  Cloud,
  Share2,
  HelpCircle
} from 'lucide-react';

const icons: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Palette,
  FileCode,
  Atom,
  Zap,
  Flame,
  GitBranch,
  Github,
  Camera,
  Sliders,
  Layout,
  Film,
  Cpu,
  Sparkles,
  Bot,
  Stethoscope,
  BookOpen,
  FileText,
  Globe,
  Terminal,
  Database,
  Layers,
  Smartphone,
  Server,
  Cloud,
  Share2
};

export function renderSkillIcon(name: string, className = "w-5 h-5") {
  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className={className} />;
}

export const availableSkillIcons = Object.keys(icons);
