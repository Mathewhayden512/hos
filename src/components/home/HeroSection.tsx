import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ShieldCheck, Award, Clock, HeartPulse, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-hospital-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-hospital-200/40 via-teal-100/30 to-sky-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-100/80 border border-hospital-200 text-hospital-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-hospital-600 animate-spin-slow" />
              <span>Leading Multi-Specialty Hospital in New York</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Compassionate Care. <br />
              <span className="bg-gradient-to-r from-hospital-600 via-teal-600 to-hospital-800 bg-clip-text text-transparent">
                Advanced Medicine.
              </span> <br />
              Better Health.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Expert doctors, advanced diagnostic facilities, and personalized healthcare tailored for you and your family. Experience world-class medical excellence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-hospital-600 to-teal-600 hover:from-hospital-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-hospital-600/25 hover:shadow-hospital-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </Link>

              <Link
                to="/doctors"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 hover:border-hospital-400 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5 text-hospital-600" />
                <span>Find a Doctor</span>
              </Link>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">JCI Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-hospital-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">24/7 Emergency</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Top Specialists</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Hospital Operation Room & Specialist Team"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">St. Jude Medical Institute</span>
                  <h3 className="text-lg font-bold">State-of-the-Art Surgical Suites</h3>
                </div>
              </div>

              {/* Floating Badge 1: Instant Consultation */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">99.4% Recovery Rate</div>
                  <div className="text-xs text-slate-500">Over 50,000+ happy patients</div>
                </div>
              </div>

              {/* Floating Badge 2: Emergency Response */}
              <div className="absolute -top-4 -right-4 bg-hospital-900 text-white p-3.5 rounded-2xl shadow-xl border border-hospital-700 flex items-center gap-3 hidden sm:flex">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold">24/7 Instant Doctor Booking</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
