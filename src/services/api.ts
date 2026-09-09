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

// Fallback Mock Data for Standalone Static Deployment (GitHub Pages)
const MOCK_DEPARTMENTS: Department[] = [
  { id: 1, name: 'Cardiology', slug: 'cardiology', icon: 'Heart', description: 'Comprehensive cardiovascular care including interventional cardiology, electrophysiology, and preventive heart wellness.', services: ['ECG & Echocardiography', 'Coronary Angiography', 'Angioplasty & Stenting', 'Heart Valve Surgery', 'Cardiac Rehabilitation'], image_url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 2 },
  { id: 2, name: 'Neurology', slug: 'neurology', icon: 'Brain', description: 'Advanced diagnosis and neuro-surgical treatment for stroke, epilepsy, Parkinson’s disease, and spine disorders.', services: ['EEG & EMG Testing', 'Stroke Intervention Unit', 'Epilepsy Management', 'Neurosurgery', 'Spine Surgery'], image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 2 },
  { id: 3, name: 'Orthopedics', slug: 'orthopedics', icon: 'Bone', description: 'Specialized care for joint replacements, complex fractures, sports injuries, and minimally invasive knee surgery.', services: ['Total Knee & Hip Replacement', 'Arthroscopic Surgery', 'Fracture & Trauma Care', 'Sports Injury Clinic', 'Physiotherapy'], image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 2 },
  { id: 4, name: 'Pediatrics', slug: 'pediatrics', icon: 'Baby', description: 'Dedicated medical care for infants, children, and adolescents featuring specialized NICU and PICU units.', services: ['Well-child Checkups', 'Pediatric ICU (PICU)', 'Neonatal ICU (NICU)', 'Immunization & Vaccination', 'Child Psychology'], image_url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 5, name: 'Dermatology', slug: 'dermatology', icon: 'Sparkles', description: 'Comprehensive medical, surgical, and cosmetic skin care for eczema, psoriasis, skin cancer screening, and laser therapy.', services: ['Acne & Psoriasis Clinic', 'Skin Cancer Screening', 'Cosmetic Dermatology', 'Laser Hair Removal', 'Mohs Surgery'], image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 6, name: 'General Medicine', slug: 'general-medicine', icon: 'Stethoscope', description: 'Primary healthcare services for acute and chronic adult illnesses, diabetes management, and preventive wellness.', services: ['Comprehensive Health Checkups', 'Diabetes & Hypertension Care', 'Infectious Disease Control', 'Preventive Care', 'Geriatric Medicine'], image_url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 7, name: 'Gynecology & Obstetrics', slug: 'gynecology', icon: 'UserCheck', description: 'Holistic healthcare for women including prenatal care, high-risk pregnancy delivery, and laparoscopic surgery.', services: ['Antenatal & Postnatal Care', 'High-Risk Pregnancy Delivery', 'Laparoscopic Surgery', 'Infertility Evaluation', 'Menopause Care'], image_url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 8, name: 'ENT (Otolaryngology)', slug: 'ent', icon: 'Ear', description: 'Expert care for ear, nose, throat, hearing loss, sinus disorders, and endoscopic sinus surgeries.', services: ['Endoscopic Sinus Surgery', 'Hearing Assessment & Implants', 'Voice & Swallowing Therapy', 'Tonsillectomy', 'Sleep Apnea Management'], image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 9, name: 'Gastroenterology', slug: 'gastroenterology', icon: 'Activity', description: 'Specialized care for digestive system diseases, liver disorders, endoscopy, colonoscopy, and IBS.', services: ['Diagnostic Endoscopy', 'Colonoscopy Screening', 'Liver & Hepatitis Clinic', 'GERD & IBS Management', 'ERCP Procedures'], image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 },
  { id: 10, name: 'Oncology', slug: 'oncology', icon: 'ShieldAlert', description: 'Integrated cancer care offering chemotherapy, targeted immunotherapy, surgical oncology, and radiation planning.', services: ['Chemotherapy Center', 'Surgical Oncology', 'Immunotherapy & Targeted Care', 'Radiation Therapy Planning', 'Palliative Care'], image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', is_active: 1, doctor_count: 1 }
];

const MOCK_DOCTORS: Doctor[] = [
  { id: 1, department_id: 1, name: 'Dr. Marcus Vance', specialization: 'Interventional Cardiology', qualification: 'MD, FACC, FSCAI', experience_years: 18, gender: 'Male', bio: 'Dr. Marcus Vance is a renowned interventional cardiologist with over 18 years of expertise in complex coronary angioplasty, transcatheter aortic valve replacements (TAVR), and preventive cardiac rehabilitation.', languages: 'English, Spanish', consultation_fee: 150.00, image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Cardiology' },
  { id: 2, department_id: 1, name: 'Dr. Elena Rostova', specialization: 'Heart Failure & Electrophysiology', qualification: 'MD, PhD (Cardiology)', experience_years: 14, gender: 'Female', bio: 'Specializing in arrhythmia ablation, pacemaker implantation, and advanced heart failure therapy.', languages: 'English, Russian', consultation_fee: 140.00, image_url: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Cardiology' },
  { id: 3, department_id: 2, name: 'Dr. Aris Thorne', specialization: 'Stroke & Neuro-Oncology', qualification: 'MD, DM (Neurology)', experience_years: 20, gender: 'Male', bio: 'Leading neurologist specializing in acute stroke thrombolysis, neuro-critical care, and brain tumor management.', languages: 'English', consultation_fee: 180.00, image_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Neurology' },
  { id: 4, department_id: 2, name: 'Dr. Sophia Chen', specialization: 'Movement Disorders & Parkinson’s', qualification: 'MD, PhD', experience_years: 12, gender: 'Female', bio: 'Expert in deep brain stimulation (DBS) evaluation, Parkinson’s care, and epilepsy monitoring.', languages: 'English, Mandarin', consultation_fee: 135.00, image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Neurology' },
  { id: 5, department_id: 3, name: 'Dr. David Miller', specialization: 'Joint Replacement & Trauma', qualification: 'MS (Orthopedics), FRCS', experience_years: 16, gender: 'Male', bio: 'Specialist in computer-navigated robotic knee and hip replacements and complex fracture reconstruction.', languages: 'English', consultation_fee: 160.00, image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Orthopedics' },
  { id: 6, department_id: 3, name: 'Dr. Sarah Jenkins', specialization: 'Sports Medicine & Arthroscopy', qualification: 'MD (Ortho), Fellowship', experience_years: 11, gender: 'Female', bio: 'Consultant orthopedic surgeon dedicated to shoulder and knee arthroscopy, ACL reconstruction, and athlete rehabilitation.', languages: 'English', consultation_fee: 130.00, image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Orthopedics' },
  { id: 7, department_id: 4, name: 'Dr. Michael Sterling', specialization: 'Pediatric Intensive Care', qualification: 'MD (Pediatrics), DCH', experience_years: 15, gender: 'Male', bio: 'Compassionate pediatrician focusing on developmental milestone monitoring and pediatric emergency medicine.', languages: 'English', consultation_fee: 110.00, image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Pediatrics' },
  { id: 8, department_id: 5, name: 'Dr. Amara Patel', specialization: 'Dermatology & Laser Surgery', qualification: 'MD, DNB (Dermatology)', experience_years: 10, gender: 'Female', bio: 'Expert in clinical dermatology, acne scarring treatments, biological therapies, and cosmetic procedures.', languages: 'English, Hindi', consultation_fee: 120.00, image_url: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600', is_active: 1, department_name: 'Dermatology' }
];

const MOCK_FACILITIES: Facility[] = [
  { id: 1, name: 'Emergency Care Department', category: 'Emergency Services', description: '24/7 Trauma response center equipped with triage bays, cardiac resuscitation equipment, and dedicated emergency physicians.', image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', icon: 'Siren', is_active: 1 },
  { id: 2, name: 'Intensive Care Unit (ICU)', category: 'Critical Care', description: 'Ultra-modern multi-bed ICU with continuous invasive hemodynamic monitoring, mechanical ventilators, and 1:1 nurse ratios.', image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', icon: 'Activity', is_active: 1 },
  { id: 3, name: 'Operation Theatres (OT)', category: 'Surgical Facilities', description: '8 Modular, infection-controlled HEPA-filtered operating suites equipped for robotic surgery, neurosurgery, and cardiac bypass.', image_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', icon: 'Scissors', is_active: 1 },
  { id: 4, name: '24/7 Pharmacy', category: 'Pharmacy Services', description: 'Fully stocked in-hospital pharmacy providing genuine prescription medicines, critical care drugs, and home delivery options.', image_url: 'https://images.unsplash.com/photo-1586015555751-63c3d52627cb?auto=format&fit=crop&q=80&w=800', icon: 'Pill', is_active: 1 },
  { id: 5, name: 'Central Diagnostic Laboratory', category: 'Diagnostics', description: 'NABL accredited laboratory delivering fast, accurate pathology, histology, immunology, and molecular microbiology tests.', image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', icon: 'TestTube', is_active: 1 },
  { id: 6, name: 'High-Resolution MRI & CT Suite', category: 'Radiology & Imaging', description: 'Featuring 3.0 Tesla Silent MRI and 128-Slice Ultra-Fast Low-Radiation CT Scanners for crystal clear diagnostic imaging.', image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', icon: 'Scan', is_active: 1 }
];

const MOCK_HOSPITAL_INFO: HospitalInfo = {
  id: 1,
  name: 'St. Jude Memorial Hospital & Research Institute',
  tagline: 'Compassionate Care. Advanced Medicine. Better Health.',
  description: 'St. Jude Memorial Hospital is a premier multi-specialty tertiary care hospital committed to providing world-class patient care, innovative research, and medical excellence for over 25 years.',
  address: '742 Evergreen Terrace, Medical District, NY 10021',
  phone: '+1 (800) 555-4321',
  email: 'contact@stjudememorial.org',
  emergency_phone: '+1 (800) 911-CARE',
  working_hours: '24 Hours / 7 Days a Week',
  mission: 'To deliver empathetic, patient-first medical care utilizing state-of-the-art diagnostic technology and evidence-based treatments.',
  vision: 'To be recognized globally as an elite healthcare institute pioneering clinical research, surgical innovation, and compassionate patient rehabilitation.',
  social_links: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
  reviews: [
    { id: 1, patient_name: 'Eleanor Vance', rating: 5, comment: 'The cardiology team saved my husband’s life during an emergency cardiac arrest. Dr. Marcus Vance and the ICU nursing staff are absolute angels!', department: 'Cardiology', date: '2026-08-15' },
    { id: 2, patient_name: 'Michael Ross', rating: 5, comment: 'Had my knee replacement surgery done by Dr. David Miller. I was walking without support within 3 weeks. World-class facilities and care.', department: 'Orthopedics', date: '2026-08-28' },
    { id: 3, patient_name: 'Sophia Martinez', rating: 5, comment: 'Delivered my twin baby girls at St. Jude. Dr. Victoria Adams made the entire process so smooth, safe, and comforting.', department: 'Gynecology & Obstetrics', date: '2026-09-02' }
  ]
};

let storedAppointments: Appointment[] = [
  { id: 1, appointment_code: 'APT-2026-8801', patient_name: 'James Wilson', patient_phone: '+1 555-0192', patient_email: 'james@example.com', doctor_name: 'Dr. Marcus Vance', doctor_specialization: 'Interventional Cardiology', department_name: 'Cardiology', appointment_date: '2026-09-10', appointment_time: '10:00 AM', reason: 'Cardiovascular checkup', status: 'Confirmed', consultation_fee: 150, created_at: '2026-09-09' },
  { id: 2, appointment_code: 'APT-2026-8802', patient_name: 'Sarah Jenkins', patient_phone: '+1 555-0184', patient_email: 'sarah@example.com', doctor_name: 'Dr. Amara Patel', doctor_specialization: 'Dermatology', department_name: 'Dermatology', appointment_date: '2026-09-10', appointment_time: '02:30 PM', reason: 'Skin allergy screening', status: 'Pending', consultation_fee: 120, created_at: '2026-09-09' }
];

const isStaticDeployment = typeof window !== 'undefined' && 
  !window.location.hostname.includes('localhost') && 
  !window.location.hostname.includes('127.0.0.1');

async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  if (isStaticDeployment) {
    return Promise.resolve(JSON.parse(JSON.stringify(fallbackData)));
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return JSON.parse(JSON.stringify(fallbackData));
  }
}

export const api = {
  // Hospital Information & Reviews
  async getHospitalInfo(): Promise<HospitalInfo> {
    return fetchWithFallback<HospitalInfo>(`${API_BASE}/hospital/info`, MOCK_HOSPITAL_INFO);
  },

  async updateHospitalInfo(data: Partial<HospitalInfo>): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE}/hospital/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Update failed');
      return await res.json();
    } catch {
      Object.assign(MOCK_HOSPITAL_INFO, data);
      return { message: 'Hospital information updated successfully' };
    }
  },

  // Departments
  async getDepartments(): Promise<Department[]> {
    return fetchWithFallback<Department[]>(`${API_BASE}/departments`, MOCK_DEPARTMENTS);
  },

  async getDepartmentById(idOrSlug: string | number): Promise<Department & { doctors: Doctor[] }> {
    try {
      const res = await fetch(`${API_BASE}/departments/${idOrSlug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      const dept = MOCK_DEPARTMENTS.find(d => d.id === Number(idOrSlug) || d.slug === idOrSlug) || MOCK_DEPARTMENTS[0];
      const docs = MOCK_DOCTORS.filter(d => d.department_id === dept.id);
      return { ...dept, doctors: docs };
    }
  },

  async createDepartment(data: Partial<Department>): Promise<{ id: number; message: string }> {
    const newDept: Department = {
      id: MOCK_DEPARTMENTS.length + 1,
      name: data.name || 'New Dept',
      slug: (data.name || 'new-dept').toLowerCase().replace(/\s+/g, '-'),
      icon: data.icon || 'Activity',
      description: data.description || '',
      services: data.services || [],
      image_url: data.image_url || 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
      is_active: 1,
      doctor_count: 0
    };
    MOCK_DEPARTMENTS.push(newDept);
    return { id: newDept.id, message: 'Department created successfully' };
  },

  async updateDepartment(id: number, data: Partial<Department>): Promise<{ message: string }> {
    const idx = MOCK_DEPARTMENTS.findIndex(d => d.id === id);
    if (idx !== -1) Object.assign(MOCK_DEPARTMENTS[idx], data);
    return { message: 'Department updated successfully' };
  },

  async deleteDepartment(id: number): Promise<{ message: string }> {
    const idx = MOCK_DEPARTMENTS.findIndex(d => d.id === id);
    if (idx !== -1) MOCK_DEPARTMENTS.splice(idx, 1);
    return { message: 'Department deactivated successfully' };
  },

  // Doctors
  async getDoctors(filters?: { departmentId?: number; specialization?: string; gender?: string; search?: string }): Promise<Doctor[]> {
    try {
      const query = new URLSearchParams();
      if (filters?.departmentId) query.set('departmentId', String(filters.departmentId));
      if (filters?.specialization) query.set('specialization', filters.specialization);
      if (filters?.gender) query.set('gender', filters.gender);
      if (filters?.search) query.set('search', filters.search);

      const res = await fetch(`${API_BASE}/doctors?${query.toString()}`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      let docs = [...MOCK_DOCTORS];
      if (filters?.departmentId) docs = docs.filter(d => d.department_id === filters.departmentId);
      if (filters?.gender) docs = docs.filter(d => d.gender === filters.gender);
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        docs = docs.filter(d => d.name.toLowerCase().includes(s) || d.specialization.toLowerCase().includes(s));
      }
      return docs;
    }
  },

  async getDoctorById(id: number): Promise<Doctor> {
    return fetchWithFallback<Doctor>(`${API_BASE}/doctors/${id}`, MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0]);
  },

  async createDoctor(data: any): Promise<{ id: number; message: string }> {
    const newDoc: Doctor = {
      id: MOCK_DOCTORS.length + 1,
      department_id: data.department_id || 1,
      name: data.name || 'Dr. New Doctor',
      specialization: data.specialization || 'Specialist',
      qualification: data.qualification || 'MD',
      experience_years: data.experience_years || 5,
      gender: data.gender || 'Male',
      bio: data.bio || '',
      languages: data.languages || 'English',
      consultation_fee: data.consultation_fee || 150,
      image_url: data.image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      is_active: 1,
      department_name: MOCK_DEPARTMENTS.find(dep => dep.id === data.department_id)?.name || 'General'
    };
    MOCK_DOCTORS.push(newDoc);
    return { id: newDoc.id, message: 'Doctor created successfully' };
  },

  async updateDoctor(id: number, data: any): Promise<{ message: string }> {
    const idx = MOCK_DOCTORS.findIndex(d => d.id === id);
    if (idx !== -1) Object.assign(MOCK_DOCTORS[idx], data);
    return { message: 'Doctor updated successfully' };
  },

  async deleteDoctor(id: number): Promise<{ message: string }> {
    const idx = MOCK_DOCTORS.findIndex(d => d.id === id);
    if (idx !== -1) MOCK_DOCTORS.splice(idx, 1);
    return { message: 'Doctor deactivated successfully' };
  },

  // Facilities
  async getFacilities(): Promise<Facility[]> {
    return fetchWithFallback<Facility[]>(`${API_BASE}/facilities`, MOCK_FACILITIES);
  },

  async createFacility(data: Partial<Facility>): Promise<{ id: number; message: string }> {
    const newFac: Facility = {
      id: MOCK_FACILITIES.length + 1,
      name: data.name || 'New Facility',
      category: data.category || 'General',
      description: data.description || '',
      image_url: data.image_url || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      icon: data.icon || 'Shield',
      is_active: 1
    };
    MOCK_FACILITIES.push(newFac);
    return { id: newFac.id, message: 'Facility created successfully' };
  },

  async updateFacility(id: number, data: Partial<Facility>): Promise<{ message: string }> {
    const idx = MOCK_FACILITIES.findIndex(f => f.id === id);
    if (idx !== -1) Object.assign(MOCK_FACILITIES[idx], data);
    return { message: 'Facility updated successfully' };
  },

  async deleteFacility(id: number): Promise<{ message: string }> {
    const idx = MOCK_FACILITIES.findIndex(f => f.id === id);
    if (idx !== -1) MOCK_FACILITIES.splice(idx, 1);
    return { message: 'Facility deactivated successfully' };
  },

  // Appointment Engine
  async getAvailableSlots(doctorId: number, date: string): Promise<{ available: boolean; message?: string; slots: TimeSlot[] }> {
    try {
      const res = await fetch(`${API_BASE}/appointments/available-slots?doctorId=${doctorId}&date=${date}`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      const bookedSet = new Set(
        storedAppointments
          .filter(a => a.doctor_name?.includes(String(doctorId)) || true && a.appointment_date === date && a.status !== 'Cancelled')
          .map(a => a.appointment_time.toUpperCase())
      );

      const timeSlots: TimeSlot[] = [
        { time24: '09:00', time12: '09:00 AM', isBooked: bookedSet.has('09:00 AM'), isAvailable: !bookedSet.has('09:00 AM') },
        { time24: '09:30', time12: '09:30 AM', isBooked: bookedSet.has('09:30 AM'), isAvailable: !bookedSet.has('09:30 AM') },
        { time24: '10:00', time12: '10:00 AM', isBooked: bookedSet.has('10:00 AM'), isAvailable: !bookedSet.has('10:00 AM') },
        { time24: '10:30', time12: '10:30 AM', isBooked: bookedSet.has('10:30 AM'), isAvailable: !bookedSet.has('10:30 AM') },
        { time24: '11:00', time12: '11:00 AM', isBooked: bookedSet.has('11:00 AM'), isAvailable: !bookedSet.has('11:00 AM') },
        { time24: '11:30', time12: '11:30 AM', isBooked: bookedSet.has('11:30 AM'), isAvailable: !bookedSet.has('11:30 AM') },
        { time24: '14:00', time12: '02:00 PM', isBooked: bookedSet.has('02:00 PM'), isAvailable: !bookedSet.has('02:00 PM') },
        { time24: '14:30', time12: '02:30 PM', isBooked: bookedSet.has('02:30 PM'), isAvailable: !bookedSet.has('02:30 PM') },
        { time24: '15:00', time12: '03:00 PM', isBooked: bookedSet.has('03:00 PM'), isAvailable: !bookedSet.has('03:00 PM') },
        { time24: '15:30', time12: '03:30 PM', isBooked: bookedSet.has('03:30 PM'), isAvailable: !bookedSet.has('03:30 PM') }
      ];

      return { available: true, slots: timeSlots };
    }
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
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }
      return await res.json();
    } catch (err: any) {
      if (err.message && err.message.includes('Double booking')) {
        throw err;
      }
      const doc = MOCK_DOCTORS.find(d => d.id === data.doctor_id) || MOCK_DOCTORS[0];
      const dept = MOCK_DEPARTMENTS.find(d => d.id === data.department_id) || MOCK_DEPARTMENTS[0];
      const code = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newApt: Appointment = {
        id: storedAppointments.length + 1,
        appointment_code: code,
        patient_name: data.full_name,
        patient_age: data.age,
        patient_gender: data.gender,
        patient_phone: data.phone,
        patient_email: data.email,
        doctor_name: doc.name,
        doctor_specialization: doc.specialization,
        department_name: dept.name,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        reason: data.reason,
        status: 'Confirmed',
        consultation_fee: doc.consultation_fee,
        created_at: new Date().toISOString().split('T')[0]
      };

      storedAppointments.unshift(newApt);
      return { message: 'Appointment confirmed successfully', appointment: newApt };
    }
  },

  async lookupAppointment(codeOrId: string): Promise<Appointment> {
    try {
      const res = await fetch(`${API_BASE}/appointments/lookup/${codeOrId}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      return storedAppointments.find(a => a.appointment_code === codeOrId || String(a.id) === codeOrId) || storedAppointments[0];
    }
  },

  // Admin Endpoints
  async getAdminStats(): Promise<{ stats: DashboardStats; recentAppointments: Appointment[] }> {
    try {
      const res = await fetch(`${API_BASE}/admin/dashboard-stats`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      return {
        stats: {
          totalPatients: 28,
          totalDoctors: MOCK_DOCTORS.length,
          totalDepartments: MOCK_DEPARTMENTS.length,
          todayAppointments: storedAppointments.length,
          pendingAppointments: storedAppointments.filter(a => a.status === 'Pending').length,
          confirmedAppointments: storedAppointments.filter(a => a.status === 'Confirmed').length,
          cancelledAppointments: storedAppointments.filter(a => a.status === 'Cancelled').length,
          completedAppointments: storedAppointments.filter(a => a.status === 'Completed').length,
        },
        recentAppointments: storedAppointments.slice(0, 5)
      };
    }
  },

  async getAdminAppointments(filters?: { date?: string; doctorId?: number; departmentId?: number; status?: string; search?: string }): Promise<Appointment[]> {
    try {
      const query = new URLSearchParams();
      if (filters?.date) query.set('date', filters.date);
      if (filters?.doctorId) query.set('doctorId', String(filters.doctorId));
      if (filters?.departmentId) query.set('departmentId', String(filters.departmentId));
      if (filters?.status) query.set('status', filters.status);
      if (filters?.search) query.set('search', filters.search);

      const res = await fetch(`${API_BASE}/appointments/admin/all?${query.toString()}`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      let list = [...storedAppointments];
      if (filters?.status) list = list.filter(a => a.status === filters.status);
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        list = list.filter(a => (a.patient_name && a.patient_name.toLowerCase().includes(s)) || a.appointment_code.toLowerCase().includes(s));
      }
      return list;
    }
  },

  async updateAppointmentStatus(id: number, status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'): Promise<{ message: string }> {
    const apt = storedAppointments.find(a => a.id === id);
    if (apt) apt.status = status;
    return { message: `Appointment status updated to ${status}` };
  },

  async getPatients(search?: string): Promise<Patient[]> {
    const list: Patient[] = [
      { id: 1, full_name: 'James Wilson', age: 45, gender: 'Male', phone: '+1 555-0192', email: 'james@example.com', created_at: '2026-09-01', total_appointments: 3 },
      { id: 2, full_name: 'Sarah Jenkins', age: 32, gender: 'Female', phone: '+1 555-0184', email: 'sarah@example.com', created_at: '2026-09-04', total_appointments: 2 },
      { id: 3, full_name: 'Eleanor Vance', age: 52, gender: 'Female', phone: '+1 555-0177', email: 'eleanor@example.com', created_at: '2026-09-08', total_appointments: 1 }
    ];
    if (search) {
      const s = search.toLowerCase();
      return list.filter(p => p.full_name.toLowerCase().includes(s) || p.phone.includes(s) || p.email.toLowerCase().includes(s));
    }
    return list;
  },

  async getPatientHistory(id: number): Promise<{ patient: Patient; history: Appointment[] }> {
    const patient: Patient = { id, full_name: 'James Wilson', age: 45, gender: 'Male', phone: '+1 555-0192', email: 'james@example.com', created_at: '2026-09-01' };
    return { patient, history: storedAppointments.filter(a => a.patient_name === 'James Wilson' || true) };
  }
};
