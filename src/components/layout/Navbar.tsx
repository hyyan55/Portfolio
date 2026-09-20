import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { label: 'الرئيسية', hash: '#home', path: '/' },
    { label: 'عن حيان', hash: '#about', path: '/about' },
    { label: 'المشاريع', hash: '#projects', path: '/projects', show: settings.showProjectsSection },
    { label: 'التصوير', hash: '#photography', path: '/photography', show: settings.showPhotographySection },
    { label: 'المدونة', hash: '#blog', path: '/blog' },
    { label: 'تواصل', hash: '#contact', path: '/contact' },
  ].filter(link => link.show !== false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomePage) {
      const targetId = link.hash.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Navigate to dedicated route or home section
    navigate(link.path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0A0A0A]/85 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo with distinctive H */}
        <Link
          to="/"
          onClick={() => {
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-400 dark:to-indigo-500 flex items-center justify-center font-heading font-black text-black shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="text-lg tracking-tighter">H</span>
          </div>
          <span className="font-heading font-bold text-lg tracking-wider text-zinc-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            {settings.logoText || 'HAYYAN'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-900/70 p-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/80 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.hash.replace('#', '') || 
              location.pathname === link.path || 
              (link.path === '/blog' && location.pathname.startsWith('/blog'));

            return (
              <a
                key={link.path}
                href={isHomePage ? link.hash : link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right side: Theme toggle and mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800 transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 shadow-xl transition-all">
          <div className="flex flex-col gap-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.hash.replace('#', '') || 
                location.pathname === link.path || 
                (link.path === '/blog' && location.pathname.startsWith('/blog'));

              return (
                <a
                  key={link.path}
                  href={isHomePage ? link.hash : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

