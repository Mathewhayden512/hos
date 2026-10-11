import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Flame, 
  Home, 
  Sparkles, 
  Coffee, 
  Moon, 
  Music, 
  TreePine, 
  Eye, 
  Calendar 
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#06130c] via-black/75 to-[#06130c]" />
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-color-burn" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Hill-Station Living Experience</span>
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Handpicked Villa Resort Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group">
              <img 
                src={KODAIKANAL_DATA.villaCampfire.bgImage} 
                alt="Cozy hill-station villa surrounded by pine trees" 
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-600/80 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                    Mountain Retreat Stay
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-white mt-1">
                    Boutique Colonial Stone Villa
                  </h3>
                  <p className="text-xs text-mist-200">
                    Secluded inside pine woodlands with private garden lawns
                  </p>
                </div>

                <button
                  onClick={() => onOpenLightbox(
                    KODAIKANAL_DATA.villaCampfire.bgImage,
                    'Boutique Colonial Villa',
                    'A cozy heritage hill-station villa nestled amidst pine and eucalyptus groves, offering tranquility, bird song, and cool mountain air.'
                  )}
                  className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              </div>
            </div>

            {/* Campfire Preview Mini Strip */}
            <div className="glass-nature rounded-2xl p-3 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Included in Your Package
                  </div>
                  <div className="text-[11px] text-amber-200/80">
                    Complimentary private campfire evening with warm blankets
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenLightbox(
                  KODAIKANAL_DATA.villaCampfire.campfireImage,
                  'Outdoor Campfire at Dusk',
                  'A warm outdoor campfire at twilight under the star-lit Kodaikanal sky with fragrant eucalyptus logs and acoustic music.'
                )}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-colors"
              >
                View Campfire
              </button>
            </div>
          </div>

          {/* Right Column: Features Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KODAIKANAL_DATA.villaCampfire.features.map((feature, i) => {
              const icons = [Home, Flame, Coffee, TreePine];
              const IconComp = icons[i % icons.length];

              return (
                <div 
                  key={i}
                  className="glass-nature rounded-3xl p-6 border border-amber-500/20 hover:border-amber-400/40 transition-all hover:translate-y-[-2px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold font-serif-heading text-white">
                    {feature.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-mist-200 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-sunset-600 hover:from-amber-500 hover:to-sunset-500 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-amber-900/40 border border-amber-300/40 hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Villa & Campfire Experience</span>
          </button>
        </div>

      </div>
    </section>
  );
};
