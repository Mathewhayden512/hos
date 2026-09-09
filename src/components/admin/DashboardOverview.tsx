import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Building2, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  CheckCheck, 
  Loader2, 
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';
import { DashboardStats, Appointment } from '../../types';
import { useToast } from '../../context/ToastContext';

interface Props {
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<Props> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const res = await api.getAdminStats();
      setStats(res.stats);
      setRecentAppointments(res.recentAppointments || []);
    } catch (err: any) {
      showToast(err.message || 'Failed to load dashboard statistics', 'error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Fetching analytics data...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Patients', value: stats?.totalPatients || 0, icon: Users, color: 'border-hospital-500/40 bg-hospital-950/40 text-hospital-400' },
    { label: 'Active Specialists', value: stats?.totalDoctors || 0, icon: UserCheck, color: 'border-teal-500/40 bg-teal-950/40 text-teal-400' },
    { label: 'Departments', value: stats?.totalDepartments || 0, icon: Building2, color: 'border-sky-500/40 bg-sky-950/40 text-sky-400' },
    { label: "Today's Appointments", value: stats?.todayAppointments || 0, icon: CalendarCheck, color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-400' },
    { label: 'Pending Confirmations', value: stats?.pendingAppointments || 0, icon: Clock, color: 'border-amber-500/40 bg-amber-950/40 text-amber-400' },
    { label: 'Confirmed Appointments', value: stats?.confirmedAppointments || 0, icon: CheckCircle2, color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400' },
    { label: 'Cancelled', value: stats?.cancelledAppointments || 0, icon: XCircle, color: 'border-rose-500/40 bg-rose-950/40 text-rose-400' },
    { label: 'Completed', value: stats?.completedAppointments || 0, icon: CheckCheck, color: 'border-blue-500/40 bg-blue-950/40 text-blue-400' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Hospital Administration Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time stats overview & master appointment records.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all hover:scale-[1.02] ${card.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">{card.label}</span>
                <Icon className="w-5 h-5 opacity-80" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-white">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Appointments</h3>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs font-bold text-hospital-400 hover:text-hospital-300 flex items-center gap-1"
          >
            <span>View Master List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-mono font-bold text-hospital-400">{apt.appointment_code}</td>
                  <td className="py-3 px-4 font-medium text-white">{apt.patient_name}</td>
                  <td className="py-3 px-4">{apt.doctor_name}</td>
                  <td className="py-3 px-4 text-xs">{apt.department_name}</td>
                  <td className="py-3 px-4 text-xs text-slate-400">{apt.appointment_date} @ {apt.appointment_time}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
