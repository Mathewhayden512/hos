import React from 'react';
import { X, MapPin, Sparkles, Download, Share2 } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-xl animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white z-20 transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#06130c] border border-forest-500/40 shadow-2xl">
        
        {/* The High-Resolution Image */}
        <div className="relative w-full max-h-[70vh] flex items-center justify-center bg-black/90 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Caption details */}
        <div className="w-full p-6 sm:p-8 bg-[#0a2015] border-t border-forest-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-forest-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-forest-400/30">
                Kodaikanal Photography
              </span>
              <span className="text-xs text-mist-400">High Definition</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white mt-1">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-mist-200 mt-1 max-w-2xl">
              {description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
