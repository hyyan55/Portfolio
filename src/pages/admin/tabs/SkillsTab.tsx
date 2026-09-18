import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { SkillItem, SkillGroup } from '../../../types';
import { renderSkillIcon, availableSkillIcons } from '../../../utils/iconMap';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

export const SkillsTab: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SkillItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    group: 'Development' as SkillGroup,
    iconName: 'Code2'
  });

  const groups: SkillGroup[] = ['Development', 'Creative', 'AI & Technology', 'Medical'];

  const handleOpenCreate = () => {
    setForm({
      name: '',
      group: 'Development',
      iconName: 'Code2'
    });
    setIsCreating(true);
    setEditingSkill(null);
  };

  const handleOpenEdit = (skill: SkillItem) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      group: skill.group,
      iconName: skill.iconName
    });
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSaving(true);
    try {
      if (isCreating) {
        const success = await addSkill({
          name: form.name.trim(),
          group: form.group,
          iconName: form.iconName
        });
        if (success) {
          setIsCreating(false);
        }
      } else if (editingSkill) {
        const success = await updateSkill(editingSkill.id, {
          name: form.name.trim(),
          group: form.group,
          iconName: form.iconName
        });
        if (success) {
          setEditingSkill(null);
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
      await deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Skills & Tools Manager
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Categorize and manage technical, creative, AI, and medical proficiencies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {(isCreating || editingSkill) && (
        <div className="p-6 rounded-2xl bg-zinc-900 border border-sky-500/30 shadow-2xl relative max-w-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-white font-heading">
              {isCreating ? 'Add New Skill' : `Edit: ${editingSkill?.name}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingSkill(null);
              }}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Next.js or Pathology"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Discipline Group *
                </label>
                <select
                  value={form.group}
                  onChange={(e) => setForm({ ...form, group: e.target.value as SkillGroup })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                >
                  {groups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Icon
                </label>
                <select
                  value={form.iconName}
                  onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                >
                  {availableSkillIcons.map((ico) => (
                    <option key={ico} value={ico}>
                      {ico}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSaving ? 'Saving...' : (isCreating ? 'Add Skill' : 'Save Changes')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingSkill(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grouped Skills Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map((grp) => {
          const grpSkills = skills.filter((s) => s.group === grp);
          return (
            <div
              key={grp}
              className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
                <h3 className="text-sm font-bold text-white font-heading">
                  {grp}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-semibold">
                  {grpSkills.length} items
                </span>
              </div>

              <div className="space-y-2">
                {grpSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white group hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="text-sky-400">
                        {renderSkillIcon(skill.iconName, 'w-4 h-4')}
                      </div>
                      <span className="font-semibold">{skill.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="Edit skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(skill)}
                        className="p-1.5 rounded-lg hover:bg-rose-950/50 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Skill"
        message={`Are you sure you want to delete the skill "${deleteTarget?.name}"?`}
        confirmLabel="Delete Skill"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
