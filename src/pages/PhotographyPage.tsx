import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, ZoomIn, Info } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Lightbox } from '../components/sections/Lightbox';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';
import { PhotographyItem } from '../types';

export const PhotographyPage: React.FC = () => {
  const { photography } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotographyItem | null>(null);

  usePageSeo({
    title: "Photography | Hayyan Mohamed (حيان محمد) - Kassala, Sudan",
    description: "Photography by Hayyan Mohamed. Capturing natural light, architectural forms, and regional landscapes around Kassala and Jabal Tootil in Eastern Sudan.",
    canonicalPath: "/photography",
    schema: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Photography by Hayyan Mohamed",
      "author": {
        "@type": "Person",
        "name": "Hayyan Mohamed"
      },
      "contentLocation": "Kassala, Sudan",
      "description": "Photographic collection documenting landscapes, light, and nature in Kassala, Sudan."
    }
  });

  const publishedPhotos = photography.filter(p => p.published);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(publishedPhotos.map(p => p.category)))];

  const filteredPhotos = publishedPhotos.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  const handlePrev = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  const handleNext = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="photography" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">Photography</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 font-heading">
              Photography by Hayyan Mohamed
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              Documenting moments, ambient lighting, and natural granite contours across Kassala and Eastern Sudan.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>Location: Kassala, Sudan</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Gallery Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 dark:bg-[#111111] rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">No photographs found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm uppercase tracking-wider">
                        {photo.category}
                      </span>
                      <ZoomIn className="w-4 h-4 text-white/80" />
                    </div>
                    <h3 className="text-base font-bold mb-1">
                      {photo.title}
                    </h3>
                    {photo.location && (
                      <p className="text-xs text-white/80 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        <span>{photo.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Lightbox Modal */}
      <Lightbox
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};
