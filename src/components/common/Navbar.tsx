import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { Search, ShoppingBag, Heart, User, Menu, X, Shield, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, searchQuery, setSearchQuery, settings } = useShop();
  const { user, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Custom Orders', path: '/custom-orders' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EF]/90 backdrop-blur-md border-b border-[#D8CBB9] transition-all">
      {/* Top Announcement Bar */}
      {settings.announcement_banner && (
        <div className="bg-[#3B2418] text-[#FAF7EF] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <span>{settings.announcement_banner}</span>
          <Link to="/custom-orders" className="underline hover:text-[#E8B5B8] text-[11px] font-semibold">Request Custom</Link>
        </div>
      )}

      {/* Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <BrandLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive ? 'text-[#C97882] font-semibold' : 'text-[#3B2418] hover:text-[#C97882]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C97882] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#3B2418] hover:text-[#C97882] hover:bg-[#EFE6D8]/60 rounded-full transition-colors"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Bar Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#FFFDF9] p-3 rounded-2xl shadow-stitch-lg border border-[#D8CBB9] z-50 animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search crochet flowers, blankets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882]"
                      autoFocus
                    />
                    <Search className="w-4 h-4 text-[#879477] absolute left-3" />
                  </form>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/account?tab=wishlist"
              className="relative p-2 text-[#3B2418] hover:text-[#C97882] hover:bg-[#EFE6D8]/60 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C97882] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-[#3B2418] hover:text-[#C97882] hover:bg-[#EFE6D8]/60 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#3B2418] text-[#FAF7EF] text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account / User Menu */}
            <Link
              to="/account"
              className="flex items-center gap-1.5 p-1.5 sm:px-3 text-[#3B2418] hover:text-[#C97882] hover:bg-[#EFE6D8]/60 rounded-full text-xs font-medium transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline-block">
                {user ? user.full_name.split(' ')[0] : 'Account'}
              </span>
            </Link>

            {/* Admin Quick Switch (if logged in as admin or shortcut) */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-[#C97882] text-white rounded-full text-xs font-semibold hover:bg-[#b0616b] shadow-sm transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Suite</span>
              </Link>
            ) : (
              <Link
                to="/admin"
                className="text-[11px] text-[#879477] hover:underline opacity-60 hover:opacity-100 hidden xl:inline-block"
                title="Admin Login"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#3B2418] hover:text-[#C97882] rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#D8CBB9] px-6 py-6 space-y-4 shadow-stitch-lg animate-slide-up">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-[#EFE6D8] ${
                  location.pathname === link.path ? 'text-[#C97882] font-semibold' : 'text-[#3B2418]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 text-[#879477] flex items-center justify-between"
            >
              <span>My Account</span>
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium py-2 text-[#C97882] flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Dashboard Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
