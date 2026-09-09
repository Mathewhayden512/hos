import React from 'react';
import { UserCheck, Building2, BedDouble, CalendarCheck } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      icon: UserCheck,
      value: '50+',
      label: 'Specialist Doctors',
      subtext: 'Board-certified experts',
      color: 'from-hospital-500 to-hospital-700',
    },
    {
      icon: Building2,
      value: '15+',
      label: 'Medical Departments',
      subtext: 'Comprehensive care',
      color: 'from-teal-500 to-teal-700',
    },
    {
      icon: BedDouble,
      value: '300+',
      label: 'Inpatient Beds',
      subtext: 'ICU & Luxury Suites',
      color: 'from-sky-500 to-sky-700',
    },
    {
      icon: CalendarCheck,
      value: '25+',
      label: 'Years Experience',
      subtext: 'Serving since 2001',
      color: 'from-indigo-500 to-indigo-700',
    },
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 group">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{item.value}</div>
                <div className="text-sm font-semibold text-slate-700">{item.label}</div>
                <div className="text-xs text-slate-500">{item.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
