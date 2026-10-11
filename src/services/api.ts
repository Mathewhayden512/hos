import { Product, Category, Order, CustomOrderRequest, Review, Coupon, Testimonial, FAQ, WebsiteSettings, User } from '../types';

const API_BASE = '/api';

async function fetchJSON<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('stitch_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (data: { email: string; password: string }) =>
    fetchJSON<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  register: (data: { email: string; password: string; full_name: string; phone?: string; address?: string }) =>
    fetchJSON<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => fetchJSON<{ user: User }>('/auth/me'),

  // Products
  getProducts: (params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query.append(k, String(v));
        }
      });
    }
    return fetchJSON<Product[]>(`/products?${query.toString()}`);
  },

  getProduct: (idOrSlug: string | number) =>
    fetchJSON<{ product: Product; reviews: Review[]; related: Product[] }>(`/products/${idOrSlug}`),

  createProduct: (data: Partial<Product>) =>
    fetchJSON<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number, data: Partial<Product>) =>
    fetchJSON<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number) =>
    fetchJSON<{ message: string }>(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => fetchJSON<Category[]>('/categories'),
  createCategory: (data: Partial<Category>) =>
    fetchJSON<Category>('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: number, data: Partial<Category>) =>
    fetchJSON<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: number) =>
    fetchJSON<{ message: string }>(`/categories/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: (params?: { email?: string; status?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params) {
      if (params.email) query.append('email', params.email);
      if (params.status) query.append('status', params.status);
      if (params.search) query.append('search', params.search);
    }
    return fetchJSON<Order[]>(`/orders?${query.toString()}`);
  },

  getOrder: (idOrCode: string | number) => fetchJSON<Order>(`/orders/${idOrCode}`),

  createOrder: (data: any) =>
    fetchJSON<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateOrderStatus: (id: number, data: { order_status?: string; payment_status?: string; notes?: string }) =>
    fetchJSON<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Custom Orders
  getCustomOrders: (params?: { email?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.email) query.append('email', params.email);
    if (params?.status) query.append('status', params.status);
    return fetchJSON<CustomOrderRequest[]>(`/custom-orders?${query.toString()}`);
  },

  getCustomOrder: (idOrCode: string | number) => fetchJSON<CustomOrderRequest>(`/custom-orders/${idOrCode}`),

  createCustomOrder: (data: Partial<CustomOrderRequest>) =>
    fetchJSON<{ message: string; request: CustomOrderRequest }>('/custom-orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCustomOrderStatus: (id: number, data: { status: string; admin_notes?: string }) =>
    fetchJSON<CustomOrderRequest>(`/custom-orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Reviews
  getReviews: (productId?: number, all?: boolean) => {
    const q = new URLSearchParams();
    if (productId) q.append('product_id', String(productId));
    if (all) q.append('all', 'true');
    return fetchJSON<Review[]>(`/reviews?${q.toString()}`);
  },

  createReview: (data: Partial<Review>) =>
    fetchJSON<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) }),

  approveReview: (id: number, is_approved: boolean) =>
    fetchJSON<Review>(`/reviews/${id}/approve`, { method: 'PUT', body: JSON.stringify({ is_approved }) }),

  deleteReview: (id: number) =>
    fetchJSON<{ message: string }>(`/reviews/${id}`, { method: 'DELETE' }),

  // Coupons
  getCoupons: () => fetchJSON<Coupon[]>('/coupons'),
  validateCoupon: (code: string, cartSubtotal: number) =>
    fetchJSON<{ valid: boolean; code: string; discount_type: string; discount_value: number; calculated_discount: number }>('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, cartSubtotal }),
    }),
  createCoupon: (data: Partial<Coupon>) =>
    fetchJSON<Coupon>('/coupons', { method: 'POST', body: JSON.stringify(data) }),
  updateCoupon: (id: number, data: Partial<Coupon>) =>
    fetchJSON<Coupon>(`/coupons/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCoupon: (id: number) =>
    fetchJSON<{ message: string }>(`/coupons/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => fetchJSON<Testimonial[]>('/testimonials'),
  createTestimonial: (data: Partial<Testimonial>) =>
    fetchJSON<Testimonial>('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: number, data: Partial<Testimonial>) =>
    fetchJSON<Testimonial>(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: number) =>
    fetchJSON<{ message: string }>(`/testimonials/${id}`, { method: 'DELETE' }),

  // FAQs
  getFaqs: () => fetchJSON<FAQ[]>('/faqs'),
  createFaq: (data: Partial<FAQ>) =>
    fetchJSON<FAQ>('/faqs', { method: 'POST', body: JSON.stringify(data) }),
  updateFaq: (id: number, data: Partial<FAQ>) =>
    fetchJSON<FAQ>(`/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFaq: (id: number) =>
    fetchJSON<{ message: string }>(`/faqs/${id}`, { method: 'DELETE' }),

  // Website Settings (CMS)
  getSettings: () => fetchJSON<WebsiteSettings>('/settings'),
  updateSettings: (data: Partial<WebsiteSettings>) =>
    fetchJSON<WebsiteSettings>('/settings', { method: 'POST', body: JSON.stringify(data) }),

  // Admin Dashboard Statistics
  getAdminDashboard: () =>
    fetchJSON<{
      metrics: {
        totalSales: number;
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        totalProducts: number;
        lowStockProducts: number;
        totalCustomers: number;
        customRequests: number;
      };
      salesOverview: { month: string; sales: number; orders: number }[];
      categoriesDistribution: { category: string; count: number }[];
      statusDistribution: { status: string; count: number }[];
      topProducts: Product[];
      recentOrders: Order[];
      lowStockItems: Product[];
    }>('/admin/dashboard'),

  getAdminCustomers: () => fetchJSON<any[]>('/admin/customers'),
  getAdminInventory: () => fetchJSON<Product[]>('/admin/inventory'),
  updateInventoryStock: (id: number, stock: number) =>
    fetchJSON<Product>(`/admin/inventory/${id}`, { method: 'PUT', body: JSON.stringify({ stock }) }),
};
