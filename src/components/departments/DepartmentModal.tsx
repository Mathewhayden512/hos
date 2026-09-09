import React from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import { Department, Doctor } from '../../types';

interface Props {
  department: Department;
  doctors: Doctor[];
  onClose: () => void;
}

export const DepartmentModal: React.FC<Props> = ({ department, doctors, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Banner */}
        <div className="relative h-48 bg-slate-900 overflow-hidden">
          <img src={department.image_url} alt={department.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase text-hospital-400 tracking-wider">Clinical Department</span>
            <h2 className="text-3xl font-extrabold">{department.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{department.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Medical Services Offered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.isArray(department.services) && department.services.map((srv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-hospital-600 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Department Specialists ({doctors.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              {doctors.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={doc.image_url} alt={doc.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{doc.name}</span>
                      <span className="text-[11px] text-hospital-600 font-semibold">{doc.specialization}</span>
                    </div>
                  </div>
                  <Link
                    to={`/book-appointment?doctorId=${doc.id}&deptId=${department.id}`}
                    onClick={onClose}
                    className="px-2.5 py-1 rounded-lg bg-hospital-600 text-white text-[11px] font-bold"
                  >
                    Book
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold">
              Close
            </button>
            <Link
              to={`/book-appointment?deptId=${department.id}`}
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-hospital-600 text-white font-bold text-sm shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Department Appointment</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
