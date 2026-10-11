import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const { product_id, all } = req.query;
    let sql = `SELECT r.*, p.name as product_name FROM reviews r LEFT JOIN products p ON r.product_id = p.id WHERE 1=1`;
    const params: any[] = [];

    if (all !== 'true') {
      sql += ` AND r.is_approved = 1`;
    }

    if (product_id) {
      sql += ` AND r.product_id = ?`;
      params.push(Number(product_id));
    }

    sql += ` ORDER BY r.created_at DESC`;
    const reviews = await queryAll(sql, params);
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews (Submit review)
router.post('/', async (req, res) => {
  try {
    const { product_id, customer_name, customer_email, rating, comment } = req.body;
    if (!product_id || !customer_name || !comment) {
      return res.status(400).json({ error: 'Product ID, customer name, and comment are required.' });
    }

    const result = await runExecute(
      `INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment, is_approved)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [Number(product_id), customer_name, customer_email || '', Number(rating || 5), comment]
    );

    const newReview = await queryOne('SELECT * FROM reviews WHERE id = ?', [result.lastID]);
    res.status(201).json(newReview);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/reviews/:id/approve (Admin)
router.put('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body;
    await runExecute('UPDATE reviews SET is_approved = ? WHERE id = ?', [is_approved ? 1 : 0, Number(id)]);
    const updated = await queryOne('SELECT * FROM reviews WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/reviews/:id (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM reviews WHERE id = ?', [Number(id)]);
    res.json({ message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
