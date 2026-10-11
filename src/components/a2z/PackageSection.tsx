import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Check, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  Eye,
  Car,
  Home,
  Coffee,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

interface PackageSectionProps {
  onOpenBooking: () => void;
  onOpenLightbox: (img: string, title: string, desc: string) => void;
}

export const PackageSection: React.FC<PackageSectionProps> = ({ 
  onOpenBooking, 
  onOpenLightbox 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const perks = [
    { icon: Car, title: 'Private AC Cab', desc: 'Doorstep pickup & dedicated hill-route driver' },
    { icon: Home, title: '2N Villa Stay', desc: 'Boutique colonial mountain villa or resort' },
    { icon: Coffee, title: 'Daily Breakfast', desc: 'Complimentary hill-station breakfast & tea' },
    { icon: Flame, title: 'Campfire Night', desc: 'Evening bonfire with music under the stars' },
    { icon: ShieldCheck, title: 'All Tolls & Permits', desc: 'Hassle-free e-pass & parking charges handled' },
    { icon: Users, title: '24/7 Concierge', desc: 'Local travel expert on call throughout trip' },
  ];

  return (
    <section 
      id="package" 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 flex items-center overflow-hidden"
    >
      {/* Full-width Background Photograph: Kodaikanal Lake surrounded by hills and greenery */}
      <motion.div 
        className="absolute inset-0 w-full h-[125%] -top-[12%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${KODAIKANAL_DATA.package.bgImage}')`,
          y: bgY,
        }}
      >
        {/* Subtle dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06130c] via-black/70 to-[#06130c]" />
        <div className="absolute inset-0 bg-forest-950/40 mix-blend-multiply" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-500/20 border border-forest-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Tour Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight drop-shadow-lg">
            {KODAIKANAL_DATA.package.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-mist-200 drop-shadow">
            {KODAIKANAL_DATA.package.tagline}
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-mist-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kodaikanal Lake, Shola Forests & Highland Meadows</span>
          </div>
        </div>

        {/* Package Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Lake Photo Feature & Highlight Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Lake Image Card with Preview & Lightbox Trigger */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-forest-500/30 group">
              <img 
                src={KODAIKANAL_DATA.package.secondaryImage} 
                alt="Kodaikanal Lake Boating & Hills" 
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-600/80 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                    Scenic Highlight
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-white mt-1">
                    Kodaikanal Star Lake & Promenade
                  </h3>
                  <p className="text-xs text-mist-200">
                    Row boating, cycling path, and misty hill slopes
                  </p>
                </div>

                <button
                  onClick={() => onOpenLightbox(
                    KODAIKANAL_DATA.package.secondaryImage,
                    'Kodaikanal Lake Boating',
                    'A 60-acre star-shaped freshwater lake surrounded by lush green hills, weeping willows, and misty Palani ranges.'
                  )}
                  className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View High-Res</span>
                </button>
              </div>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {perks.map((perk, i) => {
                const IconComponent = perk.icon;
                return (
                  <div 
                    key={i} 
                    className="glass-nature rounded-2xl p-4 border border-forest-500/20 hover:border-forest-400/40 transition-all hover:translate-y-[-2px]"
                  >
                    <div className="w-9 h-9 rounded-xl bg-forest-600/40 text-emerald-300 flex items-center justify-center mb-2.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">
                      {perk.title}
                    </div>
                    <div className="text-[11px] text-mist-300 mt-0.5 leading-snug">
                      {perk.desc}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Pricing & Inclusions Card */}
          <div className="lg:col-span-5">
            <div className="glass-nature rounded-3xl p-6 sm:p-8 border border-forest-400/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Corner Ribbon */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Best Value
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                All-Inclusive Holiday Package
              </div>

              {/* Price Block */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold font-serif-heading text-white">
                  ₹{KODAIKANAL_DATA.package.price.toLocaleString()}
                </span>
                <span className="text-base text-mist-400 line-through">
                  ₹{KODAIKANAL_DATA.package.originalPrice.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  SAVE 25%
                </span>
              </div>
              <p className="text-xs text-mist-300 mt-1">
                {KODAIKANAL_DATA.package.priceNote}
              </p>

              {/* Inclusions List */}
              <div className="mt-6 pt-6 border-t border-forest-500/30">
                <div className="text-xs font-bold uppercase tracking-wider text-mist-200 mb-3">
                  What's Included:
                </div>
                <ul className="space-y-2.5">
                  {KODAIKANAL_DATA.package.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-mist-100">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pickup Points */}
              <div className="mt-6 pt-4 border-t border-forest-500/20">
                <div className="text-[11px] font-semibold text-mist-300 uppercase tracking-wider mb-2">
                  Doorstep Pickup Available From:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {KODAIKANAL_DATA.package.pickupPoints.map((pt, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-mist-200"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-forest-600 via-emerald-600 to-forest-500 hover:from-forest-500 hover:to-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-forest-900/60 border border-emerald-400/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Kodaikanal Package</span>
                </button>

                <a
                  href={`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=Hi%20A2Z%20Tourism,%20please%20send%20me%20the%20detailed%20itinerary%20and%20quote%20for%20the%20Kodaikanal%203D/2N%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-mist-100 hover:text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
