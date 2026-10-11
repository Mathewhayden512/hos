import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await queryAll('SELECT * FROM testimonials ORDER BY is_featured DESC, id DESC');
    res.json(testimonials);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/testimonials (Admin Add)
router.post('/', async (req, res) => {
  try {
    const { customer_name, location_or_role, comment, rating, is_featured } = req.body;
    if (!customer_name || !comment) {
      return res.status(400).json({ error: 'Customer name and comment are required' });
    }

    const result = await runExecute(
      `INSERT INTO testimonials (customer_name, location_or_role, comment, rating, is_featured)
       VALUES (?, ?, ?, ?, ?)`,
      [customer_name, location_or_role || 'Verified Buyer', comment, Number(rating || 5), is_featured ? 1 : 0]
    );

    const newTestimonial = await queryOne('SELECT * FROM testimonials WHERE id = ?', [result.lastID]);
    res.status(201).json(newTestimonial);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/testimonials/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, location_or_role, comment, rating, is_featured } = req.body;

    await runExecute(
      `UPDATE testimonials SET
        customer_name = COALESCE(?, customer_name),
        location_or_role = COALESCE(?, location_or_role),
        comment = COALESCE(?, comment),
        rating = COALESCE(?, rating),
        is_featured = COALESCE(?, is_featured)
      WHERE id = ?`,
      [customer_name, location_or_role, comment, rating !== undefined ? Number(rating) : null, is_featured !== undefined ? (is_featured ? 1 : 0) : null, Number(id)]
    );

    const updated = await queryOne('SELECT * FROM testimonials WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM testimonials WHERE id = ?', [Number(id)]);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
