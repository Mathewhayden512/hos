import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Order, OrderStatus } from '../../types';
import { Eye, Edit, Search, CheckCircle2 } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { showToast } = useShop();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Pending');
  const [adminNotes, setAdminNotes] = useState('');

  const loadOrders = async () => {
    try {
      const res = await api.getOrders();
      setOrders(res);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      await api.updateOrderStatus(selectedOrder.id, {
        order_status: newStatus,
        notes: adminNotes,
      });
      showToast(`Updated Order #${selectedOrder.order_number} to ${newStatus}`, 'success');
      setSelectedOrder(null);
      loadOrders();
    } catch (err: any) {
      showToast(err.message || 'Error updating order status', 'error');
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.order_status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Ready', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Order Management</h1>
        <p className="text-xs text-[#879477]">View customer purchases, update order timeline, and manage fulfillment</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#D8CBB9] shadow-stitch flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl text-xs text-[#3B2418] focus:outline-none focus:border-[#C97882]"
          />
          <Search className="w-4 h-4 text-[#879477] absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              statusFilter === 'All' ? 'bg-[#3B2418] text-white' : 'bg-[#EFE6D8] text-[#3B2418]'
            }`}
          >
            All Orders
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                statusFilter === st ? 'bg-[#C97882] text-white' : 'bg-[#EFE6D8] text-[#3B2418]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                  <td className="p-4 font-bold text-[#3B2418]">{ord.order_number}</td>
                  <td className="p-4">
                    <p className="font-bold">{ord.customer_name}</p>
                    <p className="text-[10px] text-[#879477]">{ord.customer_email}</p>
                  </td>
                  <td className="p-4 text-[#879477]">{new Date(ord.created_at || Date.now()).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold">{ord.items ? ord.items.length : 1} items</td>
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
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setNewStatus(ord.order_status);
                        setAdminNotes(ord.notes || '');
                      }}
                      className="px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-xs font-semibold hover:bg-[#EFE6D8]"
                    >
                      Manage Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D8CBB9] pb-3">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#3B2418]">Order Details #{selectedOrder.order_number}</h3>
                <p className="text-xs text-[#879477]">Placed on {new Date(selectedOrder.created_at || Date.now()).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-xs font-bold text-[#C97882]">Close</button>
            </div>

            {/* Customer Info */}
            <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-[#D8CBB9] space-y-2 text-xs">
              <p><strong>Customer:</strong> {selectedOrder.customer_name} ({selectedOrder.customer_email})</p>
              <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shipping_address}, {selectedOrder.city}, {selectedOrder.state} {selectedOrder.postal_code}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.payment_method} ({selectedOrder.payment_status})</p>
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#879477] uppercase tracking-wider">Ordered Products</span>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between p-3 rounded-xl bg-[#FFFDF9] border border-[#D8CBB9]">
                  <div className="flex items-center gap-3">
                    {item.product_image && <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover" />}
                    <div>
                      <p className="font-bold">{item.product_name}</p>
                      <p className="text-[10px] text-[#879477]">Qty: {item.quantity} {item.color ? `• ${item.color}` : ''}</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#C97882]">${item.total_price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Update Status Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2 border-t border-[#D8CBB9]">
              <h4 className="font-serif font-bold text-lg text-[#3B2418]">Update Order Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-[#3B2418]">Order Status</label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-semibold text-[#3B2418]"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#3B2418]">Fulfillment / Tracking Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Shipped via USPS 940011189956..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-[#FAF7EF] border rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-[#C97882] text-white rounded-xl text-xs font-semibold shadow-rose-glow">
                  Save Order Status
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
