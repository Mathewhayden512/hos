import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative py-24 sm:py-28 bg-[#081c12] border-y border-forest-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-500/20 border border-forest-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white">
            Loved by 880+ Travelers
          </h2>

          <p className="mt-3 text-base text-mist-300">
            Read real stories from families, couples, and nature lovers who experienced Kodaikanal with A2Z Tourism.
          </p>

          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-bold text-white ml-2">4.9 out of 5.0 Rating</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KODAIKANAL_DATA.testimonials.map((review) => (
            <div 
              key={review.id}
              className="glass-nature rounded-3xl p-6 border border-forest-500/20 flex flex-col justify-between hover:border-forest-400/40 transition-all hover:translate-y-[-4px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-600 to-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {review.avatar}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mist-200 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-forest-500/20">
                <div className="text-sm font-bold text-white">
                  {review.name}
                </div>
                <div className="text-[11px] text-mist-400 flex items-center justify-between mt-0.5">
                  <span>{review.city} • {review.travelerType}</span>
                  <span className="text-emerald-400 text-[10px] flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
