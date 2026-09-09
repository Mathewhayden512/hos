import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Get doctors with filtering options
router.get('/', async (req, res) => {
  try {
    const { departmentId, specialization, gender, search } = req.query;

    let sql = `
      SELECT doc.*, dep.name as department_name, dep.slug as department_slug
      FROM doctors doc
      JOIN departments dep ON doc.department_id = dep.id
      WHERE doc.is_active = 1
    `;
    const params: any[] = [];

    if (departmentId) {
      sql += ' AND doc.department_id = ?';
      params.push(departmentId);
    }

    if (specialization) {
      sql += ' AND LOWER(doc.specialization) LIKE ?';
      params.push(`%${String(specialization).toLowerCase()}%`);
    }

    if (gender) {
      sql += ' AND doc.gender = ?';
      params.push(gender);
    }

    if (search) {
      sql += ' AND (LOWER(doc.name) LIKE ? OR LOWER(doc.specialization) LIKE ? OR LOWER(doc.qualification) LIKE ?)';
      const s = `%${String(search).toLowerCase()}%`;
      params.push(s, s, s);
    }

    sql += ' ORDER BY doc.experience_years DESC';

    const doctors = await queryAll(sql, params);

    // Fetch schedules for each doctor
    const doctorsWithSchedules = await Promise.all(doctors.map(async (doc) => {
      const schedules = await queryAll('SELECT * FROM doctor_schedules WHERE doctor_id = ?', [doc.id]);
      return {
        ...doc,
        schedules
      };
    }));

    return res.json(doctorsWithSchedules);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get single doctor profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await queryOne(`
      SELECT doc.*, dep.name as department_name, dep.slug as department_slug, dep.description as department_description
      FROM doctors doc
      JOIN departments dep ON doc.department_id = dep.id
      WHERE doc.id = ?
    `, [id]);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const schedules = await queryAll('SELECT * FROM doctor_schedules WHERE doctor_id = ? ORDER BY day_of_week ASC', [doctor.id]);

    return res.json({
      ...doctor,
      schedules
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Add Doctor
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { department_id, name, specialization, qualification, experience_years, gender, bio, languages, consultation_fee, image_url, schedules } = req.body;

    if (!department_id || !name || !specialization || !consultation_fee) {
      return res.status(400).json({ error: 'Missing required doctor fields.' });
    }

    const result = await runExecute(`
      INSERT INTO doctors (department_id, name, specialization, qualification, experience_years, gender, bio, languages, consultation_fee, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      department_id,
      name,
      specialization,
      qualification || 'MD',
      experience_years || 1,
      gender || 'Other',
      bio || '',
      languages || 'English',
      consultation_fee,
      image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
    ]);

    const doctorId = result.lastID;

    // Insert schedules if provided or default Mon-Fri
    const daysToInsert = Array.isArray(schedules) && schedules.length > 0 ? schedules : [1, 2, 3, 4, 5];
    for (const d of daysToInsert) {
      const dayNum = typeof d === 'number' ? d : d.day_of_week;
      const startTime = typeof d === 'object' && d.start_time ? d.start_time : '09:00';
      const endTime = typeof d === 'object' && d.end_time ? d.end_time : '17:00';
      await runExecute(`
        INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes)
        VALUES (?, ?, ?, ?, 30)
      `, [doctorId, dayNum, startTime, endTime]);
    }

    return res.status(201).json({ id: doctorId, message: 'Doctor created successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Update Doctor
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { department_id, name, specialization, qualification, experience_years, gender, bio, languages, consultation_fee, image_url, is_active, schedules } = req.body;

    const existing = await queryOne('SELECT * FROM doctors WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    await runExecute(`
      UPDATE doctors
      SET department_id = ?, name = ?, specialization = ?, qualification = ?, experience_years = ?, gender = ?, bio = ?, languages = ?, consultation_fee = ?, image_url = ?, is_active = ?
      WHERE id = ?
    `, [
      department_id || existing.department_id,
      name || existing.name,
      specialization || existing.specialization,
      qualification || existing.qualification,
      experience_years !== undefined ? experience_years : existing.experience_years,
      gender || existing.gender,
      bio !== undefined ? bio : existing.bio,
      languages || existing.languages,
      consultation_fee !== undefined ? consultation_fee : existing.consultation_fee,
      image_url || existing.image_url,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      id
    ]);

    if (Array.isArray(schedules)) {
      await runExecute('DELETE FROM doctor_schedules WHERE doctor_id = ?', [id]);
      for (const d of schedules) {
        const dayNum = typeof d === 'number' ? d : d.day_of_week;
        const startTime = typeof d === 'object' && d.start_time ? d.start_time : '09:00';
        const endTime = typeof d === 'object' && d.end_time ? d.end_time : '17:00';
        await runExecute(`
          INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes)
          VALUES (?, ?, ?, ?, 30)
        `, [id, dayNum, startTime, endTime]);
      }
    }

    return res.json({ message: 'Doctor updated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Delete/Deactivate Doctor
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('UPDATE doctors SET is_active = 0 WHERE id = ?', [id]);
    return res.json({ message: 'Doctor deactivated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
