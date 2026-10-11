import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight, Tag, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    discountAmount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponCode.trim());
    setCouponLoading(false);
    setCouponCode('');
  };

  const freeShippingThreshold = parseFloat(settings.free_shipping_threshold || '75');
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FAF0F2] text-[#C97882] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-[#3B2418]/70 max-w-sm mx-auto">
            Discover our collection of handcrafted crochet flowers, baby gifts, and cozy accessories.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C97882] text-white rounded-2xl font-semibold text-sm shadow-rose-glow hover:bg-[#b0616b]"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-bold text-[#3B2418]">Your Shopping Cart</h1>
        <p className="text-xs text-[#879477] font-semibold">Review your handcrafted selections before checkout</p>
        <LeafDivider />
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-[#FAF0F2] rounded-2xl p-4 border border-[#E8B5B8] text-center space-y-2 max-w-2xl mx-auto">
        {distanceToFreeShipping > 0 ? (
          <p className="text-xs font-semibold text-[#3B2418]">
            Add <span className="text-[#C97882] font-bold">${distanceToFreeShipping.toFixed(2)}</span> more to your cart to unlock <span className="font-bold">FREE SHIPPING</span>! 🧶
          </p>
        ) : (
          <p className="text-xs font-bold text-[#879477] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#879477]" />
            <span>Congratulations! You qualified for FREE SHIPPING!</span>
          </p>
        )}
        <div className="w-full bg-[#EFE6D8] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C97882] h-full transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart Itemized List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] p-6 shadow-stitch divide-y divide-[#D8CBB9]/60">
            {cart.map((item, idx) => (
              <div key={`${item.product_id}-${item.color}-${item.size}-${idx}`} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-[#D8CBB9] bg-[#FAF7EF] flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-[#3B2418]">{item.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#879477]">
                      {item.color && <span>Color: <strong className="text-[#3B2418]">{item.color}</strong></span>}
                      {item.size && <span>Size: <strong className="text-[#3B2418]">{item.size}</strong></span>}
                    </div>
                    <p className="font-serif font-bold text-sm text-[#C97882]">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                  <div className="flex items-center border border-[#D8CBB9] rounded-xl bg-[#FAF7EF] p-1">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.color, item.size)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-xs hover:bg-[#EFE6D8] rounded-lg"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.color, item.size)}
                      className="w-7 h-7 flex items-center justify-center font-bold text-xs hover:bg-[#EFE6D8] rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-serif font-bold text-base text-[#3B2418] min-w-[70px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product_id, item.color, item.size)}
                    className="p-2 text-[#3B2418]/50 hover:text-[#C97882] transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#879477] hover:text-[#3B2418]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Coupon Input */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#D8CBB9] shadow-stitch space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3B2418] uppercase tracking-wider">
              <Tag className="w-4 h-4 text-[#C97882]" />
              <span>Discount Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-[#FAF0F2] border border-[#E8B5B8] rounded-xl text-xs text-[#C97882]">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4 text-[#C97882]" />
                  <span>Coupon {appliedCoupon.code} Applied</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-[#3B2418] underline hover:text-[#C97882]">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882] uppercase"
                />
                <button
                  type="submit"
                  disabled={couponLoading}
                  className="px-4 py-2 bg-[#879477] hover:bg-[#727d65] text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#879477]">Try code <strong>WELCOME10</strong> for 10% off your first order!</p>
          </div>

          {/* Price Breakdown */}
          <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#D8CBB9] shadow-stitch space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-[#3B2418]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? <strong className="text-[#879477]">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C97882] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#D8CBB9] flex justify-between text-base font-bold text-[#3B2418]">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-[#C97882]">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-sm rounded-2xl shadow-rose-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
