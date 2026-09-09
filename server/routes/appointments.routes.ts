import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Helper to format time strings (e.g. "09:00" to "09:00 AM")
function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const hDisplay = h < 10 ? `0${h}` : `${h}`;
  return `${hDisplay}:${m} ${ampm}`;
}

// Generate available time slots for a doctor on a specific date
router.get('/available-slots', async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ error: 'doctorId and date parameters are required.' });
    }

    const docIdNum = Number(doctorId);
    const dateObj = new Date(String(date));
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const dayOfWeek = dateObj.getDay(); // 0 (Sun) to 6 (Sat)

    // Check doctor schedule for this day of week
    const schedule = await queryOne(
      'SELECT * FROM doctor_schedules WHERE doctor_id = ? AND day_of_week = ?',
      [docIdNum, dayOfWeek]
    );

    if (!schedule) {
      return res.json({
        available: false,
        message: 'Doctor is not scheduled on this day.',
        slots: []
      });
    }

    // Existing active bookings on this date for this doctor
    const existingBookings = await queryAll(
      "SELECT appointment_time FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND status != 'Cancelled'",
      [docIdNum, String(date)]
    );
    const bookedTimes = new Set(existingBookings.map(b => b.appointment_time.trim().toUpperCase()));

    // Generate 30 min slots between start_time and end_time
    const [startH, startM] = schedule.start_time.split(':').map(Number);
    const [endH, endM] = schedule.end_time.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const duration = schedule.slot_duration_minutes || 30;

    const slots = [];
    for (let m = startMinutes; m + duration <= endMinutes; m += duration) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const time24 = `${h < 10 ? '0' : ''}${h}:${min < 10 ? '0' : ''}${min}`;
      const time12 = formatTime12h(time24);
      const isBooked = bookedTimes.has(time12.toUpperCase()) || bookedTimes.has(time24.toUpperCase());

      slots.push({
        time24,
        time12,
        isBooked,
        isAvailable: !isBooked
      });
    }

    return res.json({
      available: true,
      dayOfWeek,
      schedule,
      slots
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Create new appointment (Prevent double booking)
router.post('/', async (req, res) => {
  try {
    const {
      department_id,
      doctor_id,
      appointment_date,
      appointment_time,
      full_name,
      age,
      gender,
      phone,
      email,
      reason
    } = req.body;

    if (!department_id || !doctor_id || !appointment_date || !appointment_time || !full_name || !phone || !email) {
      return res.status(400).json({ error: 'All patient and appointment details are required.' });
    }

    // Double booking check: ensure no active appointment exists at this doctor/date/time
    const existing = await queryOne(
      "SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND LOWER(appointment_time) = LOWER(?) AND status != 'Cancelled'",
      [doctor_id, appointment_date, appointment_time]
    );

    if (existing) {
      return res.status(409).json({
        error: 'Double booking conflict! This doctor is already booked for the selected date and time slot. Please choose another slot.'
      });
    }

    // Find or create patient
    let patient = await queryOne('SELECT id FROM patients WHERE email = ? OR phone = ?', [email, phone]);
    let patientId: number;

    if (patient) {
      patientId = patient.id;
      // Update patient info if needed
      await runExecute(
        'UPDATE patients SET full_name = ?, age = ?, gender = ?, phone = ?, email = ? WHERE id = ?',
        [full_name, age || 30, gender || 'Other', phone, email, patientId]
      );
    } else {
      const pRes = await runExecute(
        'INSERT INTO patients (full_name, age, gender, phone, email) VALUES (?, ?, ?, ?, ?)',
        [full_name, age || 30, gender || 'Other', phone, email]
      );
      patientId = pRes.lastID!;
    }

    // Generate unique code APT-YEAR-XXXX
    const year = new Date().getFullYear();
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const appointmentCode = `APT-${year}-${randCode}`;

    const appRes = await runExecute(`
      INSERT INTO appointments (appointment_code, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [appointmentCode, patientId, doctor_id, department_id, appointment_date, appointment_time, reason || 'General Consultation', 'Confirmed']);

    const appointmentId = appRes.lastID;

    // Fetch complete inserted appointment details with doctor & dept info
    const fullAppointment = await queryOne(`
      SELECT 
        a.id,
        a.appointment_code,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        a.created_at,
        p.full_name as patient_name,
        p.phone as patient_phone,
        p.email as patient_email,
        d.name as doctor_name,
        d.specialization as doctor_specialization,
        d.image_url as doctor_image,
        d.consultation_fee,
        dep.name as department_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN departments dep ON a.department_id = dep.id
      WHERE a.id = ?
    `, [appointmentId]);

    return res.status(201).json({
      message: 'Appointment confirmed successfully',
      appointment: fullAppointment
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Lookup appointment by code or ID
router.get('/lookup/:codeOrId', async (req, res) => {
  try {
    const { codeOrId } = req.params;
    const appointment = await queryOne(`
      SELECT 
        a.id,
        a.appointment_code,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        a.created_at,
        p.full_name as patient_name,
        p.age as patient_age,
        p.gender as patient_gender,
        p.phone as patient_phone,
        p.email as patient_email,
        d.name as doctor_name,
        d.specialization as doctor_specialization,
        d.consultation_fee,
        d.image_url as doctor_image,
        dep.name as department_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN departments dep ON a.department_id = dep.id
      WHERE a.appointment_code = ? OR a.id = ?
    `, [codeOrId, isNaN(Number(codeOrId)) ? -1 : Number(codeOrId)]);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment record not found.' });
    }

    return res.json(appointment);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Get all appointments with filtering
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const { date, doctorId, departmentId, status, search } = req.query;

    let sql = `
      SELECT 
        a.id,
        a.appointment_code,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        a.created_at,
        p.id as patient_id,
        p.full_name as patient_name,
        p.phone as patient_phone,
        p.email as patient_email,
        d.id as doctor_id,
        d.name as doctor_name,
        d.specialization as doctor_specialization,
        dep.id as department_id,
        dep.name as department_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN departments dep ON a.department_id = dep.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (date) {
      sql += ' AND a.appointment_date = ?';
      params.push(date);
    }
    if (doctorId) {
      sql += ' AND a.doctor_id = ?';
      params.push(doctorId);
    }
    if (departmentId) {
      sql += ' AND a.department_id = ?';
      params.push(departmentId);
    }
    if (status) {
      sql += ' AND a.status = ?';
      params.push(status);
    }
    if (search) {
      sql += ' AND (LOWER(p.full_name) LIKE ? OR LOWER(a.appointment_code) LIKE ? OR LOWER(p.phone) LIKE ?)';
      const s = `%${String(search).toLowerCase()}%`;
      params.push(s, s, s);
    }

    sql += ' ORDER BY a.appointment_date DESC, a.created_at DESC';

    const list = await queryAll(sql, params);
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Update appointment status (Pending, Confirmed, Cancelled, Completed)
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be Pending, Confirmed, Cancelled, or Completed.' });
    }

    await runExecute('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
    return res.json({ message: `Appointment status updated to ${status}` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
