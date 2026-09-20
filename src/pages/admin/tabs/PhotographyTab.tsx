import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Camera, Upload, X, MapPin, Eye, EyeOff, Star, Loader2 } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { PhotographyItem, PhotoItemCategory } from '../../../types';
import { compressImageFile } from '../../../utils/imageCompressor';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

export const PhotographyTab: React.FC = () => {
  const { photography, addPhoto, updatePhoto, deletePhoto, uploadImage } = useData();
  const { showToast } = useToast();
  const [editingPhoto, setEditingPhoto] = useState<PhotographyItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PhotographyItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const [form, setForm] = useState({
    title: '',
    category: 'Nature' as PhotoItemCategory,
    imageUrl: '',
    description: '',
    location: '',
    cameraInfo: '',
    featured: false,
    published: true
  });

  const categories: PhotoItemCategory[] = ['Nature', 'Portraits', 'Night', 'Kassala', 'Street'];

  const handleOpenCreate = () => {
    setForm({
      title: '',
      category: 'Kassala',
      imageUrl: '',
      description: '',
      location: 'Kassala, Sudan',
      cameraInfo: 'Sony Alpha • 35mm f/1.8',
      featured: false,
      published: true
    });
    setIsCreating(true);
    setEditingPhoto(null);
  };

  const handleOpenEdit = (photo: PhotographyItem) => {
    setEditingPhoto(photo);
    setForm({
      title: photo.title,
      category: photo.category,
      imageUrl: photo.imageUrl,
      description: photo.description || '',
      location: photo.location || '',
      cameraInfo: photo.cameraInfo || '',
      featured: photo.featured,
      published: photo.published
    });
    setIsCreating(false);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsCompressing(true);
        const uploadedUrl = await uploadImage(file, 'photo');
        if (uploadedUrl) {
          setForm(prev => ({ ...prev, imageUrl: uploadedUrl }));
          showToast("Photo uploaded and ready to save.", "info");
        } else {
          showToast("Failed to upload photo file.", "error");
        }
      } catch (err) {
        console.error("Upload error:", err);
        showToast("Failed to process photo file.", "error");
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Please enter a title for the photograph.", "error");
      return;
    }

    const finalImage = form.imageUrl.trim() || (editingPhoto ? editingPhoto.imageUrl : '');
    if (!finalImage) {
      showToast("Please provide an image URL or upload a photo file.", "error");
      return;
    }

    setIsSaving(true);
    try {
      if (isCreating) {
        const success = await addPhoto({
          title: form.title.trim(),
          category: form.category,
          imageUrl: finalImage,
          description: form.description.trim(),
          location: form.location.trim(),
          cameraInfo: form.cameraInfo.trim(),
          featured: form.featured,
          published: form.published
        });
        if (success) {
          setIsCreating(false);
        }
      } else if (editingPhoto) {
        const success = await updatePhoto(editingPhoto.id, {
          title: form.title.trim(),
          category: form.category,
          imageUrl: finalImage, // Guarantees existing photo is preserved!
          description: form.description.trim(),
          location: form.location.trim(),
          cameraInfo: form.cameraInfo.trim(),
          featured: form.featured,
          published: form.published
        });
        if (success) {
          setEditingPhoto(null);
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
      await deletePhoto(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublished = async (photo: PhotographyItem) => {
    await updatePhoto(photo.id, { published: !photo.published });
  };

  const handleToggleFeatured = async (photo: PhotographyItem) => {
    await updatePhoto(photo.id, { featured: !photo.featured });
  };

  const filteredPhotos = filterCategory === 'All'
    ? photography
    : photography.filter(p => p.category === filterCategory);

  return (
    <div className="space-y-6 text-left">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Photography Manager
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Upload new photos from Kassala and Sudan, categorize them, and manage gallery display without losing items.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photograph</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 border-b border-zinc-800/80">
        <button
          onClick={() => setFilterCategory('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filterCategory === 'All'
              ? 'bg-sky-500 text-black font-bold'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          All ({photography.length})
        </button>
        {categories.map(cat => {
          const count = photography.filter(p => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-sky-500 text-black font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Form Modal / Drawer */}
      {(isCreating || editingPhoto) && (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-sky-500/30 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
            <h3 className="text-lg font-bold text-white font-heading">
              {isCreating ? 'Upload New Photograph' : `Edit: ${editingPhoto?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPhoto(null);
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
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Jabal Tootil at Dawn"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as PhotoItemCategory })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Source & Upload */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Photo Image (Upload File or Enter Image URL) *
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="Enter image URL (https://...) or upload directly from device"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer border border-zinc-700 shrink-0 transition-colors">
                  {isCompressing ? (
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-sky-400" />
                  )}
                  <span>{isCompressing ? 'Compressing...' : 'Upload Device Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isCompressing}
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {form.imageUrl && (
                <div className="mt-3 relative w-48 h-32 rounded-xl overflow-hidden border border-zinc-700 group bg-zinc-950">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
                      className="p-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                      title="Clear image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Description / Story
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Story behind the capture, light conditions, or atmosphere..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Location (e.g. Kassala, Eastern Sudan)
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Kassala, Sudan"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Camera / Lens / Technical Specs
                </label>
                <input
                  type="text"
                  value={form.cameraInfo}
                  onChange={(e) => setForm({ ...form, cameraInfo: e.target.value })}
                  placeholder="Sony Alpha • 35mm f/1.8 • ISO 100"
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
                <span>Featured Photograph (Highlight in previews)</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-zinc-950 border-zinc-700"
                />
                <span>Publish Live on Website</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
              <button
                type="submit"
                disabled={isSaving || isCompressing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSaving ? 'Saving Photograph...' : (isCreating ? 'Save New Photo' : 'Save Changes')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingPhoto(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Photos Grid in Admin */}
      {filteredPhotos.length === 0 ? (
        <div className="p-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
          <Camera className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-heading">No photographs found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {filterCategory !== 'All'
              ? `No photos categorized under "${filterCategory}". Upload one or switch category filter.`
              : 'You have not uploaded any photographs yet. Click "Upload Photograph" above to add your first work.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between group hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-zinc-950">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm">
                    {photo.category}
                  </span>
                  {photo.featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black flex items-center gap-1 shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-black" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-heading mb-1 line-clamp-1">
                  {photo.title}
                </h4>
                {photo.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-1">
                    {photo.description}
                  </p>
                )}
                {photo.location && (
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/80">
                {/* Publish Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleTogglePublished(photo)}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    photo.published
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                  title={photo.published ? 'Click to hide photo' : 'Click to publish photo'}
                >
                  {photo.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{photo.published ? 'Live' : 'Hidden'}</span>
                </button>

                {/* Actions: Feature, Edit, Delete */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(photo)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      photo.featured
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                    title={photo.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <Star className={`w-3.5 h-3.5 ${photo.featured ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(photo)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Edit photograph"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(photo)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                    title="Delete photograph"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable Confirm Delete Modal (No iframe-blocked window.confirm) */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Photograph"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This photograph will be removed from your gallery and server storage.`}
        confirmLabel="Delete Photo"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
