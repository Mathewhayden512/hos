import bcrypt from 'bcryptjs';
import { initDatabase, queryOne, runExecute } from './database.js';

export async function seedDatabaseIfNeeded() {
  await initDatabase();

  // Check if hospital_information exists
  const infoCount = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM hospital_information');
  if (infoCount && Number(infoCount.count) > 0) {
    console.log('🌱 Database already seeded.');
    return;
  }

  console.log('🌱 Seeding initial demo data...');

  // Hospital Info
  await runExecute(`
    INSERT INTO hospital_information (name, tagline, description, address, phone, email, emergency_phone, working_hours, mission, vision, social_links)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
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
    JSON.stringify({ facebook: 'https://facebook.com', twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' })
  ]);

  // Admin User: admin@wisehospital.com / AdminPass123!
  const passwordHash = await bcrypt.hash('AdminPass123!', 10);
  await runExecute(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `, ['admin@wisehospital.com', passwordHash, 'admin']);

  // Departments (12)
  const departmentsData = [
    { id: 1, name: 'Cardiology', slug: 'cardiology', icon: 'Heart', desc: 'Comprehensive cardiovascular care including interventional cardiology, electrophysiology, and preventive heart wellness.', services: ['ECG & Echocardiography', 'Coronary Angiography', 'Angioplasty & Stenting', 'Heart Valve Surgery', 'Cardiac Rehabilitation'], img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Neurology', slug: 'neurology', icon: 'Brain', desc: 'Advanced diagnosis and neuro-surgical treatment for stroke, epilepsy, Parkinson’s disease, and spine disorders.', services: ['EEG & EMG Testing', 'Stroke Intervention Unit', 'Epilepsy Management', 'Neurosurgery', 'Spine Surgery'], img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Orthopedics', slug: 'orthopedics', icon: 'Bone', desc: 'Specialized care for joint replacements, complex fractures, sports injuries, and minimally invasive knee surgery.', services: ['Total Knee & Hip Replacement', 'Arthroscopic Surgery', 'Fracture & Trauma Care', 'Sports Injury Clinic', 'Physiotherapy'], img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Pediatrics', slug: 'pediatrics', icon: 'Baby', desc: 'Dedicated medical care for infants, children, and adolescents featuring specialized NICU and PICU units.', services: ['Well-child Checkups', 'Pediatric ICU (PICU)', 'Neonatal ICU (NICU)', 'Immunization & Vaccination', 'Child Psychology'], img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Dermatology', slug: 'dermatology', icon: 'Sparkles', desc: 'Comprehensive medical, surgical, and cosmetic skin care for eczema, psoriasis, skin cancer screening, and laser therapy.', services: ['Acne & Psoriasis Clinic', 'Skin Cancer Screening', 'Cosmetic Dermatology', 'Laser Hair Removal', 'Mohs Surgery'], img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'General Medicine', slug: 'general-medicine', icon: 'Stethoscope', desc: 'Primary healthcare services for acute and chronic adult illnesses, diabetes management, and preventive wellness.', services: ['Comprehensive Health Checkups', 'Diabetes & Hypertension Care', 'Infectious Disease Control', 'Preventive Care', 'Geriatric Medicine'], img: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800' },
    { id: 7, name: 'Gynecology & Obstetrics', slug: 'gynecology', icon: 'UserCheck', desc: 'Holistic healthcare for women including prenatal care, high-risk pregnancy delivery, and laparoscopic surgery.', services: ['Antenatal & Postnatal Care', 'High-Risk Pregnancy Delivery', 'Laparoscopic Surgery', 'Infertility Evaluation', 'Menopause Care'], img: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800' },
    { id: 8, name: 'ENT (Otolaryngology)', slug: 'ent', icon: 'Ear', desc: 'Expert care for ear, nose, throat, hearing loss, sinus disorders, and endoscopic sinus surgeries.', services: ['Endoscopic Sinus Surgery', 'Hearing Assessment & Implants', 'Voice & Swallowing Therapy', 'Tonsillectomy', 'Sleep Apnea Management'], img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
    { id: 9, name: 'Gastroenterology', slug: 'gastroenterology', icon: 'Activity', desc: 'Specialized care for digestive system diseases, liver disorders, endoscopy, colonoscopy, and IBS.', services: ['Diagnostic Endoscopy', 'Colonoscopy Screening', 'Liver & Hepatitis Clinic', 'GERD & IBS Management', 'ERCP Procedures'], img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' },
    { id: 10, name: 'Oncology', slug: 'oncology', icon: 'ShieldAlert', desc: 'Integrated cancer care offering chemotherapy, targeted immunotherapy, surgical oncology, and radiation planning.', services: ['Chemotherapy Center', 'Surgical Oncology', 'Immunotherapy & Targeted Care', 'Radiation Therapy Planning', 'Palliative Care'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800' },
    { id: 11, name: 'Urology', slug: 'urology', icon: 'Activity', desc: 'Medical and surgical treatments for kidney stones, prostate disorders, urinary incontinence, and urological cancers.', services: ['Laser Kidney Stone Treatment', 'Prostate Care & TURP', 'Urological Cancer Surgery', 'Incontinence Care', 'Male Infertility'], img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' },
    { id: 12, name: 'Pulmonology', slug: 'pulmonology', icon: 'Wind', desc: 'Advanced pulmonary diagnosis and treatment for asthma, COPD, sleep disorders, and respiratory infections.', services: ['Pulmonary Function Testing', 'Bronchoscopy', 'Sleep Apnea Diagnostics', 'Asthma & Allergy Clinic', 'COPD Rehabilitation'], img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800' }
  ];

  for (const dep of departmentsData) {
    await runExecute(`
      INSERT INTO departments (id, name, slug, icon, description, services, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [dep.id, dep.name, dep.slug, dep.icon, dep.desc, JSON.stringify(dep.services), dep.img]);
  }

  // Doctors (12)
  const doctorsData = [
    { id: 1, depId: 1, name: 'Dr. Marcus Vance', spec: 'Interventional Cardiology', qual: 'MD, FACC, FSCAI', exp: 18, gender: 'Male', bio: 'Dr. Marcus Vance is a renowned interventional cardiologist with over 18 years of expertise in complex coronary angioplasty, transcatheter aortic valve replacements (TAVR), and preventive cardiac rehabilitation.', lang: 'English, Spanish', fee: 150.00, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600' },
    { id: 2, depId: 1, name: 'Dr. Elena Rostova', spec: 'Heart Failure & Electrophysiology', qual: 'MD, PhD (Cardiology)', exp: 14, gender: 'Female', bio: 'Specializing in arrhythmia ablation, pacemaker implantation, and advanced heart failure therapy, Dr. Rostova has published numerous peer-reviewed cardiology research papers.', lang: 'English, Russian, French', fee: 140.00, img: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600' },
    { id: 3, depId: 2, name: 'Dr. Aris Thorne', spec: 'Stroke & Neuro-Oncology', qual: 'MD, DM (Neurology), FAAN', exp: 20, gender: 'Male', bio: 'Leading neurologist specializing in acute stroke thrombolysis, neuro-critical care, and brain tumor management. Director of the Comprehensive Stroke Center.', lang: 'English', fee: 180.00, img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600' },
    { id: 4, depId: 2, name: 'Dr. Sophia Chen', spec: 'Movement Disorders & Parkinson’s', qual: 'MD, PhD', exp: 12, gender: 'Female', bio: 'Expert in deep brain stimulation (DBS) evaluation, Parkinson’s care, epilepsy monitoring, and neuro-genetic conditions.', lang: 'English, Mandarin', fee: 135.00, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600' },
    { id: 5, depId: 3, name: 'Dr. David Miller', spec: 'Joint Replacement & Trauma', qual: 'MS (Orthopedics), FRCS', exp: 16, gender: 'Male', bio: 'Specialist in computer-navigated robotic knee and hip replacements, complex fracture reconstruction, and minimally invasive joint procedures.', lang: 'English', fee: 160.00, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600' },
    { id: 6, depId: 3, name: 'Dr. Sarah Jenkins', spec: 'Sports Medicine & Arthroscopy', qual: 'MD (Ortho), Fellowship (USA)', exp: 11, gender: 'Female', bio: 'Consultant orthopedic surgeon dedicated to shoulder and knee arthroscopy, ACL reconstruction, ligament repair, and athlete rehabilitation.', lang: 'English, German', fee: 130.00, img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600' },
    { id: 7, depId: 4, name: 'Dr. Michael Sterling', spec: 'Pediatric Intensive Care', qual: 'MD (Pediatrics), DCH', exp: 15, gender: 'Male', bio: 'Compassionate pediatrician focusing on developmental milestone monitoring, pediatric emergency medicine, and childhood asthma management.', lang: 'English, Spanish', fee: 110.00, img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600' },
    { id: 8, depId: 5, name: 'Dr. Amara Patel', spec: 'Dermatology & Laser Surgery', qual: 'MD, DNB (Dermatology)', exp: 10, gender: 'Female', bio: 'Expert in clinical dermatology, acne scarring treatments, biological therapies for psoriasis, and anti-aging aesthetic procedures.', lang: 'English, Hindi', fee: 120.00, img: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600' },
    { id: 9, depId: 6, name: 'Dr. Robert Harrison', spec: 'Internal Medicine & Diabetology', qual: 'MD (General Medicine)', exp: 22, gender: 'Male', bio: 'Senior physician specializing in multi-system adult diseases, metabolic syndrome, difficult-to-treat hypertension, and holistic disease prevention.', lang: 'English', fee: 100.00, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600' },
    { id: 10, depId: 7, name: 'Dr. Victoria Adams', spec: 'High-Risk Obstetrics & Gynecology', qual: 'MD, FACOG', exp: 17, gender: 'Female', bio: 'Pioneer in minimally invasive laparoscopic hysterectomies, painless childbirth, fetal medicine, and high-risk pregnancy monitoring.', lang: 'English, French', fee: 150.00, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600' },
    { id: 11, depId: 8, name: 'Dr. Jonathan Vance', spec: 'ENT & Head-Neck Surgery', qual: 'MS (ENT), DLO', exp: 13, gender: 'Male', bio: 'Expert in endoscopic sinus surgery, sleep apnea treatment, eardrum repair (tympanoplasty), and voice pathology.', lang: 'English', fee: 125.00, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600' },
    { id: 12, depId: 10, name: 'Dr. Beatrix Lawson', spec: 'Medical Oncology', qual: 'MD, DM (Oncology), FESMO', exp: 19, gender: 'Female', bio: 'Renowned oncologist specializing in personalized precision medicine, breast and lung cancer targeted therapies, and clinical trial design.', lang: 'English', fee: 200.00, img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600' }
  ];

  for (const doc of doctorsData) {
    await runExecute(`
      INSERT INTO doctors (id, department_id, name, specialization, qualification, experience_years, gender, bio, languages, consultation_fee, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [doc.id, doc.depId, doc.name, doc.spec, doc.qual, doc.exp, doc.gender, doc.bio, doc.lang, doc.fee, doc.img]);

    // Add schedules Mon-Fri (1 to 5)
    for (let day = 1; day <= 5; day++) {
      await runExecute(`
        INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes)
        VALUES (?, ?, ?, ?, ?)
      `, [doc.id, day, '09:00', '17:00', 30]);
    }
  }

  // Facilities (12)
  const facilitiesData = [
    { name: 'Emergency Care Department', cat: 'Emergency Services', desc: '24/7 Trauma response center equipped with triage bays, cardiac resuscitation equipment, and dedicated emergency physicians.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', icon: 'Siren' },
    { name: 'Intensive Care Unit (ICU)', cat: 'Critical Care', desc: 'Ultra-modern multi-bed ICU with continuous invasive hemodynamic monitoring, mechanical ventilators, and 1:1 nurse ratios.', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', icon: 'Activity' },
    { name: 'Operation Theatres (OT)', cat: 'Surgical Facilities', desc: '8 Modular, infection-controlled HEPA-filtered operating suites equipped for robotic surgery, neurosurgery, and cardiac bypass.', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', icon: 'Scissors' },
    { name: '24/7 Pharmacy', cat: 'Pharmacy Services', desc: 'Fully stocked in-hospital pharmacy providing genuine prescription medicines, critical care drugs, and home delivery options.', img: 'https://images.unsplash.com/photo-1586015555751-63c3d52627cb?auto=format&fit=crop&q=80&w=800', icon: 'Pill' },
    { name: 'Central Diagnostic Laboratory', cat: 'Diagnostics', desc: 'NABL accredited laboratory delivering fast, accurate pathology, histology, immunology, and molecular microbiology tests.', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', icon: 'TestTube' },
    { name: 'High-Resolution MRI & CT Suite', cat: 'Radiology & Imaging', desc: 'Featuring 3.0 Tesla Silent MRI and 128-Slice Ultra-Fast Low-Radiation CT Scanners for crystal clear diagnostic imaging.', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', icon: 'Scan' },
    { name: 'Digital X-Ray & Ultrasound', cat: 'Radiology & Imaging', desc: 'Low-dose digital radiography, 4D obstetric ultrasound, and color Doppler vascular imaging available around the clock.', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', icon: 'FileText' },
    { name: 'Advanced Cardiac Ambulance', cat: 'Emergency Services', desc: 'Fleet of Mobile ICUs equipped with defibrillators, portable ventilators, telemetry, and trained paramedics.', img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&q=80&w=800', icon: 'Truck' },
    { name: 'Luxury Inpatient Suites', cat: 'Patient Rooms', desc: 'Private rooms and executive suites with ergonomic beds, dedicated nursing stations, high-speed Wi-Fi, and patient dining options.', img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800', icon: 'Bed' },
    { name: '24/7 Blood Bank', cat: 'Emergency Services', desc: 'NABH certified component blood bank maintaining 100% screened packed red cells, platelets, and fresh frozen plasma.', img: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800', icon: 'Droplet' },
    { name: 'Outpatient Clinics (OPD)', cat: 'Outpatient Services', desc: 'Spacious OPD center with 30+ consultation rooms, digital queue management, and comfortable waiting lounges.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', icon: 'Users' },
    { name: 'Green Leaf Wellness Cafeteria', cat: 'Hospital Amenities', desc: 'Hygienic, nutritionist-approved food court offering healthy meals, fresh juices, and specialty coffee for visitors and staff.', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', icon: 'Coffee' }
  ];

  for (const fac of facilitiesData) {
    await runExecute(`
      INSERT INTO facilities (name, category, description, image_url, icon)
      VALUES (?, ?, ?, ?, ?)
    `, [fac.name, fac.cat, fac.desc, fac.img, fac.icon]);
  }

  // Reviews
  const reviewsData = [
    { name: 'Eleanor Vance', rating: 5, comment: 'The cardiology team saved my husband’s life during an emergency cardiac arrest. Dr. Marcus Vance and the ICU nursing staff are absolute angels!', dept: 'Cardiology' },
    { name: 'Michael Ross', rating: 5, comment: 'Had my knee replacement surgery done by Dr. David Miller. I was walking without support within 3 weeks. World-class facilities and care.', dept: 'Orthopedics' },
    { name: 'Sophia Martinez', rating: 5, comment: 'Delivered my twin baby girls at St. Jude. Dr. Victoria Adams made the entire process so smooth, safe, and comforting.', dept: 'Gynecology & Obstetrics' },
    { name: 'David K. Thompson', rating: 5, comment: 'Exceptional experience at the MRI diagnostics center. Extremely clean hospital, courteous staff, and negligible wait times!', dept: 'Radiology' }
  ];

  for (const rev of reviewsData) {
    await runExecute(`
      INSERT INTO reviews (patient_name, rating, comment, department)
      VALUES (?, ?, ?, ?)
    `, [rev.name, rev.rating, rev.comment, rev.dept]);
  }

  // Patients
  const patientsData = [
    { id: 1, name: 'James Wilson', age: 45, gender: 'Male', phone: '+1 555-0192', email: 'james.wilson@example.com' },
    { id: 2, name: 'Sarah Jenkins', age: 32, gender: 'Female', phone: '+1 555-0184', email: 'sarah.j@example.com' },
    { id: 3, name: 'Robert Garcia', age: 58, gender: 'Male', phone: '+1 555-0177', email: 'r.garcia@example.com' }
  ];

  for (const pat of patientsData) {
    await runExecute(`
      INSERT INTO patients (id, full_name, age, gender, phone, email)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [pat.id, pat.name, pat.age, pat.gender, pat.phone, pat.email]);
  }

  // Today's date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Appointments
  await runExecute(`
    INSERT INTO appointments (appointment_code, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, ['APT-2026-8801', 1, 1, 1, todayStr, '10:00 AM', 'Routine cardiovascular follow-up after stent placement.', 'Confirmed']);

  await runExecute(`
    INSERT INTO appointments (appointment_code, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, ['APT-2026-8802', 2, 8, 5, todayStr, '02:30 PM', 'Consultation for persistent skin rash and allergy screening.', 'Pending']);

  await runExecute(`
    INSERT INTO appointments (appointment_code, patient_id, doctor_id, department_id, appointment_date, appointment_time, reason, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, ['APT-2026-8803', 3, 3, 2, todayStr, '11:00 AM', 'Evaluation for chronic migraine headaches and dizziness.', 'Confirmed']);

  console.log('✅ Demo database seeded successfully!');
}

if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabaseIfNeeded().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
