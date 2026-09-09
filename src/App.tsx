import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingEmergency } from './components/common/FloatingEmergency';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {!isAdminRoute && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:slug" element={<DepartmentsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/book-appointment" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingEmergency />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
