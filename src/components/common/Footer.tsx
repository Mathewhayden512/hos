import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../../context/ShopContext';
import { Instagram, Heart, Send, Sparkles, Shield, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Thank you for subscribing to our Stitch Family! Check your inbox for 10% off. 🧶', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#EFE6D8] border-t border-[#D8CBB9] pt-16 pb-12 text-[#3B2418]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Signup Banner */}
        <div className="bg-[#FAF7EF] rounded-3xl p-8 sm:p-12 mb-16 border border-[#D8CBB9] shadow-stitch flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C97882] uppercase bg-[#FAF0F2] px-3 py-1 rounded-full border border-[#E8B5B8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stitch Family Newsletter</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3B2418] font-bold">
              Receive 10% Off Your First Order
            </h3>
            <p className="text-sm text-[#3B2418]/80 leading-relaxed">
              Join our community for custom order openings, flower drop alerts, and exclusive craft tutorials.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-[#879477] font-semibold bg-[#EFE6D8] p-4 rounded-2xl border border-[#B8C2A7]">
                <CheckCircle className="w-5 h-5 text-[#879477]" />
                <span>You're subscribed! Use code <strong>WELCOME10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 rounded-2xl bg-[#FFFDF9] border border-[#D8CBB9] text-sm text-[#3B2418] focus:outline-none focus:border-[#C97882] w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C97882] hover:bg-[#b0616b] text-white rounded-2xl font-medium text-sm transition-all shadow-rose-glow flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-sm text-[#3B2418]/80 leading-relaxed max-w-sm">
              Thoughtfully handcrafted crochet pieces, everlasting flower bouquets, baby keepsakes, and accessories made with creativity, care, and love.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7EF] border border-[#D8CBB9] flex items-center justify-center text-[#3B2418] hover:text-[#C97882] hover:border-[#C97882] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={settings.pinterest_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7EF] border border-[#D8CBB9] flex items-center justify-center text-[#3B2418] hover:text-[#C97882] hover:border-[#C97882] transition-colors"
                title="Pinterest"
              >
                <Heart className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg text-[#3B2418] mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#C97882] transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#C97882] transition-colors">Shop Handmade</Link></li>
              <li><Link to="/categories" className="hover:text-[#C97882] transition-colors">Categories</Link></li>
              <li><Link to="/custom-orders" className="hover:text-[#C97882] transition-colors">Custom Orders</Link></li>
              <li><Link to="/about" className="hover:text-[#C97882] transition-colors">Our Story & About</Link></li>
              <li><Link to="/gallery" className="hover:text-[#C97882] transition-colors">Craft Gallery</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-serif font-bold text-lg text-[#3B2418] mb-4">Customer Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/track-order" className="hover:text-[#C97882] transition-colors">Track Your Order</Link></li>
              <li><Link to="/faq" className="hover:text-[#C97882] transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-[#C97882] transition-colors">Contact Us</Link></li>
              <li><Link to="/account" className="hover:text-[#C97882] transition-colors">Customer Account</Link></li>
              <li><Link to="/cart" className="hover:text-[#C97882] transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Brand Promise & Admin */}
          <div>
            <h4 className="font-serif font-bold text-lg text-[#3B2418] mb-4">Our Promise</h4>
            <div className="space-y-3 text-xs text-[#3B2418]/80 leading-relaxed">
              <p>🌸 100% Handcrafted by Artisans</p>
              <p>✝️ Rooted in Faith & Purpose</p>
              <p>🧶 Premium Hypoallergenic Cotton</p>
              <p>📦 Gift-Ready Botanical Packaging</p>

              <div className="pt-4">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] hover:text-[#C97882] hover:border-[#C97882] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#879477]" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D8CBB9]/70 flex flex-col sm:flex-row items-center justify-between text-xs text-[#3B2418]/70 gap-4">
          <p>© 2026 A Millennial’s Stitch. All Rights Reserved. Handmade with Love, Rooted in Faith.</p>
          <div className="flex items-center space-x-4">
            <Link to="/faq" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/faq" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">Custom Requests</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
