import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Calendar, 
  Users,
  Compass,
  Sparkles
} from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dates: '',
    guests: '2',
    pickup: 'Madurai (Airport / Railway)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Also construct WhatsApp link option
    setTimeout(() => {
      const text = `Hi A2Z Tourism, I am ${formData.name}. Interested in Kodaikanal 3D/2N Tour for ${formData.guests} people starting around ${formData.dates || 'upcoming weekend'}, pickup from ${formData.pickup}. Message: ${formData.message}`;
      const url = `https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }, 1200);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 flex items-center overflow-hidden"
    >
      {/* Full-width Background Photograph: Panoramic Kodaikanal Valley at Sunrise */}
      <motion.div 
        className="absolute inset-0 w-full h-[125%] -top-[12%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${KODAIKANAL_DATA.contact.bgImage}')`,
          y: bgY,
        }}
      >
        {/* Subtle dark gradient overlay so all text and input boxes are high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06130c] via-black/75 to-[#06130c]" />
        <div className="absolute inset-0 bg-forest-950/40 mix-blend-multiply" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-500/20 border border-forest-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan Your Journey</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight drop-shadow-lg">
            {KODAIKANAL_DATA.contact.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-mist-200 drop-shadow">
            {KODAIKANAL_DATA.contact.subtitle}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards & Badges */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-nature rounded-3xl p-6 sm:p-8 border border-forest-500/30 backdrop-blur-xl shadow-xl">
              <h3 className="text-xl font-bold font-serif-heading text-white mb-6">
                Direct Contact & Concierge
              </h3>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-600/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-mist-400 uppercase tracking-wider">
                      Hotline & WhatsApp
                    </div>
                    <a 
                      href={`tel:${KODAIKANAL_DATA.company.phone}`} 
                      className="text-base sm:text-lg font-bold text-white hover:text-emerald-300 transition-colors block"
                    >
                      {KODAIKANAL_DATA.company.phone}
                    </a>
                    <a 
                      href={`tel:${KODAIKANAL_DATA.company.secondaryPhone}`} 
                      className="text-sm text-mist-300 hover:text-emerald-300 transition-colors"
                    >
                      {KODAIKANAL_DATA.company.secondaryPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-600/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-mist-400 uppercase tracking-wider">
                      Email Inquiries
                    </div>
                    <a 
                      href={`mailto:${KODAIKANAL_DATA.company.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      {KODAIKANAL_DATA.company.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-600/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-mist-400 uppercase tracking-wider">
                      Assistance Hours
                    </div>
                    <div className="text-sm text-mist-200">
                      {KODAIKANAL_DATA.contact.hours}
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest-600/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-mist-400 uppercase tracking-wider">
                      Branch Offices
                    </div>
                    <p className="text-xs text-mist-200 mt-0.5">
                      <strong>Kodaikanal:</strong> {KODAIKANAL_DATA.contact.office}
                    </p>
                    <p className="text-xs text-mist-300 mt-1">
                      <strong>Madurai Hub:</strong> {KODAIKANAL_DATA.contact.branchOffice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="mt-8 pt-6 border-t border-forest-500/20">
                <a
                  href={`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=Hi%20A2Z%20Tourism,%20I%20am%20planning%20a%20Kodaikanal%20trip.%20Please%20guide%20me%20with%20itinerary%20and%20rates.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-mist-300">
                ⭐ Rated <strong>4.9/5</strong> by over 880+ families and nature travelers
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Booking & Custom Quote Form */}
          <div className="lg:col-span-7">
            <div className="glass-nature rounded-3xl p-6 sm:p-10 border border-forest-400/40 backdrop-blur-xl shadow-2xl">
              
              <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white mb-2">
                Request Free Custom Itinerary & Quotation
              </h3>
              <p className="text-xs sm:text-sm text-mist-300 mb-6">
                Fill in your travel preferences and our destination planner will confirm availability within 15 minutes.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-400/40 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif-heading text-white">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-sm text-mist-200 max-w-md mx-auto">
                    Your inquiry has been received. Redirecting you to WhatsApp to instantly view your customized Kodaikanal package and vehicle quotation!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-emerald-400 underline underline-offset-4"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-mist-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98400 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-mist-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-mist-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      />
                    </div>

                    {/* Travel Dates */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Approximate Travel Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Weekend / 25th Oct"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-mist-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Number of Travelers
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      >
                        <option value="2 Adults (Couple)" className="bg-forest-950">2 Adults (Couple)</option>
                        <option value="3-4 (Small Family)" className="bg-forest-950">3-4 (Small Family)</option>
                        <option value="5-7 (Innova Group)" className="bg-forest-950">5-7 (Innova Group)</option>
                        <option value="8+ (Tempo Traveller Group)" className="bg-forest-950">8+ (Tempo Traveller Group)</option>
                      </select>
                    </div>

                    {/* Pickup City */}
                    <div>
                      <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                        Preferred Pickup Point
                      </label>
                      <select
                        value={formData.pickup}
                        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-emerald-400 text-sm transition-colors"
                      >
                        {KODAIKANAL_DATA.package.pickupPoints.map((pt, i) => (
                          <option key={i} value={pt} className="bg-forest-950">{pt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message / Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                      Special Preferences / Custom Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need balcony view villa, interest in photography spots, senior citizen friendly stops..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-mist-500 focus:outline-none focus:border-emerald-400 text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-forest-600 via-emerald-600 to-forest-500 hover:from-forest-500 hover:to-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-forest-900/60 border border-emerald-400/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant Quote & Itinerary</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
