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
    title: "Hayyan Mohamed | Sudanese Developer, Medical Student & Photographer",
    description: "Official website of Hayyan Mohamed, a Sudanese developer, medical student, and photographer based in Kassala, Sudan. Explore his projects and visual works.",
    canonicalPath: "/",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://7yyanmo7.ai.studio/#person",
          "name": "Hayyan Mohamed",
          "alternateName": ["Hayyan Mohammed", "Hyyan Mohamed", "حيان محمد"],
          "jobTitle": "Developer, Medical Student & Photographer",
          "description": "Sudanese developer, medical student, and photographer based in Kassala, Sudan.",
          "url": "https://7yyanmo7.ai.studio/",
          "image": "https://7yyanmo7.ai.studio/avatar.jpg",
          "email": "hyyanmohamed55@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kassala",
            "addressCountry": "Sudan"
          },
          "sameAs": [
            "https://github.com/hyyan55"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://7yyanmo7.ai.studio/#website",
          "url": "https://7yyanmo7.ai.studio/",
          "name": "Hayyan Mohamed",
          "description": "Official website of Hayyan Mohamed, a Sudanese developer, medical student, and photographer based in Kassala, Sudan.",
          "publisher": {
            "@id": "https://7yyanmo7.ai.studio/#person"
          },
          "inLanguage": ["en", "ar"]
        },
        {
          "@type": "WebPage",
          "@id": "https://7yyanmo7.ai.studio/#webpage",
          "url": "https://7yyanmo7.ai.studio/",
          "name": "Hayyan Mohamed | Sudanese Developer, Medical Student & Photographer",
          "isPartOf": {
            "@id": "https://7yyanmo7.ai.studio/#website"
          },
          "about": {
            "@id": "https://7yyanmo7.ai.studio/#person"
          },
          "description": "Official website of Hayyan Mohamed, a Sudanese developer, medical student, and photographer based in Kassala, Sudan. Explore his projects and visual works.",
          "inLanguage": ["en", "ar"]
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
