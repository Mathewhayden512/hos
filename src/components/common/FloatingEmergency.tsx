import React, { useState } from 'react';
import { Phone, ShieldAlert, X } from 'lucide-react';

export const FloatingEmergency: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {expanded ? (
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-rose-500/40 max-w-xs animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span>24/7 Emergency Helpline</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 my-3 leading-relaxed">
            Need urgent medical help or ambulance dispatch? Call our immediate response trauma team.
          </p>
          <a
            href="tel:+1800911CARE"
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call +1 (800) 911-CARE</span>
          </a>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-3 rounded-full shadow-xl shadow-rose-600/30 transition-all duration-300 hover:scale-105"
          aria-label="Emergency Contact"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Phone className="w-5 h-5" />
          <span className="text-sm font-bold tracking-wide pr-1">Emergency</span>
        </button>
      )}
    </div>
  );
};
