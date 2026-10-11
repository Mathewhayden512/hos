import React, { useState } from 'react';
import { X, Calendar, Users, Car, Check, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { KODAIKANAL_DATA } from '../../data/kodaikanalData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState(2);
  const [pickup, setPickup] = useState('Madurai (Airport / Railway)');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState('Boutique Mountain Villa (Included)');

  if (!isOpen) return null;

  const pricePerPerson = KODAIKANAL_DATA.package.price;
  const totalPrice = pricePerPerson * guests;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Kodaikanal Booking Inquiry - A2Z Tourism*%0A` +
      `*Name:* ${name || 'Traveler'}%0A` +
      `*Phone:* ${phone || 'Not provided'}%0A` +
      `*Travel Date:* ${date || 'Flexible'}%0A` +
      `*Guests:* ${guests} Pax%0A` +
      `*Pickup Point:* ${pickup}%0A` +
      `*Stay:* ${roomType}%0A` +
      `*Est. Package:* ₹${totalPrice.toLocaleString()}%0A` +
      `Please confirm availability and cab driver details!`;

    window.open(`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0a2015] border border-forest-400/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-forest-900 to-forest-800 border-b border-forest-500/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A2Z Tourism • Booking Concierge</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white mt-1">
              Plan Your Kodaikanal Journey
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleWhatsAppBooking} className="p-6 overflow-y-auto space-y-4">
          
          {/* Price Estimation Card */}
          <div className="glass-nature rounded-2xl p-4 border border-forest-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-mist-300">All-Inclusive 3D/2N Tour</div>
              <div className="text-2xl font-bold font-serif-heading text-white">
                ₹{totalPrice.toLocaleString()} <span className="text-xs font-normal text-mist-400">({guests} travelers)</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              ₹7,499 / person
            </span>
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
              Number of Travelers
            </label>
            <div className="flex items-center gap-2">
              {[2, 3, 4, 6, 8].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setGuests(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    guests === num
                      ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/40'
                      : 'bg-white/5 text-mist-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {num} {num === 8 ? '8+' : 'Pax'}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
              Pickup & Drop Location
            </label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
            >
              {KODAIKANAL_DATA.package.pickupPoints.map((pt, i) => (
                <option key={i} value={pt} className="bg-forest-950">{pt}</option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
              Preferred Travel Date *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. October 24th, 2026 or Next Weekend"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm placeholder-mist-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm placeholder-mist-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-mist-200 uppercase tracking-wider mb-1.5">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98400 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm placeholder-mist-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Inclusions checklist preview */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-mist-200 space-y-1">
            <div className="font-semibold text-emerald-300">Package Includes:</div>
            <div>✓ Private AC Cab for all 3 Days</div>
            <div>✓ 2 Nights Boutique Forest Villa with Campfire</div>
            <div>✓ Daily Hill-Station Breakfast & Sightseeing Permits</div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forest-600 via-emerald-600 to-forest-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 hover:opacity-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm & Send Inquiry on WhatsApp</span>
            </button>

            <a
              href={`tel:${KODAIKANAL_DATA.company.phone}`}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-mist-200 text-xs font-semibold flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-3.5 h-3.5 text-forest-300" />
              <span>Call Concierge Directly: {KODAIKANAL_DATA.company.phone}</span>
            </a>
          </div>

        </form>

      </div>
    </div>
  );
};
