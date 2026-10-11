import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import { Order, Product } from '../types';
import { User as UserIcon, ShoppingBag, Heart, LogOut, Shield, ArrowRight, Eye, CheckCircle2, MapPin } from 'lucide-react';
import { LeafDivider } from '../components/common/BotanicalAccents';

export const AccountPage: React.FC = () => {
  const { user, login, register, logout, isLoggedIn, isAdmin } = useAuth();
  const { wishlist, products, toggleWishlist, addToCart, showToast } = useShop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTabParam = searchParams.get('tab') || 'orders';

  // Login / Register state
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Account Dashboard state
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user?.email) {
      api.getOrders({ email: user.email })
        .then((res) => setOrders(res))
        .catch(() => setOrders([]));
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      if (isLoginTab) {
        await login(email, password);
        showToast('Welcome back to A Millennial’s Stitch! 🌸', 'success');
      } else {
        await register(email, password, fullName, phone, address);
        showToast('Account created successfully! 🧶', 'success');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoCustomerLogin = () => {
    setEmail('customer@example.com');
    setPassword('customer123');
    login('customer@example.com', 'customer123');
    showToast('Logged in as Demo Customer (Sarah Jenkins)', 'success');
  };

  const handleDemoAdminLogin = () => {
    login('admin@amillennialstitch.com', 'admin123');
    showToast('Logged in as Admin (Hannah Grace)', 'success');
    navigate('/admin');
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C97882]">Stitch Family Account</span>
          <h1 className="font-serif text-4xl font-bold text-[#3B2418]">
            {isLoginTab ? 'Customer Login' : 'Register Account'}
          </h1>
          <LeafDivider />
        </div>

        {/* Auth Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D8CBB9] shadow-stitch space-y-6">
          {/* Tab Switcher */}
          <div className="flex border-b border-[#D8CBB9]">
            <button
              onClick={() => { setIsLoginTab(true); setAuthError(''); }}
              className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 ${
                isLoginTab ? 'border-[#C97882] text-[#C97882]' : 'border-transparent text-[#879477]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLoginTab(false); setAuthError(''); }}
              className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 ${
                !isLoginTab ? 'border-[#C97882] text-[#C97882]' : 'border-transparent text-[#879477]'
              }`}
            >
              Register New
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-[#FAF0F2] border border-[#E8B5B8] rounded-xl text-xs text-[#9A2C38]">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginTab && (
              <div>
                <label className="text-xs font-semibold text-[#3B2418]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#3B2418]">Email Address *</label>
              <input
                type="email"
                required
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#3B2418]">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
              />
            </div>

            {!isLoginTab && (
              <>
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 987-6543"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#3B2418]">Shipping Address</label>
                  <input
                    type="text"
                    placeholder="742 Evergreen Terrace, Springfield, OR"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs focus:outline-none focus:border-[#C97882]"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow transition-all"
            >
              {loading ? 'Processing...' : isLoginTab ? 'Sign In to Account' : 'Create Customer Account'}
            </button>
          </form>

          {/* Quick Demo Login Buttons */}
          <div className="pt-4 border-t border-[#D8CBB9]/60 space-y-2">
            <span className="text-[10px] font-bold text-[#879477] uppercase tracking-wider block text-center">
              Quick Demo Logins
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDemoCustomerLogin}
                className="py-2 px-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-[11px] font-semibold text-[#3B2418] hover:bg-[#EFE6D8]"
              >
                👤 Customer Demo
              </button>
              <button
                onClick={handleDemoAdminLogin}
                className="py-2 px-3 bg-[#3B2418] text-[#FAF7EF] rounded-xl text-[11px] font-semibold hover:bg-[#28170F]"
              >
                🛡️ Admin Suite
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Account Profile Bar */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-stitch flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#FAF0F2] text-[#C97882] border border-[#E8B5B8] flex items-center justify-center font-serif text-2xl font-bold">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#3B2418]">{user?.full_name || 'Customer'}</h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 bg-[#C97882] text-white text-[10px] font-bold rounded-full uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-[#879477]">{user?.email || ''} • Member since 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-[#C97882] text-white rounded-xl text-xs font-semibold hover:bg-[#b0616b] flex items-center gap-1.5 shadow-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Open Admin Dashboard</span>
            </Link>
          )}
          <button
            onClick={() => { logout(); showToast('Logged out successfully.', 'info'); }}
            className="px-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] text-[#3B2418] hover:text-[#C97882] rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Account Tabs & Views */}
      <div className="space-y-6">
        
        {/* Tab Header */}
        <div className="flex border-b border-[#D8CBB9] gap-8">
          <button
            onClick={() => navigate('/account?tab=orders')}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTabParam === 'orders' ? 'border-[#C97882] text-[#C97882]' : 'border-transparent text-[#879477] hover:text-[#3B2418]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => navigate('/account?tab=wishlist')}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTabParam === 'wishlist' ? 'border-[#C97882] text-[#C97882]' : 'border-transparent text-[#879477] hover:text-[#3B2418]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlistedProducts.length})</span>
          </button>

          <button
            onClick={() => navigate('/account?tab=profile')}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTabParam === 'profile' ? 'border-[#C97882] text-[#C97882]' : 'border-transparent text-[#879477] hover:text-[#3B2418]'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile & Address</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTabParam === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl p-12 text-center border border-[#D8CBB9] space-y-4">
                <p className="font-serif text-2xl font-bold text-[#3B2418]">No Orders Placed Yet</p>
                <p className="text-xs text-[#879477]">Once you place an order, its real-time status and items will appear here.</p>
                <Link to="/shop" className="inline-block px-6 py-2.5 bg-[#C97882] text-white rounded-xl text-xs font-semibold">
                  Browse Shop
                </Link>
              </div>
            ) : (
              <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#3B2418]">
                    <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Payment Status</th>
                        <th className="p-4">Order Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE6D8]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                          <td className="p-4 font-bold text-[#3B2418]">{ord.order_number}</td>
                          <td className="p-4 text-[#879477]">{new Date(ord.created_at || Date.now()).toLocaleDateString()}</td>
                          <td className="p-4 font-serif font-bold text-[#C97882]">${ord.total_amount.toFixed(2)}</td>
                          <td className="p-4 font-semibold text-[#879477]">{ord.payment_status}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              ord.order_status === 'Delivered'
                                ? 'bg-[#879477] text-white'
                                : ord.order_status === 'Shipped'
                                ? 'bg-[#C97882] text-white'
                                : 'bg-[#EFE6D8] text-[#3B2418]'
                            }`}>
                              {ord.order_status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-xs font-semibold hover:bg-[#EFE6D8]"
                            >
                              View Items
                            </button>
                            <Link
                              to={`/track-order?order=${ord.order_number}`}
                              className="px-3 py-1.5 bg-[#879477] text-white rounded-lg text-xs font-semibold hover:bg-[#727d65]"
                            >
                              Track
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist Products */}
        {activeTabParam === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="bg-[#FFFDF9] rounded-3xl p-12 text-center border border-[#D8CBB9] space-y-4">
                <Heart className="w-10 h-10 text-[#C97882] mx-auto" />
                <p className="font-serif text-2xl font-bold text-[#3B2418]">Your Wishlist is Empty</p>
                <p className="text-xs text-[#879477]">Save your favorite handmade pieces by clicking the heart icon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] overflow-hidden p-4 shadow-stitch space-y-3">
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7EF] relative">
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      <button onClick={() => toggleWishlist(p.id)} className="absolute top-2 right-2 p-1.5 bg-[#C97882] text-white rounded-full">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-[#3B2418] line-clamp-1">{p.name}</h3>
                    <p className="font-serif font-bold text-sm text-[#C97882]">${p.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full py-2 bg-[#FAF7EF] hover:bg-[#C97882] hover:text-white border border-[#D8CBB9] text-xs font-semibold rounded-xl"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile Details */}
        {activeTabParam === 'profile' && (
          <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D8CBB9] shadow-stitch max-w-xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#3B2418]">Customer Profile</h3>
            <div className="space-y-3 text-xs text-[#3B2418]">
              <div>
                <span className="font-bold text-[#879477] block">Full Name:</span>
                <p className="font-semibold text-sm">{user?.full_name || 'Customer'}</p>
              </div>
              <div>
                <span className="font-bold text-[#879477] block">Email Address:</span>
                <p className="font-semibold text-sm">{user?.email || ''}</p>
              </div>
              <div>
                <span className="font-bold text-[#879477] block">Phone Number:</span>
                <p className="font-semibold text-sm">{user?.phone || '(555) 987-6543'}</p>
              </div>
              <div>
                <span className="font-bold text-[#879477] block">Primary Shipping Address:</span>
                <p className="font-semibold text-sm">{user?.address || '742 Evergreen Terrace, Springfield, OR'}</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-lg w-full rounded-3xl p-6 border border-[#D8CBB9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8CBB9] pb-3">
              <h3 className="font-serif font-bold text-xl text-[#3B2418]">Order #{selectedOrder.order_number}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-xs font-bold text-[#C97882]">Close</button>
            </div>

            <div className="space-y-3 text-xs text-[#3B2418]">
              <p>Status: <strong className="text-[#879477]">{selectedOrder.order_status}</strong></p>
              <p>Shipping to: {selectedOrder.shipping_address}</p>

              <div className="space-y-2 pt-2 border-t border-[#EFE6D8]">
                <span className="font-bold text-[#879477]">Items:</span>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-2 rounded-lg bg-[#FAF7EF]">
                    <span>{item.product_name} x {item.quantity}</span>
                    <span className="font-bold">${item.total_price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between font-serif font-bold text-sm text-[#C97882]">
                <span>Total Amount:</span>
                <span>${selectedOrder.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
