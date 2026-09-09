import { Router } from 'express';
import { queryOne, queryAll } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Get Admin Dashboard Overview Statistics
router.get('/dashboard-stats', requireAdmin, async (req, res) => {
  try {
    const totalPatientsRes = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM patients');
    const totalDoctorsRes = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM doctors WHERE is_active = 1');
    const totalDepartmentsRes = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM departments WHERE is_active = 1');

    const todayStr = new Date().toISOString().split('T')[0];

    const todayAppointmentsRes = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM appointments WHERE appointment_date = ?', [todayStr]);
    const pendingRes = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM appointments WHERE status = 'Pending'");
    const confirmedRes = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM appointments WHERE status = 'Confirmed'");
    const cancelledRes = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM appointments WHERE status = 'Cancelled'");
    const completedRes = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM appointments WHERE status = 'Completed'");

    // Recent 5 appointments
    const recentAppointments = await queryAll(`
      SELECT 
        a.id,
        a.appointment_code,
        a.appointment_date,
        a.appointment_time,
        a.status,
        p.full_name as patient_name,
        p.phone as patient_phone,
        d.name as doctor_name,
        dep.name as department_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN departments dep ON a.department_id = dep.id
      ORDER BY a.created_at DESC
      LIMIT 5
    `);

    return res.json({
      stats: {
        totalPatients: Number(totalPatientsRes?.count || 0),
        totalDoctors: Number(totalDoctorsRes?.count || 0),
        totalDepartments: Number(totalDepartmentsRes?.count || 0),
        todayAppointments: Number(todayAppointmentsRes?.count || 0),
        pendingAppointments: Number(pendingRes?.count || 0),
        confirmedAppointments: Number(confirmedRes?.count || 0),
        cancelledAppointments: Number(cancelledRes?.count || 0),
        completedAppointments: Number(completedRes?.count || 0),
      },
      recentAppointments
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get registered patients list with appointment history count
router.get('/patients', requireAdmin, async (req, res) => {
  try {
    const { search } = req.query;

    let sql = `
      SELECT 
        p.id,
        p.full_name,
        p.age,
        p.gender,
        p.phone,
        p.email,
        p.created_at,
        COUNT(a.id) as total_appointments
      FROM patients p
      LEFT JOIN appointments a ON p.id = a.patient_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      sql += ' AND (LOWER(p.full_name) LIKE ? OR LOWER(p.phone) LIKE ? OR LOWER(p.email) LIKE ?)';
      const s = `%${String(search).toLowerCase()}%`;
      params.push(s, s, s);
    }

    sql += ' GROUP BY p.id ORDER BY p.created_at DESC';

    const patients = await queryAll(sql, params);
    return res.json(patients);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get single patient appointment history
router.get('/patients/:id/appointments', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await queryOne('SELECT * FROM patients WHERE id = ?', [id]);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const history = await queryAll(`
      SELECT 
        a.id,
        a.appointment_code,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status,
        a.created_at,
        d.name as doctor_name,
        dep.name as department_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN departments dep ON a.department_id = dep.id
      WHERE a.patient_id = ?
      ORDER BY a.appointment_date DESC
    `, [id]);

    return res.json({
      patient,
      history
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
