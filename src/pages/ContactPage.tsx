import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert, Navigation } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required contact fields.', 'error');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      showToast('Your message has been sent to our patient care team!', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Banner */}
      <section className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block">GET IN TOUCH</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Contact St. Jude Memorial Hospital</h1>
          <p className="text-slate-300 text-base max-w-2xl">
            We are here to answer your questions, assist with appointments, and provide immediate medical emergency guidance.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Hospital Contact Hub</h2>
              <p className="text-sm text-slate-600 mt-1">Available around the clock for patient inquiries.</p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-hospital-50 text-hospital-600 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Hospital Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5">742 Evergreen Terrace, Medical District, NY 10021</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Helpline & OPD</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Main Desk: +1 (800) 555-4321</p>
                  <p className="text-xs text-rose-600 font-bold mt-1">Emergency Hotline: +1 (800) 911-CARE (24/7)</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Email Contact</h4>
                  <p className="text-xs text-slate-600 mt-0.5">contact@stjudememorial.org</p>
                  <p className="text-xs text-slate-600">appointments@stjudememorial.org</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Opening Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">OPD & Clinics: Mon - Sat (8:00 AM - 8:00 PM)</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">Emergency & Trauma ICU: 24/7 Always Open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-500 mt-1">Fill out the form below and our medical team will respond within 2 hours.</p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-lg">Thank You for Reaching Out!</h4>
                  <p className="text-xs text-emerald-700">
                    We have received your message and sent a copy to your email address.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-500 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-500 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 555-0192"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-500 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Subject / Department</label>
                      <input
                        type="text"
                        placeholder="Inquiry about Cardiology OPD"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-500 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="block font-bold text-slate-700">Your Message *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="How can we assist you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-hospital-500 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm shadow-lg shadow-hospital-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? 'Transmitting Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
