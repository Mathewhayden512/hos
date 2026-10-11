import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const FloatingActions: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 select-none">
      {/* WhatsApp Quick Trigger */}
      <a
        href={`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=Hello%20A2Z%20Tourism,%20I%20am%20interested%20in%20the%20Kodaikanal%20tour%20package.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/60 border border-emerald-400/40 hover:scale-110 active:scale-95 transition-all"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-[#06130c] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-forest-500/30 shadow-xl pointer-events-none">
          WhatsApp Instant Chat
        </span>
      </a>

      {/* Call Direct Trigger */}
      <a
        href={`tel:${KODAIKANAL_DATA.company.phone}`}
        className="group relative w-12 h-12 rounded-full bg-forest-700 hover:bg-forest-600 text-white flex items-center justify-center shadow-2xl shadow-forest-900/60 border border-forest-400/40 hover:scale-110 active:scale-95 transition-all"
        title="Call A2Z Tourism"
        aria-label="Call A2Z Tourism"
      >
        <Phone className="w-5 h-5 text-emerald-300" />
        <span className="absolute left-14 px-3 py-1.5 rounded-xl bg-[#06130c] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-forest-500/30 shadow-xl pointer-events-none">
          Call {KODAIKANAL_DATA.company.phone}
        </span>
      </a>

      {/* Scroll to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-mist-200 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl hover:scale-110 active:scale-95 transition-all animate-fade-in"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
