import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github, Check, X, Star, Upload, Loader2, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { Project } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import { compressImageFile } from '../../../utils/imageCompressor';

export const ProjectsTab: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    published: true
  });

  const handleOpenCreate = () => {
    setForm({
      title: '',
      description: '',
      image: '',
      technologies: 'React, TypeScript, Tailwind CSS',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      published: true
    });
    setIsCreating(true);
    setEditingProject(null);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      technologies: proj.technologies.join(', '),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      featured: proj.featured,
      published: proj.published
    });
    setIsCreating(false);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressing(true);
        const compressedBase64 = await compressImageFile(file, 1600, 1000, 0.82);
        setForm(prev => ({ ...prev, image: compressedBase64 }));
      } catch (err) {
        console.error("Compression error:", err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const techArray = form.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    setIsSaving(true);
    try {
      if (isCreating) {
        const success = await addProject({
          title: form.title.trim(),
          description: form.description.trim(),
          image: form.image.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
          technologies: techArray.length > 0 ? techArray : ['Web Development'],
          liveUrl: form.liveUrl.trim(),
          githubUrl: form.githubUrl.trim(),
          featured: form.featured,
          published: form.published
        });
        if (success) {
          setIsCreating(false);
        }
      } else if (editingProject) {
        const success = await updateProject(editingProject.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          image: form.image.trim() || editingProject.image,
          technologies: techArray.length > 0 ? techArray : editingProject.technologies,
          liveUrl: form.liveUrl.trim(),
          githubUrl: form.githubUrl.trim(),
          featured: form.featured,
          published: form.published
        });
        if (success) {
          setEditingProject(null);
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
      await deleteProject(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublished = async (project: Project) => {
    await updateProject(project.id, { published: !project.published });
  };

  const handleToggleFeatured = async (project: Project) => {
    await updateProject(project.id, { featured: !project.featured });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Projects Manager
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Create, update, and manage the showcase projects visible to portfolio visitors.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Form Modal / In-page Card */}
      {(isCreating || editingProject) && (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-sky-500/30 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
            <h3 className="text-lg font-bold text-white font-heading">
              {isCreating ? 'Create New Project' : `Edit: ${editingProject?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Easy Convert"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Tech Stack (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS, Vite"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Description / Problem & Solution *
              </label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Explain what the project solves, key features, and user impact..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            {/* Project Image and Upload */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Cover Image (URL or Upload from Device)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://... or upload screenshot"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
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
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {form.image && (
                <div className="mt-3 relative w-48 h-28 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Live Preview / Demo URL
                </label>
                <input
                  type="url"
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  placeholder="https://easyconvert.app"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  placeholder="https://github.com/hyyan55/project"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-zinc-950 border-zinc-700"
                />
                <span>Featured Project (Highlighted in Hero)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-zinc-950 border-zinc-700"
                />
                <span>Publish Live on Portfolio</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
              <button
                type="submit"
                disabled={isSaving || isCompressing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSaving ? 'Saving Project...' : (isCreating ? 'Save New Project' : 'Save Changes')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List in Admin */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start md:items-center gap-4">
              <div className="w-20 h-14 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-base font-bold text-white font-heading">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      project.published
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {project.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                  {project.description}
                </p>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                type="button"
                onClick={() => handleToggleFeatured(project)}
                className={`p-2 rounded-xl transition-colors ${
                  project.featured
                    ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title={project.featured ? 'Remove from featured' : 'Mark as featured'}
              >
                <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => handleTogglePublished(project)}
                className={`p-2 rounded-xl transition-colors ${
                  project.published
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title={project.published ? 'Unpublish' : 'Publish live'}
              >
                {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleOpenEdit(project)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Edit project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setDeleteTarget(project)}
                className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                title="Delete project"
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
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This project will be removed from your portfolio showcase.`}
        confirmLabel="Delete Project"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
