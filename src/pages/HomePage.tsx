import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsCounter } from '../components/home/StatsCounter';
import { FeaturedDepts } from '../components/home/FeaturedDepts';
import { FeaturedDoctors } from '../components/home/FeaturedDoctors';
import { FacilitiesHighlight } from '../components/home/FacilitiesHighlight';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { LocationContact } from '../components/home/LocationContact';
import { api } from '../services/api';
import { Department, Doctor, Facility, HospitalInfo, Review } from '../types';
import { SkeletonCard } from '../components/common/Skeleton';

export const HomePage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [info, setInfo] = useState<HospitalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [depts, docs, facs, hospitalInfo] = await Promise.all([
          api.getDepartments(),
          api.getDoctors(),
          api.getFacilities(),
          api.getHospitalInfo()
        ]);
        setDepartments(depts);
        setDoctors(docs);
        setFacilities(facs);
        setInfo(hospitalInfo);
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-0">
      <HeroSection />
      <StatsCounter />
      
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <>
          <FeaturedDepts departments={departments} />
          <WhyChooseUs />
          <FeaturedDoctors doctors={doctors} />
          <FacilitiesHighlight facilities={facilities} />
          <Testimonials reviews={info?.reviews || []} />
          <LocationContact info={info} />
        </>
      )}
    </div>
  );
};
