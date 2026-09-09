import React from 'react';
import { Link } from 'react-router-dom';
import { X, Award, Clock, DollarSign, Globe, Calendar, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Doctor } from '../../types';

interface Props {
  doctor: Doctor;
  onClose: () => void;
}

export const DoctorModal: React.FC<Props> = ({ doctor, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-hospital-900 via-hospital-800 to-hospital-950 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-28 h-28 rounded-2xl object-cover object-top border-4 border-white/20 shadow-xl shrink-0"
            />
            <div className="text-center sm:text-left space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-hospital-500/30 text-hospital-200 text-xs font-semibold inline-block border border-hospital-400/30">
                {doctor.department_name || 'Medical Specialist'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">{doctor.name}</h2>
              <p className="text-sm text-hospital-200 font-medium">{doctor.specialization}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-4 h-4 text-amber-400" />
                  {doctor.qualification}
                </span>
                <span>•</span>
                <span>{doctor.experience_years} Years Clinical Practice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Bio */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Biography</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Consultation Fee</span>
              <span className="text-lg font-bold text-emerald-600">${doctor.consultation_fee}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Languages Spoken</span>
              <span className="text-sm font-semibold text-slate-800">{doctor.languages}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 block mb-1">Working Days</span>
              <span className="text-sm font-semibold text-slate-800">Monday - Friday</span>
            </div>
          </div>

          {/* Availability Slots Banner */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Accepting New Patient Appointments</span>
                <span className="text-xs text-emerald-700">30-min consultation slots available this week</span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <Link
              to={`/book-appointment?doctorId=${doctor.id}&deptId=${doctor.department_id}`}
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-sm font-bold shadow-lg shadow-hospital-600/25 flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
