import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Get active facilities
router.get('/', async (req, res) => {
  try {
    const facilities = await queryAll('SELECT * FROM facilities WHERE is_active = 1 ORDER BY id ASC');
    return res.json(facilities);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Add facility
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, category, description, image_url, icon } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const result = await runExecute(`
      INSERT INTO facilities (name, category, description, image_url, icon)
      VALUES (?, ?, ?, ?, ?)
    `, [name, category || 'General Facility', description, image_url || '', icon || 'Shield']);

    return res.status(201).json({ id: result.lastID, message: 'Facility created successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Edit facility
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, image_url, icon, is_active } = req.body;

    const existing = await queryOne('SELECT * FROM facilities WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Facility not found' });
    }

    await runExecute(`
      UPDATE facilities
      SET name = ?, category = ?, description = ?, image_url = ?, icon = ?, is_active = ?
      WHERE id = ?
    `, [
      name || existing.name,
      category || existing.category,
      description || existing.description,
      image_url || existing.image_url,
      icon || existing.icon,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      id
    ]);

    return res.json({ message: 'Facility updated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Delete facility
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('UPDATE facilities SET is_active = 0 WHERE id = ?', [id]);
    return res.json({ message: 'Facility deactivated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
