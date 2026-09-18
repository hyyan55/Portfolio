import React from 'react';
import { Calendar, Briefcase, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Journey: React.FC = () => {
  const { journey, settings } = useData();

  if (!settings.showJourneySection) return null;

  const sortedJourney = [...journey].sort((a, b) => a.order - b.order);

  return (
    <section id="journey" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
            Timeline
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            My Journey
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A continuous progression through academic medicine, software building, and visual capture.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12 text-left">
          {sortedJourney.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#111111] border-2 border-sky-500 group-hover:scale-125 transition-transform duration-200" />

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-sky-500/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.year}
                  </span>
                  {item.institution && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.institution}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 font-heading">
                  {item.title}
                </h4>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
