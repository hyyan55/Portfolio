import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Tag } from 'lucide-react';
import { PhotographyItem } from '../../types';

interface LightboxProps {
  photo: PhotographyItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photo, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev / Next Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white flex items-center justify-center border border-zinc-700 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Modal */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-xl overflow-hidden bg-zinc-950 max-h-[70vh] flex items-center justify-center shadow-2xl border border-zinc-800">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[70vh] max-w-full w-auto h-auto object-contain rounded-lg"
          />
        </div>

        {/* Image Metadata Bar */}
        <div className="mt-4 w-full max-w-2xl bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 text-left shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-bold text-white font-heading">
              {photo.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              {photo.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 mb-3">
            {photo.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            {photo.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {photo.location}
              </span>
            )}
            {photo.cameraInfo && (
              <span className="inline-flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-zinc-400" />
                {photo.cameraInfo}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
