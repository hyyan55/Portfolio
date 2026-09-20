import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Github, Mail, Instagram, MessageCircle, Globe, MapPin } from 'lucide-react';

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
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-200/80 dark:border-zinc-800/80 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-heading font-black text-black text-sm">
                H
              </div>
              <span className="font-heading font-bold tracking-wider text-base text-zinc-900 dark:text-white uppercase">
                {profile.name}
              </span>
              <span className="text-xs font-semibold text-sky-500" dir="rtl">(حيان محمد)</span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 max-w-sm">
              Official digital identity of Hayyan Mohamed (حيان محمد). Sudanese Developer, Medical Student & Photographer based in Kassala, Sudan.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>Kassala, Sudan 🇸🇩</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Explore Pages
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Home (الرئيسية)</Link>
              <Link to="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">About (عن حيان)</Link>
              <Link to="/projects" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Projects (المشاريع)</Link>
              <Link to="/photography" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Photography (التصوير)</Link>
              <Link to="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Blog (المدونة)</Link>
              <Link to="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors">Contact (تواصل)</Link>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Connect Directly
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {socials.filter(s => s.active).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 shadow-xs"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
            <a
              href="https://github.com/hyyan55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-sky-500 transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/hyyan55</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <div>
            {settings.footerCopyright ? settings.footerCopyright : `© 2026 ${profile.name}. All rights reserved.`}
          </div>
          <div className="flex items-center gap-4">
            <span>Hayyan Mohamed • Kassala, Sudan</span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

