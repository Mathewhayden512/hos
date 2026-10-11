import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../common/BrandLogo';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  MessageSquare,
  Boxes,
  Star,
  Tag,
  Quote,
  FileText,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  Lock
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If user is not logged in as ADMIN, display access denied / login prompt
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#FAF7EF] flex items-center justify-center p-4">
        <div className="bg-[#FFFDF9] max-w-md w-full rounded-3xl p-8 border border-[#D8CBB9] shadow-stitch text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF0F2] text-[#C97882] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Admin Access Required</h1>
            <p className="text-xs text-[#879477] max-w-xs mx-auto">
              This area is restricted to studio administrators. Normal customers cannot access admin functionality.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link
              to="/account"
              className="w-full py-3.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Login to Admin Account</span>
            </Link>
            <Link to="/" className="inline-block text-xs text-[#879477] underline">
              Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Custom Requests', path: '/admin/custom-requests', icon: MessageSquare },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { name: 'Website Content', path: '/admin/cms', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7EF] flex text-[#3B2418]">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#FFFDF9] border-r border-[#D8CBB9] p-6 space-y-8 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="pt-2">
          <BrandLogo size="sm" />
          <div className="mt-2 px-2 py-1 bg-[#FAF0F2] rounded-lg text-[10px] font-bold text-[#C97882] uppercase tracking-wider inline-flex items-center gap-1 border border-[#E8B5B8]">
            <Shield className="w-3 h-3" />
            <span>Studio Admin Suite</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#3B2418] text-[#FAF7EF] shadow-sm'
                    : 'text-[#3B2418]/80 hover:bg-[#EFE6D8] hover:text-[#3B2418]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C97882]' : 'text-[#879477]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-[#D8CBB9]/60 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#879477] hover:text-[#3B2418]"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Website</span>
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#C97882] hover:bg-[#FAF0F2] rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-[#FFFDF9] border-b border-[#D8CBB9] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-[#3B2418]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#3B2418]">A Millennial’s Stitch Admin</h2>
              <p className="text-[10px] text-[#879477]">Logged in as <strong>{user.full_name}</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] text-[#3B2418] text-xs font-semibold rounded-xl hover:bg-[#EFE6D8]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#879477]" />
              <span>Customer View</span>
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {isSidebarOpen && (
          <div className="lg:hidden bg-[#FFFDF9] border-b border-[#D8CBB9] p-6 space-y-2 z-40">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#3B2418]"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Content Body */}
        <main className="p-6 sm:p-10 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
