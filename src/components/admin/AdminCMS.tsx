import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { api } from '../../services/api';
import { FileText, Save } from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const { settings, refreshSettings, showToast } = useShop();
  const [form, setForm] = useState({ ...settings });
  const [loading, setLoading] = useState(false);

  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateSettings(form);
      await refreshSettings();
      showToast('Website content updated successfully! Live website refreshed.', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving content', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#3B2418]">Website Content Management (CMS)</h1>
        <p className="text-xs text-[#879477]">Update homepage hero text, announcement banners, about story, and footer links without modifying code</p>
      </div>

      <form onSubmit={handleSaveCMS} className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D8CBB9] shadow-stitch space-y-6">
        
        {/* 1. Announcement Banner & Tagline */}
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            1. Top Announcement Banner & Tagline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="font-semibold text-[#3B2418]">Announcement Banner Text</label>
              <input
                type="text"
                value={form.announcement_banner}
                onChange={(e) => setForm({ ...form, announcement_banner: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Brand Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-serif italic"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">Free Shipping Threshold ($)</label>
              <input
                type="text"
                value={form.free_shipping_threshold}
                onChange={(e) => setForm({ ...form, free_shipping_threshold: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 2. Homepage Hero Content */}
        <div className="space-y-4 pt-2">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            2. Homepage Hero Section
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#3B2418]">Hero Main Subtext</label>
              <textarea
                rows={2}
                value={form.hero_subtext}
                onChange={(e) => setForm({ ...form, hero_subtext: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 3. About Page Story Content */}
        <div className="space-y-4 pt-2">
          <h2 className="font-serif font-bold text-xl text-[#3B2418] border-b border-[#D8CBB9]/60 pb-2">
            3. About Page Brand Narrative
          </h2>

          <div className="grid grid-cols-1 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#3B2418]">About Headline</label>
              <input
                type="text"
                value={form.about_headline}
                onChange={(e) => setForm({ ...form, about_headline: e.target.value })}
                className="w-full mt-1 p-3 bg-[#FAF7EF] border border-[#D8CBB9] rounded-xl font-serif"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B2418]">About Narrative Paragraph</label>
              <textarea
                rows={4}
                value={form.about_text}
                onChange={(e) => setForm({ ...form, about_text: e.target.value })}
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
            <span>{loading ? 'Saving CMS...' : 'Save Website Content'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
