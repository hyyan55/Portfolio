import React from 'react';
import { useData } from '../../context/DataContext';

export const Stats: React.FC = () => {
  const { stats } = useData();

  return (
    <section className="py-12 border-y border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-left">
          <p className="text-xs font-bold tracking-widest text-sky-500 uppercase font-heading">
            Currently
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-black font-heading bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-zinc-900 dark:text-white">
                {stat.label}
              </div>
              {stat.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
