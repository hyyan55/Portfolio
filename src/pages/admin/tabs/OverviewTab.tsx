import React from 'react';
import {
  FolderGit2,
  Camera,
  Cpu,
  Mail,
  ArrowUpRight,
  PlusCircle,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../../context/DataContext';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { projects, photography, skills, messages, adminStats } = useData();

  const unreadCount = messages.filter(m => !m.read).length;

  const statCards = [
    {
      title: 'Total Projects',
      value: projects.length,
      subtitle: `${projects.filter(p => p.published).length} published live`,
      icon: <FolderGit2 className="w-5 h-5 text-sky-400" />,
      tab: 'projects'
    },
    {
      title: 'Photography Items',
      value: photography.length,
      subtitle: `${photography.filter(p => p.featured).length} featured highlights`,
      icon: <Camera className="w-5 h-5 text-amber-400" />,
      tab: 'photography'
    },
    {
      title: 'Skills & Tools',
      value: skills.length,
      subtitle: 'Across 4 disciplines',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      tab: 'skills'
    },
    {
      title: 'Inbound Messages',
      value: messages.length,
      subtitle: unreadCount > 0 ? `${unreadCount} unread inquiries` : 'All read',
      icon: <Mail className="w-5 h-5 text-emerald-400" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
      tab: 'messages'
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Gateway Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Welcome back, Hayyan
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Manage your public portfolio content, add new projects, publish Sudan photography, and monitor client messages in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors"
          >
            <span>View Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(card.tab)}
            className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center">
                {card.icon}
              </div>
              {card.badge && (
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                  {card.badge} new
                </span>
              )}
            </div>

            <div>
              <div className="text-3xl font-black text-white font-heading mb-1">
                {card.value}
              </div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {card.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <h3 className="text-base font-bold text-white mb-4 font-heading flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-sky-400" />
            <span>Quick Actions</span>
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigateTab('projects')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-sky-500/50 hover:bg-zinc-800/40 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-semibold text-white">Publish New Project</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            <button
              onClick={() => onNavigateTab('photography')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800/40 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-white">Upload Photograph</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            <button
              onClick={() => onNavigateTab('messages')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/40 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">Check Inquiries ({unreadCount} new)</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Activity & System Status */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <h3 className="text-base font-bold text-white mb-4 font-heading flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Activity & Audit Log</span>
          </h3>

          <div className="space-y-3">
            {adminStats?.activityLog && adminStats.activityLog.length > 0 ? (
              adminStats.activityLog.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-xs"
                >
                  <div className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{log.action}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/40 text-xs text-zinc-500">
                System operational. All systems running normally.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
