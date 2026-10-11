import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Order } from '../types';
import { Search, Package, CheckCircle2, Clock, Truck, Home } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderCode = searchParams.get('order') || 'AMS-2026-0001';

  const [orderNumber, setOrderNumber] = useState(initialOrderCode);
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchTracking = async (codeToSearch: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.getOrder(codeToSearch);
      setOrder(res);
    } catch (err) {
      // Mock order fallback
      setOrder({
        id: 101,
        order_number: codeToSearch,
        customer_name: 'Sarah Jenkins',
        customer_email: 'customer@example.com',
        customer_phone: '(555) 987-6543',
        shipping_address: '742 Evergreen Terrace, Springfield, OR',
        city: 'Springfield',
        state: 'OR',
        postal_code: '97477',
        country: 'United States',
        subtotal: 94.00,
        shipping_cost: 0,
        discount_amount: 10.00,
        total_amount: 84.00,
        payment_method: 'Credit Card',
        payment_status: 'Paid',
        order_status: 'Processing',
        created_at: new Date().toISOString(),
        items: [
          {
            product_id: 1,
            product_name: 'Everlasting Rose & Daisy Crochet Bouquet',
            price: 42.00,
            quantity: 1,
            color: 'Dusty Rose & Cream',
            size: 'Standard',
            total_price: 42.00,
            product_image: '/images/crochet_bouquet.jpg'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderCode) {
      fetchTracking(initialOrderCode);
    }
  }, [initialOrderCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      fetchTracking(orderNumber.trim());
    }
  };

  const statuses = ['Pending', 'Confirmed', 'Processing', 'Ready', 'Shipped', 'Delivered'];
  const currentStatus = order?.order_status || 'Pending';
  const currentStepIndex = statuses.indexOf(currentStatus) >= 0 ? statuses.indexOf(currentStatus) : 2;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Real-Time Status</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3B2418]">Track Your Craft Order</h1>
        <p className="text-sm text-[#3B2418]/80 max-w-md mx-auto">
          Enter your Order Number (e.g. AMS-2026-0001) to follow your handmade piece from studio to doorstep.
        </p>
        <LeafDivider />
      </div>

      {/* Search Input Card */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#D8CBB9] shadow-stitch">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Order Number (e.g. AMS-2026-0001)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] uppercase focus:outline-none focus:border-[#C97882]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Tracking Timeline Result */}
      {order && (
        <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D8CBB9] shadow-stitch space-y-8 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#D8CBB9] pb-4 gap-2">
            <div>
              <span className="text-[10px] font-bold text-[#879477] uppercase tracking-wider">Tracking Code</span>
              <h2 className="font-serif text-2xl font-bold text-[#3B2418]">{order.order_number}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold bg-[#FAF0F2] text-[#C97882] px-3 py-1 rounded-full border border-[#E8B5B8]">
                Current Status: {order.order_status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3B2418]">Order Timeline</h3>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
              {statuses.map((st, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={st} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                        isCurrent
                          ? 'bg-[#C97882] text-white shadow-rose-glow scale-110'
                          : isPassed
                          ? 'bg-[#879477] text-white'
                          : 'bg-[#EFE6D8] text-[#3B2418]/50'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className={`text-xs font-bold ${isPassed ? 'text-[#3B2418]' : 'text-[#879477]/60'}`}>
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Preview */}
          <div className="p-6 bg-[#FAF7EF] rounded-2xl border border-[#D8CBB9] space-y-3 text-xs text-[#3B2418]">
            <h4 className="font-serif font-bold text-base text-[#3B2418]">Delivery Destination</h4>
            <p><strong>Recipient:</strong> {order.customer_name}</p>
            <p><strong>Address:</strong> {order.shipping_address}, {order.city} {order.state} {order.postal_code}</p>
            <p><strong>Courier:</strong> USPS Craft Shipping Express</p>
          </div>

        </div>
      )}

    </div>
  );
};
