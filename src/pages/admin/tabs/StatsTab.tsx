import React, { useState } from 'react';
import { Plus, Trash2, Save, BarChart3, GripVertical, CheckCircle2 } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { StatItem } from '../../../types';

export const StatsTab: React.FC = () => {
  const { stats, updateStats } = useData();
  const [statsList, setStatsList] = useState<StatItem[]>([...stats]);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setStatsList([...stats]);
  }, [stats]);

  const handleChange = (id: string, field: keyof StatItem, value: any) => {
    setStatsList(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAddStat = () => {
    const newStat: StatItem = {
      id: `stat-${Date.now()}`,
      value: "10+",
      label: "New Metric",
      description: "Brief metric explanation",
      order: statsList.length + 1
    };
    setStatsList([...statsList, newStat]);
  };

  const handleDeleteStat = (id: string) => {
    setStatsList(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStats(statsList);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-sky-400" />
            <span>Counter Stats & Metrics</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage the highlight numbers displayed under the Hero section on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddStat}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            <span>Add Counter</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-3">
          {statsList.map((stat, idx) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
            >
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="w-32 shrink-0">
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Value / Number
                  </label>
                  <input
                    type="text"
                    required
                    value={stat.value}
                    onChange={(e) => handleChange(stat.id, 'value', e.target.value)}
                    placeholder="e.g. 3+ or 100%"
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sky-400 font-bold text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="flex-1 w-full md:w-auto">
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Title / Label
                </label>
                <input
                  type="text"
                  required
                  value={stat.label}
                  onChange={(e) => handleChange(stat.id, 'label', e.target.value)}
                  placeholder="e.g. Projects Completed"
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex-1 w-full md:w-auto">
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Short Context Description
                </label>
                <input
                  type="text"
                  value={stat.description || ''}
                  onChange={(e) => handleChange(stat.id, 'description', e.target.value)}
                  placeholder="e.g. Web apps & interactive experiments"
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeleteStat(stat.id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors shrink-0 self-end md:self-center cursor-pointer"
                title="Remove counter"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {statsList.length === 0 && (
          <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-center text-zinc-400 text-sm">
            No counter metrics configured. Click "Add Counter" above to create one.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm shadow-md shadow-sky-500/20 transition-all duration-200 disabled:opacity-60 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Counters'}</span>
        </button>
      </form>
    </div>
  );
};
