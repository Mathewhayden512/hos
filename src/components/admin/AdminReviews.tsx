import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Review } from '../../types';
import { Star, CheckCircle, EyeOff, Trash2 } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { showToast } = useShop();
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = async () => {
    try {
      const res = await api.getReviews(undefined, true);
      setReviews(res);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApprove = async (id: number, currentApproved: boolean) => {
    try {
      await api.approveReview(id, !currentApproved);
      showToast(currentApproved ? 'Review hidden from store' : 'Review approved for display', 'info');
      loadReviews();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete review permanently?')) return;
    try {
      await api.deleteReview(id);
      showToast('Review deleted', 'info');
      loadReviews();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Customer Review Moderation</h1>
        <p className="text-xs text-[#879477]">Approve, hide, or moderate product ratings left by customers</p>
      </div>

      <div className="bg-[#FFFDF9] rounded-3xl border border-[#D8CBB9] overflow-hidden shadow-stitch">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3B2418]">
            <thead className="bg-[#FAF7EF] border-b border-[#D8CBB9] font-bold text-[#879477] uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review Comment</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                  <td className="p-4 font-bold text-[#3B2418]">{rev.customer_name}</td>
                  <td className="p-4 text-[#C97882] font-bold flex gap-0.5">
                    {'★'.repeat(rev.rating)}
                  </td>
                  <td className="p-4 max-w-sm line-clamp-2">{rev.comment}</td>
                  <td className="p-4 text-[#879477]">{new Date(rev.created_at || Date.now()).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      rev.is_approved ? 'bg-[#879477] text-white' : 'bg-[#FAF0F2] text-[#C97882]'
                    }`}>
                      {rev.is_approved ? 'Approved' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleApprove(rev.id, !!rev.is_approved)}
                      className="px-3 py-1.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-lg font-semibold"
                    >
                      {rev.is_approved ? 'Hide' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-1.5 bg-[#FAF0F2] border border-[#E8B5B8] text-[#C97882] rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
