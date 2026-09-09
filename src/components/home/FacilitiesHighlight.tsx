import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Siren, 
  Activity, 
  Scissors, 
  Pill, 
  TestTube, 
  Scan, 
  FileText, 
  Truck, 
  Bed, 
  Droplet, 
  Users, 
  Coffee,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Facility } from '../../types';

interface Props {
  facilities: Facility[];
}

const iconMap: Record<string, any> = {
  Siren,
  Activity,
  Scissors,
  Pill,
  TestTube,
  Scan,
  FileText,
  Truck,
  Bed,
  Droplet,
  Users,
  Coffee
};

export const FacilitiesHighlight: React.FC<Props> = ({ facilities }) => {
  const display = facilities.slice(0, 6);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-hospital-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block mb-2">
              WORLD-CLASS INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hospital Facilities & Infrastructure
            </h2>
          </div>
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 font-bold text-hospital-400 hover:text-hospital-300 transition-colors group text-sm"
          >
            <span>Explore All 12 Facilities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Facilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((fac) => {
            const IconComp = iconMap[fac.icon] || ShieldCheck;
            return (
              <div
                key={fac.id}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 hover:border-hospital-500/50 hover:bg-slate-800 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-5">
                    <img
                      src={fac.image_url}
                      alt={fac.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl text-hospital-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-hospital-400 uppercase tracking-wider block mb-1">
                    {fac.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-hospital-300 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    24/7 Operational
                  </span>
                  <span className="text-hospital-400 font-medium">Standard of Care</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
