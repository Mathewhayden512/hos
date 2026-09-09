import { Router } from 'express';
import { queryOne, queryAll, runExecute } from '../db/database.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Get Hospital info & reviews
router.get('/info', async (req, res) => {
  try {
    const info = await queryOne('SELECT * FROM hospital_information ORDER BY id ASC LIMIT 1');
    const reviews = await queryAll('SELECT * FROM reviews ORDER BY id DESC LIMIT 10');

    if (!info) {
      return res.status(404).json({ error: 'Hospital information not found' });
    }

    return res.json({
      ...info,
      social_links: JSON.parse(info.social_links || '{}'),
      reviews
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Update Hospital info
router.put('/info', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      address,
      phone,
      email,
      emergency_phone,
      working_hours,
      mission,
      vision,
      social_links
    } = req.body;

    const existing = await queryOne('SELECT * FROM hospital_information ORDER BY id ASC LIMIT 1');
    if (!existing) {
      return res.status(404).json({ error: 'Hospital info not found' });
    }

    const socialJson = typeof social_links === 'object' ? JSON.stringify(social_links) : existing.social_links;

    await runExecute(`
      UPDATE hospital_information
      SET name = ?, tagline = ?, description = ?, address = ?, phone = ?, email = ?, emergency_phone = ?, working_hours = ?, mission = ?, vision = ?, social_links = ?
      WHERE id = ?
    `, [
      name || existing.name,
      tagline || existing.tagline,
      description || existing.description,
      address || existing.address,
      phone || existing.phone,
      email || existing.email,
      emergency_phone || existing.emergency_phone,
      working_hours || existing.working_hours,
      mission || existing.mission,
      vision || existing.vision,
      socialJson,
      existing.id
    ]);

    return res.json({ message: 'Hospital information updated successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
