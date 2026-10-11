import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/faqs
router.get('/', async (req, res) => {
  try {
    const faqs = await queryAll('SELECT * FROM faqs WHERE is_active = 1 ORDER BY order_num ASC, id ASC');
    res.json(faqs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/faqs (Admin Add)
router.post('/', async (req, res) => {
  try {
    const { category, question, answer, order_num } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    const result = await runExecute(
      `INSERT INTO faqs (category, question, answer, is_active, order_num)
       VALUES (?, ?, ?, 1, ?)`,
      [category || 'General', question, answer, Number(order_num || 1)]
    );

    const newFaq = await queryOne('SELECT * FROM faqs WHERE id = ?', [result.lastID]);
    res.status(201).json(newFaq);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/faqs/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category, question, answer, is_active, order_num } = req.body;

    await runExecute(
      `UPDATE faqs SET
        category = COALESCE(?, category),
        question = COALESCE(?, question),
        answer = COALESCE(?, answer),
        is_active = COALESCE(?, is_active),
        order_num = COALESCE(?, order_num)
      WHERE id = ?`,
      [category, question, answer, is_active !== undefined ? (is_active ? 1 : 0) : null, order_num !== undefined ? Number(order_num) : null, Number(id)]
    );

    const updated = await queryOne('SELECT * FROM faqs WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/faqs/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM faqs WHERE id = ?', [Number(id)]);
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
