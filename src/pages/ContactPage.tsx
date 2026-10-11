import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LeafDivider } from '../components/common/BotanicalAccents';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Instagram } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    showToast('Your message has been sent to our studio! 🌸', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Get in Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">We’d Love to Hear From You</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-lg mx-auto">
          Have a question about a product, custom order inquiry, or shipping update? Send us a message!
        </p>
        <LeafDivider />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D8CBB9] shadow-stitch space-y-6">
            <h2 className="font-serif font-bold text-2xl text-[#3B2418]">Artisan Studio Info</h2>

            <div className="space-y-4 text-xs text-[#3B2418]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF0F2] text-[#C97882] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2418] block">Email Support</span>
                  <a href={`mailto:${settings.contact_email}`} className="text-[#879477] hover:underline">
                    {settings.contact_email || 'hello@amillennialstitch.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF0F2] text-[#C97882] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2418] block">Phone / WhatsApp</span>
                  <span className="text-[#879477]">{settings.contact_phone || '(555) 234-5678'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF0F2] text-[#C97882] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2418] block">Studio Location</span>
                  <span className="text-[#879477]">{settings.business_address || 'Nashville, Tennessee, USA'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF0F2] text-[#C97882] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#3B2418] block">Business Hours</span>
                  <span className="text-[#879477]">Monday – Friday: 9am – 5pm CST</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8CBB9]/60 flex items-center gap-3">
              <span className="text-xs font-semibold text-[#879477]">Follow our journey:</span>
              <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="p-2 bg-[#FAF7EF] rounded-full text-[#C97882] hover:bg-[#FAF0F2]">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 border border-[#D8CBB9] shadow-stitch">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-[#FAF0F2] text-[#C97882] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#3B2418]">Message Sent!</h2>
                <p className="text-xs text-[#879477] max-w-sm mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#C97882] text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif font-bold text-2xl text-[#3B2418] mb-4">Send Us a Message</h2>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#3B2418]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3B2418]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(555) 987-6543"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
