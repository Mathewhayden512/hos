import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-7 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Left Logo / Brand */}
            <a
              href="#home"
              className="group flex items-center space-x-2 text-white transition-opacity hover:opacity-90"
              data-cursor="HOME"
            >
              <span className="font-display font-black text-lg sm:text-xl tracking-tighter text-white">
                {PORTFOLIO_DATA.personal.brandName}
              </span>
            </a>

            {/* Center Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={onOpenAdmin}
                data-cursor="ADMIN"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-400 hover:text-white transition-all duration-300"
                title="Studio Administration Portal"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                data-cursor="TALK"
                className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs font-bold uppercase tracking-widest rounded-full bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="flex items-center gap-1.5">
                  Let's Talk
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenAdmin}
                className="p-2.5 rounded-full bg-white/5 border border-white/15 text-zinc-400 hover:text-white transition-colors"
                title="Studio Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Animated Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#000000]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-display font-black text-xl tracking-tighter text-white">
                {PORTFOLIO_DATA.personal.brandName}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="my-auto py-12 flex flex-col space-y-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
                // NAVIGATION
              </p>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-bold text-4xl sm:text-5xl text-zinc-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <ArrowDownRight className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </motion.a>
              ))}

              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white pt-4 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Studio Administration Site</span>
              </motion.button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <div className="text-xs text-zinc-400">
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all text-center flex items-center justify-center gap-2"
              >
                Let's Talk <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
