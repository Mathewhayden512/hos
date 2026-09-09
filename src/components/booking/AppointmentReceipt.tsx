import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, User, Phone, Mail, FileText, Download, Printer, ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Appointment } from '../../types';

interface Props {
  appointment: Appointment;
  onBookAnother: () => void;
}

export const AppointmentReceipt: React.FC<Props> = ({ appointment, onBookAnother }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-hospital-700 text-white p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest inline-block">
          Official Confirmation
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight">Appointment Confirmed!</h2>
        <p className="text-emerald-100 text-sm max-w-md mx-auto">
          Your doctor appointment has been successfully scheduled. An SMS and email confirmation have been dispatched.
        </p>
      </div>

      {/* Ticket Details Body */}
      <div className="p-8 space-y-6 print:p-0">
        
        {/* Appointment ID Code Badge */}
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Appointment Reference Code</span>
            <span className="text-2xl font-extrabold text-hospital-700 tracking-wider font-mono">{appointment.appointment_code}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ● {appointment.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Doctor Info */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-hospital-600" />
              <span>Doctor Details</span>
            </h4>
            <div>
              <span className="text-base font-bold text-slate-900 block">{appointment.doctor_name}</span>
              <span className="text-xs text-hospital-600 font-semibold block">{appointment.doctor_specialization}</span>
              <span className="text-xs text-slate-500 block mt-1">{appointment.department_name} Dept</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Schedule Details</span>
            </h4>
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{appointment.appointment_date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mt-1">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{appointment.appointment_time}</span>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Information</h4>
            <div className="text-xs text-slate-700 space-y-1">
              <p><span className="font-semibold text-slate-900">Name:</span> {appointment.patient_name}</p>
              <p><span className="font-semibold text-slate-900">Phone:</span> {appointment.patient_phone}</p>
              <p><span className="font-semibold text-slate-900">Email:</span> {appointment.patient_email}</p>
            </div>
          </div>

          {/* Financial & Location */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultation Fee</h4>
            <div className="text-xs text-slate-700 space-y-1">
              <p className="text-lg font-extrabold text-emerald-600">${appointment.consultation_fee || 150}</p>
              <p className="text-[11px] text-slate-500">Payable at hospital reception desk upon check-in.</p>
            </div>
          </div>

        </div>

        {/* Hospital Instructions */}
        <div className="bg-hospital-50 border border-hospital-100 rounded-2xl p-4 text-xs text-hospital-900 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-hospital-800">
            <ShieldCheck className="w-4 h-4 text-hospital-600" />
            <span>Important Patient Instructions:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Please arrive 15 minutes prior to your scheduled time slot for initial vitals screening.</li>
            <li>Carry a valid photo ID and any previous medical diagnostic reports or prescriptions.</li>
            <li>Need to reschedule? Call +1 (800) 555-4321 with your Reference Code: <strong className="text-slate-900">{appointment.appointment_code}</strong></li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Appointment Pass</span>
          </button>

          <button
            onClick={onBookAnother}
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <span>Book Another Appointment</span>
          </button>
        </div>

      </div>
    </div>
  );
};
