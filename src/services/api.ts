import { Department, Doctor, Facility, HospitalInfo, Appointment, TimeSlot, DashboardStats, Patient } from '../types';

const API_BASE = '/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('hospital_admin_token');
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(errorData.error || 'An unexpected error occurred');
  }
  return res.json();
}

export const api = {
  // Hospital Information & Reviews
  async getHospitalInfo(): Promise<HospitalInfo> {
    const res = await fetch(`${API_BASE}/hospital/info`);
    return handleResponse<HospitalInfo>(res);
  },

  async updateHospitalInfo(data: Partial<HospitalInfo>): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/hospital/info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ message: string }>(res);
  },

  // Departments
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_BASE}/departments`);
    return handleResponse<Department[]>(res);
  },

  async getDepartmentById(idOrSlug: string | number): Promise<Department & { doctors: Doctor[] }> {
    const res = await fetch(`${API_BASE}/departments/${idOrSlug}`);
    return handleResponse<Department & { doctors: Doctor[] }>(res);
  },

  async createDepartment(data: Partial<Department>): Promise<{ id: number; message: string }> {
    const res = await fetch(`${API_BASE}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ id: number; message: string }>(res);
  },

  async updateDepartment(id: number, data: Partial<Department>): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/departments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ message: string }>(res);
  },

  async deleteDepartment(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/departments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ message: string }>(res);
  },

  // Doctors
  async getDoctors(filters?: { departmentId?: number; specialization?: string; gender?: string; search?: string }): Promise<Doctor[]> {
    const query = new URLSearchParams();
    if (filters?.departmentId) query.set('departmentId', String(filters.departmentId));
    if (filters?.specialization) query.set('specialization', filters.specialization);
    if (filters?.gender) query.set('gender', filters.gender);
    if (filters?.search) query.set('search', filters.search);

    const res = await fetch(`${API_BASE}/doctors?${query.toString()}`);
    return handleResponse<Doctor[]>(res);
  },

  async getDoctorById(id: number): Promise<Doctor> {
    const res = await fetch(`${API_BASE}/doctors/${id}`);
    return handleResponse<Doctor>(res);
  },

  async createDoctor(data: any): Promise<{ id: number; message: string }> {
    const res = await fetch(`${API_BASE}/doctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ id: number; message: string }>(res);
  },

  async updateDoctor(id: number, data: any): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ message: string }>(res);
  },

  async deleteDoctor(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ message: string }>(res);
  },

  // Facilities
  async getFacilities(): Promise<Facility[]> {
    const res = await fetch(`${API_BASE}/facilities`);
    return handleResponse<Facility[]>(res);
  },

  async createFacility(data: Partial<Facility>): Promise<{ id: number; message: string }> {
    const res = await fetch(`${API_BASE}/facilities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ id: number; message: string }>(res);
  },

  async updateFacility(id: number, data: Partial<Facility>): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/facilities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse<{ message: string }>(res);
  },

  async deleteFacility(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/facilities/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ message: string }>(res);
  },

  // Appointment Engine
  async getAvailableSlots(doctorId: number, date: string): Promise<{ available: boolean; message?: string; slots: TimeSlot[] }> {
    const res = await fetch(`${API_BASE}/appointments/available-slots?doctorId=${doctorId}&date=${date}`);
    return handleResponse<{ available: boolean; message?: string; slots: TimeSlot[] }>(res);
  },

  async createAppointment(data: {
    department_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    full_name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    reason: string;
  }): Promise<{ message: string; appointment: Appointment }> {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse<{ message: string; appointment: Appointment }>(res);
  },

  async lookupAppointment(codeOrId: string): Promise<Appointment> {
    const res = await fetch(`${API_BASE}/appointments/lookup/${codeOrId}`);
    return handleResponse<Appointment>(res);
  },

  // Admin Endpoints
  async getAdminStats(): Promise<{ stats: DashboardStats; recentAppointments: Appointment[] }> {
    const res = await fetch(`${API_BASE}/admin/dashboard-stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse<{ stats: DashboardStats; recentAppointments: Appointment[] }>(res);
  },

  async getAdminAppointments(filters?: { date?: string; doctorId?: number; departmentId?: number; status?: string; search?: string }): Promise<Appointment[]> {
    const query = new URLSearchParams();
    if (filters?.date) query.set('date', filters.date);
    if (filters?.doctorId) query.set('doctorId', String(filters.doctorId));
    if (filters?.departmentId) query.set('departmentId', String(filters.departmentId));
    if (filters?.status) query.set('status', filters.status);
    if (filters?.search) query.set('search', filters.search);

    const res = await fetch(`${API_BASE}/appointments/admin/all?${query.toString()}`, {
      headers: getAuthHeaders()
    });
    return handleResponse<Appointment[]>(res);
  },

  async updateAppointmentStatus(id: number, status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status })
    });
    return handleResponse<{ message: string }>(res);
  },

  async getPatients(search?: string): Promise<Patient[]> {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const res = await fetch(`${API_BASE}/admin/patients${query}`, {
      headers: getAuthHeaders()
    });
    return handleResponse<Patient[]>(res);
  },

  async getPatientHistory(id: number): Promise<{ patient: Patient; history: Appointment[] }> {
    const res = await fetch(`${API_BASE}/admin/patients/${id}/appointments`, {
      headers: getAuthHeaders()
    });
    return handleResponse<{ patient: Patient; history: Appointment[] }>(res);
  }
};
