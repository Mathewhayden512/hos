import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, UserCheck, Loader2, X, Check } from 'lucide-react';
import { api } from '../../services/api';
import { Doctor, Department } from '../../types';
import { useToast } from '../../context/ToastContext';

export const DoctorManager: React.FC = () => {
  const { showToast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    department_id: '',
    name: '',
    specialization: '',
    qualification: '',
    experience_years: '5',
    gender: 'Male',
    bio: '',
    languages: 'English',
    consultation_fee: '150',
    image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [docs, depts] = await Promise.all([
        api.getDoctors(),
        api.getDepartments()
      ]);
      setDoctors(docs);
      setDepartments(depts);
      if (depts.length > 0 && !formData.department_id) {
        setFormData(prev => ({ ...prev, department_id: String(depts[0].id) }));
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to load doctors', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      department_id: departments.length > 0 ? String(departments[0].id) : '',
      name: '',
      specialization: '',
      qualification: 'MD',
      experience_years: '5',
      gender: 'Male',
      bio: '',
      languages: 'English',
      consultation_fee: '150',
      image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      department_id: String(doctor.department_id),
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience_years: String(doctor.experience_years),
      gender: doctor.gender,
      bio: doctor.bio || '',
      languages: doctor.languages || 'English',
      consultation_fee: String(doctor.consultation_fee),
      image_url: doctor.image_url || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialization || !formData.department_id) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        department_id: Number(formData.department_id),
        name: formData.name,
        specialization: formData.specialization,
        qualification: formData.qualification,
        experience_years: Number(formData.experience_years),
        gender: formData.gender,
        bio: formData.bio,
        languages: formData.languages,
        consultation_fee: Number(formData.consultation_fee),
        image_url: formData.image_url
      };

      if (editingDoctor) {
        await api.updateDoctor(editingDoctor.id, payload);
        showToast('Doctor profile updated successfully', 'success');
      } else {
        await api.createDoctor(payload);
        showToast('New doctor added successfully', 'success');
      }

      setModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Error saving doctor', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to deactivate ${name}?`)) return;

    try {
      await api.deleteDoctor(id);
      showToast(`Doctor ${name} deactivated`, 'info');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to deactivate doctor', 'error');
    }
  };

  const filtered = doctors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase()) ||
    (d.department_name && d.department_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Doctor Management</h1>
          <p className="text-xs text-slate-400">Add, edit, assign departments, and update schedules.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by doctor name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-hospital-500"
        />
      </div>

      {/* Doctor Cards Table */}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading doctor directory...</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Specialization</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={doc.image_url} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block">{doc.name}</span>
                        <span className="text-xs text-slate-400">{doc.qualification}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-hospital-400">{doc.department_name}</td>
                    <td className="py-3 px-4 text-xs">{doc.specialization}</td>
                    <td className="py-3 px-4 text-xs">{doc.experience_years} Years</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 text-xs">${doc.consultation_fee}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(doc)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-hospital-600 text-slate-300 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Doctor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold">{editingDoctor ? 'Edit Doctor Profile' : 'Add New Specialist Doctor'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-400">Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400">Assigned Department *</label>
                  <select
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  >
                    {departments.map((dep) => (
                      <option key={dep.id} value={dep.id}>{dep.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400">Qualifications</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400">Experience (Years)</label>
                  <input
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={formData.consultation_fee}
                    onChange={(e) => setFormData({ ...formData, consultation_fee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-slate-400">Doctor Photo Image URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-slate-400">Doctor Biography</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-hospital-600 hover:bg-hospital-500 text-white font-bold flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingDoctor ? 'Save Changes' : 'Create Doctor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
