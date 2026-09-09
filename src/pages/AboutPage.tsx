import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  Building2, 
  Users, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const values = [
    { title: 'Compassionate Care', desc: 'Putting patient dignity, comfort, and emotional well-being at the heart of every treatment.' },
    { title: 'Clinical Excellence', desc: 'Adhering to rigorous evidence-based medical standards and continuous physician education.' },
    { title: 'Pioneering Innovation', desc: 'Investing in cutting-edge surgical robotics, AI diagnostics, and genomic cancer therapy.' },
    { title: 'Uncompromising Safety', desc: 'Zero-tolerance for medical errors, strict infection control, and JCI accredited safety protocols.' },
  ];

  const timeline = [
    { year: '2001', title: 'Foundation of St. Jude Clinic', desc: 'Established as a 50-bed community specialty hospital in New York.' },
    { year: '2008', title: 'Expansion of Cardiac & Neuro ICU', desc: 'Added advanced catheterization labs and dedicated 30-bed ICU facilities.' },
    { year: '2015', title: 'JCI International Accreditation', desc: 'Achieved Gold Seal of Approval from Joint Commission International.' },
    { year: '2022', title: 'Robotic Surgery & Research Institute', desc: 'Inaugurated state-of-the-art robotic surgery suites and precision oncology lab.' },
    { year: '2026', title: 'Smart Digital Hospital Engine', desc: 'Integrated real-time online appointment engine and telemedicine patient portal.' },
  ];

  const galleryImages = [
    { title: 'Main Hospital Building', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800' },
    { title: 'Modular Robotic Operating Theatre', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800' },
    { title: '3.0 Tesla Silent MRI Suite', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
    { title: 'Pediatric & NICU Care Bay', url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800' },
    { title: 'Inpatient Executive Suite', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Central Diagnostic Laboratory', url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-500/20 border border-hospital-400/30 text-hospital-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>25+ Years of Healing & Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About St. Jude Memorial Hospital</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto lg:mx-0">
            Learn about our rich legacy, medical mission, visionary leadership, and commitment to compassionate patient care.
          </p>
        </div>
      </section>

      {/* Hospital Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-hospital-600 uppercase tracking-widest block">HERITAGE OF TRUST</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Premier Multi-Specialty Tertiary Care & Research Institute
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in 2001, St. Jude Memorial Hospital has grown from a local community clinic into a globally recognized 300+ bed tertiary medical center. We bring together over 50+ world-renowned physicians, cutting-edge diagnostic imaging, modular surgical suites, and dedicated critical care teams.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our multidisciplinary approach ensures every patient receives personalized diagnostic evaluation and evidence-based treatments delivered with genuine empathy.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                to="/book-appointment"
                className="px-6 py-3.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm shadow-lg flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1000"
                alt="Hospital Facility Exterior"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-hospital-50 text-hospital-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver empathetic, patient-first medical care utilizing state-of-the-art diagnostic technology and evidence-based clinical treatments to improve health outcomes across our community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To be recognized globally as an elite healthcare institute pioneering clinical research, surgical innovation, and compassionate patient rehabilitation.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base">{v.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* History Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-hospital-600 uppercase tracking-widest block">OUR JOURNEY</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hospital History & Milestones</h2>
        </div>

        <div className="relative border-l-2 border-hospital-200 max-w-3xl mx-auto pl-6 space-y-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-hospital-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
              <span className="text-xs font-extrabold text-hospital-600 uppercase tracking-wider block">{item.year}</span>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl font-extrabold">Accreditations & Quality Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">JCI Gold Seal</h4>
              <p className="text-xs text-slate-400">Joint Commission International accredited for patient safety standards.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="font-bold text-white text-base">NABH Certified</h4>
              <p className="text-xs text-slate-400">National Accreditation Board for Hospitals & Healthcare Providers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <Building2 className="w-8 h-8 text-hospital-400 mx-auto" />
              <h4 className="font-bold text-white text-base">ISO 9001:2026</h4>
              <p className="text-xs text-slate-400">International Quality Management standard for medical laboratory & ICU care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-hospital-600 uppercase tracking-widest block">INFRASTRUCTURE GALLERY</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hospital Images & Environment</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden h-64 shadow-md bg-slate-100">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-sm font-bold block">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
