import React, { useState, useEffect } from 'react';
import { Search, Filter, CalendarCheck, CheckCircle2, XCircle, CheckCheck, Clock, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { Appointment } from '../../types';
import { useToast } from '../../context/ToastContext';

export const AppointmentManager: React.FC = () => {
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadAppointments();
  }, [statusFilter]);

  async function loadAppointments() {
    try {
      setLoading(true);
      const data = await api.getAdminAppointments({ status: statusFilter, search });
      setAppointments(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load appointments', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed') => {
    try {
      await api.updateAppointmentStatus(id, newStatus);
      showToast(`Appointment status updated to ${newStatus}`, 'success');
      loadAppointments();
    } catch (err: any) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadAppointments();
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-white">Master Appointment Management</h1>
        <p className="text-xs text-slate-400">View, search, filter, confirm, or cancel patient bookings.</p>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient name, code, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-hospital-500"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold focus:ring-2 focus:ring-hospital-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* Appointments Table */}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Fetching appointment records...</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Patient Info</th>
                  <th className="py-3 px-4">Doctor & Dept</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Update Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-mono font-bold text-hospital-400 text-xs">{apt.appointment_code}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-white block">{apt.patient_name}</span>
                      <span className="text-xs text-slate-400 block">{apt.patient_phone} • {apt.patient_email}</span>
                      <span className="text-[11px] text-slate-500 italic block mt-0.5">"{apt.reason}"</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200 block">{apt.doctor_name}</span>
                      <span className="text-xs text-hospital-400 block">{apt.department_name}</span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="font-bold text-white block">{apt.appointment_date}</span>
                      <span className="text-slate-400 block">{apt.appointment_time}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        apt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        apt.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        apt.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900 text-xs font-bold"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status !== 'Completed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-400 border border-blue-800 hover:bg-blue-900 text-xs font-bold"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 hover:bg-rose-900 text-xs font-bold"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
