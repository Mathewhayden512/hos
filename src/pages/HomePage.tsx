import React, { useState } from 'react';
import { Navbar } from '../components/a2z/Navbar';
import { HeroSection } from '../components/a2z/HeroSection';
import { AirplaneScrollPath } from '../components/a2z/AirplaneScrollPath';
import { PackageSection } from '../components/a2z/PackageSection';
import { DaySightseeingSection } from '../components/a2z/DaySightseeingSection';
import { VillaCampfireSection } from '../components/a2z/VillaCampfireSection';
import { ReviewsSection } from '../components/a2z/ReviewsSection';
import { FAQSection } from '../components/a2z/FAQSection';
import { ContactSection } from '../components/a2z/ContactSection';
import { Footer } from '../components/a2z/Footer';
import { BookingModal } from '../components/a2z/BookingModal';
import { ImageLightbox } from '../components/a2z/ImageLightbox';
import { FloatingActions } from '../components/a2z/FloatingActions';
import { KODAIKANAL_DATA } from '../data/kodaikanalData';

export const HomePage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    description: string;
  }>({
    isOpen: false,
    image: '',
    title: '',
    description: '',
  });

  const handleOpenLightbox = (image: string, title: string, description: string) => {
    setLightboxData({
      isOpen: true,
      image,
      title,
      description,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#06130c] text-mist-100 font-sans selection:bg-[#2d6a4f] selection:text-white relative">
      {/* Primary Sticky Header Navigation */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Animated Airplane Travel Route Tracker */}
      <AirplaneScrollPath />

      {/* Main Content Sections */}
      <main>
        {/* 1. Full-Screen Hero Background */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 2. Package Section with Kodaikanal Lake */}
        <PackageSection 
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 3. Day 1 Sightseeing: Cascades, Lakes, Parks & Caves */}
        <DaySightseeingSection
          dayData={KODAIKANAL_DATA.itinerary[0]}
          sectionId="day1"
          accentColor="emerald"
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 4. Day 2 Sightseeing: Pine Forests, Pillar Rocks & Poombarai */}
        <DaySightseeingSection
          dayData={KODAIKANAL_DATA.itinerary[1]}
          sectionId="day2"
          accentColor="amber"
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 5. Day 3 Adventure: Mannavanur Grasslands, Sheep Farms & Terraces */}
        <DaySightseeingSection
          dayData={KODAIKANAL_DATA.itinerary[2]}
          sectionId="day3"
          accentColor="sky"
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 6. Villa & Campfire Section */}
        <VillaCampfireSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 7. Traveler Reviews & Testimonials */}
        <ReviewsSection />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />

        {/* 9. Contact & Custom Itinerary Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Triggers (WhatsApp, Call, Scroll-to-Top) */}
      <FloatingActions />

      {/* Booking & Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Cinematic Fullscreen Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxData.isOpen}
        onClose={handleCloseLightbox}
        imageUrl={lightboxData.image}
        title={lightboxData.title}
        description={lightboxData.description}
      />
    </div>
  );
};
