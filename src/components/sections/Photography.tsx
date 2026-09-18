import React, { useState } from 'react';
import { Camera, MapPin, Maximize2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotographyItem, PhotoCategory } from '../../types';
import { Lightbox } from './Lightbox';

export const Photography: React.FC = () => {
  const { photography, settings } = useData();
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!settings.showPhotographySection) return null;

  const categories: PhotoCategory[] = ['All', 'Nature', 'Portraits', 'Night', 'Kassala', 'Street'];

  const publishedPhotos = photography.filter(p => p.published);

  const filteredPhotos = publishedPhotos.filter(photo => {
    if (selectedCategory === 'All') return true;
    return photo.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const openLightbox = (photoId: string) => {
    const idx = filteredPhotos.findIndex(p => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <section id="photography" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
              Visual Exploration
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
              Photography
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Photography is my way of capturing moments, places, light, and stories.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-zinc-800 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo.id)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Hover Overlay with Metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-left text-white">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md border border-white/20">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold mb-1 font-heading">
                    {photo.title}
                  </h4>
                  {photo.location && (
                    <p className="text-xs text-zinc-300 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{photo.location}</span>
                    </p>
                  )}
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={filteredPhotos[lightboxIndex] || null}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
};
