import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Calendar, ArrowDown, Sparkles, MapPin, CloudSun, ShieldCheck } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle parallax effect on background image
  const backgroundY = useTransform(scrollY, [0, 800], [0, 180]);
  const textY = useTransform(scrollY, [0, 800], [0, 80]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  const scrollToPackage = () => {
    const el = document.getElementById('package');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image with Mist Atmosphere */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${KODAIKANAL_DATA.hero.bgImage}')`,
          y: backgroundY,
        }}
      >
        {/* Subtle dark gradient overlay to ensure pure white text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-[#06130c]" />
        
        {/* Additional misty atmosphere radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-500/15 via-transparent to-black/60" />
      </motion.div>

      {/* Floating mist effect particle accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_30%_40%,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-forest-400/40 text-forest-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-xl backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>A2Z Tourism • Princess of Hill Stations</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-mist-200">Tamil Nadu, India</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-heading text-white tracking-tight leading-[1.12] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          {KODAIKANAL_DATA.hero.heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-mist-100 max-w-3xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
        >
          {KODAIKANAL_DATA.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToPackage}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-forest-600 via-emerald-600 to-forest-500 hover:from-forest-500 hover:to-emerald-500 text-white font-bold text-base tracking-wide uppercase shadow-2xl shadow-forest-900/80 border border-emerald-400/30 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Explore Kodaikanal Package</span>
            <Compass className="w-5 h-5 text-emerald-300 group-hover:rotate-45 transition-transform" />
          </button>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base tracking-wide uppercase backdrop-blur-md border border-white/30 hover:border-white/60 shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>Plan Your Journey</span>
          </button>
        </motion.div>

        {/* Stats & Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl"
        >
          {KODAIKANAL_DATA.hero.quickStats.map((stat, i) => (
            <div
              key={i}
              className="glass-nature rounded-2xl p-3.5 sm:p-4 text-center border border-forest-500/20 backdrop-blur-md hover:border-forest-400/40 transition-colors"
            >
              <div className="text-xl sm:text-2xl font-bold font-serif-heading text-white">
                {stat.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-mist-300/80 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={scrollToPackage}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-1.5 text-mist-300 hover:text-white transition-colors group"
      >
        <span className="text-[11px] font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100">
          Scroll To Explore
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center animate-bounce border border-white/20">
          <ArrowDown className="w-4 h-4 text-emerald-300" />
        </div>
      </div>
    </section>
  );
};
