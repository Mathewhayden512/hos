import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminLayout } from '../components/admin/AdminLayout';
import { DashboardOverview } from '../components/admin/DashboardOverview';
import { DoctorManager } from '../components/admin/DoctorManager';
import { DepartmentManager } from '../components/admin/DepartmentManager';
import { AppointmentManager } from '../components/admin/AppointmentManager';
import { PatientManager } from '../components/admin/PatientManager';
import { FacilityManager } from '../components/admin/FacilityManager';
import { HospitalInfoEditor } from '../components/admin/HospitalInfoEditor';

export const AdminDashboardPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <DashboardOverview onNavigate={setActiveTab} />}
      {activeTab === 'doctors' && <DoctorManager />}
      {activeTab === 'departments' && <DepartmentManager />}
      {activeTab === 'appointments' && <AppointmentManager />}
      {activeTab === 'patients' && <PatientManager />}
      {activeTab === 'facilities' && <FacilityManager />}
      {activeTab === 'settings' && <HospitalInfoEditor />}
    </AdminLayout>
  );
};
