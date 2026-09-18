import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Camera,
  Cpu,
  Milestone,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { OverviewTab } from './tabs/OverviewTab';
import { ProfileTab } from './tabs/ProfileTab';
import { StatsTab } from './tabs/StatsTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { PhotographyTab } from './tabs/PhotographyTab';
import { SkillsTab } from './tabs/SkillsTab';
import { JourneyTab } from './tabs/JourneyTab';
import { MessagesTab } from './tabs/MessagesTab';
import { SettingsTab } from './tabs/SettingsTab';

export const AdminDashboard: React.FC = () => {
  const { logout, username } = useAuth();
  const { messages } = useData();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = messages.filter(m => !m.read).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & About', icon: User },
    { id: 'stats', label: 'Metrics & Stats', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'skills', label: 'Skills & Tools', icon: Cpu },
    { id: 'journey', label: 'Journey', icon: Milestone },
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'settings', label: 'Site & Backups', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'profile':
        return <ProfileTab />;
      case 'stats':
        return <StatsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'photography':
        return <PhotographyTab />;
      case 'skills':
        return <SkillsTab />;
      case 'journey':
        return <JourneyTab />;
      case 'messages':
        return <MessagesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col md:flex-row selection:bg-sky-500 selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
            H
          </div>
          <span className="font-bold text-sm">Admin Control Hub</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0D0D0D] border-r border-zinc-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Brand header in sidebar */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-black flex items-center justify-center font-black text-lg">
              H
            </div>
            <div className="text-left">
              <h1 className="font-bold text-sm text-white tracking-wide">
                Hayyan Mohamed
              </h1>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin Session</span>
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-black shadow-md shadow-sky-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-black text-white' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-800/80 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span>Public Site</span>
          </a>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold border border-rose-900/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="font-bold text-white capitalize">{activeTab}</span>
            <span>/</span>
            <span>Content Management</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Signed in as <strong className="text-white">{username}</strong></span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};
