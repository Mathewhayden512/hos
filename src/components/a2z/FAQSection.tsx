import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-20 bg-[#06130c] border-b border-forest-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-500/20 border border-forest-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Essential Travel Info</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-mist-300">
            Everything you need to know about weather, packing, and booking your Kodaikanal trip.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {KODAIKANAL_DATA.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-nature rounded-2xl border border-forest-500/25 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-white hover:text-emerald-300 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold font-serif-heading">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-mist-200 leading-relaxed border-t border-forest-500/15">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
