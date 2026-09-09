import React, { useState, useEffect } from 'react';
import { Search, Users, History, Loader2, X } from 'lucide-react';
import { api } from '../../services/api';
import { Patient, Appointment } from '../../types';
import { useToast } from '../../context/ToastContext';

export const PatientManager: React.FC = () => {
  const { showToast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // History Modal
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setLoading(true);
      const data = await api.getPatients(search);
      setPatients(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load patients', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleViewHistory = async (patient: Patient) => {
    try {
      setSelectedPatient(patient);
      setHistoryLoading(true);
      const res = await api.getPatientHistory(patient.id);
      setHistory(res.history || []);
    } catch (err: any) {
      showToast(err.message || 'Failed to load patient history', 'error');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPatients();
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-white">Patient Directory</h1>
        <p className="text-xs text-slate-400">View registered patients and their appointment histories.</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by patient name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-hospital-500"
        />
      </form>

      {/* Patients Table */}
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-hospital-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading patients...</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Age / Gender</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Total Appointments</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {patients.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">{pat.full_name}</td>
                    <td className="py-3 px-4 text-xs">{pat.age} Yrs ({pat.gender})</td>
                    <td className="py-3 px-4 text-xs">{pat.phone}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{pat.email}</td>
                    <td className="py-3 px-4 font-bold text-hospital-400 text-xs">{pat.total_appointments || 1} Bookings</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleViewHistory(pat)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-hospital-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 ml-auto"
                      >
                        <History className="w-3.5 h-3.5" />
                        <span>History</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* History Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold">{selectedPatient.full_name}'s Medical History</h2>
                <p className="text-xs text-slate-400">{selectedPatient.phone} • {selectedPatient.email}</p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {historyLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="w-6 h-6 text-hospital-400 animate-spin mx-auto mb-2" />
                <p className="text-xs text-slate-400">Loading history...</p>
              </div>
            ) : history.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No past appointment history found.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {history.map((apt) => (
                  <div key={apt.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{apt.appointment_code}</span>
                      <span className="text-hospital-400">{apt.status}</span>
                    </div>
                    <p><span className="text-slate-400">Doctor:</span> {apt.doctor_name} ({apt.department_name})</p>
                    <p><span className="text-slate-400">Date:</span> {apt.appointment_date} @ {apt.appointment_time}</p>
                    <p className="text-slate-400 italic">"{apt.reason}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
