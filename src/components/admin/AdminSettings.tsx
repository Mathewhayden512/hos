import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { api } from '../../services/api';
import { Settings, Save, Check } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, refreshSettings, showToast } = useShop();
  const [form, setForm] = useState({ ...settings });
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateSettings(form);
      await refreshSettings();
      showToast('Store settings updated!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Admin Store Settings</h1>
        <p className="text-xs text-[#879477]">Configure business info, currency, shipping rates, tax rates, and social media channels</p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-stitch space-y-6">
        
        {/* Business Identity */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            1. Business Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#3B2418]">Brand / Business Name</label>
              <input
                type="text"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Support Email</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Contact Phone</label>
              <input
                type="text"
                value={form.contact_phone}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Studio Address</label>
              <input
                type="text"
                value={form.business_address}
                onChange={(e) => setForm({ ...form, business_address: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* E-Commerce Rates */}
        <div className="space-y-4 pt-2">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            2. Currency & Shipping Rates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#3B2418]">Currency Symbol</label>
              <input
                type="text"
                value={form.currency_symbol}
                onChange={(e) => setForm({ ...form, currency_symbol: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Default Shipping Charge ($)</label>
              <input
                type="text"
                value={form.shipping_charge}
                onChange={(e) => setForm({ ...form, shipping_charge: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Tax Percentage (%)</label>
              <input
                type="text"
                value={form.tax_percentage}
                onChange={(e) => setForm({ ...form, tax_percentage: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4 pt-2">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            3. Social Media Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#3B2418]">Instagram URL</label>
              <input
                type="url"
                value={form.instagram_url}
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Pinterest URL</label>
              <input
                type="url"
                value={form.pinterest_url}
                onChange={(e) => setForm({ ...form, pinterest_url: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Etsy Shop URL</label>
              <input
                type="url"
                value={form.etsy_url}
                onChange={(e) => setForm({ ...form, etsy_url: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-[#D8CBB9] flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-[#C97882] hover:bg-[#b0616b] text-white font-semibold text-xs rounded-xl shadow-rose-glow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
