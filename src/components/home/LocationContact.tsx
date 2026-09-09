import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Calendar, Navigation } from 'lucide-react';
import { HospitalInfo } from '../../types';

interface Props {
  info: HospitalInfo | null;
}

export const LocationContact: React.FC<Props> = ({ info }) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Contact Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block mb-2">
                VISIT US & GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hospital Location & Working Hours
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Conveniently located in the heart of the New York Medical District with valet parking and 24/7 emergency ambulance access.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-hospital-600/30 text-hospital-400 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Hospital Address</h4>
                  <p className="text-sm text-slate-300 mt-0.5">
                    {info?.address || '742 Evergreen Terrace, Medical District, NY 10021'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Hotlines</h4>
                  <p className="text-sm text-slate-300 mt-0.5">
                    OPD Desk: <a href="tel:+18005554321" className="hover:text-emerald-400 underline">{info?.phone || '+1 (800) 555-4321'}</a>
                  </p>
                  <p className="text-sm text-rose-400 font-semibold mt-1">
                    Emergency Hotline: <a href="tel:+1800911CARE" className="hover:underline">{info?.emergency_phone || '+1 (800) 911-CARE'}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Consultation Hours</h4>
                  <p className="text-sm text-slate-300 mt-0.5">
                    Outpatient Department (OPD): 8:00 AM - 8:00 PM (Mon - Sat)
                  </p>
                  <p className="text-sm text-amber-300 font-medium mt-1">
                    Emergency, ICU & Pharmacy: 24 Hours / 7 Days a Week
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                to="/book-appointment"
                className="px-6 py-3.5 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold text-sm shadow-lg shadow-hospital-600/30 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800 rounded-3xl p-3 border border-slate-700 shadow-2xl relative overflow-hidden group">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-700">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                  alt="Hospital Location Map"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                {/* Map Pin Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-hospital-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">St. Jude Medical Campus</h4>
                      <p className="text-xs text-slate-400">Main Entrance & Emergency Bay</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shrink-0"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
