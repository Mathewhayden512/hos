import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Flame, 
  Home, 
  Sparkles, 
  Coffee, 
  Eye, 
  Calendar,
  Bed,
  Utensils,
  Maximize2,
  CheckCircle,
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

interface VillaCampfireSectionProps {
  onOpenBooking: () => void;
  onOpenLightbox: (img: string, title: string, desc: string) => void;
}

export const VillaCampfireSection: React.FC<VillaCampfireSectionProps> = ({
  onOpenBooking,
  onOpenLightbox
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const villaPhotos = KODAIKANAL_DATA.villaCampfire.villaPhotos;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const activePhoto = villaPhotos[selectedPhotoIndex];

  return (
    <section 
      id="villa-stay" 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 flex items-center overflow-hidden"
    >
      {/* Full-width Background Photograph: Warm Campfire at Dusk */}
      <motion.div 
        className="absolute inset-0 w-full h-[125%] -top-[12%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${KODAIKANAL_DATA.villaCampfire.campfireImage}')`,
          y: bgY,
        }}
      >
        {/* Subtle dark overlay with warm sunset embers gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06130c] via-black/80 to-[#06130c]" />
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-color-burn" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Actual Stay Photography • 6 to 7 Rooms</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight drop-shadow-lg">
            {KODAIKANAL_DATA.villaCampfire.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-amber-100/90 font-serif-heading">
            {KODAIKANAL_DATA.villaCampfire.subtitle}
          </p>

          <p className="mt-3 text-sm sm:text-base text-mist-200 max-w-2xl mx-auto">
            {KODAIKANAL_DATA.villaCampfire.description}
          </p>
        </div>

        {/* Real Villa & Room Photography Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Main Active Photo Viewer (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group bg-black/60">
              <img 
                src={activePhoto.image} 
                alt={activePhoto.title} 
                className="w-full h-80 sm:h-[430px] object-cover object-center transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-600/90 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider border border-amber-400/30 shadow-md">
                  {activePhoto.tag}
                </span>

                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-medium text-amber-200 border border-white/20">
                  Photo {selectedPhotoIndex + 1} of {villaPhotos.length}
                </span>
              </div>

              {/* Bottom Caption & Lightbox Trigger */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mist-200 mt-1 max-w-lg leading-relaxed line-clamp-2">
                    {activePhoto.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenLightbox(
                    activePhoto.image,
                    activePhoto.title,
                    activePhoto.description
                  )}
                  className="px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors shrink-0 shadow-lg"
                  title="Enlarge photo"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">View Full-Res</span>
                </button>
              </div>
            </div>

            {/* Photo Thumbnail Selector Strip */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {villaPhotos.map((photo, idx) => {
                const isSelected = selectedPhotoIndex === idx;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                      isSelected 
                        ? 'border-amber-400 scale-[1.03] shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50' 
                        : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate text-center bg-black/70 px-1 py-0.5 rounded">
                      {photo.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Campfire Mini Strip */}
            <div className="glass-nature rounded-2xl p-3.5 border border-amber-500/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Private Campfire on Lawn Included
                  </div>
                  <div className="text-[11px] text-amber-200/80">
                    Warm outdoor fire pit on the estate lawn under Kodaikanal stars
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenLightbox(
                  KODAIKANAL_DATA.villaCampfire.campfireImage,
                  'Outdoor Campfire at Dusk',
                  'A warm outdoor campfire at twilight under the star-lit Kodaikanal sky with fragrant eucalyptus logs and acoustic music.'
                )}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-colors shrink-0"
              >
                View Campfire
              </button>
            </div>

          </div>

          {/* Right Column: Villa Highlights & Room Features (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Villa Specs Card */}
            <div className="glass-nature rounded-3xl p-6 border border-amber-500/30 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Private Hillside Estate</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  2 to 21+ Guests
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-mist-200">
                <div className="flex items-start gap-2.5">
                  <Bed className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <span><strong>6 to 7 Bedrooms:</strong> Master bedrooms with king beds & spacious family suites with extra beds.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Utensils className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <span><strong>Dining & Living Areas:</strong> 6-seater wooden dining table, beverage amenities, and grand multi-level hall.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <span><strong>Private Lawn Bonfire:</strong> Dedicated fire pit on the front garden lawn with music & blankets.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                  <span><strong>Exclusivity:</strong> Completely private gated property with mountain balconies and parking space.</span>
                </div>
              </div>

              {/* Room Tariff Snapshot */}
              <div className="mt-5 pt-4 border-t border-amber-500/20 bg-amber-500/10 rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider block">
                      Package Rate Starting At
                    </span>
                    <span className="text-2xl font-bold font-serif-heading text-white">
                      ₹3,200 <span className="text-xs font-normal text-mist-300">/ person</span>
                    </span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 font-bold text-xs uppercase tracking-wider shadow transition-colors"
                  >
                    View Room Tariff
                  </button>
                </div>
              </div>
            </div>

            {/* Key Features 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KODAIKANAL_DATA.villaCampfire.features.map((feature, i) => (
                <div 
                  key={i}
                  className="glass-nature rounded-2xl p-4 border border-amber-500/20 hover:border-amber-400/40 transition-all hover:translate-y-[-2px]"
                >
                  <h4 className="text-sm font-bold font-serif-heading text-white flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{feature.title}</span>
                  </h4>
                  <p className="mt-1 text-[11px] text-mist-200 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Booking Action Button */}
        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-sunset-600 hover:from-amber-500 hover:to-sunset-500 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-900/40 border border-amber-300/40 hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Check Rates & Book Villa Stay (2 to 21 Pax)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
