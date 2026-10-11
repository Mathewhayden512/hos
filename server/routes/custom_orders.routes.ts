import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/custom-orders (Admin list all or filter by email)
router.get('/', async (req, res) => {
  try {
    const { email, status } = req.query;
    let sql = `SELECT * FROM custom_orders WHERE 1=1`;
    const params: any[] = [];

    if (email) {
      sql += ` AND email = ?`;
      params.push(String(email).toLowerCase().trim());
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY created_at DESC`;
    const requests = await queryAll(sql, params);
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/custom-orders/:idOrCode
router.get('/:idOrCode', async (req, res) => {
  try {
    const { idOrCode } = req.params;
    let customOrder;
    if (!isNaN(Number(idOrCode))) {
      customOrder = await queryOne('SELECT * FROM custom_orders WHERE id = ?', [Number(idOrCode)]);
    } else {
      customOrder = await queryOne('SELECT * FROM custom_orders WHERE request_code = ?', [idOrCode]);
    }

    if (!customOrder) {
      return res.status(404).json({ error: 'Custom order request not found' });
    }

    res.json(customOrder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/custom-orders (Customer submit request)
router.post('/', async (req, res) => {
  try {
    const {
      customer_name, email, phone, product_type, preferred_color,
      size, quantity, budget, deadline, custom_description, reference_image_url
    } = req.body;

    if (!customer_name || !email || !custom_description) {
      return res.status(400).json({ error: 'Customer name, email, and description are required.' });
    }

    const requestCode = `CST-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await runExecute(
      `INSERT INTO custom_orders (
        request_code, customer_name, email, phone, product_type, preferred_color,
        size, quantity, budget, deadline, custom_description, reference_image_url,
        status, admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', '')`,
      [
        requestCode, customer_name, email.toLowerCase().trim(), phone || '',
        product_type || 'Custom Creation', preferred_color || '', size || '',
        Number(quantity || 1), budget || '', deadline || '',
        custom_description, reference_image_url || ''
      ]
    );

    const newRequest = await queryOne('SELECT * FROM custom_orders WHERE id = ?', [result.lastID]);
    res.status(201).json({
      message: 'Thank you! Your custom request has been received. We’ll review your idea and contact you soon.',
      request: newRequest
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/custom-orders/:id/status (Admin update status & notes)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    await runExecute(
      `UPDATE custom_orders SET
        status = COALESCE(?, status),
        admin_notes = COALESCE(?, admin_notes)
      WHERE id = ?`,
      [status, admin_notes, Number(id)]
    );

    const updated = await queryOne('SELECT * FROM custom_orders WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
