import { Router } from 'express';
import { queryAll, queryOne, runExecute } from '../db/database.js';

const router = Router();

// GET /api/products (supports category, search, minPrice, maxPrice, sort, featured, bestseller)
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, featured, bestseller, activeOnly } = req.query;

    let sql = `SELECT * FROM products WHERE 1=1`;
    const params: any[] = [];

    if (activeOnly !== 'false') {
      sql += ` AND is_active = 1`;
    }

    if (category) {
      sql += ` AND (category_id = ? OR category_name LIKE ?)`;
      params.push(category, `%${category}%`);
    }

    if (search) {
      sql += ` AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (minPrice) {
      sql += ` AND price >= ?`;
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      sql += ` AND price <= ?`;
      params.push(Number(maxPrice));
    }

    if (featured === 'true' || featured === '1') {
      sql += ` AND is_featured = 1`;
    }

    if (bestseller === 'true' || bestseller === '1') {
      sql += ` AND is_bestseller = 1`;
    }

    // Sorting
    if (sort === 'price-low') {
      sql += ` ORDER BY price ASC`;
    } else if (sort === 'price-high') {
      sql += ` ORDER BY price DESC`;
    } else if (sort === 'newest') {
      sql += ` ORDER BY created_at DESC`;
    } else if (sort === 'popularity') {
      sql += ` ORDER BY is_bestseller DESC, stock DESC`;
    } else {
      sql += ` ORDER BY id ASC`;
    }

    const products = await queryAll(sql, params);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product;
    if (!isNaN(Number(idOrSlug))) {
      product = await queryOne('SELECT * FROM products WHERE id = ?', [Number(idOrSlug)]);
    } else {
      product = await queryOne('SELECT * FROM products WHERE slug = ?', [idOrSlug]);
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get product reviews
    const reviews = await queryAll('SELECT * FROM reviews WHERE product_id = ? AND is_approved = 1 ORDER BY created_at DESC', [product.id]);
    
    // Get related products from same category
    const related = await queryAll('SELECT * FROM products WHERE category_id = ? AND id != ? AND is_active = 1 LIMIT 4', [product.category_id, product.id]);

    res.json({ product, reviews, related });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products (Admin Add)
router.post('/', async (req, res) => {
  try {
    const {
      name, sku, category_id, category_name, description, short_description,
      price, discount_price, stock, image_url, additional_images, materials,
      dimensions, available_colors, available_sizes, is_featured, is_bestseller
    } = req.body;

    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Name, price, and category are required.' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const generatedSku = sku || `AMS-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await runExecute(
      `INSERT INTO products (
        name, slug, sku, category_id, category_name, description, short_description,
        price, discount_price, stock, image_url, additional_images, materials,
        dimensions, available_colors, available_sizes, is_featured, is_bestseller
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, slug, generatedSku, category_id, category_name || 'General',
        description || '', short_description || '', Number(price), Number(discount_price || 0),
        Number(stock || 10), image_url || '/images/hero_showcase.jpg',
        typeof additional_images === 'string' ? additional_images : JSON.stringify(additional_images || []),
        materials || '100% Cotton Yarn', dimensions || 'Standard',
        typeof available_colors === 'string' ? available_colors : JSON.stringify(available_colors || ['Natural Cream']),
        typeof available_sizes === 'string' ? available_sizes : JSON.stringify(available_sizes || ['Standard']),
        is_featured ? 1 : 0, is_bestseller ? 1 : 0
      ]
    );

    const newProduct = await queryOne('SELECT * FROM products WHERE id = ?', [result.lastID]);
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id (Admin Edit)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, sku, category_id, category_name, description, short_description,
      price, discount_price, stock, image_url, additional_images, materials,
      dimensions, available_colors, available_sizes, is_featured, is_bestseller, is_active
    } = req.body;

    const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;

    await runExecute(
      `UPDATE products SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        sku = COALESCE(?, sku),
        category_id = COALESCE(?, category_id),
        category_name = COALESCE(?, category_name),
        description = COALESCE(?, description),
        short_description = COALESCE(?, short_description),
        price = COALESCE(?, price),
        discount_price = COALESCE(?, discount_price),
        stock = COALESCE(?, stock),
        image_url = COALESCE(?, image_url),
        additional_images = COALESCE(?, additional_images),
        materials = COALESCE(?, materials),
        dimensions = COALESCE(?, dimensions),
        available_colors = COALESCE(?, available_colors),
        available_sizes = COALESCE(?, available_sizes),
        is_featured = COALESCE(?, is_featured),
        is_bestseller = COALESCE(?, is_bestseller),
        is_active = COALESCE(?, is_active)
      WHERE id = ?`,
      [
        name, slug, sku, category_id, category_name, description, short_description,
        price !== undefined ? Number(price) : null,
        discount_price !== undefined ? Number(discount_price) : null,
        stock !== undefined ? Number(stock) : null,
        image_url,
        typeof additional_images === 'object' ? JSON.stringify(additional_images) : additional_images,
        materials, dimensions,
        typeof available_colors === 'object' ? JSON.stringify(available_colors) : available_colors,
        typeof available_sizes === 'object' ? JSON.stringify(available_sizes) : available_sizes,
        is_featured !== undefined ? (is_featured ? 1 : 0) : null,
        is_bestseller !== undefined ? (is_bestseller ? 1 : 0) : null,
        is_active !== undefined ? (is_active ? 1 : 0) : null,
        Number(id)
      ]
    );

    const updatedProduct = await queryOne('SELECT * FROM products WHERE id = ?', [Number(id)]);
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id (Admin Delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await runExecute('DELETE FROM products WHERE id = ?', [Number(id)]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
