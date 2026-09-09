import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Review } from '../../types';

interface Props {
  reviews: Review[];
}

export const Testimonials: React.FC<Props> = ({ reviews }) => {
  const display = reviews && reviews.length > 0 ? reviews : [
    { id: 1, patient_name: 'Eleanor Vance', rating: 5, comment: 'The cardiology team saved my husband’s life during an emergency cardiac arrest. Dr. Marcus Vance and the ICU nursing staff are absolute angels!', department: 'Cardiology', date: '2026-08-15' },
    { id: 2, patient_name: 'Michael Ross', rating: 5, comment: 'Had my knee replacement surgery done by Dr. David Miller. I was walking without support within 3 weeks. World-class facilities and care.', department: 'Orthopedics', date: '2026-08-28' },
    { id: 3, patient_name: 'Sophia Martinez', rating: 5, comment: 'Delivered my twin baby girls at St. Jude. Dr. Victoria Adams made the entire process so smooth, safe, and comforting.', department: 'Gynecology & Obstetrics', date: '2026-09-02' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block">
            REAL PATIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Testimonials & Reviews
          </h2>
          <p className="text-slate-600 text-sm">
            Read authentic stories from families who trusted St. Jude Memorial with their healthcare journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {display.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/70 rounded-2xl p-7 border border-slate-100 shadow-sm relative flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-hospital-200 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.patient_name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </h4>
                  <span className="text-xs font-medium text-hospital-600">{rev.department} Patient</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
