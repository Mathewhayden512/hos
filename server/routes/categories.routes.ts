import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await queryAll('SELECT * FROM categories WHERE is_active = 1 ORDER BY id ASC');
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categories (Admin Add)
router.post('/', async (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const result = await runExecute(
      `INSERT INTO categories (name, slug, description, image_url) VALUES (?, ?, ?, ?)`,
      [name, slug, description || '', image_url || '/images/hero_showcase.jpg']
    );

    const newCategory = await queryOne('SELECT * FROM categories WHERE id = ?', [result.lastID]);
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image_url, is_active } = req.body;
    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;

    await runExecute(
      `UPDATE categories SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        image_url = COALESCE(?, image_url),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [name, slug, description, image_url, is_active !== undefined ? (is_active ? 1 : 0) : null, Number(id)]
    );

    const updated = await queryOne('SELECT * FROM categories WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM categories WHERE id = ?', [Number(id)]);
    res.json({ message: 'Category deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
