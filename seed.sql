-- SQL Seed Data for Hospital Management Platform

INSERT INTO hospital_information (name, tagline, description, address, phone, email, emergency_phone, working_hours, mission, vision, social_links)
VALUES (
  'St. Jude Memorial Hospital & Research Institute',
  'Compassionate Care. Advanced Medicine. Better Health.',
  'St. Jude Memorial Hospital is a premier multi-specialty tertiary care hospital committed to providing world-class patient care, innovative research, and medical excellence for over 25 years.',
  '742 Evergreen Terrace, Medical District, NY 10021',
  '+1 (800) 555-4321',
  'contact@stjudememorial.org',
  '+1 (800) 911-CARE',
  '24 Hours / 7 Days a Week',
  'To deliver empathetic, patient-first medical care utilizing state-of-the-art diagnostic technology and evidence-based treatments to improve health outcomes across our community.',
  'To be recognized globally as an elite healthcare institute pioneering clinical research, surgical innovation, and compassionate patient rehabilitation.',
  '{"facebook":"https://facebook.com","twitter":"https://twitter.com","linkedin":"https://linkedin.com","instagram":"https://instagram.com"}'
);

-- Admin Password: AdminPass123! (bcrypt hash)
INSERT INTO users (email, password_hash, role)
VALUES ('admin@wisehospital.com', '$2a$10$7Z25Hk1fM5R8T1Dk4G4yNu.nCq9YfS3v9w4X.V5G4b2v8e1k2l3m4', 'admin');

