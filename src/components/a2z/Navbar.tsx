import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  MapPin, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Package', href: '#package' },
    { name: 'Day 1 Tour', href: '#day1' },
    { name: 'Day 2 Tour', href: '#day2' },
    { name: 'Day 3 Tour', href: '#day3' },
    { name: 'Villa & Campfire', href: '#villa-stay' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#06130c]/90 backdrop-blur-md border-b border-forest-500/20 py-3 shadow-2xl' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a 
            href="#hero" 
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-500 via-forest-600 to-forest-800 p-0.5 shadow-lg shadow-forest-900/50 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#06130c] rounded-[10px] flex items-center justify-center text-forest-300">
                <Compass className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold font-serif-heading tracking-wide text-white group-hover:text-forest-300 transition-colors">
                  A2Z Tourism
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-forest-500/30 text-forest-300 border border-forest-400/30 hidden sm:inline-block">
                  Kodaikanal
                </span>
              </div>
              <p className="text-[11px] text-mist-300/80 tracking-wider font-medium hidden sm:block">
                The Princess of Hill Stations Specialist
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-mist-200 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Quick CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone */}
            <a
              href={`tel:${KODAIKANAL_DATA.company.phone}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-mist-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Call Tour Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-forest-400" />
              <span>{KODAIKANAL_DATA.company.phone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=Hello%20A2Z%20Tourism,%20I%20am%20interested%20in%20the%20Kodaikanal%203D/2N%20Package.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Book Tour Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-forest-600 via-forest-500 to-emerald-600 hover:from-forest-500 hover:to-emerald-500 shadow-lg shadow-forest-900/40 border border-forest-400/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Package</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-forest-600 border border-forest-400/30"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-mist-200 hover:text-white bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a2015]/98 border-b border-forest-500/30 px-4 pt-3 pb-6 backdrop-blur-xl animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, link.href);
                }}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-mist-100 hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-forest-500/20 flex flex-col gap-2">
              <a
                href={`tel:${KODAIKANAL_DATA.company.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-forest-400" />
                <span>Call {KODAIKANAL_DATA.company.phone}</span>
              </a>
              <a
                href={`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=Hello%20A2Z%20Tourism,%20I%20am%20interested%20in%20the%20Kodaikanal%203D/2N%20Package.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-sm font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Inquiry</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-forest-600 to-emerald-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg"
              >
                Plan Your Journey Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
