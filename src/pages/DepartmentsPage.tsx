import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  Sparkles, 
  Stethoscope, 
  UserCheck, 
  Ear, 
  Activity, 
  ShieldAlert, 
  Wind, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import { Department, Doctor } from '../types';
import { DepartmentModal } from '../components/departments/DepartmentModal';

const iconMap: Record<string, any> = {
  Heart, Brain, Bone, Baby, Sparkles, Stethoscope, UserCheck, Ear, Activity, ShieldAlert, Wind
};

export const DepartmentsPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [deptsData, docsData] = await Promise.all([
          api.getDepartments(),
          api.getDoctors()
        ]);
        setDepartments(deptsData);
        setDoctors(docsData);

        if (slug) {
          const match = deptsData.find(d => d.slug === slug);
          if (match) setSelectedDept(match);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block">SPECIALIZED CLINICAL CARE</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Clinical Departments & Centers of Excellence</h1>
          <p className="text-slate-300 text-base max-w-2xl">
            Explore our 12 specialized departments offering comprehensive inpatient, outpatient, and surgical care.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search departments (e.g. Cardiology, Neurology)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-hospital-500 shadow-sm"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-hospital-600 animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Loading department catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dept) => {
              const IconComp = iconMap[dept.icon] || Activity;
              const assignedDocs = doctors.filter(d => d.department_id === dept.id);

              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-5">
                      <img src={dept.image_url} alt={dept.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-hospital-600 shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-hospital-600 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{dept.description}</p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Array.isArray(dept.services) && dept.services.slice(0, 3).map((srv, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-hospital-50 text-hospital-700 text-xs font-medium">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedDept(dept)}
                      className="text-xs font-bold text-hospital-600 hover:underline"
                    >
                      View Details & Doctors ({assignedDocs.length})
                    </button>

                    <Link
                      to={`/book-appointment?deptId=${dept.id}`}
                      className="px-4 py-2 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedDept && (
        <DepartmentModal
          department={selectedDept}
          doctors={doctors.filter(d => d.department_id === selectedDept.id)}
          onClose={() => setSelectedDept(null)}
        />
      )}

    </div>
  );
};
