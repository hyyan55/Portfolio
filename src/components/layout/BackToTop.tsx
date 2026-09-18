import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-zinc-900/90 dark:bg-zinc-800/90 text-white flex items-center justify-center border border-zinc-700/60 shadow-lg hover:bg-sky-600 dark:hover:bg-sky-500 hover:scale-105 active:scale-95 transition-all duration-200"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
