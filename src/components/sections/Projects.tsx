import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Projects: React.FC = () => {
  const { projects, settings } = useData();
  const [filter, setFilter] = useState<'All' | 'Featured'>('All');

  if (!settings.showProjectsSection) return null;

  const displayedProjects = projects
    .filter(p => p.published)
    .filter(p => filter === 'All' || (filter === 'Featured' && p.featured));

  return (
    <section id="projects" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
              Selected Creations
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Featured Projects
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'All'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              All Projects ({projects.filter(p => p.published).length})
            </button>
            <button
              onClick={() => setFilter('Featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'Featured'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Preview */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {project.featured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500 text-white shadow-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-heading flex items-center justify-between">
                    <span>{project.title}</span>
                  </h4>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition-colors"
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
