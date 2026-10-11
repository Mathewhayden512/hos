import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { Coupon } from '../../types';
import { Plus, Tag, Trash2, Edit2 } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { showToast } = useShop();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountAmount, setDiscountAmount] = useState(10);
  const [minOrder, setMinOrder] = useState(20);
  const [expirationDate, setExpirationDate] = useState('2026-12-31');

  const loadCoupons = async () => {
    try {
      const res = await api.getCoupons();
      setCoupons(res);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setCode('WELCOME10');
    setDiscountType('percentage');
    setDiscountAmount(10);
    setMinOrder(20);
    setExpirationDate('2026-12-31');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await api.updateCoupon(editingCoupon.id, {
          code,
          discount_type: discountType,
          discount_amount: discountAmount,
          min_order: minOrder,
          expiration_date: expirationDate,
        });
        showToast('Coupon updated!', 'success');
      } else {
        await api.createCoupon({
          code,
          discount_type: discountType,
          discount_amount: discountAmount,
          min_order: minOrder,
          expiration_date: expirationDate,
        });
        showToast('Coupon created!', 'success');
      }
      setIsModalOpen(false);
      loadCoupons();
    } catch (err: any) {
      showToast(err.message || 'Error saving coupon', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete coupon code?')) return;
    try {
      await api.deleteCoupon(id);
      showToast('Coupon deleted', 'info');
      loadCoupons();
    } catch (err: any) {
      showToast(err.message || 'Error', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Discount Coupon Management</h1>
          <p className="text-xs text-[#879477]">Create percentage and fixed dollar promotional codes</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#C97882] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((cpn) => (
          <div key={cpn.id} className="bg-[#FFFDF9] rounded-2xl border border-[#D8CBB9] p-5 shadow-stitch space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-bold bg-[#FAF0F2] text-[#C97882] px-3 py-1 rounded-xl border border-[#E8B5B8]">
                {cpn.code}
              </span>
              <span className="text-[10px] font-bold uppercase text-[#879477]">
                {cpn.times_used} times used
              </span>
            </div>
            <p className="font-serif font-bold text-xl text-[#3B2418]">
              {cpn.discount_type === 'percentage' ? `${cpn.discount_amount}% OFF` : `$${cpn.discount_amount} OFF`}
            </p>
            <p className="text-xs text-[#879477]">Min Order Subtotal: <strong>${cpn.min_order}</strong></p>
            <p className="text-[11px] text-[#3B2418]/70">Expires: {cpn.expiration_date || 'No Expiration'}</p>

            <div className="pt-3 border-t border-[#D8CBB9]/60 flex justify-end gap-2">
              <button onClick={() => handleDelete(cpn.id)} className="p-1.5 bg-[#FAF0F2] border border-[#E8B5B8] rounded-lg text-[#C97882]">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3B2418]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] max-w-md w-full rounded-3xl p-6 border border-[#D8CBB9] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#3B2418]">Create Discount Coupon</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#3B2418]">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WELCOME10"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-mono uppercase"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3B2418]">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e: any) => setDiscountType(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Dollar ($)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#3B2418]">Discount Value *</label>
                <input
                  type="number"
                  required
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3B2418]">Minimum Order Subtotal ($)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3B2418]">Expiration Date</label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-[#FAF7EF] border rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#C97882] text-white rounded-xl font-semibold">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
