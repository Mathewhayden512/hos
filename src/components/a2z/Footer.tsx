import React from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#040e08] text-mist-300 border-t border-forest-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif-heading text-white">
                A2Z Tourism
              </span>
            </div>
            <p className="text-xs text-mist-300 leading-relaxed">
              Curating authentic, cinematic hill-station experiences across Kodaikanal and the Western Ghats. Licensed tour operator with trusted private chauffeur services.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/60 border border-forest-500/30 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Govt. Approved Travel Operator</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Tour Itineraries
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-emerald-300 transition-colors">Overview</a></li>
              <li><a href="#package" className="hover:text-emerald-300 transition-colors">3D/2N Kodaikanal Package</a></li>
              <li><a href="#day1" className="hover:text-emerald-300 transition-colors">Day 1: Lakes & Cascades</a></li>
              <li><a href="#day2" className="hover:text-emerald-300 transition-colors">Day 2: Pine Forests & Pillars</a></li>
              <li><a href="#day3" className="hover:text-emerald-300 transition-colors">Day 3: Mannavanur Highlands</a></li>
              <li><a href="#villa-stay" className="hover:text-emerald-300 transition-colors">Forest Villa & Campfire</a></li>
            </ul>
          </div>

          {/* Key Landmarks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Featured Sightseeing
            </h4>
            <ul className="space-y-2 text-xs text-mist-400">
              <li>Silver Cascade Falls</li>
              <li>Star-Shaped Kodaikanal Lake</li>
              <li>Pillar Rocks 400ft Monoliths</li>
              <li>Centenary Pine Forest</li>
              <li>Poombarai Terraced Village</li>
              <li>Mannavanur Grasslands & Sheep Farm</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Hotline & Address
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${KODAIKANAL_DATA.company.phone}`} className="hover:text-white">
                  {KODAIKANAL_DATA.company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${KODAIKANAL_DATA.company.email}`} className="hover:text-white">
                  {KODAIKANAL_DATA.company.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{KODAIKANAL_DATA.company.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-forest-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist-400">
          <p>
            © {new Date().getFullYear()} A2Z Tourism. All rights reserved. Handcrafted for Kodaikanal travelers.
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Explore the Magic of Kodaikanal with</span>
            <span className="text-emerald-400 font-semibold">A2Z Tourism</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
