import React from 'react';
import { ArrowUp, Instagram, Linkedin, Mail, Phone, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 py-20 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-display font-black text-2xl text-white tracking-tighter">
              {PORTFOLIO_DATA.personal.brandName}
            </h3>
            <p className="text-zinc-300 font-medium">
              Web Design · Video Editing · Interior Design
            </p>
            <p className="text-xs font-mono text-zinc-500">
              Chennai, India
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              CONNECT
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={PORTFOLIO_DATA.personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>

              <a
                href={`https://wa.me/${PORTFOLIO_DATA.personal.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Sahaya Pakstan. All rights reserved.</p>
          
          <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-500">
            <span>Minimal Interface. Maximum Visual Impact.</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Studio Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
