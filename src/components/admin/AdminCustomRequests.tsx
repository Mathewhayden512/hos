import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { CustomOrderRequest, CustomOrderStatus } from '../../types';
import { MessageSquare, Edit2, CheckCircle2, X } from 'lucide-react';

export const AdminCustomRequests: React.FC = () => {
  const { showToast } = useShop();
  const [requests, setRequests] = useState<CustomOrderRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<CustomOrderRequest | null>(null);
  const [status, setStatus] = useState<CustomOrderStatus>('New');
  const [adminNotes, setAdminNotes] = useState('');

  const loadCustomRequests = async () => {
    try {
      const res = await api.getCustomOrders();
      setRequests(res);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadCustomRequests();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;

    try {
      await api.updateCustomOrderStatus(selectedReq.id, {
        status,
        admin_notes: adminNotes,
      });
      showToast(`Updated Custom Request #${selectedReq.request_code} to ${status}`, 'success');
      setSelectedReq(null);
      loadCustomRequests();
    } catch (err: any) {
      showToast(err.message || 'Error updating status', 'error');
    }
  };

  const statuses: CustomOrderStatus[] = ['New', 'Reviewing', 'Quoted', 'Approved', 'In Production', 'Completed', 'Rejected'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Custom Order Requests</h1>
        <p className="text-xs text-[#879477]">Review customer bespoke craft submissions, send quotes, and track production</p>
      </div>

      {/* Table */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Request ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product Type</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                  <td className="p-4 font-bold text-[#3B2418]">{req.request_code}</td>
                  <td className="p-4">
                    <p className="font-bold">{req.customer_name}</p>
                    <p className="text-[10px] text-[#879477]">{req.email}</p>
                  </td>
                  <td className="p-4 font-semibold">{req.product_type}</td>
                  <td className="p-4 text-[#879477]">{req.budget || 'Open'}</td>
                  <td className="p-4 font-semibold">{req.deadline || 'Flexible'}</td>
                  <td className="p-4 text-[#879477]">{new Date(req.created_at || Date.now()).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      req.status === 'Completed'
                        ? 'bg-[#879477] text-white'
                        : req.status === 'In Production'
                        ? 'bg-[#C97882] text-white'
                        : 'bg-[#EFE6D8] text-[#3B2418]'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedReq(req);
                        setStatus(req.status);
                        setAdminNotes(req.admin_notes || '');
                      }}
                      className="px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg text-xs font-semibold hover:bg-[#EFE6D8]"
                    >
                      Manage & Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D8CBB9] pb-3">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#3B2418]">Custom Request #{selectedReq.request_code}</h3>
                <p className="text-xs text-[#879477]">Submitted on {new Date(selectedReq.created_at || Date.now()).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedReq(null)} className="text-xs font-bold text-[#C97882]">Close</button>
            </div>

            <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-[#D8CBB9] space-y-2 text-xs text-[#3B2418]">
              <p><strong>Customer Name:</strong> {selectedReq.customer_name}</p>
              <p><strong>Email:</strong> {selectedReq.email} | <strong>Phone:</strong> {selectedReq.phone}</p>
              <p><strong>Product Type:</strong> {selectedReq.product_type}</p>
              <p><strong>Colors:</strong> {selectedReq.preferred_color || 'None specified'}</p>
              <p><strong>Size / Dimensions:</strong> {selectedReq.size || 'Standard'}</p>
              <p><strong>Quantity:</strong> {selectedReq.quantity}</p>
              <p><strong>Budget Range:</strong> {selectedReq.budget}</p>
              <p><strong>Needed By Deadline:</strong> {selectedReq.deadline}</p>
            </div>

            <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] space-y-1 text-xs">
              <span className="font-bold text-[#879477] uppercase tracking-wider">Customer Craft Vision</span>
              <p className="italic text-[#3B2418] leading-relaxed">“{selectedReq.custom_description}”</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 pt-2 border-t border-[#D8CBB9]">
              <h4 className="font-serif font-bold text-lg text-[#3B2418]">Update Status & Response Quote</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-[#3B2418]">Status *</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-semibold text-[#3B2418]"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#3B2418]">Admin Response / Quote Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Quoted $140. Production starts Oct 15..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setSelectedReq(null)} className="px-4 py-2 bg-[#FAF7EF] border rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-[#C97882] text-white rounded-xl text-xs font-semibold shadow-rose-glow">
                  Save Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
