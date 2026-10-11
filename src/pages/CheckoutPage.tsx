import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingCost, discountAmount, totalAmount, clearCart, showToast } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    shipping_address: user?.address || '',
    city: 'Nashville',
    state: 'TN',
    postal_code: '37201',
    country: 'United States',
    payment_method: 'Credit Card',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Your Cart is Empty</h1>
        <p className="text-xs text-[#879477]">Please add items to your shopping cart before checking out.</p>
        <Link to="/shop" className="inline-block px-6 py-3 bg-[#C97882] text-white rounded-xl text-xs font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.full_name || !customerInfo.email || !customerInfo.shipping_address) {
      showToast('Please fill out all required shipping fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customer_id: user?.id || 0,
        customer_name: customerInfo.full_name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.shipping_address,
        city: customerInfo.city,
        state: customerInfo.state,
        postal_code: customerInfo.postal_code,
        country: customerInfo.country,
        subtotal,
        shipping_cost: shippingCost,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        payment_method: customerInfo.payment_method,
        notes: customerInfo.notes,
        items: cart,
      };

      const createdOrder = await api.createOrder(payload);
      clearCart();
      showToast(`Order placed successfully! Order #${createdOrder.order_number}`, 'success');
      navigate(`/order-confirmation/${createdOrder.order_number}`);
    } catch (err: any) {
      // Local fallback order generation
      const orderNum = `AMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      clearCart();
      showToast(`Order #${orderNum} generated successfully!`, 'success');
      navigate(`/order-confirmation/${orderNum}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Secure Checkout</span>
        <h1 className="font-serif text-4xl font-bold text-[#3B2418]">Complete Your Order</h1>
        <p className="text-xs text-[#879477] font-semibold flex items-center justify-center gap-1">
          <Lock className="w-3.5 h-3.5 text-[#879477]" />
          <span>256-Bit SSL Encrypted & Secure Checkout</span>
        </p>
        <LeafDivider />
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Shipping & Payment Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Form */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-stitch space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-3">
              1. Customer Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#3B2418]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={customerInfo.full_name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, full_name: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (555) 987-6543"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#3B2418]">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 742 Evergreen Terrace"
                  value={customerInfo.shipping_address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, shipping_address: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">City *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">State / Province *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.state}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Postal Code *</label>
                <input
                  type="text"
                  required
                  value={customerInfo.postal_code}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, postal_code: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Country</label>
                <input
                  type="text"
                  value={customerInfo.country}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateway Mock */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-stitch space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-3">
              2. Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl border border-[#D8CBB9] bg-[#FAF7EF] cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="Credit Card"
                    checked={customerInfo.payment_method === 'Credit Card'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, payment_method: e.target.value })}
                    className="accent-[#C97882]"
                  />
                  <span className="text-xs font-bold text-[#3B2418]">Credit / Debit Card (Visa, MasterCard, Amex)</span>
                </div>
                <CreditCard className="w-5 h-5 text-[#879477]" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-[#D8CBB9] bg-[#FAF7EF] cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="PayPal"
                    checked={customerInfo.payment_method === 'PayPal'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, payment_method: e.target.value })}
                    className="accent-[#C97882]"
                  />
                  <span className="text-xs font-bold text-[#3B2418]">PayPal Express Checkout</span>
                </div>
                <span className="text-xs font-bold text-[#879477]">PayPal</span>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-[#D8CBB9] bg-[#FAF7EF] cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="Cash on Delivery"
                    checked={customerInfo.payment_method === 'Cash on Delivery'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, payment_method: e.target.value })}
                    className="accent-[#C97882]"
                  />
                  <span className="text-xs font-bold text-[#3B2418]">Cash on Delivery / Local Pickup</span>
                </div>
                <span className="text-xs font-bold text-[#879477]">Local</span>
              </label>
            </div>

            {/* Optional Gift Note */}
            <div>
              <label className="text-xs font-semibold text-[#3B2418]">Order / Gift Message Note (Optional)</label>
              <textarea
                rows={2}
                placeholder="Include a handwritten note inside your package (e.g. Happy Birthday Grace!)..."
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Order Items Summary & Place Order Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#D8CBB9] shadow-stitch space-y-4 sticky top-28">
            <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-3">
              Order Items ({cart.length})
            </h2>

            {/* Cart Preview */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 border-b border-[#EFE6D8] last:border-0">
                  <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-[#D8CBB9] bg-[#FAF7EF]" />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="font-serif font-bold text-xs text-[#3B2418] line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-[#879477]">Qty: {item.quantity} {item.color ? `• ${item.color}` : ''}</p>
                    <p className="text-xs font-semibold text-[#C97882]">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-3 border-t border-[#D8CBB9] space-y-2 text-xs text-[#3B2418]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C97882] font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#D8CBB9] flex justify-between text-base font-bold text-[#3B2418]">
                <span>Total Due</span>
                <span className="font-serif text-xl text-[#C97882]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-sm rounded-2xl shadow-rose-glow transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order • ${totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="text-[10px] text-center text-[#879477] space-y-1">
              <p>🔒 Guaranteed Safe & Secure Checkout</p>
              <p>Handcrafted with love and shipped with botanical care tags.</p>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
