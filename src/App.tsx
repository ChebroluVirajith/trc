import React, { useState } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { PosterCarouselSection } from './components/Carousel/PosterCarouselSection';
import { EventsSection } from './components/Events/EventsSection';
import { TeamSection } from './components/Team/TeamSection';
import { LegacySection } from './components/Legacy/LegacySection';
import { SponsorsSection } from './components/Sponsors/SponsorsSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { TicketModal } from './components/Registration/TicketModal';
import { PolicyModal } from './components/Common/PolicyModal';
import { CustomCursor } from './components/Common/CustomCursor';

export const App: React.FC = () => {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<'privacy' | 'terms' | 'refund' | 'shipping'>('privacy');

  const handleOpenPolicy = (tab: 'privacy' | 'terms' | 'refund' | 'shipping') => {
    setPolicyTab(tab);
    setPolicyModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0f1929] text-slate-100 selection:bg-gold selection:text-black">
      {/* Precision Industrial Crosshair Cursor */}
      <CustomCursor />

      {/* Engineering Scanlines Visual Layer */}
      <div className="scanlines-overlay" aria-hidden="true" />

      {/* 1. Fixed Classy Navigation Header with Sound FX & Registration Trigger */}
      <Navbar onOpenRegister={() => setTicketModalOpen(true)} />

      {/* Main Structural Layout matching roboveda.org sequence */}
      <main>
        {/* 2. Welcome Hero Area (HOME) - NO ANIMATION */}
        <HeroSection onOpenRegister={() => setTicketModalOpen(true)} />

        {/* 3. About Us (#about), Real-Time Event Countdown & Live Marquee Ticker */}
        <AboutSection />

        {/* 4. Event Poster Carousel & Campus Ambassador / Hospitality Opportunities */}
        <PosterCarouselSection onOpenRegister={() => setTicketModalOpen(true)} />

        {/* 5. Unified Festival Events Directory (#events): 10 Robotics Events, Workshops, Pradarshan & Hackathon */}
        <EventsSection onOpenRegister={() => setTicketModalOpen(true)} />

        {/* 6. Our Team (#ourteam): 12 Organizing Directorates */}
        <TeamSection />

        {/* 7. Roboveda's Legacy (#legacy): Historic Editions & Video Reels */}
        <LegacySection />

        {/* 9. Title Sponsor & Previous Sponsors Track */}
        <SponsorsSection />

        {/* 10. Contact Us (#contacts) & Embedded SNIST Campus Map */}
        <ContactSection />
      </main>

      {/* 11. Official Footer */}
      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* Interactive Registration Pass Selector Modal */}
      <TicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
      />

      {/* Legal & Governance Compliance Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        activeTab={policyTab}
        onClose={() => setPolicyModalOpen(false)}
      />
    </div>
  );
};

export default App;
