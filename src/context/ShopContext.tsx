import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Category, WebsiteSettings } from '../types';
import { api } from '../services/api';

interface ToastNotice {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: number, color?: string, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  appliedCoupon: { code: string; discount: number; type: string } | null;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;

  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  products: Product[];
  categories: Category[];
  settings: WebsiteSettings;
  refreshProducts: () => Promise<void>;
  refreshSettings: () => Promise<void>;

  toasts: ToastNotice[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const defaultSettings: WebsiteSettings = {
  business_name: "A Millennial's Stitch",
  tagline: "Handmade with Love, Rooted in Faith.",
  hero_headline: "Thoughtfully Handcrafted Crochet & Knitting",
  hero_subtext: "Thoughtfully handcrafted crochet pieces, gifts and accessories made with creativity, care and love.",
  about_headline: "Slow Handmade Creation, Woven with Purpose",
  about_text: "A Millennial’s Stitch began with a quiet prayer, a ball of soft yarn, and a passion for crafting meaningful, lasting pieces.",
  contact_email: "hello@amillennialstitch.com",
  contact_phone: "(555) 234-5678",
  business_address: "Nashville, Tennessee, USA",
  currency_symbol: "$",
  shipping_charge: "5.00",
  free_shipping_threshold: "75.00",
  tax_percentage: "7.0",
  announcement_banner: "✨ Free Shipping on orders over $75 | Handcrafted with Love & Rooted in Faith ✨",
  instagram_url: "https://instagram.com/amillennialstitch",
  pinterest_url: "https://pinterest.com/amillennialstitch",
  etsy_url: "https://etsy.com/shop/amillennialstitch"
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('stitch_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('stitch_wishlist');
    return saved ? JSON.parse(saved) : [1, 2];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  useEffect(() => {
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('stitch_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const refreshProducts = async () => {
    try {
      const data = await api.getProducts({ activeOnly: true });
      if (data && data.length) {
        setProducts(data);
      }
    } catch (err) {
      console.warn('Backend API products fetch fallback:', err);
    }
  };

  const refreshCategories = async () => {
    try {
      const data = await api.getCategories();
      if (data && data.length) {
        setCategories(data);
      }
    } catch (err) {
      console.warn('Backend API categories fetch fallback:', err);
    }
  };

  const refreshSettings = async () => {
    try {
      const data = await api.getSettings();
      if (data && Object.keys(data).length) {
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (err) {
      console.warn('Backend API settings fetch fallback:', err);
    }
  };

  useEffect(() => {
    refreshProducts();
    refreshCategories();
    refreshSettings();
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product: Product, quantity: number = 1, color?: string, size?: string) => {
    const chosenColor = color || (Array.isArray(product.available_colors) ? product.available_colors[0] : (typeof product.available_colors === 'string' ? JSON.parse(product.available_colors)[0] : 'Standard'));
    const chosenSize = size || (Array.isArray(product.available_sizes) ? product.available_sizes[0] : (typeof product.available_sizes === 'string' ? JSON.parse(product.available_sizes)[0] : 'Standard'));
    const activePrice = product.discount_price && product.discount_price > 0 ? product.discount_price : product.price;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product_id === product.id && item.color === chosenColor && item.size === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product_id: product.id,
            name: product.name,
            price: activePrice,
            image_url: product.image_url,
            quantity,
            color: chosenColor,
            size: chosenSize,
            stock: product.stock,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to your cart! 🧶`, 'success');
  };

  const removeFromCart = (productId: number, color?: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product_id === productId && item.color === color && item.size === size)));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (productId: number, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId && item.color === color && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const freeShippingThreshold = parseFloat(settings.free_shipping_threshold || '75');
  const baseShipping = parseFloat(settings.shipping_charge || '5');
  const shippingCost = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : baseShipping;

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalAmount = Math.max(0, subtotal + shippingCost - discountAmount);

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const res = await api.validateCoupon(code, subtotal);
      if (res.valid) {
        setAppliedCoupon({
          code: res.code,
          discount: res.calculated_discount,
          type: res.discount_type,
        });
        showToast(`Coupon "${res.code}" applied successfully! saved $${res.calculated_discount.toFixed(2)}`, 'success');
        return true;
      }
      return false;
    } catch (err: any) {
      // Local fallback coupon validation
      const upper = code.trim().toUpperCase();
      if (upper === 'WELCOME10' || upper === 'FAITH15') {
        const pct = upper === 'WELCOME10' ? 10 : 15;
        const calc = (subtotal * pct) / 100;
        setAppliedCoupon({ code: upper, discount: calc, type: 'percentage' });
        showToast(`Coupon "${upper}" applied! Saved $${calc.toFixed(2)}`, 'success');
        return true;
      } else if (upper === 'HANDMADE5') {
        setAppliedCoupon({ code: 'HANDMADE5', discount: 5, type: 'fixed' });
        showToast('Coupon "HANDMADE5" applied! Saved $5.00', 'success');
        return true;
      }
      showToast(err.message || 'Invalid coupon code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed.', 'info');
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingCost,
        discountAmount,
        totalAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        categories,
        settings,
        refreshProducts,
        refreshSettings,
        toasts,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
