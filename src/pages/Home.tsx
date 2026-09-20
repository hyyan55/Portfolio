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
import { BlogSection } from '../components/sections/BlogSection';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { usePageSeo } from '../utils/seo';

export const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  usePageSeo({
    title: "Hayyan Mohamed (حيان محمد) | Official Portfolio - Developer, Medical Student & Photographer",
    description: "The official website and digital identity of Hayyan Mohamed (حيان محمد), a Sudanese developer, medical student and photographer based in Kassala, Sudan. Projects, photography, and blog.",
    canonicalPath: "/",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://hayyanmohamed.com/#person",
          "name": "Hayyan Mohamed",
          "alternateName": ["Hayyan Mohammed", "Hyyan Mohamed", "حيان محمد"],
          "jobTitle": ["Developer", "Medical Student", "Photographer"],
          "description": "Sudanese Developer, Medical Student & Photographer based in Kassala, Sudan.",
          "url": "https://hayyanmohamed.com",
          "image": "https://hayyanmohamed.com/avatar.svg",
          "email": "hyyanmohamed55@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kassala",
            "addressCountry": "Sudan"
          },
          "sameAs": [
            "https://github.com/hyyan55",
            "https://github.com/Hyyan404"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://hayyanmohamed.com/#website",
          "url": "https://hayyanmohamed.com",
          "name": "Hayyan Mohamed - Official Website",
          "alternateName": ["حيان محمد", "Hyyan Mohamed"],
          "publisher": {
            "@id": "https://hayyanmohamed.com/#person"
          }
        }
      ]
    }
  });

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'photography', 'skills', 'journey', 'blog', 'contact'];

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
        <BlogSection />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};
