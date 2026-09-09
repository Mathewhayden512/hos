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
      console.warn('⚠️ Could not connect to PostgreSQL. Falling back to embedded SQLite database.', err);
    }
  }

  // SQLite Fallback setup
  const dataDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'hospital.db');
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
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      icon TEXT DEFAULT 'Activity',
      description TEXT NOT NULL,
      services TEXT NOT NULL,
      image_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      department_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      specialization TEXT NOT NULL,
      qualification TEXT NOT NULL,
      experience_years INTEGER NOT NULL,
      gender TEXT NOT NULL,
      bio TEXT,
      languages TEXT DEFAULT 'English',
      consultation_fee REAL NOT NULL,
      image_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(department_id) REFERENCES departments(id)
    );

    CREATE TABLE IF NOT EXISTS doctor_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id INTEGER NOT NULL,
      day_of_week INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      slot_duration_minutes INTEGER DEFAULT 30,
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    );

    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appointment_code TEXT UNIQUE NOT NULL,
      patient_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      department_id INTEGER NOT NULL,
      appointment_date TEXT NOT NULL,
      appointment_time TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(doctor_id) REFERENCES doctors(id),
      FOREIGN KEY(department_id) REFERENCES departments(id)
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      icon TEXT DEFAULT 'Shield',
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS hospital_information (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      emergency_phone TEXT NOT NULL,
      working_hours TEXT NOT NULL,
      mission TEXT NOT NULL,
      vision TEXT NOT NULL,
      social_links TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      department TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_DATE
    );
  `);
}

// Database helper functions abstraction layer
export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  if (dbMode === 'postgres' && pgPool) {
    // Convert ? parameters to $1, $2, etc for Postgres
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
