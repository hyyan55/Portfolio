import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, Search, Code2, FolderGit2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';

export const ProjectsPage: React.FC = () => {
  const { projects } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  usePageSeo({
    title: "Projects | Hayyan Mohamed (حيان محمد) - Portfolio & Code",
    description: "Explore projects built by Hayyan Mohamed, including Easy-Convert PDF Utility, personal web systems, and open-source tools.",
    canonicalPath: "/projects",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Projects by Hayyan Mohamed",
      "description": "Software, web tools, and open-source projects created by Hayyan Mohamed.",
      "url": "https://7yyanmo7.ai.studio/projects"
    }
  });

  const publishedProjects = projects.filter(p => p.published);

  // Extract all unique technologies
  const allTechs = ['All', ...Array.from(new Set(publishedProjects.flatMap(p => p.technologies)))];

  const filteredProjects = publishedProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || p.technologies.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="projects" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">Projects</span>
          </nav>

          {/* Page Header */}
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineered Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 font-heading">
              Projects & Code
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore web utilities, open-source repositories, and digital applications built by Hayyan Mohamed. Focused on clean architecture, client privacy, and intuitive interaction.
            </p>
          </div>

          {/* Search & Tech Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-10 p-4 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {allTechs.slice(0, 6).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedTech === tech
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 dark:bg-[#111111] rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">No projects match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.featured && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500 text-white shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      {/* Tech stack */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-heading">
                        {project.title}
                      </h2>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition-colors shadow-xs"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* GitHub CTA Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                Looking for more code & commits?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Follow my work and contributions on GitHub @hyyan55.
              </p>
            </div>
            <a
              href="https://github.com/hyyan55"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs shrink-0 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>Visit @hyyan55 on GitHub</span>
            </a>
          </div>

        </div>
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};
