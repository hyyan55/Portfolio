import React, { useState, useEffect } from 'react';
import {
  Save,
  User,
  MapPin,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Loader2,
  Plus,
  Trash2,
  Layers,
  GraduationCap,
  Code2,
  Camera,
  Bot
} from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { compressImageFile } from '../../../utils/imageCompressor';
import { AboutCard } from '../../../types';

export const ProfileTab: React.FC = () => {
  const { profile, updateProfile, aboutCards, updateAboutCards, addAboutCard, deleteAboutCard, uploadImage } = useData();
  const [formData, setFormData] = useState({ ...profile });
  const [cardsList, setCardsList] = useState<AboutCard[]>([...aboutCards]);
  const [titlesInput, setTitlesInput] = useState(profile.titles.join(', '));
  const [saving, setSaving] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    setFormData({ ...profile });
    setTitlesInput(profile.titles.join(', '));
  }, [profile]);

  useEffect(() => {
    setCardsList([...aboutCards]);
  }, [aboutCards]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressing(true);
        const uploadedUrl = await uploadImage(file, 'hayyan_avatar');
        if (uploadedUrl) {
          setFormData(prev => ({ ...prev, avatarUrl: uploadedUrl }));
        }
      } catch (err) {
        console.error("Avatar upload error:", err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleCardChange = (id: string, field: keyof AboutCard, val: any) => {
    setCardsList(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const handleAddCard = () => {
    const newCard: AboutCard = {
      id: `card-${Date.now()}`,
      badge: "✨ Specialization",
      title: "New Domain",
      desc: "Describe this area of focus or dedication.",
      iconName: "Sparkles",
      order: cardsList.length + 1
    };
    setCardsList([...cardsList, newCard]);
  };

  const handleDeleteCard = (id: string) => {
    setCardsList(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedTitles = titlesInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const updatedProfile = {
        ...formData,
        titles: parsedTitles.length > 0 ? parsedTitles : formData.titles
      };

      await Promise.all([
        updateProfile(updatedProfile),
        updateAboutCards(cardsList)
      ]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white font-heading">
          Profile & About Customization
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Full control over biography, headline roles, hero greeting, and the 4 interactive About pillars.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Profile Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
            <User className="w-4 h-4 text-sky-400" />
            <span>Core Identity & Hero Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Location Badge Text
              </label>
              <input
                type="text"
                required
                value={formData.locationBadge}
                onChange={(e) => setFormData({ ...formData, locationBadge: e.target.value })}
                placeholder="e.g. Based in Kassala, Sudan 🇸🇩"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Titles / Rotating Headline Roles */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Rotating Headline Roles (Comma-separated)
            </label>
            <input
              type="text"
              value={titlesInput}
              onChange={(e) => setTitlesInput(e.target.value)}
              placeholder="Medical Student, Web & App Developer, Photographer, Technology & AI Enthusiast"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 font-mono text-xs"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              These rotate smoothly in the Hero header on the home screen.
            </p>
          </div>

          {/* Hero Greeting & Short Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Hero Headline Greeting
            </label>
            <input
              type="text"
              required
              value={formData.heroGreeting}
              onChange={(e) => setFormData({ ...formData, heroGreeting: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Hero Brief Pitch / Description
            </label>
            <textarea
              rows={2}
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Avatar URL and Preview with Direct Upload */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Profile Portrait / Avatar (Device Upload or Image URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                placeholder="https://... or upload photo directly"
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 w-full font-mono text-xs"
              />
              <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer border border-zinc-700 shrink-0 transition-colors">
                {isCompressing ? (
                  <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 text-sky-400" />
                )}
                <span>{isCompressing ? 'Compressing...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isCompressing}
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
              {formData.avatarUrl && (
                <img
                  src={formData.avatarUrl}
                  alt="Avatar preview"
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-700 shrink-0 bg-zinc-900"
                />
              )}
            </div>
          </div>
        </div>

        {/* About Section Detailed Text */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>About Section Narrative</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              About Section Intro Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.aboutIntro}
              onChange={(e) => setFormData({ ...formData, aboutIntro: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              About Section Extended Bio Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.aboutBio}
              onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>
        </div>

        {/* About Section 4 Pillars / Cards */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>About Section Feature Pillars / Cards</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                The highlight cards displayed in the About section (Medicine, Dev, Photography, AI, etc.).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddCard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span>Add Pillar</span>
            </button>
          </div>

          <div className="space-y-4">
            {cardsList.map((card, idx) => (
              <div
                key={card.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-300 text-xs font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">
                      Pillar #{idx + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors cursor-pointer"
                    title="Delete card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Badge Text / Emoji
                    </label>
                    <input
                      type="text"
                      value={card.badge}
                      onChange={(e) => handleCardChange(card.id, 'badge', e.target.value)}
                      placeholder="e.g. 🎓 Medical Student"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Pillar Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCardChange(card.id, 'title', e.target.value)}
                      placeholder="e.g. Medicine & Clinical Science"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                      Icon Name
                    </label>
                    <select
                      value={card.iconName || 'Sparkles'}
                      onChange={(e) => handleCardChange(card.id, 'iconName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-500"
                    >
                      <option value="GraduationCap">GraduationCap (Medicine)</option>
                      <option value="Stethoscope">Stethoscope (Clinic)</option>
                      <option value="HeartPulse">HeartPulse (Health)</option>
                      <option value="Code2">Code2 (Software)</option>
                      <option value="Camera">Camera (Photography)</option>
                      <option value="Bot">Bot (AI & Agents)</option>
                      <option value="Cpu">Cpu (Tech)</option>
                      <option value="Globe">Globe (Web)</option>
                      <option value="Sparkles">Sparkles (General)</option>
                      <option value="Layers">Layers (Design)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Card Description
                  </label>
                  <textarea
                    rows={2}
                    value={card.desc}
                    onChange={(e) => handleCardChange(card.id, 'desc', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || isCompressing}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm shadow-md shadow-sky-500/20 transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving changes to server...' : 'Save All Profile & About Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
