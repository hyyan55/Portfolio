import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, Loader2 } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { JourneyItem } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

export const JourneyTab: React.FC = () => {
  const { journey, addJourneyItem, updateJourneyItem, deleteJourneyItem } = useData();
  const [editingItem, setEditingItem] = useState<JourneyItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<JourneyItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    year: '2026',
    title: '',
    institution: '',
    description: ''
  });

  const handleOpenCreate = () => {
    setForm({
      year: new Date().getFullYear().toString(),
      title: '',
      institution: '',
      description: ''
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleOpenEdit = (item: JourneyItem) => {
    setEditingItem(item);
    setForm({
      year: item.year,
      title: item.title,
      institution: item.institution || '',
      description: item.description
    });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsSaving(true);
    try {
      if (isCreating) {
        const success = await addJourneyItem({
          year: form.year.trim(),
          title: form.title.trim(),
          institution: form.institution.trim(),
          description: form.description.trim()
        });
        if (success) {
          setIsCreating(false);
        }
      } else if (editingItem) {
        const success = await updateJourneyItem(editingItem.id, {
          year: form.year.trim(),
          title: form.title.trim(),
          institution: form.institution.trim(),
          description: form.description.trim()
        });
        if (success) {
          setEditingItem(null);
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteJourneyItem(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Journey & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your chronological timeline entries across medicine, engineering, and photography.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {(isCreating || editingItem) && (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-sky-500/30 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white font-heading">
              {isCreating ? 'Add Timeline Milestone' : `Edit: ${editingItem?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Year / Range *
                </label>
                <input
                  type="text"
                  required
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g. 2024 - Present"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Clinical Medicine Clerkship or Founded Studio"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Institution / Context / Location
              </label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="Faculty of Medicine • Teaching Hospital"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Description *
              </label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Details of key experiences, patient cases, system development, or achievements..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSaving ? 'Saving...' : (isCreating ? 'Add Milestone' : 'Save Changes')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {journey.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start justify-between gap-4 group hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Calendar className="w-3 h-3" />
                  <span>{item.year}</span>
                </span>
                <h4 className="text-base font-bold text-white font-heading">
                  {item.title}
                </h4>
              </div>
              {item.institution && (
                <p className="text-xs text-zinc-400 font-medium mb-2">
                  {item.institution}
                </p>
              )}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Edit milestone"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(item)}
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                title="Delete milestone"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Milestone"
        message={`Are you sure you want to delete the milestone "${deleteTarget?.title}"?`}
        confirmLabel="Delete Milestone"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