-- Departments
INSERT INTO departments (id, name, slug, icon, description, services, image_url) VALUES
(1, 'Cardiology', 'cardiology', 'Heart', 'Comprehensive cardiovascular care including interventional cardiology, electrophysiology, heart failure management, and preventive cardiac wellness.', '["ECG & Echocardiography", "Coronary Angiography", "Angioplasty & Stenting", "Heart Valve Surgery", "Cardiac Rehabilitation"]', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'),
(2, 'Neurology', 'neurology', 'Brain', 'Advanced diagnosis and neuro-surgical treatment for stroke, epilepsy, Parkinson’s disease, Alzheimer’s, brain tumors, and neuromuscular disorders.', '["EEG & EMG Testing", "Stroke Intervention Unit", "Epilepsy Management", "Neurosurgery", "Spine Surgery"]', 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800'),
(3, 'Orthopedics', 'orthopedics', 'Bone', 'Specialized care for joint replacements, complex fractures, sports injuries, spine disorders, and pediatric orthopedics using minimally invasive procedures.', '["Total Knee & Hip Replacement", "Arthroscopic Surgery", "Fracture & Trauma Care", "Sports Injury Clinic", "Physiotherapy"]', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'),
(4, 'Pediatrics', 'pediatrics', 'Baby', 'Dedicated medical care for infants, children, and adolescents, featuring specialized NICU and PICU units and pediatric emergency specialists.', '["Well-child Checkups", "Pediatric ICU (PICU)", "Neonatal ICU (NICU)", "Immunization & Vaccination", "Child Psychology"]', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'),
(5, 'Dermatology', 'dermatology', 'Sparkles', 'Comprehensive medical, surgical, and cosmetic skin care for eczema, psoriasis, acne, skin cancer screening, and laser therapy.', '["Acne & Psoriasis Clinic", "Skin Cancer Screening", "Cosmetic Dermatology", "Laser Hair & Tattoo Removal", "Mohs Micrographic Surgery"]', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800'),
(6, 'General Medicine', 'general-medicine', 'Stethoscope', 'Primary healthcare services for acute and chronic adult illnesses, routine physicals, diabetes management, and preventive medicine.', '["Comprehensive Health Checkups", "Diabetes & Hypertension Management", "Infectious Disease Control", "Preventive Care", "Geriatric Medicine"]', 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800'),
(7, 'Gynecology & Obstetrics', 'gynecology', 'UserCheck', 'Holistic healthcare for women across all stages of life, including prenatal care, high-risk pregnancy delivery, and gynecological surgery.', '["Antenatal & Postnatal Care", "High-Risk Pregnancy Delivery", "Laparoscopic Gynecologic Surgery", "Infertility Evaluation", "Menopause Management"]', 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800'),
(8, 'ENT (Otolaryngology)', 'ent', 'Ear', 'Expert care for ear, nose, throat, head and neck conditions, sinus disorders, hearing loss, and endoscopic sinus surgeries.', '["Endoscopic Sinus Surgery", "Hearing Loss Assessment & Implants", "Voice & Swallowing Therapy", "Tonsillectomy & Adenoidectomy", "Sleep Apnea Management"]', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'),
(9, 'Gastroenterology', 'gastroenterology', 'Activity', 'Specialized care for digestive system diseases, liver disorders, endoscopy, colonoscopy, and inflammatory bowel disease.', '["Diagnostic & Therapeutic Endoscopy", "Colonoscopy Screening", "Liver Disease & Hepatitis Clinic", "GERD & IBS Management", "ERCP Procedures"]', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'),
(10, 'Oncology', 'oncology', 'ShieldAlert', 'Integrated cancer care offering chemotherapy, targeted immunotherapy, surgical oncology, radiation planning, and palliative support.', '["Chemotherapy Infusion Center", "Surgical Oncology", "Immunotherapy & Targeted Care", "Radiation Therapy Planning", "Palliative Care Unit"]', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'),
(11, 'Urology', 'urology', 'Activity', 'Comprehensive medical and surgical treatments for kidney stones, prostate disorders, urinary incontinence, and urological cancers.', '["Laser Kidney Stone Treatment (RIRS)", "Prostate Care & TURP", "Urological Cancer Surgery", "Incontinence Management", "Male Infertility & Andrology"]', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'),
(12, 'Pulmonology', 'pulmonology', 'Wind', 'Advanced pulmonary diagnosis and treatment for asthma, COPD, pulmonary fibrosis, sleep disorders, and respiratory infections.', '["Pulmonary Function Testing (PFT)", "Bronchoscopy & Endobronchial Ultrasound", "Sleep Apnea Diagnostics", "Asthma & Allergy Clinic", "COPD Rehabilitation"]', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800');

-- Doctors
INSERT INTO doctors (id, department_id, name, specialization, qualification, experience_years, gender, bio, languages, consultation_fee, image_url) VALUES
(1, 1, 'Dr. Marcus Vance', 'Interventional Cardiology', 'MD, FACC, FSCAI', 18, 'Male', 'Dr. Marcus Vance is a renowned interventional cardiologist with over 18 years of expertise in complex coronary angioplasty, transcatheter aortic valve replacements (TAVR), and preventive cardiac rehabilitation.', 'English, Spanish', 150.00, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'),
(2, 1, 'Dr. Elena Rostova', 'Heart Failure & Electrophysiology', 'MD, PhD (Cardiology)', 14, 'Female', 'Specializing in arrhythmia ablation, pacemaker implantation, and advanced heart failure therapy, Dr. Rostova has published numerous peer-reviewed cardiology research papers.', 'English, Russian, French', 140.00, 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600'),
(3, 2, 'Dr. Aris Thorne', 'Stroke & Neuro-Oncology', 'MD, DM (Neurology), FAAN', 20, 'Male', 'Leading neurologist specializing in acute stroke thrombolysis, neuro-critical care, and brain tumor management. Director of the Comprehensive Stroke Center.', 'English', 180.00, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600'),
(4, 2, 'Dr. Sophia Chen', 'Movement Disorders & Parkinson’s', 'MD, PhD', 12, 'Female', 'Expert in deep brain stimulation (DBS) evaluation, Parkinson’s care, epilepsy monitoring, and neuro-genetic conditions.', 'English, Mandarin', 135.00, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'),
(5, 3, 'Dr. David Miller', 'Joint Replacement & Trauma', 'MS (Orthopedics), FRCS', 16, 'Male', 'Specialist in computer-navigated robotic knee and hip replacements, complex fracture reconstruction, and minimally invasive joint procedures.', 'English', 160.00, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600'),
(6, 3, 'Dr. Sarah Jenkins', 'Sports Medicine & Arthroscopy', 'MD (Ortho), Fellowship (USA)', 11, 'Female', 'Consultant orthopedic surgeon dedicated to shoulder and knee arthroscopy, ACL reconstruction, ligament repair, and athlete rehabilitation.', 'English, German', 130.00, 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600'),
(7, 4, 'Dr. Michael Sterling', 'Pediatric Intensive Care & Cardiology', 'MD (Pediatrics), DCH', 15, 'Male', 'Compassionate pediatrician focusing on developmental milestone monitoring, pediatric emergency medicine, and childhood asthma management.', 'English, Spanish', 110.00, 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600'),
(8, 5, 'Dr. Amara Patel', 'Dermatology & Laser Surgery', 'MD, DNB (Dermatology)', 10, 'Female', 'Expert in clinical dermatology, acne scarring treatments, biological therapies for psoriasis, and anti-aging aesthetic procedures.', 'English, Hindi', 120.00, 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600'),
(9, 6, 'Dr. Robert Harrison', 'Internal Medicine & Diabetology', 'MD (General Medicine)', 22, 'Male', 'Senior physician specializing in multi-system adult diseases, metabolic syndrome, difficult-to-treat hypertension, and holistic disease prevention.', 'English', 100.00, 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'),
(10, 7, 'Dr. Victoria Adams', 'High-Risk Obstetrics & Gynecology', 'MD, FACOG', 17, 'Female', 'Pioneer in minimally invasive laparoscopic hysterectomies, painless childbirth, fetal medicine, and high-risk pregnancy monitoring.', 'English, French', 150.00, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'),
(11, 8, 'Dr. Jonathan Vance', 'ENT & Head-Neck Surgery', 'MS (ENT), DLO', 13, 'Male', 'Expert in endoscopic sinus surgery, sleep apnea treatment, eardrum repair (tympanoplasty), and voice pathology.', 'English', 125.00, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600'),
(12, 10, 'Dr. Beatrix Lawson', 'Medical Oncology & Cancer Genetics', 'MD, DM (Oncology), FESMO', 19, 'Female', 'Renowned oncologist specializing in personalized precision medicine, breast and lung cancer targeted therapies, and clinical trial design.', 'English', 200.00, 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600');

-- Doctor Schedules (Mon to Fri = 1 to 5)
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes) VALUES
(1, 1, '09:00', '16:00', 30),
(1, 2, '09:00', '16:00', 30),
(1, 3, '09:00', '16:00', 30),
(1, 4, '09:00', '16:00', 30),
(1, 5, '09:00', '14:00', 30),
(2, 1, '10:00', '17:00', 30),
(2, 3, '10:00', '17:00', 30),
(2, 5, '10:00', '17:00', 30),
(3, 2, '09:00', '15:00', 30),
(3, 4, '09:00', '15:00', 30),
(4, 1, '09:30', '16:30', 30),
(4, 3, '09:30', '16:30', 30),
(5, 1, '08:30', '14:30', 30),
(5, 2, '08:30', '14:30', 30),
(5, 4, '08:30', '14:30', 30),
(6, 3, '10:00', '16:00', 30),
(6, 5, '10:00', '16:00', 30),
(7, 1, '09:00', '17:00', 30),
(7, 2, '09:00', '17:00', 30),
(7, 4, '09:00', '17:00', 30),
(8, 2, '11:00', '18:00', 30),
(8, 4, '11:00', '18:00', 30),
(9, 1, '09:00', '17:00', 30),
(9, 3, '09:00', '17:00', 30),
(9, 5, '09:00', '17:00', 30),
(10, 1, '10:00', '16:00', 30),
(10, 3, '10:00', '16:00', 30),
(11, 2, '09:00', '15:00', 30),
(11, 4, '09:00', '15:00', 30),
(12, 1, '10:00', '15:00', 30),
(12, 4, '10:00', '15:00', 30);

-- Facilities
INSERT INTO facilities (name, category, description, image_url, icon) VALUES
('Emergency Care Department', 'Emergency Services', '24/7 Trauma response center equipped with triage bays, cardiac resuscitation equipment, and dedicated emergency physicians.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 'Siren'),
('Intensive Care Unit (ICU)', 'Critical Care', 'Ultra-modern multi-bed ICU with continuous invasive hemodynamic monitoring, mechanical ventilators, and 1:1 nurse ratios.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 'Activity'),
('Operation Theatres (OT)', 'Surgical Facilities', '8 Modular, infection-controlled HEPA-filtered operating suites equipped for robotic surgery, neurosurgery, and cardiac bypass.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', 'Scissors'),
('24/7 Pharmacy', 'Pharmacy Services', 'Fully stocked in-hospital pharmacy providing genuine prescription medicines, critical care drugs, and home delivery options.', 'https://images.unsplash.com/photo-1586015555751-63c3d52627cb?auto=format&fit=crop&q=80&w=800', 'Pill'),
('Central Diagnostic Laboratory', 'Diagnostics', 'NABL accredited laboratory delivering fast, accurate pathology, histology, immunology, and molecular microbiology tests.', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', 'TestTube'),
('High-Resolution MRI & CT Suite', 'Radiology & Imaging', 'Featuring 3.0 Tesla Silent MRI and 128-Slice Ultra-Fast Low-Radiation CT Scanners for crystal clear diagnostic imaging.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', 'Scan'),
('Digital X-Ray & Ultrasound', 'Radiology & Imaging', 'Low-dose digital radiography, 4D obstetric ultrasound, and color Doppler vascular imaging available around the clock.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', 'FileText'),
('Advanced Cardiac Ambulance', 'Emergency Services', 'Fleet of Mobile ICUs equipped with defibrillators, portable ventilators, telemetry, and trained paramedics.', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&q=80&w=800', 'Truck'),
('Luxury Inpatient Suites', 'Patient Rooms', 'Private rooms and executive suites with ergonomic beds, dedicated nursing stations, high-speed Wi-Fi, and patient dining options.', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800', 'Bed'),
('24/7 Blood Bank', 'Emergency Services', 'NABH certified component blood bank maintaining 100% screened packed red cells, platelets, and fresh frozen plasma.', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800', 'Droplet'),
('Outpatient Clinics (OPD)', 'Outpatient Services', 'Spacious OPD center with 30+ consultation rooms, digital queue management, and comfortable waiting lounges.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', 'Users'),
('Green Leaf Wellness Cafeteria', 'Hospital Amenities', 'Hygienic, nutritionist-approved food court offering healthy meals, fresh juices, and specialty coffee for visitors and staff.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', 'Coffee');

-- Reviews / Testimonials
INSERT INTO reviews (patient_name, rating, comment, department, date) VALUES
('Eleanor Vance', 5, 'The cardiology team saved my husband’s life during an emergency cardiac arrest. Dr. Marcus Vance and the ICU nursing staff are absolute angels!', 'Cardiology', '2026-08-15'),
('Michael Ross', 5, 'Had my knee replacement surgery done by Dr. David Miller. I was walking without support within 3 weeks. World-class facilities and care.', 'Orthopedics', '2026-08-28'),
('Sophia Martinez', 5, 'Delivered my twin baby girls at St. Jude. Dr. Victoria Adams made the entire process so smooth, safe, and comforting.', 'Gynecology & Obstetrics', '2026-09-02'),
('David K. Thompson', 5, 'Exceptional experience at the MRI diagnostics center. Extremely clean hospital, courteous staff, and negligible wait times!', 'Radiology', '2026-09-04');

-- Patients
INSERT INTO patients (id, full_name, age, gender, phone, email) VALUES
(1, 'James Wilson', 45, 'Male', '+1 555-0192', 'james.wilson@example.com'),
(2, 'Sarah Jenkins', 32, 'Female', '+1 555-0184', 'sarah.j@example.com'),
(3, 'Robert Garcia', 58, 'Male', '+1 555-0177', 'r.garcia@example.com');

-- Appointments
INSERT INTO appointments (appointment_code, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status) VALUES
('APT-2026-8801', 1, 1, 1, CURRENT_DATE, '10:00 AM', 'Routine cardiovascular follow-up after stent placement.', 'Confirmed'),
('APT-2026-8802', 2, 8, 5, CURRENT_DATE, '02:30 PM', 'Consultation for persistent skin rash and allergy screening.', 'Pending'),
('APT-2026-8803', 3, 3, 2, CURRENT_DATE + INTERVAL '1 day', '11:00 AM', 'Evaluation for chronic migraine headaches and dizziness.', 'Confirmed');
