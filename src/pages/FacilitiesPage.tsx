import React, { useEffect, useState } from 'react';
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
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { Facility } from '../types';

const iconMap: Record<string, any> = {
  Siren, Activity, Scissors, Pill, TestTube, Scan, FileText, Truck, Bed, Droplet, Users, Coffee
};

export const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFacilities() {
      try {
        setLoading(true);
        const data = await api.getFacilities();
        setFacilities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFacilities();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Banner */}
      <section className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block">ADVANCED INFRASTRUCTURE</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Hospital Facilities & Medical Technology</h1>
          <p className="text-slate-300 text-base max-w-2xl">
            From 24/7 emergency trauma bays to 3.0T Silent MRI, modular operating suites, and luxury inpatient rooms.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-hospital-600 animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Loading hospital facilities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => {
              const IconComp = iconMap[fac.icon] || ShieldCheck;
              return (
                <div
                  key={fac.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={fac.image_url}
                        alt={fac.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-hospital-600 shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-hospital-600 block">
                        {fac.category}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-hospital-600 transition-colors">
                        {fac.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {fac.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-emerald-600">
                        <ShieldCheck className="w-4 h-4" />
                        Fully Accredited Unit
                      </span>
                      <span className="font-medium text-slate-400">24/7 Available</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
