import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/coupons (Admin list all)
router.get('/', async (req, res) => {
  try {
    const coupons = await queryAll('SELECT * FROM coupons ORDER BY created_at DESC');
    res.json(coupons);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/coupons/validate (Validate coupon for cart)
router.post('/validate', async (req, res) => {
  try {
    const { code, cartSubtotal } = req.body;
    if (!code) return res.status(400).json({ error: 'Coupon code is required' });

    const coupon = await queryOne('SELECT * FROM coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1', [code.trim()]);
    if (!coupon) {
      return res.status(404).json({ error: 'Invalid or expired discount coupon code.' });
    }

    if (coupon.min_order > 0 && cartSubtotal < coupon.min_order) {
      return res.status(400).json({ error: `Minimum order subtotal of $${coupon.min_order} required for coupon ${coupon.code}.` });
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = (cartSubtotal * coupon.discount_amount) / 100;
    } else {
      discountAmount = coupon.discount_amount;
    }

    res.json({
      valid: true,
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_amount,
      calculated_discount: Math.min(discountAmount, cartSubtotal)
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/coupons (Admin Add)
router.post('/', async (req, res) => {
  try {
    const { code, discount_type, discount_amount, min_order, expiration_date, usage_limit } = req.body;
    if (!code || !discount_amount) {
      return res.status(400).json({ error: 'Coupon code and discount amount are required.' });
    }

    const result = await runExecute(
      `INSERT INTO coupons (code, discount_type, discount_amount, min_order, expiration_date, usage_limit, times_used, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 0, 1)`,
      [code.toUpperCase().trim(), discount_type || 'percentage', Number(discount_amount), Number(min_order || 0), expiration_date || '', Number(usage_limit || 100)]
    );

    const newCoupon = await queryOne('SELECT * FROM coupons WHERE id = ?', [result.lastID]);
    res.status(201).json(newCoupon);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/coupons/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discount_type, discount_amount, min_order, expiration_date, usage_limit, is_active } = req.body;

    await runExecute(
      `UPDATE coupons SET
        code = COALESCE(?, code),
        discount_type = COALESCE(?, discount_type),
        discount_amount = COALESCE(?, discount_amount),
        min_order = COALESCE(?, min_order),
        expiration_date = COALESCE(?, expiration_date),
        usage_limit = COALESCE(?, usage_limit),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [
        code ? code.toUpperCase().trim() : null, discount_type,
        discount_amount !== undefined ? Number(discount_amount) : null,
        min_order !== undefined ? Number(min_order) : null,
        expiration_date, usage_limit !== undefined ? Number(usage_limit) : null,
        is_active !== undefined ? (is_active ? 1 : 0) : null, Number(id)
      ]
    );

    const updated = await queryOne('SELECT * FROM coupons WHERE id = ?', [Number(id)]);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/coupons/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM coupons WHERE id = ?', [Number(id)]);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
