import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  Sparkles, 
  Stethoscope, 
  UserCheck, 
  Ear, 
  Activity, 
  ShieldAlert, 
  Wind, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Department } from '../../types';

interface Props {
  departments: Department[];
}

const iconMap: Record<string, any> = {
  Heart,
  Brain,
  Bone,
  Baby,
  Sparkles,
  Stethoscope,
  UserCheck,
  Ear,
  Activity,
  ShieldAlert,
  Wind
};

export const FeaturedDepts: React.FC<Props> = ({ departments }) => {
  const displayDepts = departments.slice(0, 8);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-hospital-600 uppercase tracking-widest block mb-2">
              OUR SPECIALTIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Clinical Departments
            </h2>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 font-bold text-hospital-600 hover:text-hospital-700 transition-colors group text-sm"
          >
            <span>View All 12 Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDepts.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Activity;
            return (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-hospital-50 text-hospital-600 flex items-center justify-center mb-5 group-hover:bg-hospital-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-hospital-600 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {dept.doctor_count || 3}+ Specialists
                  </span>
                  <Link
                    to={`/departments/${dept.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-hospital-600 group-hover:text-hospital-700"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
