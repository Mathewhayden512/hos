import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Award, CheckCircle2, Loader2, UserCheck } from 'lucide-react';
import { api } from '../services/api';
import { Doctor, Department } from '../types';
import { DoctorModal } from '../components/doctors/DoctorModal';

export const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedDeptId, selectedGender]);

  async function loadData() {
    try {
      setLoading(true);
      const [docs, depts] = await Promise.all([
        api.getDoctors({
          departmentId: selectedDeptId ? Number(selectedDeptId) : undefined,
          gender: selectedGender || undefined,
          search: search || undefined
        }),
        api.getDepartments()
      ]);
      setDoctors(docs);
      setDepartments(depts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block">EXPERT PHYSICIANS</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Specialist Doctor Directory</h1>
          <p className="text-slate-300 text-base max-w-2xl">
            Find board-certified specialist doctors, check consultation fees, view schedules, and book online instantly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search doctor by name, qualification, or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-hospital-500"
              />
            </div>

            {/* Department Filter */}
            <div className="w-full md:w-56">
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-hospital-500"
              >
                <option value="">All Departments</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>{dep.name}</option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="w-full md:w-40">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-hospital-500"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Apply Filters
            </button>

          </form>
        </div>

        {/* Doctor Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-hospital-600 animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Searching specialist doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-100 p-8">
            <p className="text-slate-600 font-bold">No doctors found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedDeptId('');
                setSelectedGender('');
                setSearch('');
              }}
              className="mt-3 text-xs text-hospital-600 font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doctor.image_url}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{doctor.experience_years} Yrs Exp</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-hospital-600 block">
                        {doctor.department_name}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-hospital-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">{doctor.specialization}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>Qualification:</span>
                      <span className="font-semibold text-slate-700">{doctor.qualification}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Consultation Fee:</span>
                      <span className="font-bold text-emerald-600 text-sm">${doctor.consultation_fee}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    Profile
                  </button>
                  <Link
                    to={`/book-appointment?doctorId=${doctor.id}&deptId=${doctor.department_id}`}
                    className="flex-1 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}

    </div>
  );
};
