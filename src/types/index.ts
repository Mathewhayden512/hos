export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  role: UserRole;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  item_count: number;
  is_active?: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category_id: number;
  category_name: string;
  description: string;
  short_description?: string;
  price: number;
  discount_price?: number;
  stock: number;
  image_url: string;
  additional_images?: string | string[];
  materials?: string;
  dimensions?: string;
  available_colors?: string | string[];
  available_sizes?: string | string[];
  is_featured?: number;
  is_bestseller?: number;
  is_active?: number;
}

export interface CartItem {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  color?: string;
  size?: string;
  stock?: number;
}

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  product_name: string;
  product_image?: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  total_price: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Ready' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: number;
  order_number: string;
  customer_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: OrderStatus;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at?: string;
}

export type CustomOrderStatus = 'New' | 'Reviewing' | 'Quoted' | 'Approved' | 'In Production' | 'Completed' | 'Rejected';

export interface CustomOrderRequest {
  id: number;
  request_code: string;
  customer_name: string;
  email: string;
  phone: string;
  product_type: string;
  preferred_color?: string;
  size?: string;
  quantity?: number;
  budget?: string;
  deadline?: string;
  custom_description: string;
  reference_image_url?: string;
  status: CustomOrderStatus;
  admin_notes?: string;
  created_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  comment: string;
  is_approved: number;
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_amount: number;
  min_order: number;
  expiration_date?: string;
  usage_limit: number;
  times_used: number;
  is_active: number;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  location_or_role: string;
  comment: string;
  rating: number;
  is_featured: number;
}

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  is_active: number;
  order_num: number;
}

export interface WebsiteSettings {
  business_name: string;
  tagline: string;
  hero_headline: string;
  hero_subtext: string;
  about_headline: string;
  about_text: string;
  contact_email: string;
  contact_phone: string;
  business_address: string;
  currency_symbol: string;
  shipping_charge: string;
  free_shipping_threshold: string;
  tax_percentage: string;
  announcement_banner: string;
  instagram_url: string;
  pinterest_url: string;
  etsy_url: string;
}
