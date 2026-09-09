import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HeartHandshake, 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  UserCheck, 
  ShieldAlert,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Emergency & Info Banner */}
      <div className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-hospital-950 text-white text-xs py-2 px-4 border-b border-hospital-800/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-400 animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>24/7 Emergency Care Center:</span>
              <a href="tel:+1800911CARE" className="font-bold underline tracking-wider hover:text-amber-300">
                +1 (800) 911-CARE
              </a>
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              742 Evergreen Terrace, Medical District, NY
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Admin Logged In
                </span>
                <Link to="/admin" className="hover:text-white underline font-medium">Dashboard</Link>
                <button onClick={logout} className="hover:text-rose-400 transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/admin/login" className="flex items-center gap-1 hover:text-white transition-colors font-medium">
                <UserCheck className="w-3.5 h-3.5 text-hospital-400" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-hospital-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-hospital-500/20 group-hover:scale-105 transition-transform duration-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                St. Jude <span className="text-hospital-600">Memorial</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 block -mt-0.5 tracking-wide">
                HOSPITAL & RESEARCH INSTITUTE
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-hospital-600 bg-hospital-50 shadow-sm'
                    : 'text-slate-700 hover:text-hospital-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/doctors"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:border-hospital-500 hover:text-hospital-600 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Find a Doctor</span>
            </Link>
            <Link
              to="/book-appointment"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-hospital-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-hospital-600/25 hover:shadow-xl hover:shadow-hospital-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-hospital-600 text-white flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900">St. Jude Hospital</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl font-medium text-base transition-colors ${
                      isActive(link.path)
                        ? 'bg-hospital-50 text-hospital-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <Link
                to="/book-appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-hospital-600 text-white font-semibold text-center shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:+1800911CARE"
                className="w-full py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-semibold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Emergency: 1-800-911-CARE</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
