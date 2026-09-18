import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Stats } from '../components/sections/Stats';
import { Projects } from '../components/sections/Projects';
import { Photography } from '../components/sections/Photography';
import { Skills } from '../components/sections/Skills';
import { Journey } from '../components/sections/Journey';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';

export const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'photography', 'skills', 'journey', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Photography />
        <Skills />
        <Journey />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};
