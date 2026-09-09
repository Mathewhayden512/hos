export interface Department {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  services: string[];
  image_url: string;
  is_active: number;
  doctor_count?: number;
}

export interface DoctorSchedule {
  id: number;
  doctor_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}

export interface Doctor {
  id: number;
  department_id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  gender: string;
  bio: string;
  languages: string;
  consultation_fee: number;
  image_url: string;
  is_active: number;
  department_name?: string;
  department_slug?: string;
  department_description?: string;
  schedules?: DoctorSchedule[];
}

export interface Patient {
  id: number;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  created_at: string;
  total_appointments?: number;
}

export interface Appointment {
  id: number;
  appointment_code: string;
  patient_id?: number;
  doctor_id?: number;
  department_id?: number;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  created_at: string;
  patient_name?: string;
  patient_age?: number;
  patient_gender?: string;
  patient_phone?: string;
  patient_email?: string;
  doctor_name?: string;
  doctor_specialization?: string;
  doctor_image?: string;
  consultation_fee?: number;
  department_name?: string;
}

export interface TimeSlot {
  time24: string;
  time12: string;
  isBooked: boolean;
  isAvailable: boolean;
}

export interface Facility {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  icon: string;
  is_active: number;
}

export interface Review {
  id: number;
  patient_name: string;
  rating: number;
  comment: string;
  department: string;
  date: string;
}

export interface HospitalInfo {
  id: number;
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  emergency_phone: string;
  working_hours: string;
  mission: string;
  vision: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  reviews?: Review[];
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalDepartments: number;
  todayAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
  completedAppointments: number;
}

export interface User {
  id: number;
  email: string;
  role: 'admin';
}
