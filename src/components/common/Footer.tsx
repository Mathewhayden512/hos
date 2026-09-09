import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Hospital Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-hospital-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                St. Jude <span className="text-hospital-400">Memorial</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Providing world-class compassionate medical care, advanced diagnostic surgical technology, and personalized healthcare for over 25 years.
            </p>

            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-l-2 border-hospital-500 pl-3">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Hospital Overview', path: '/about' },
                { label: 'Specialized Departments', path: '/departments' },
                { label: 'Find a Specialist Doctor', path: '/doctors' },
                { label: 'Hospital Facilities & ICU', path: '/facilities' },
                { label: 'Book Online Appointment', path: '/book-appointment' },
                { label: 'Emergency Services 24/7', path: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="hover:text-hospital-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-l-2 border-teal-500 pl-3">
              Key Departments
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Cardiology & Heart Care', path: '/departments/cardiology' },
                { label: 'Neurology & Neurosurgery', path: '/departments/neurology' },
                { label: 'Orthopedics & Joint Replacement', path: '/departments/orthopedics' },
                { label: 'Pediatrics & NICU', path: '/departments/pediatrics' },
                { label: 'Oncology & Chemotherapy', path: '/departments/oncology' },
                { label: 'Dermatology & Laser Care', path: '/departments/dermatology' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide border-l-2 border-amber-500 pl-3">
              Contact & Hours
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-hospital-400 shrink-0 mt-1" />
                <span className="text-slate-400">742 Evergreen Terrace, Medical District, NY 10021</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+18005554321" className="text-slate-300 hover:text-white transition-colors">+1 (800) 555-4321</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:contact@stjudememorial.org" className="text-slate-300 hover:text-white transition-colors">contact@stjudememorial.org</a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300 font-medium">OPD: 8:00 AM - 8:00 PM | Emergency: 24/7</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accreditations & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>JCI Accredited</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Award className="w-4 h-4 text-amber-400" />
              <span>NABH Certified</span>
            </div>
            <span className="hidden sm:inline">ISO 9001:2026 Certified Quality Standard</span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} St. Jude Memorial Hospital & Research Institute. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
