import React, { useState, useEffect } from 'react';
import { Plane, MapPin, ChevronRight, Compass } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const AirplaneScrollPath: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeWaypoint, setActiveWaypoint] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const waypoints = [
    { id: 'hero', name: 'Misty Mountains', label: 'Takeoff: Palani Hills', percent: 0 },
    { id: 'package', name: 'Kodaikanal Lake', label: 'Kodaikanal Lake', percent: 14 },
    { id: 'day1', name: 'Silver Cascade & Caves', label: 'Silver Cascade Falls', percent: 28 },
    { id: 'day2', name: 'Pine Forest & Rocks', label: 'Pine Forest & Pillar Rocks', percent: 45 },
    { id: 'day3', name: 'Mannavanur & Poombarai', label: 'Poombarai Terraces', percent: 64 },
    { id: 'villa-stay', name: 'Villa & Campfire', label: 'Twilight Campfire', percent: 80 },
    { id: 'contact', name: 'Sunrise Valley', label: 'Sunrise Valley Landing', percent: 96 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = window.scrollY;
      const progress = Math.min(Math.max(current / totalScroll, 0), 1);
      setScrollProgress(progress);

      // Determine active waypoint
      let currentIdx = 0;
      waypoints.forEach((wp, idx) => {
        if (progress * 100 >= wp.percent - 5) {
          currentIdx = idx;
        }
      });
      setActiveWaypoint(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate plane Y coordinate within track (0 to 320 px)
  const trackHeight = 340;
  const planeY = Math.min(Math.max(scrollProgress * trackHeight, 10), trackHeight - 10);
  
  // Calculate subtle angle banking (curved trajectory oscillation)
  const angle = Math.sin(scrollProgress * Math.PI * 3) * 18 + 90;

  return (
    <>
      {/* Desktop Fixed Side Flight Journey Tracker */}
      <aside 
        aria-label="Kodaikanal Flight Journey Route"
        className="fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end select-none"
      >
        <div 
          className="relative glass-nature rounded-3xl p-3 border border-forest-500/30 shadow-2xl backdrop-blur-xl transition-all duration-300"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Header indicator */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-forest-500/20 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-300">
              Trip Flight Path
            </span>
            <span className="text-[10px] font-mono text-mist-400 ml-auto">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* SVG Flight Trail & Waypoints */}
          <div className="relative flex items-center justify-end" style={{ height: `${trackHeight}px`, width: isExpanded ? '210px' : '36px' }}>
            
            {/* Background SVG curved dotted trail */}
            <svg 
              className="absolute right-3 top-0 bottom-0 h-full w-8 pointer-events-none overflow-visible" 
              viewBox="0 0 32 340"
              fill="none"
            >
              {/* Inactive dotted path */}
              <path
                d="M 16,10 C 6,70 26,130 16,190 C 6,250 26,300 16,330"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2.5"
                strokeDasharray="4 6"
              />
              
              {/* Progress active glowing path */}
              <path
                d="M 16,10 C 6,70 26,130 16,190 C 6,250 26,300 16,330"
                stroke="url(#planeGradient)"
                strokeWidth="3"
                strokeDasharray="5 5"
                className="flight-dash-anim"
                style={{
                  strokeDashoffset: -scrollProgress * 100,
                  opacity: 0.95,
                }}
              />

              <defs>
                <linearGradient id="planeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#52B788" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Waypoint Markers */}
            <div className="absolute inset-y-0 right-0 left-0 flex flex-col justify-between py-1">
              {waypoints.map((wp, idx) => {
                const isActive = activeWaypoint === idx;
                const isPassed = scrollProgress * 100 >= wp.percent;

                return (
                  <button
                    key={wp.id}
                    onClick={() => scrollToSection(wp.id)}
                    className="group relative flex items-center justify-end w-full py-1 text-right focus:outline-none"
                    title={`Fly to ${wp.label}`}
                  >
                    {/* Hover or Expanded Label */}
                    <div 
                      className={`mr-3 px-2 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                      } ${
                        isActive 
                          ? 'bg-forest-600/90 text-white shadow-md border border-forest-400/40' 
                          : isPassed 
                            ? 'text-forest-200 hover:text-white' 
                            : 'text-mist-400/70 hover:text-mist-200'
                      }`}
                    >
                      {wp.label}
                    </div>

                    {/* Dot marker */}
                    <div className="relative mr-2 flex items-center justify-center">
                      <div 
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isActive 
                            ? 'bg-amber-400 border-white scale-125 shadow-lg shadow-amber-400/50' 
                            : isPassed 
                              ? 'bg-emerald-500 border-forest-300' 
                              : 'bg-[#0a2015] border-white/30 group-hover:border-white/70'
                        }`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 -m-1 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* The Animated Airplane that moves with scroll */}
            <div 
              className="absolute right-0.5 z-20 pointer-events-none transition-transform duration-100 ease-out flex items-center justify-center"
              style={{
                top: `${planeY}px`,
                transform: 'translateY(-50%)',
              }}
            >
              <div 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-emerald-400 to-sky-400 p-0.5 shadow-xl shadow-amber-500/40 flex items-center justify-center transition-transform duration-200"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div className="w-full h-full bg-[#06130c] rounded-full flex items-center justify-center text-amber-300">
                  <Plane className="w-4 h-4" />
                </div>
              </div>

              {/* Airplane Vapor Jet Tail */}
              <div 
                className="absolute -top-1 w-1 h-3 bg-gradient-to-t from-white/80 to-transparent blur-[1px] pointer-events-none"
                style={{
                  transform: `rotate(${angle + 180}deg) translateY(12px)`,
                }}
              />
            </div>

          </div>

          {/* Current Location Badge when hovered or active */}
          <div className="mt-2 pt-2 border-t border-forest-500/20 px-1 text-center">
            <p className="text-[10px] text-mist-300 font-medium truncate max-w-[190px]">
              {waypoints[activeWaypoint]?.label}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Thin Progress Route Bar */}
      <div className="fixed top-[60px] left-0 right-0 z-40 md:hidden bg-[#06130c]/90 backdrop-blur-md border-b border-forest-500/20 px-3 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Plane className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-mist-200 truncate max-w-[200px]">
            {waypoints[activeWaypoint]?.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-forest-400 to-amber-400 h-full rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-forest-300">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </>
  );
};
