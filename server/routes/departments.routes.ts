import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Get all active departments with doctor count
router.get('/', async (req, res) => {
  try {
    const departments = await queryAll(`
      SELECT d.*, COUNT(doc.id) as doctor_count
      FROM departments d
      LEFT JOIN doctors doc ON d.id = doc.department_id AND doc.is_active = 1
      WHERE d.is_active = 1
      GROUP BY d.id
      ORDER BY d.id ASC
    `);

    const formatted = departments.map(d => ({
      ...d,
      services: JSON.parse(d.services || '[]')
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get department by slug or ID with doctors list
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let department;

    if (!isNaN(Number(idOrSlug))) {
      department = await queryOne('SELECT * FROM departments WHERE id = ?', [Number(idOrSlug)]);
    } else {
      department = await queryOne('SELECT * FROM departments WHERE slug = ?', [idOrSlug]);
    }

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const doctors = await queryAll(`
      SELECT * FROM doctors WHERE department_id = ? AND is_active = 1 ORDER BY experience_years DESC
    `, [department.id]);

    return res.json({
      ...department,
      services: JSON.parse(department.services || '[]'),
      doctors
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Add new department
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, icon, description, services, image_url } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const servicesJson = Array.isArray(services) ? JSON.stringify(services) : JSON.stringify([services]);

    const result = await runExecute(`
      INSERT INTO departments (name, slug, icon, description, services, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, slug, icon || 'Activity', description, servicesJson, image_url || '']);

    return res.status(201).json({ id: result.lastID, message: 'Department created successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Update department
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, description, services, image_url, is_active } = req.body;

    const existing = await queryOne('SELECT * FROM departments WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const servicesJson = Array.isArray(services) ? JSON.stringify(services) : (services ? JSON.stringify([services]) : existing.services);
    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : existing.slug;

    await runExecute(`
      UPDATE departments
      SET name = ?, slug = ?, icon = ?, description = ?, services = ?, image_url = ?, is_active = ?
      WHERE id = ?
    `, [
      name || existing.name,
      slug,
      icon || existing.icon,
      description || existing.description,
      servicesJson,
      image_url !== undefined ? image_url : existing.image_url,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      id
    ]);

    return res.json({ message: 'Department updated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Deactivate/delete department
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('UPDATE departments SET is_active = 0 WHERE id = ?', [id]);
    return res.json({ message: 'Department deactivated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
