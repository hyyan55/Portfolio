import React, { useState, useRef } from 'react';
import {
  Save,
  Sliders,
  Share2,
  Phone,
  Mail,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  Database,
  Globe,
  Loader2
} from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const SettingsTab: React.FC = () => {
  const {
    settings,
    updateSettings,
    socials,
    updateSocials,
    syncAllData,
    exportBackup,
    importBackup,
    fetchAdminData
  } = useData();

  const [siteForm, setSiteForm] = useState({ ...settings });
  const [socialsList, setSocialsList] = useState([...socials]);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setSiteForm({ ...settings });
  }, [settings]);

  React.useEffect(() => {
    setSocialsList([...socials]);
  }, [socials]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        updateSettings(siteForm),
        updateSocials(socialsList)
      ]);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialUrlChange = (id: string, newUrl: string) => {
    setSocialsList(prev => prev.map(s => s.id === id ? { ...s, url: newUrl } : s));
  };

  const handleSocialToggle = (id: string) => {
    setSocialsList(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleForceSync = async () => {
    setSyncing(true);
    try {
      await syncAllData();
    } finally {
      setSyncing(false);
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoring(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await importBackup(parsed);
    } catch (err) {
      console.error("Failed to parse JSON backup:", err);
    } finally {
      setRestoring(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white font-heading">
          Site Controls, Communications & Backup
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Full administration over section visibility, WhatsApp automation, social media channels, and permanent database backups.
        </p>
      </div>

      {/* Database Master Sync & Backup Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-sky-500/30 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Database Status: Active & Atomic</span>
            </div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-400" />
              <span>Full Site Database Synchronization & Backups</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Synchronize all in-memory changes to the permanent JSON database or download a complete snapshot backup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleForceSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60"
            >
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>{syncing ? 'Syncing...' : 'Force Sync All to Server'}</span>
            </button>

            <button
              type="button"
              onClick={exportBackup}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download Backup (JSON)</span>
            </button>

            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-zinc-700 transition-colors cursor-pointer">
              {restoring ? <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" /> : <Upload className="w-4 h-4 text-emerald-400" />}
              <span>{restoring ? 'Restoring...' : 'Restore Backup'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                disabled={restoring}
                onChange={handleRestoreFile}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section Visibility Toggles */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <h3 className="text-base font-bold text-white mb-2 font-heading flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Section Visibility Toggles</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Turn sections on or off on the public website with a single click.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-white">Projects Section</p>
                <p className="text-[11px] text-zinc-400">Display Featured Projects grid</p>
              </div>
              <input
                type="checkbox"
                checked={siteForm.showProjectsSection}
                onChange={(e) => setSiteForm({ ...siteForm, showProjectsSection: e.target.checked })}
                className="w-5 h-5 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-white">Photography Section</p>
                <p className="text-[11px] text-zinc-400">Display photo gallery & categories</p>
              </div>
              <input
                type="checkbox"
                checked={siteForm.showPhotographySection}
                onChange={(e) => setSiteForm({ ...siteForm, showPhotographySection: e.target.checked })}
                className="w-5 h-5 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-white">Skills & Proficiencies Section</p>
                <p className="text-[11px] text-zinc-400">Display skills, tools, and categories</p>
              </div>
              <input
                type="checkbox"
                checked={siteForm.showSkillsSection}
                onChange={(e) => setSiteForm({ ...siteForm, showSkillsSection: e.target.checked })}
                className="w-5 h-5 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-white">Journey Milestones Section</p>
                <p className="text-[11px] text-zinc-400">Display timeline milestones</p>
              </div>
              <input
                type="checkbox"
                checked={siteForm.showJourneySection}
                onChange={(e) => setSiteForm({ ...siteForm, showJourneySection: e.target.checked })}
                className="w-5 h-5 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800 sm:col-span-2">
              <div>
                <p className="text-xs font-bold text-white">Floating WhatsApp Quick Chat Button</p>
                <p className="text-[11px] text-zinc-400">Displays the fixed WhatsApp circular button on all pages</p>
              </div>
              <input
                type="checkbox"
                checked={siteForm.showWhatsAppButton}
                onChange={(e) => setSiteForm({ ...siteForm, showWhatsAppButton: e.target.checked })}
                className="w-5 h-5 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Contact Details Configuration */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Quick Connect & Contact Routing</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={siteForm.whatsappNumber || '+249912345678'}
                onChange={(e) => setSiteForm({ ...siteForm, whatsappNumber: e.target.value })}
                placeholder="+249912345678"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                International format without spaces, e.g., +249912345678
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Primary Contact Email Address
              </label>
              <input
                type="email"
                value={siteForm.contactEmail || 'hayyan@example.com'}
                onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                placeholder="contact@hayyanmohamed.com"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              WhatsApp Pre-filled Welcome Message
            </label>
            <input
              type="text"
              value={siteForm.whatsappDefaultMessage || 'Hello Hayyan, I visited your portfolio and would like to connect.'}
              onChange={(e) => setSiteForm({ ...siteForm, whatsappDefaultMessage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={siteForm.footerCopyright || 'Hayyan Mohamed. Built with precision and care.'}
                onChange={(e) => setSiteForm({ ...siteForm, footerCopyright: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Contact Location String
              </label>
              <input
                type="text"
                value={siteForm.contactLocationText || 'Kassala, Sudan'}
                onChange={(e) => setSiteForm({ ...siteForm, contactLocationText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Global Branding & Metadata */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Site Title & Branding</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Site Title
              </label>
              <input
                type="text"
                value={siteForm.siteTitle}
                onChange={(e) => setSiteForm({ ...siteForm, siteTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Logo Monogram Text
              </label>
              <input
                type="text"
                value={siteForm.logoText}
                onChange={(e) => setSiteForm({ ...siteForm, logoText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Meta SEO Description
            </label>
            <textarea
              rows={2}
              value={siteForm.metaDescription}
              onChange={(e) => setSiteForm({ ...siteForm, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>
        </div>

        {/* Social & Contact Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>Social Channels (GitHub, Instagram, WhatsApp, TikTok, Email)</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-4">
            Provide the direct URLs to your profiles. These update across the navigation bar, hero footer, and contact section.
          </p>

          <div className="space-y-3">
            {socialsList.map((soc) => (
              <div
                key={soc.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800"
              >
                <div className="w-28 text-xs font-bold text-white shrink-0">
                  {soc.platform}
                </div>
                <input
                  type="text"
                  value={soc.url}
                  onChange={(e) => handleSocialUrlChange(soc.id, e.target.value)}
                  placeholder={`https://... (${soc.platform})`}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-500 font-mono"
                />
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-zinc-400 shrink-0">
                  <input
                    type="checkbox"
                    checked={soc.active}
                    onChange={() => handleSocialToggle(soc.id)}
                    className="w-4 h-4 rounded text-sky-500 bg-zinc-900 border-zinc-700 cursor-pointer"
                  />
                  <span>Active</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm shadow-md shadow-sky-500/20 transition-all duration-200 disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving settings...' : 'Save All Settings & Socials'}</span>
        </button>
      </form>
    </div>
  );
};
