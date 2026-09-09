-- SQL Schema for Hospital Management Platform
-- Relational Model compatible with PostgreSQL & SQLite

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  icon VARCHAR(50) DEFAULT 'Activity',
  description TEXT NOT NULL,
  services TEXT NOT NULL, -- JSON array string of services
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  specialization VARCHAR(150) NOT NULL,
  qualification VARCHAR(150) NOT NULL,
  experience_years INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  bio TEXT,
  languages VARCHAR(255) DEFAULT 'English',
  consultation_fee NUMERIC(10, 2) NOT NULL,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctor_schedules (
  id SERIAL PRIMARY KEY,
  doctor_id INT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL, -- 0 (Sun) to 6 (Sat)
  start_time VARCHAR(10) NOT NULL, -- '09:00'
  end_time VARCHAR(10) NOT NULL,   -- '17:00'
  slot_duration_minutes INT DEFAULT 30
);

CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  appointment_code VARCHAR(50) UNIQUE NOT NULL,
  patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id INT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(10) NOT NULL, -- e.g. '10:30 AM'
  reason TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Cancelled', 'Completed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  icon VARCHAR(50) DEFAULT 'Shield',
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS hospital_information (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  emergency_phone VARCHAR(50) NOT NULL,
  working_hours VARCHAR(100) NOT NULL,
  mission TEXT NOT NULL,
  vision TEXT NOT NULL,
  social_links TEXT NOT NULL -- JSON string
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(150) NOT NULL,
  rating INT NOT NULL,
  comment TEXT NOT NULL,
  department VARCHAR(100) NOT NULL,
  date DATE DEFAULT CURRENT_DATE
);
