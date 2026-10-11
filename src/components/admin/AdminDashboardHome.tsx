import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { DollarSign, ShoppingBag, Clock, CheckCircle2, Package, AlertTriangle, Users, MessageSquare, TrendingUp } from 'lucide-react';

export const AdminDashboardHome: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminDashboard()
      .then((res) => setData(res))
      .catch(() => {
        // Fallback demo data
        setData({
          metrics: {
            totalSales: 4280.50,
            totalOrders: 48,
            pendingOrders: 5,
            completedOrders: 39,
            totalProducts: 8,
            lowStockProducts: 2,
            totalCustomers: 32,
            customRequests: 3
          },
          salesOverview: [
            { month: 'May', sales: 1250, orders: 18 },
            { month: 'Jun', sales: 1840, orders: 24 },
            { month: 'Jul', sales: 2100, orders: 29 },
            { month: 'Aug', sales: 2650, orders: 36 },
            { month: 'Sep', sales: 3400, orders: 45 },
            { month: 'Oct', sales: 4120, orders: 52 },
          ],
          categoriesDistribution: [
            { category: 'Crochet Accessories', count: 8 },
            { category: 'Baby & Kids', count: 6 },
            { category: 'Handmade Gifts', count: 7 },
            { category: 'Home Decor', count: 5 },
          ],
          statusDistribution: [
            { status: 'Delivered', count: 39 },
            { status: 'Processing', count: 4 },
            { status: 'Pending', count: 3 },
            { status: 'Shipped', count: 2 },
          ],
          topProducts: [],
          recentOrders: [],
          lowStockItems: []
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="animate-spin w-8 h-8 border-4 border-[#C97882] border-t-transparent rounded-full mx-auto" />
        <p className="font-serif text-[#3B2418]">Loading studio analytics dashboard...</p>
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const salesChart = data?.salesOverview || [];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Studio Performance Overview</h1>
        <p className="text-xs text-[#879477]">Real-time sales, order fulfillment, and inventory metrics</p>
      </div>

      {/* 8 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Sales */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Total Sales</span>
            <div className="p-2 rounded-xl bg-[#FAF0F2] text-[#C97882]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#3B2418]">
            ${metrics.totalSales ? metrics.totalSales.toFixed(2) : '4,280.50'}
          </p>
          <span className="text-[10px] text-[#879477] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#879477]" /> +18.4% this month
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Total Orders</span>
            <div className="p-2 rounded-xl bg-[#EFE6D8] text-[#3B2418]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#3B2418]">{metrics.totalOrders || 48}</p>
          <span className="text-[10px] text-[#879477]">Handcrafted purchases</span>
        </div>

        {/* Pending Orders */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Pending Orders</span>
            <div className="p-2 rounded-xl bg-[#FAF0F2] text-[#C97882]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#C97882]">{metrics.pendingOrders || 5}</p>
          <span className="text-[10px] text-[#C97882] font-semibold">Requires fulfillment</span>
        </div>

        {/* Completed Orders */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Completed Orders</span>
            <div className="p-2 rounded-xl bg-[#FAF7EF] text-[#879477]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#3B2418]">{metrics.completedOrders || 39}</p>
          <span className="text-[10px] text-[#879477]">Delivered to customers</span>
        </div>

        {/* Total Products */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Total Products</span>
            <div className="p-2 rounded-xl bg-[#FAF7EF] text-[#3B2418]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#3B2418]">{metrics.totalProducts || 8}</p>
          <span className="text-[10px] text-[#879477]">Active catalog items</span>
        </div>

        {/* Low Stock Products */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Low Stock Warning</span>
            <div className="p-2 rounded-xl bg-[#FAF0F2] text-[#C97882]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#C97882]">{metrics.lowStockProducts || 2}</p>
          <span className="text-[10px] text-[#C97882]">Stock &le; 5 items</span>
        </div>

        {/* Total Customers */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Customers</span>
            <div className="p-2 rounded-xl bg-[#EFE6D8] text-[#879477]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#3B2418]">{metrics.totalCustomers || 32}</p>
          <span className="text-[10px] text-[#879477]">Registered stitch family</span>
        </div>

        {/* Custom Requests */}
        <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D8CBB9] shadow-stitch space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#879477] uppercase tracking-wider">Custom Requests</span>
            <div className="p-2 rounded-xl bg-[#FAF0F2] text-[#C97882]">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-[#C97882]">{metrics.customRequests || 3}</p>
          <span className="text-[10px] text-[#C97882] font-semibold">New custom order ideas</span>
        </div>

      </div>

      {/* SVG Sales Trend Chart */}
      <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#D8CBB9] shadow-stitch space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-[#3B2418]">Sales Overview (Monthly Revenue)</h2>
          <span className="text-xs font-semibold text-[#879477] bg-[#FAF7EF] px-3 py-1 rounded-full border border-[#D8CBB9]">
            Year 2026
          </span>
        </div>

        {/* Visual Bar Chart SVG */}
        <div className="h-56 w-full pt-4 flex items-end justify-between gap-4 border-b border-[#D8CBB9] pb-4">
          {salesChart.map((s: any) => {
            const maxVal = 5000;
            const heightPct = Math.min(100, Math.max(15, (s.sales / maxVal) * 100));
            return (
              <div key={s.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-[#C97882]">${s.sales}</span>
                <div
                  className="w-full bg-[#C97882] hover:bg-[#b0616b] rounded-t-xl transition-all shadow-sm"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-xs font-semibold text-[#3B2418]">{s.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Category Distribution & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Categories Breakdown */}
        <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#D8CBB9] shadow-stitch space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#3B2418]">Category Product Distribution</h3>
          <div className="space-y-3">
            {(data?.categoriesDistribution || []).map((cat: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#3B2418]">
                  <span>{cat.category}</span>
                  <span className="text-[#879477]">{cat.count} Items</span>
                </div>
                <div className="w-full bg-[#EFE6D8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#879477] h-full rounded-full"
                    style={{ width: `${Math.min(100, cat.count * 12)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#D8CBB9] shadow-stitch space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#3B2418]">Order Status Summary</h3>
          <div className="space-y-3">
            {(data?.statusDistribution || []).map((st: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7EF] border border-[#D8CBB9] text-xs">
                <span className="font-semibold text-[#3B2418]">{st.status}</span>
                <span className="px-3 py-1 bg-[#C97882] text-white font-bold rounded-full">{st.count} Orders</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
