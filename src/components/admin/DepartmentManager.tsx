import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2, Loader2, X } from 'lucide-react';
import { api } from '../../services/api';
import { Department } from '../../types';
import { useToast } from '../../context/ToastContext';

export const DepartmentManager: React.FC = () => {
  const { showToast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: 'Activity',
    description: '',
    servicesStr: '',
    image_url: ''
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      setLoading(true);
      const data = await api.getDepartments();
      setDepartments(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load departments', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({
      name: '',
      icon: 'Activity',
      description: '',
      servicesStr: 'Service 1, Service 2, Service 3',
      image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      icon: dept.icon || 'Activity',
      description: dept.description,
      servicesStr: Array.isArray(dept.services) ? dept.services.join(', ') : '',
      image_url: dept.image_url || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      showToast('Name and description required', 'error');
      return;
    }

    try {
      setSaving(true);
      const services = formData.servicesStr.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        name: formData.name,
        icon: formData.icon,
        description: formData.description,
        services,
        image_url: formData.image_url
      };

      if (editingDept) {
        await api.updateDepartment(editingDept.id, payload);
        showToast('Department updated successfully', 'success');
      } else {
        await api.createDepartment(payload);
        showToast('New department created successfully', 'success');
      }

      setModalOpen(false);
      loadDepartments();
    } catch (err: any) {
      showToast(err.message || 'Error saving department', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Deactivate department ${name}?`)) return;

    try {
      await api.deleteDepartment(id);
      showToast(`Department ${name} deactivated`, 'info');
      loadDepartments();
    } catch (err: any) {
      showToast(err.message || 'Failed to deactivate department', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Department Management</h1>
          <p className="text-xs text-slate-400">Manage clinical departments, services offered, and assigned specialists.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading departments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-hospital-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {dept.doctor_count || 0} Doctors
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{dept.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{dept.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {Array.isArray(dept.services) && dept.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(dept)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-hospital-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(dept.id, dept.name)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Deactivate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold">{editingDept ? 'Edit Department' : 'Add New Department'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-400">Department Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400">Services Offered (comma separated)</label>
                <input
                  type="text"
                  value={formData.servicesStr}
                  onChange={(e) => setFormData({ ...formData, servicesStr: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-hospital-600 font-bold text-white flex items-center gap-1.5">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Department</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
