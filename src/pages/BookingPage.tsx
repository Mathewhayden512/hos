import React from 'react';
import { BookingWizard } from '../components/booking/BookingWizard';

export const BookingPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingWizard />
      </div>
    </div>
  );
};
