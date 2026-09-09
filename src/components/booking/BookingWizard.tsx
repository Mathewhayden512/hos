import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  UserCheck, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  Loader2, 
  DollarSign,
  ShieldCheck,
  Award
} from 'lucide-react';
import { api } from '../../services/api';
import { Department, Doctor, TimeSlot, Appointment } from '../../types';
import { useToast } from '../../context/ToastContext';
import { AppointmentReceipt } from './AppointmentReceipt';

export const BookingWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form Selections
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // Available Slots state
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Patient Info Form state
  const [patientInfo, setPatientInfo] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    reason: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Load departments and initial URL params
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [deptsData, docsData] = await Promise.all([
          api.getDepartments(),
          api.getDoctors()
        ]);
        setDepartments(deptsData);
        setDoctors(docsData);

        const paramDeptId = searchParams.get('deptId');
        const paramDocId = searchParams.get('doctorId');

        if (paramDeptId) {
          setSelectedDeptId(Number(paramDeptId));
        }
        if (paramDocId) {
          setSelectedDoctorId(Number(paramDocId));
          const doc = docsData.find(d => d.id === Number(paramDocId));
          if (doc) {
            setSelectedDeptId(doc.department_id);
            setStep(3); // Jump to date selection
          }
        }
      } catch (err: any) {
        showToast(err.message || 'Failed to load hospital data', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, [searchParams]);

  // Load available time slots when doctor and date change
  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      fetchAvailableSlots(selectedDoctorId, selectedDate);
    }
  }, [selectedDoctorId, selectedDate]);

  async function fetchAvailableSlots(doctorId: number, dateStr: string) {
    try {
      setSlotsLoading(true);
      setSelectedTime('');
      const res = await api.getAvailableSlots(doctorId, dateStr);
      setAvailableSlots(res.slots || []);
    } catch (err: any) {
      showToast(err.message || 'Error fetching doctor schedules', 'error');
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  // Derived selections
  const currentDept = departments.find(d => d.id === selectedDeptId);
  const currentDoctor = doctors.find(d => d.id === selectedDoctorId);
  const filteredDoctors = selectedDeptId ? doctors.filter(d => d.department_id === selectedDeptId) : doctors;

  // Validation
  const validatePatientInfo = () => {
    const errors: Record<string, string> = {};
    if (!patientInfo.fullName.trim()) errors.fullName = 'Full name is required';
    if (!patientInfo.age || isNaN(Number(patientInfo.age)) || Number(patientInfo.age) <= 0) {
      errors.age = 'Please enter a valid age';
    }
    if (!patientInfo.phone.trim() || patientInfo.phone.length < 7) errors.phone = 'Valid phone number required';
    if (!patientInfo.email.trim() || !patientInfo.email.includes('@')) errors.email = 'Valid email address required';
    if (!patientInfo.reason.trim()) errors.reason = 'Brief consultation reason required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedDeptId) {
      showToast('Please select a department to proceed', 'error');
      return;
    }
    if (step === 2 && !selectedDoctorId) {
      showToast('Please select a doctor to proceed', 'error');
      return;
    }
    if (step === 3 && !selectedDate) {
      showToast('Please select an appointment date', 'error');
      return;
    }
    if (step === 4 && !selectedTime) {
      showToast('Please select an available time slot', 'error');
      return;
    }
    if (step === 5) {
      if (!validatePatientInfo()) return;
    }
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleConfirmAppointment = async () => {
    if (!selectedDeptId || !selectedDoctorId || !selectedDate || !selectedTime) {
      showToast('Missing appointment fields', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.createAppointment({
        department_id: selectedDeptId,
        doctor_id: selectedDoctorId,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        full_name: patientInfo.fullName,
        age: Number(patientInfo.age),
        gender: patientInfo.gender,
        phone: patientInfo.phone,
        email: patientInfo.email,
        reason: patientInfo.reason
      });

      setConfirmedAppointment(res.appointment);
      setStep(7);
      showToast('Appointment confirmed successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Double booking conflict! Please select another time slot.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-10 h-10 text-hospital-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading Appointment Booking System...</p>
      </div>
    );
  }

  if (confirmedAppointment && step === 7) {
    return (
      <AppointmentReceipt
        appointment={confirmedAppointment}
        onBookAnother={() => {
          setConfirmedAppointment(null);
          setStep(1);
          setSelectedDeptId(null);
          setSelectedDoctorId(null);
          setSelectedTime('');
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      
      {/* Wizard Progress Bar Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-hospital-400 uppercase tracking-widest block">
              STEP {step} OF 6
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {step === 1 && 'Select Department'}
              {step === 2 && 'Choose Specialist Doctor'}
              {step === 3 && 'Select Appointment Date'}
              {step === 4 && 'Pick Available Time Slot'}
              {step === 5 && 'Enter Patient Information'}
              {step === 6 && 'Review & Confirm Appointment'}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-hospital-600/30 text-hospital-400 flex items-center justify-center font-bold text-lg">
            {step}/6
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-gradient-to-r from-hospital-500 to-teal-400' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="p-6 sm:p-8">
        
        {/* STEP 1: Select Department */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-slate-600 text-sm">
              Please select the medical department or specialty for your consultation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setSelectedDoctorId(null);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    selectedDeptId === dept.id
                      ? 'border-hospital-600 bg-hospital-50/80 shadow-md ring-2 ring-hospital-600/20'
                      : 'border-slate-200 hover:border-hospital-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-hospital-600 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    {selectedDeptId === dept.id && (
                      <CheckCircle2 className="w-5 h-5 text-hospital-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dept.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Doctor */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-slate-600 text-sm">
                Available specialists in <strong className="text-slate-900">{currentDept?.name}</strong>:
              </p>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-hospital-600 font-semibold hover:underline"
              >
                Change Department
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                    selectedDoctorId === doc.id
                      ? 'border-hospital-600 bg-hospital-50/80 shadow-md ring-2 ring-hospital-600/20'
                      : 'border-slate-200 hover:border-hospital-300 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={doc.image_url}
                    alt={doc.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                      {selectedDoctorId === doc.id && (
                        <CheckCircle2 className="w-5 h-5 text-hospital-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-hospital-600 font-semibold">{doc.specialization}</p>
                    <p className="text-xs text-slate-500">{doc.qualification} • {doc.experience_years} Yrs Exp</p>
                    <p className="text-xs font-bold text-emerald-600 pt-1">${doc.consultation_fee} Fee</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Select Date */}
        {step === 3 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img src={currentDoctor?.image_url} alt={currentDoctor?.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <span className="text-xs text-slate-500 block">Selected Doctor</span>
                <span className="text-sm font-bold text-slate-900">{currentDoctor?.name}</span>
                <span className="text-xs text-hospital-600 font-semibold block">{currentDept?.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">
                Choose Consultation Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 focus:border-hospital-500 font-semibold text-slate-900"
              />
              <p className="text-xs text-slate-500">
                Doctors consult Monday through Friday between 9:00 AM and 5:00 PM.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Select Time Slot */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Available Slots for {selectedDate}</h3>
                <p className="text-xs text-slate-500">{currentDoctor?.name} ({currentDept?.name})</p>
              </div>
              <button onClick={() => setStep(3)} className="text-xs text-hospital-600 font-semibold hover:underline">
                Change Date
              </button>
            </div>

            {slotsLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="w-8 h-8 text-hospital-600 animate-spin mx-auto mb-2" />
                <p className="text-xs text-slate-500">Checking doctor schedule & real-time bookings...</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="font-bold text-amber-900">No Consultation Slots Available</h4>
                <p className="text-xs text-amber-700">
                  Doctor is not scheduled on this day or all slots are booked. Please pick another date.
                </p>
                <button
                  onClick={() => setStep(3)}
                  className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs"
                >
                  Choose Different Date
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.time12)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                      slot.isBooked
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                        : selectedTime === slot.time12
                        ? 'bg-hospital-600 border-hospital-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-hospital-400 hover:bg-slate-50'
                    }`}
                  >
                    {slot.time12}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Patient Info Form */}
        {step === 5 && (
          <div className="space-y-5 max-w-xl mx-auto">
            <h3 className="font-bold text-slate-900 text-base">Patient Medical Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="block text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={patientInfo.fullName}
                  onChange={(e) => setPatientInfo({ ...patientInfo, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm"
                />
                {formErrors.fullName && <p className="text-xs text-rose-600">{formErrors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Age *</label>
                <input
                  type="number"
                  placeholder="e.g. 35"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm"
                />
                {formErrors.age && <p className="text-xs text-rose-600">{formErrors.age}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Gender *</label>
                <select
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 555-0192"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm"
                />
                {formErrors.phone && <p className="text-xs text-rose-600">{formErrors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm"
                />
                {formErrors.email && <p className="text-xs text-rose-600">{formErrors.email}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="block text-xs font-bold text-slate-700">Reason for Consultation *</label>
                <textarea
                  rows={3}
                  placeholder="Describe symptoms, medical history, or reason for appointment..."
                  value={patientInfo.reason}
                  onChange={(e) => setPatientInfo({ ...patientInfo, reason: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-hospital-500 text-sm"
                />
                {formErrors.reason && <p className="text-xs text-rose-600">{formErrors.reason}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Confirm */}
        {step === 6 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-hospital-50 border border-hospital-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b border-hospital-200 pb-3">
                Appointment Summary Review
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Department:</span>
                  <span className="font-bold text-slate-900">{currentDept?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Specialist Doctor:</span>
                  <span className="font-bold text-slate-900">{currentDoctor?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span className="font-bold text-hospital-700">{selectedDate} at {selectedTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Consultation Fee:</span>
                  <span className="font-bold text-emerald-600 text-sm">${currentDoctor?.consultation_fee}</span>
                </div>
              </div>

              <div className="border-t border-hospital-200 pt-3 text-xs space-y-1">
                <p><span className="font-semibold">Patient:</span> {patientInfo.fullName} ({patientInfo.age} yrs, {patientInfo.gender})</p>
                <p><span className="font-semibold">Contact:</span> {patientInfo.phone} | {patientInfo.email}</p>
                <p><span className="font-semibold">Reason:</span> {patientInfo.reason}</p>
              </div>
            </div>

            <button
              onClick={handleConfirmAppointment}
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-hospital-600 to-teal-600 hover:from-hospital-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-hospital-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Securing Time Slot & Confirming...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Schedule Appointment</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Wizard Controls Footer */}
        {step < 6 && (
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={step === 1}
              className={`px-5 py-2.5 rounded-xl border text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                step === 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
