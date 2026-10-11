import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sqliteDb: Database | null = null;
let pgPool: pg.Pool | null = null;
let dbMode: 'sqlite' | 'postgres' = 'sqlite';

export async function initDatabase() {
  const pgConnectionString = process.env.DATABASE_URL;

  if (pgConnectionString) {
    try {
      pgPool = new pg.Pool({ connectionString: pgConnectionString });
      await pgPool.query('SELECT 1');
      dbMode = 'postgres';
      console.log('✅ Connected to PostgreSQL Database');
      await setupTablesPostgres();
      return;
    } catch (err) {
      console.warn('⚠️ Could not connect to PostgreSQL. Falling back to embedded SQLite database.');
    }
  }

  // SQLite Fallback setup
  const dataDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'stitch.db');
  sqliteDb = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  dbMode = 'sqlite';
  console.log(`✅ Connected to SQLite Database at: ${dbPath}`);
  await setupTablesSqlite();
}

async function setupTablesPostgres() {
  if (!pgPool) return;
  const schemaPath = path.resolve(__dirname, '../../schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pgPool.query(schemaSql);
  }
}

async function setupTablesSqlite() {
  if (!sqliteDb) return;
  
  await sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT DEFAULT '',
      address TEXT DEFAULT '',
      role TEXT DEFAULT 'CUSTOMER',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      item_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      category_id INTEGER NOT NULL,
      category_name TEXT NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT DEFAULT '',
      price REAL NOT NULL,
      discount_price REAL DEFAULT 0,
      stock INTEGER DEFAULT 10,
      image_url TEXT NOT NULL,
      additional_images TEXT DEFAULT '[]',
      materials TEXT DEFAULT '100% Premium Cotton Yarn',
      dimensions TEXT DEFAULT 'Custom size',
      available_colors TEXT DEFAULT '["Natural Cream", "Dusty Rose", "Sage Green", "Warm Ochre"]',
      available_sizes TEXT DEFAULT '["Standard"]',
      is_featured INTEGER DEFAULT 0,
      is_bestseller INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      customer_id INTEGER DEFAULT 0,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      country TEXT DEFAULT 'United States',
      subtotal REAL NOT NULL,
      shipping_cost REAL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      total_amount REAL NOT NULL,
      payment_method TEXT DEFAULT 'Credit Card',
      payment_status TEXT DEFAULT 'Paid',
      order_status TEXT DEFAULT 'Pending',
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      product_image TEXT DEFAULT '',
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      color TEXT DEFAULT '',
      size TEXT DEFAULT '',
      total_price REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_code TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      product_type TEXT NOT NULL,
      preferred_color TEXT DEFAULT '',
      size TEXT DEFAULT '',
      quantity INTEGER DEFAULT 1,
      budget TEXT DEFAULT '',
      deadline TEXT DEFAULT '',
      custom_description TEXT NOT NULL,
      reference_image_url TEXT DEFAULT '',
      status TEXT DEFAULT 'New',
      admin_notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT DEFAULT '',
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT NOT NULL,
      is_approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      discount_type TEXT DEFAULT 'percentage',
      discount_amount REAL NOT NULL,
      min_order REAL DEFAULT 0,
      expiration_date TEXT DEFAULT '',
      usage_limit INTEGER DEFAULT 100,
      times_used INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      location_or_role TEXT DEFAULT 'Verified Buyer',
      comment TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_featured INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL DEFAULT 'General',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      order_num INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS website_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, product_id)
    );
  `);
}

// Database helper functions abstraction layer
export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (dbMode === 'postgres' && pgPool) {
    let pIdx = 1;
    const pgSql = sql.replace(/\?/g, () => `$${pIdx++}`);
    const res = await pgPool.query(pgSql, params);
    return res.rows as T[];
  } else if (sqliteDb) {
    return (await sqliteDb.all(sql, params)) as T[];
  }
  return [];
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await queryAll<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function runExecute(sql: string, params: any[] = []): Promise<{ lastID?: number; changes?: number }> {
  if (dbMode === 'postgres' && pgPool) {
    let pIdx = 1;
    let pgSql = sql.replace(/\?/g, () => `$${pIdx++}`);
    if (pgSql.trim().toUpperCase().startsWith('INSERT') && !pgSql.toUpperCase().includes('RETURNING')) {
      pgSql += ' RETURNING id';
    }
    const res = await pgPool.query(pgSql, params);
    return {
      lastID: res.rows[0]?.id,
      changes: res.rowCount || 0
    };
  } else if (sqliteDb) {
    const res = await sqliteDb.run(sql, params);
    return {
      lastID: res.lastID,
      changes: res.changes
    };
  }
  return {};
}

export function getDbMode() {
  return dbMode;
}
