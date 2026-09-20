import React from 'react';
import {
  GraduationCap,
  Code2,
  Camera,
  Bot,
  Sparkles,
  Layers,
  HeartPulse,
  Stethoscope,
  Globe,
  Lightbulb,
  Palette,
  BookOpen,
  Cpu
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-sky-500" />,
  Code2: <Code2 className="w-6 h-6 text-indigo-500" />,
  Camera: <Camera className="w-6 h-6 text-amber-500" />,
  Bot: <Bot className="w-6 h-6 text-emerald-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
  Layers: <Layers className="w-6 h-6 text-blue-500" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-rose-500" />,
  Stethoscope: <Stethoscope className="w-6 h-6 text-cyan-500" />,
  Globe: <Globe className="w-6 h-6 text-teal-500" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-yellow-500" />,
  Palette: <Palette className="w-6 h-6 text-purple-500" />,
  BookOpen: <BookOpen className="w-6 h-6 text-blue-400" />,
  Cpu: <Cpu className="w-6 h-6 text-violet-500" />
};

export const About: React.FC = () => {
  const { profile, aboutCards } = useData();

  const getCardIcon = (iconName?: string) => {
    if (iconName && ICON_MAP[iconName]) {
      return ICON_MAP[iconName];
    }
    return <Sparkles className="w-6 h-6 text-sky-500" />;
  };

  const cardsToDisplay = aboutCards && aboutCards.length > 0 ? aboutCards : [
    {
      id: "card-dev",
      badge: "Developer",
      title: "Software & Web Development",
      desc: "Developing functional web tools, modern user interfaces, and document utilities with React, TypeScript, and clean modular code.",
      iconName: "Code2",
      order: 1
    },
    {
      id: "card-med",
      badge: "Medical Student",
      title: "Medical Studies",
      desc: "Pursuing medicine with a keen interest in clinical science, healthcare technologies, and algorithmic problem-solving.",
      iconName: "Stethoscope",
      order: 2
    },
    {
      id: "card-photo",
      badge: "Photographer",
      title: "Photography & Visuals",
      desc: "Capturing architectural forms, golden-hour landscapes around Kassala and Jabal Tootil, and expressive documentary moments.",
      iconName: "Camera",
      order: 3
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
            Background & Mindset
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
            About Me
          </h3>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
            {profile.aboutIntro}
          </p>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {profile.aboutBio}
          </p>
        </div>

        {/* Feature Cards Grid (Fully dynamic from Admin Dashboard) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardsToDisplay.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getCardIcon(card.iconName)}
                </div>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">
                  {card.badge}
                </span>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2 font-heading">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
