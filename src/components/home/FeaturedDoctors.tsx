import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Star, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../../types';
import { DoctorModal } from '../doctors/DoctorModal';

interface Props {
  doctors: Doctor[];
}

export const FeaturedDoctors: React.FC<Props> = ({ doctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const displayDoctors = doctors.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-2">
              WORLD-CLASS MEDICAL TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Specialist Doctors
            </h2>
          </div>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 font-bold text-hospital-600 hover:text-hospital-700 transition-colors group text-sm"
          >
            <span>View All Specialist Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={doctor.image_url}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{doctor.experience_years} Yrs Exp</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Available Today</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-hospital-600 block">
                      {doctor.department_name}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-hospital-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">{doctor.specialization}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                    <span>Qualification:</span>
                    <span className="font-semibold text-slate-700">{doctor.qualification}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Consultation Fee:</span>
                    <span className="font-bold text-emerald-600 text-sm">${doctor.consultation_fee}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Profile
                </button>
                <Link
                  to={`/book-appointment?doctorId=${doctor.id}&deptId=${doctor.department_id}`}
                  className="flex-1 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </section>
  );
};
