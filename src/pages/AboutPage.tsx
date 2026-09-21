import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Code2, Stethoscope, Camera, Sparkles, ArrowRight, Github, Mail, Globe } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Skills } from '../components/sections/Skills';
import { Journey } from '../components/sections/Journey';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';

export const AboutPage: React.FC = () => {
  const { profile, settings, socials } = useData();

  usePageSeo({
    title: "About | Hayyan Mohamed (حيان محمد) - Sudanese Developer & Medical Student",
    description: "Learn more about Hayyan Mohamed (حيان محمد), a Sudanese developer, medical student, and photographer based in Kassala, Sudan. Exploring technology, medicine, and photography.",
    canonicalPath: "/about",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://7yyanmo7.ai.studio/#person",
        "name": "Hayyan Mohamed",
        "alternateName": ["Hayyan Mohammed", "Hyyan Mohamed", "حيان محمد"],
        "jobTitle": ["Developer", "Medical Student", "Photographer"],
        "description": "Sudanese Developer, Medical Student & Photographer based in Kassala, Sudan.",
        "url": "https://7yyanmo7.ai.studio/",
        "image": "https://7yyanmo7.ai.studio/avatar.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kassala",
          "addressCountry": "Sudan"
        },
        "sameAs": [
          "https://github.com/hyyan55",
          "https://github.com/Hyyan404"
        ]
      }
    }
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="about" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">About</span>
          </nav>

          {/* Hero Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 border-2 border-zinc-200/80 dark:border-zinc-800 shadow-xl mb-6 p-2">
                <img
                  src={profile.avatarUrl || '/avatar.jpg'}
                  alt="Hayyan Mohamed (حيان محمد)"
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-1 font-heading">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-sky-500 mb-3" dir="rtl">
                {profile.arabicName || 'حيان محمد'}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-6">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>{profile.locationBadge || 'Kassala, Sudan 🇸🇩'}</span>
              </div>

              {/* Verified Identity Tags */}
              <div className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 text-left text-xs space-y-2 mb-6">
                <div className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
                  Digital Identity Reference
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">Primary:</span> Hayyan Mohamed
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">Arabic:</span> حيان محمد
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">Known as:</span> Hyyan Mohamed, Hayyan Mohammed
                </div>
                <div className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">GitHub:</span> @hyyan55 / @Hyyan404
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Core Disciplines */}
            <div className="lg:col-span-8 text-left space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-3 uppercase tracking-wider">
                  Biography & Overview
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
                  Sudanese Developer, Medical Student & Photographer
                </h2>
                
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                  {profile.aboutIntro}
                </p>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {profile.aboutBio}
                </p>
              </div>

              {/* Three Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-3">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">Development</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Building lightweight web tools, privacy-centric applications, and modern interfaces.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">Medicine</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Pursuing medical education with a deep interest in clinical reasoning and healthcare systems.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">Photography</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Capturing the natural beauty and landscapes of Kassala and Eastern Sudan.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm transition-all shadow-sm"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/photography"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm transition-all"
                >
                  <Camera className="w-4 h-4 text-sky-500" />
                  <span>View Photography</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* Embedded Skills & Journey Sections */}
        {settings.showSkillsSection && <Skills />}
        {settings.showJourneySection && <Journey />}

      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};
