import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Car, 
  Check, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Bed, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus,
  Table
} from 'lucide-react';
import { KODAIKANAL_DATA, PAX_PRICING_TIERS, getPaxTier } from '../../data/kodaikanalData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState(4);
  const [pickup, setPickup] = useState('Madurai (Airport / Railway)');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showTariffTable, setShowTariffTable] = useState(false);

  if (!isOpen) return null;

  const currentTier = getPaxTier(guests);
  const pricePerPerson = currentTier.pricePerPax;
  const totalPrice = pricePerPerson * guests;

  const handlePaxChange = (newPax: number) => {
    const clamped = Math.max(2, Math.min(21, newPax));
    setGuests(clamped);
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Kodaikanal Booking Inquiry - A2Z Tourism*%0A` +
      `*Name:* ${name || 'Traveler'}%0A` +
      `*Phone:* ${phone || 'Not provided'}%0A` +
      `*Travel Date:* ${date || 'Flexible'}%0A` +
      `*Group Size:* ${guests} Pax%0A` +
      `*Rate:* ₹${pricePerPerson.toLocaleString()} / person%0A` +
      `*Rooms Allocated:* ${currentTier.rooms}%0A` +
      `*Pickup Point:* ${pickup}%0A` +
      `*Stay:* 3-Storey Private Hillside Villa (${currentTier.rooms})%0A` +
      `*Total Estimated Package:* ₹${totalPrice.toLocaleString()}%0A` +
      `Please confirm availability and cab driver details!`;

    window.open(`https://wa.me/${KODAIKANAL_DATA.company.whatsapp}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a2015] border border-forest-400/40 shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-forest-900 to-forest-800 border-b border-forest-500/30 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A2Z Tourism • Booking & Tariff Concierge</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-white mt-0.5">
              Plan Your Kodaikanal Journey
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleWhatsAppBooking} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Real-time Dynamic Price & Room Allocation Card */}
          <div className="glass-nature rounded-2xl p-4 sm:p-5 border border-forest-400/40 relative overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-mist-300">
                    All-Inclusive 3D/2N Tour ({guests} Pax)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                    {currentTier.rooms}
                  </span>
                </div>
                
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold font-serif-heading text-white">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-mist-300">
                    Total for {guests} travelers
                  </span>
                </div>
              </div>

              {/* Per-head badge */}
              <div className="sm:text-right bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-white/10">
                <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                  Rate Per Person
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-serif-heading">
                  ₹{pricePerPerson.toLocaleString()}
                </div>
                <div className="text-[11px] text-mist-300">
                  {currentTier.roomCountText} in private villa
                </div>
              </div>
            </div>

            {/* Room allocation banner */}
            <div className="mt-3 pt-3 border-t border-forest-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-mist-200 flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-emerald-400" />
                <span>Accommodation: <strong>{currentTier.rooms}</strong> ({currentTier.recommendedFor})</span>
              </span>

              <button
                type="button"
                onClick={() => setShowTariffTable(!showTariffTable)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <Table className="w-3.5 h-3.5" />
                <span>{showTariffTable ? 'Hide Tariff Chart' : 'View 2 to 21 Pax Rate Chart'}</span>
                {showTariffTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Expandable Complete 2 to 21 Pax Pricing Table */}
          {showTariffTable && (
            <div className="glass-nature rounded-2xl p-3 sm:p-4 border border-forest-400/40 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Official Group Size & Room Allocation Tariff (3D/2N)
                </h4>
                <span className="text-[10px] text-mist-400">Click any row to select</span>
              </div>
              <div className="max-h-56 overflow-y-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-forest-900/90 text-mist-300 sticky top-0 text-[11px]">
                    <tr>
                      <th className="py-2 px-3">Group Size</th>
                      <th className="py-2 px-3">Price / Pax</th>
                      <th className="py-2 px-3">Room Allocation</th>
                      <th className="py-2 px-3 text-right">Total Est.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PAX_PRICING_TIERS.map((tier) => {
                      const isRowActive = guests === tier.pax;
                      return (
                        <tr
                          key={tier.pax}
                          onClick={() => handlePaxChange(tier.pax)}
                          className={`cursor-pointer transition-colors ${
                            isRowActive 
                              ? 'bg-emerald-600/30 text-white font-bold' 
                              : 'hover:bg-white/5 text-mist-200'
                          }`}
                        >
                          <td className="py-1.5 px-3">
                            <span className="flex items-center gap-1">
                              {isRowActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                              {tier.pax} Pax
                            </span>
                          </td>
                          <td className="py-1.5 px-3 text-emerald-300 font-mono">
                            ₹{tier.pricePerPax.toLocaleString()}
                          </td>
                          <td className="py-1.5 px-3 text-amber-200/90">
                            {tier.rooms}
                          </td>
                          <td className="py-1.5 px-3 text-right font-mono text-mist-300">
                            ₹{(tier.pax * tier.pricePerPax).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Interactive Guest Count Selector (2 to 21 Pax) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-mist-200 uppercase tracking-wider">
                Select Number of Travelers: <strong className="text-emerald-400 text-sm">{guests} Pax</strong>
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePaxChange(guests - 1)}
                  disabled={guests <= 2}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white"
                  aria-label="Decrease pax"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePaxChange(guests + 1)}
                  disabled={guests >= 21}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white"
                  aria-label="Increase pax"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick pill buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[2, 4, 6, 8, 10, 12, 15, 18, 20, 21].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handlePaxChange(num)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    guests === num
                      ? 'bg-emerald-600 text-white shadow-md border border-emerald-400/40 scale-105'
                      : 'bg-white/5 text-mist-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {num} Pax
                </button>
              ))}
            </div>

            {/* Slider control */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="text-[11px] font-mono text-mist-400">2</span>
              <input
                type="range"
                min="2"
                max="21"
                step="1"
                value={guests}
                onChange={(e) => handlePaxChange(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-black/40 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono text-mist-400">21</span>
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
              placeholder="e.g. Next Weekend, 25th October, or Festival Holidays"
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
                placeholder="e.g. 73975 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm placeholder-mist-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Package Inclusions Preview */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-mist-200 space-y-1">
            <div className="font-semibold text-emerald-300">Package Includes for {guests} Pax:</div>
            <div>✓ Private AC Cab for all 3 Days (Sedan / Innova / Tempo Traveller)</div>
            <div>✓ 2 Nights Stay in 3-Storey Hillside Villa ({currentTier.rooms})</div>
            <div>✓ Daily Hill-Station Breakfast & Evening Bonfire on the Lawn</div>
            <div>✓ Complete Sightseeing (Lakes, Pine Forest, Pillar Rocks, Mannavanur)</div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forest-600 via-emerald-600 to-forest-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 hover:opacity-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm & Send Inquiry on WhatsApp (₹{pricePerPerson.toLocaleString()} / Pax)</span>
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
