import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-hospital-100 text-hospital-600 flex items-center justify-center mx-auto shadow-inner">
          <HeartHandshake className="w-10 h-10" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-800">Medical Page Not Found</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          The hospital page or record you are searching for does not exist or has been moved to a new URL.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Hospital Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
