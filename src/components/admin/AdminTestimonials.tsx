import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, Quote } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const { showToast } = useShop();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [role, setRole] = useState('Verified Customer');
  const [comment, setComment] = useState('');

  const loadTestimonials = async () => {
    try {
      const res = await api.getTestimonials();
      setTestimonials(res);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setCustomerName('');
    setRole('Verified Buyer');
    setComment('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    try {
      if (editingId) {
        await api.updateTestimonial(editingId, { customer_name: customerName, location_or_role: role, comment });
        showToast('Testimonial updated!', 'success');
      } else {
        await api.createTestimonial({ customer_name: customerName, location_or_role: role, comment, is_featured: 1 });
        showToast('Testimonial added to homepage!', 'success');
      }
      setIsModalOpen(false);
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      showToast('Testimonial deleted', 'info');
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Homepage Testimonials</h1>
          <p className="text-xs text-[#879477]">Manage customer review cards displayed on the homepage</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#C97882] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] p-6 shadow-stitch space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[#C97882]">★★★★★</div>
              <p className="font-serif italic text-sm text-[#3B2418]">“{t.comment}”</p>
            </div>
            <div className="pt-3 border-t border-[#D8CBB9]/60 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-xs text-[#3B2418]">{t.customer_name}</p>
                <p className="text-[10px] text-[#879477]">{t.location_or_role}</p>
              </div>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 bg-[#FAF0F2] text-[#C97882] rounded-lg border border-[#E8B5B8]">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-md w-full rounded-3xl p-6 border border-[#D8CBB9] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#3B2418]">
              {editingId ? 'Edit Testimonial' : 'Add Customer Testimonial'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#3B2418]">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hannah & Caleb R."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-[#3B2418]">Role / Tagline</label>
                <input
                  type="text"
                  placeholder="Verified Customer / Custom Order Client"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-[#3B2418]">Quote / Testimonial Text *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Absolutely beautiful! The attention to detail was amazing."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-[#FAF7EF] border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#C97882] text-white rounded-xl font-semibold">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
