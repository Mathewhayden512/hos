import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Camera, 
  Compass, 
  ChevronRight, 
  Eye, 
  Layers,
  Calendar
} from 'lucide-react';
import { DayItinerary, Destination } from '../../data/kodaikanalData';

interface DaySightseeingSectionProps {
  dayData: DayItinerary;
  sectionId: string;
  onOpenBooking: () => void;
  onOpenLightbox: (img: string, title: string, desc: string) => void;
  accentColor?: 'emerald' | 'amber' | 'sky';
}

export const DaySightseeingSection: React.FC<DaySightseeingSectionProps> = ({
  dayData,
  sectionId,
  onOpenBooking,
  onOpenLightbox,
  accentColor = 'emerald'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const getAccentBadge = () => {
    switch (accentColor) {
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'sky':
        return 'bg-sky-500/20 text-sky-300 border-sky-400/30';
      default:
        return 'bg-forest-500/20 text-emerald-300 border-forest-400/30';
    }
  };

  return (
    <section 
      id={sectionId} 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 flex flex-col justify-center overflow-hidden"
    >
      {/* Full-width Background Photograph for the Day */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${dayData.bgImage}')`,
          y: bgY,
        }}
      >
        {/* Subtle Dark Gradient Overlay to ensure crisp contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06130c]/95 via-black/75 to-[#06130c]/95" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md ${getAccentBadge()}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Day {dayData.dayNumber} Itinerary</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight drop-shadow-md">
            {dayData.title}
          </h2>

          <p className="mt-3 text-base sm:text-xl text-emerald-200/90 font-medium font-serif-heading">
            {dayData.theme}
          </p>

          <p className="mt-3 text-sm sm:text-base text-mist-200 max-w-2xl mx-auto leading-relaxed">
            {dayData.subtitle}
          </p>

          {/* Quick Schedule Pill Row */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-mist-300">
            {dayData.destinations.map((dest, i) => (
              <span 
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-mist-200 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{dest.name}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Destination Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${dayData.destinations.length >= 4 ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-6 sm:gap-8`}>
          {dayData.destinations.map((destination: Destination, index: number) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="glass-nature rounded-3xl overflow-hidden border border-forest-500/30 shadow-xl flex flex-col group hover:border-forest-400/60 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container with Hover Zoom & Badge Overlays */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-black/60 shrink-0">
                <img 
                  src={destination.image} 
                  alt={destination.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient shade over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06130c] via-black/20 to-transparent" />

                {/* Top Tag & Timing Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                    {destination.tag}
                  </span>
                  
                  <span className="px-2.5 py-1 rounded-full bg-forest-900/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-forest-500/30 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{destination.elevation}</span>
                  </span>
                </div>

                {/* Quick Lightbox Action Button */}
                <button
                  onClick={() => onOpenLightbox(destination.image, destination.name, destination.description)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="View full-size photo"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-mist-400 font-medium mb-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{destination.timing}</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif-heading text-white group-hover:text-emerald-300 transition-colors">
                    {destination.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-mist-200/90 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {destination.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 pt-3 border-t border-forest-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-300 block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {destination.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5 text-xs text-mist-200">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Photo Tip */}
                <div className="mt-5 pt-3 border-t border-forest-500/20">
                  <div className="flex items-start gap-1.5 text-[11px] text-amber-200/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    <Camera className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                    <span>{destination.tips}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

        {/* Day Schedule Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-nature rounded-3xl p-6 sm:p-8 border border-forest-500/30 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-forest-500/20">
            <div>
              <h4 className="text-lg font-bold font-serif-heading text-white">
                Day {dayData.dayNumber} Timeline & Route Schedule
              </h4>
              <p className="text-xs text-mist-300 mt-0.5">
                Chauffeur-guided itinerary planned for comfortable hill station pace
              </p>
            </div>
            
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-xl bg-forest-600/80 hover:bg-forest-500 text-white text-xs font-bold uppercase tracking-wider border border-forest-400/40 flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Customize Day {dayData.dayNumber}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dayData.schedule.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-forest-500/30 flex items-start gap-3 transition-colors"
              >
                <span className="px-2 py-0.5 rounded-md bg-forest-800 text-[11px] font-mono font-semibold text-emerald-300 shrink-0">
                  {item.time}
                </span>
                <div>
                  <div className="text-xs font-bold text-white">
                    {item.activity}
                  </div>
                  <div className="text-[11px] text-mist-300">
                    {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
