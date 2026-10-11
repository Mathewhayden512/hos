import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/orders (Admin list all or Customer filter by email/customer_id)
router.get('/', async (req, res) => {
  try {
    const { email, status, search } = req.query;
    let sql = `SELECT * FROM orders WHERE 1=1`;
    const params: any[] = [];

    if (email) {
      sql += ` AND customer_email = ?`;
      params.push(String(email).toLowerCase().trim());
    }

    if (status) {
      sql += ` AND order_status = ?`;
      params.push(status);
    }

    if (search) {
      sql += ` AND (order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ?)`;
      const p = `%${search}%`;
      params.push(p, p, p);
    }

    sql += ` ORDER BY created_at DESC`;
    const orders = await queryAll(sql, params);

    // Fetch order items for each order
    for (const order of orders) {
      order.items = await queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    }

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:idOrCode
router.get('/:idOrCode', async (req, res) => {
  try {
    const { idOrCode } = req.params;
    let order;
    if (!isNaN(Number(idOrCode))) {
      order = await queryOne('SELECT * FROM orders WHERE id = ?', [Number(idOrCode)]);
    } else {
      order = await queryOne('SELECT * FROM orders WHERE order_number = ?', [idOrCode]);
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.items = await queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders (Place Order)
router.post('/', async (req, res) => {
  try {
    const {
      customer_id, customer_name, customer_email, customer_phone,
      shipping_address, city, state, postal_code, country,
      items, subtotal, shipping_cost, discount_amount, total_amount,
      payment_method, notes
    } = req.body;

    if (!customer_name || !customer_email || !items || !items.length) {
      return res.status(400).json({ error: 'Customer information and items are required.' });
    }

    // Generate unique order number e.g. AMS-2026-0045
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const order_number = `AMS-${year}-${randomSeq}`;

    const resOrder = await runExecute(
      `INSERT INTO orders (
        order_number, customer_id, customer_name, customer_email, customer_phone,
        shipping_address, city, state, postal_code, country, subtotal, shipping_cost,
        discount_amount, total_amount, payment_method, payment_status, order_status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Paid', 'Pending', ?)`,
      [
        order_number, Number(customer_id || 0), customer_name, customer_email.toLowerCase().trim(),
        customer_phone || '', shipping_address, city || '', state || '', postal_code || '',
        country || 'United States', Number(subtotal), Number(shipping_cost || 0),
        Number(discount_amount || 0), Number(total_amount), payment_method || 'Credit Card',
        notes || ''
      ]
    );

    const orderId = resOrder.lastID!;

    for (const item of items) {
      const itemTotal = Number(item.price) * Number(item.quantity);
      await runExecute(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, color, size, total_price)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId, item.product_id || item.id, item.name || item.product_name,
          item.image_url || item.image || '/images/hero_showcase.jpg',
          Number(item.price), Number(item.quantity), item.color || '', item.size || '', itemTotal
        ]
      );

      // Decrement product stock if possible
      if (item.product_id || item.id) {
        await runExecute('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?', [Number(item.quantity), item.product_id || item.id]);
      }
    }

    const createdOrder = await queryOne('SELECT * FROM orders WHERE id = ?', [orderId]);
    createdOrder.items = await queryAll('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

    res.status(201).json(createdOrder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/status (Admin Update Status)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, payment_status, notes } = req.body;

    await runExecute(
      `UPDATE orders SET
        order_status = COALESCE(?, order_status),
        payment_status = COALESCE(?, payment_status),
        notes = COALESCE(?, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [order_status, payment_status, notes, Number(id)]
    );

    const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [Number(id)]);
    if (updated) {
      updated.items = await queryAll('SELECT * FROM order_items WHERE order_id = ?', [updated.id]);
    }

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
