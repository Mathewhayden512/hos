import React, { useState, useEffect } from 'react';
import { Save, Building, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { HospitalInfo } from '../../types';
import { useToast } from '../../context/ToastContext';

export const HospitalInfoEditor: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<HospitalInfo>>({
    name: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    emergency_phone: '',
    working_hours: '',
    mission: '',
    vision: ''
  });

  useEffect(() => {
    loadInfo();
  }, []);

  async function loadInfo() {
    try {
      setLoading(true);
      const data = await api.getHospitalInfo();
      setFormData(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load hospital settings', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updateHospitalInfo(formData);
      showToast('Hospital information updated successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update hospital info', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div>
        <h1 className="text-2xl font-bold text-white">Hospital Information Settings</h1>
        <p className="text-xs text-slate-400">Edit general hospital details, emergency hotlines, address, mission, and vision.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 text-xs text-slate-200">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-semibold text-slate-400">Hospital Legal Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-400">Hospital Tagline / Motto</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="block font-semibold text-slate-400">Hospital Overview Description</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="block font-semibold text-slate-400">Physical Address</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-400">General Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-rose-400">Emergency Hotline (24/7)</label>
            <input
              type="text"
              value={formData.emergency_phone || ''}
              onChange={(e) => setFormData({ ...formData, emergency_phone: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-rose-900/50 rounded-xl text-rose-200 focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-400">Public Contact Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-400">OPD & Emergency Working Hours</label>
            <input
              type="text"
              value={formData.working_hours || ''}
              onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="block font-semibold text-slate-400">Hospital Mission Statement</label>
            <textarea
              rows={2}
              value={formData.mission || ''}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="block font-semibold text-slate-400">Hospital Vision Statement</label>
            <textarea
              rows={2}
              value={formData.vision || ''}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Hospital Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
