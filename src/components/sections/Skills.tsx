import React from 'react';
import { useData } from '../../context/DataContext';
import { renderSkillIcon } from '../../utils/iconMap';
import { SkillGroup } from '../../types';

export const Skills: React.FC = () => {
  const { skills, settings } = useData();

  if (!settings.showSkillsSection) return null;

  const groups: SkillGroup[] = ['Development', 'Creative', 'AI & Technology', 'Medical'];

  return (
    <section id="skills" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
            Proficiencies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Skills & Tools
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A versatile combination of scientific medical training, software development capabilities, and creative arts.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group) => {
            const groupSkills = skills.filter((s) => s.group === group);
            return (
              <div
                key={group}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white font-heading">
                      {group}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {groupSkills.length} tools
                    </span>
                  </div>

                  {/* Skills Pills Grid */}
                  <div className="flex flex-wrap gap-2.5">
                    {groupSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-800 hover:border-sky-500/50 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 group"
                      >
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-sky-500 transition-colors">
                          {renderSkillIcon(skill.iconName, "w-4 h-4")}
                        </div>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
