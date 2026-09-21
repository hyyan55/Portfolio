import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Hero: React.FC = () => {
  const { profile, settings, socials } = useData();

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = socials.find(s => s.platform.toLowerCase() === 'whatsapp');
  const cleanNumber = (settings.whatsappNumber || '+249912345678').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappDefaultMessage || settings.whatsAppMessage || 'مرحباً حيان، اطلعت على موقعك وأود التواصل معك');
  const whatsappUrl = whatsappLink?.url?.includes('wa.me') ? whatsappLink.url : `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{profile.locationBadge}</span>
            </div>

            {/* Greeting & Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4">
              Hi, I'm <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">{profile.name}</span>
            </h1>

            {/* Sub-headline Pill / Role tags */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-300 mb-6">
              <span>Medical Student</span>
              <span className="text-sky-500">•</span>
              <span>Developer</span>
              <span className="text-sky-500">•</span>
              <span>Photographer</span>
              <span className="text-sky-500">•</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-normal">AI Enthusiast</span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8">
              {profile.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>About</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Visual / Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 md:w-96 group">
              {/* Decorative gradient border glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 rounded-3xl blur-md group-hover:blur-lg transition-all duration-300" />

              <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl">
                <img
                  src={profile.avatarUrl || '/avatar.jpg'}
                  alt={profile.name}
                  className="w-full h-84 sm:h-96 object-cover object-center transition-all duration-500 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating overlay badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/80 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                        {profile.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Medicine & Modern Web
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
