import React from 'react';
import { useData } from '../../context/DataContext';
import { Github, Mail, Instagram, MessageCircle, Send, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, socials, settings } = useData();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#070707] py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Subtitle */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-500 dark:text-sky-400 flex items-center justify-center font-heading font-black text-sm">
                H
              </div>
              <span className="font-heading font-bold tracking-wider text-base text-zinc-900 dark:text-white uppercase">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Medical Student • Developer • Photographer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.filter(s => s.active).map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-300/40 dark:border-zinc-800 transition-colors"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-zinc-500 dark:text-zinc-500">
            {settings.footerCopyright ? settings.footerCopyright : `© 2026 ${profile.name}. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
};
