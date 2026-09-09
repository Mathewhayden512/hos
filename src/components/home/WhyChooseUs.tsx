import React from 'react';
import { ShieldCheck, Cpu, UserCheck, Clock, HeartHandshake, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Cutting-Edge Robotic Tech',
      desc: '3.0T MRI, 128-Slice CT, robotic joint navigation, and modular HEPA operating theaters for minimal recovery times.',
      color: 'bg-hospital-50 text-hospital-600',
    },
    {
      icon: UserCheck,
      title: 'Top Board-Certified Specialists',
      desc: 'Over 50+ internationally trained senior consultants, surgeons, and specialists committed to accurate diagnostics.',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: Clock,
      title: '24/7 Trauma & Emergency ICU',
      desc: 'Round-the-clock cardiac ambulances, emergency triage, blood bank, and 1:1 intensive critical care nursing.',
      color: 'bg-rose-50 text-rose-600',
    },
    {
      icon: HeartHandshake,
      title: 'Empathetic Patient-Centric Care',
      desc: 'Transparent consultation pricing, zero hidden charges, dedicated patient relationship managers, and family support.',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-hospital-600 uppercase tracking-widest block">
            THE ST. JUDE DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Patients Choose St. Jude Memorial Hospital
          </h2>
          <p className="text-slate-600 text-base">
            Delivering evidence-based clinical protocols combined with deep human compassion to ensure optimal health outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-hospital-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
