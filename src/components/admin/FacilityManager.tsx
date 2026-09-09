import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ShieldAlert, Loader2, X } from 'lucide-react';
import { api } from '../../services/api';
import { Facility } from '../../types';
import { useToast } from '../../context/ToastContext';

export const FacilityManager: React.FC = () => {
  const { showToast } = useToast();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFac, setEditingFac] = useState<Facility | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Emergency Services',
    description: '',
    image_url: '',
    icon: 'Shield'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFacilities();
  }, []);

  async function loadFacilities() {
    try {
      setLoading(true);
      const data = await api.getFacilities();
      setFacilities(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load facilities', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingFac(null);
    setFormData({
      name: '',
      category: 'Emergency Services',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      icon: 'Shield'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (fac: Facility) => {
    setEditingFac(fac);
    setFormData({
      name: fac.name,
      category: fac.category,
      description: fac.description,
      image_url: fac.image_url || '',
      icon: fac.icon || 'Shield'
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      showToast('Facility name and description required', 'error');
      return;
    }

    try {
      setSaving(true);
      if (editingFac) {
        await api.updateFacility(editingFac.id, formData);
        showToast('Facility updated successfully', 'success');
      } else {
        await api.createFacility(formData);
        showToast('New facility added successfully', 'success');
      }

      setModalOpen(false);
      loadFacilities();
    } catch (err: any) {
      showToast(err.message || 'Error saving facility', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Deactivate facility ${name}?`)) return;

    try {
      await api.deleteFacility(id);
      showToast(`Facility ${name} deactivated`, 'info');
      loadFacilities();
    } catch (err: any) {
      showToast(err.message || 'Failed to deactivate facility', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Facility Management</h1>
          <p className="text-xs text-slate-400">Add, edit, or upload photos for hospital infrastructure & facilities.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Facility</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading facilities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <div key={fac.id} className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <img src={fac.image_url} alt={fac.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                <span className="text-[10px] font-bold uppercase text-hospital-400 tracking-wider block mb-1">{fac.category}</span>
                <h3 className="text-base font-bold text-white mb-2">{fac.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{fac.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-900 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(fac)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-hospital-600 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fac.id, fac.name)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold">{editingFac ? 'Edit Facility' : 'Add Facility'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Facility Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-hospital-600 font-bold text-white">
                  {saving ? 'Saving...' : 'Save Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
