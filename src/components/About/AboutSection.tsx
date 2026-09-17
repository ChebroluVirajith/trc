import React, { useState, useEffect } from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Shield, Flame, Bell, Clock } from 'lucide-react';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';

export const AboutSection: React.FC = () => {
  // Target Event Date (Roboveda '26: October 12-14, 2026)
  const targetDate = new Date('October 12, 2026 09:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#0f1929] border-b border-gold/25 overflow-hidden">
      {/* Minimal Visible Background Animation */}
      <MinimalTechBackground variant="mixed" particleCount={36} />

      {/* Dynamic Animated Tech Rings & Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/15 animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-cyan-400/15 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 blur-[160px] pointer-events-none animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Centered About Us Header & Narrative matching roboveda.org */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <TechnicalBadge code="01 // ABOUT US" label="GENESIS & EXCELLENCE" variant="gold" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
            WELCOME TO <span className="text-gold-gradient">ROBOVEDA</span>
          </h2>

          <div className="p-8 sm:p-10 bg-surface/90 border border-gold/30 tech-corner-border shadow-2xl backdrop-blur-md text-left space-y-5">
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed text-justify">
              Roboveda, organised by <strong className="text-gold-light">The Robotics Club - SNIST</strong>, stands as one of the most anticipated technical festivals in the entire nation. We’ve always been proud to elevate the institution’s name through excellence, and we’re committed to pushing that standard even higher.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
              This technical fest is a vibrant stage where the country’s brightest tech minds come together to challenge themselves in every event. Whether you leave with a trophy or simply with new insights, Roboveda never fails to ignite a deep passion in your heart for learning and achieving more. We, at Team Roboveda, are truly thrilled to have you join us and are looking forward to another incredibly successful chapter together.
            </p>

            {/* Badges strip */}
            <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>ISO 20121:2012 CERTIFIED FEST</span>
              </div>
              <div className="flex items-center gap-2 text-gold font-bold">
                <Flame className="w-4 h-4" />
                <span>16+ YEARS OF ROBOTICS EXCELLENCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Countdown Clock Area matching roboveda.org */}
        <div className="p-8 sm:p-10 bg-black/60 border border-gold/30 rounded-lg backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold animate-pulse" />
              <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-wider">
                Count Every Second Until the Event
              </h3>
            </div>
            <div className="font-mono text-xs text-gold-light tracking-widest uppercase">
              // ARENA COMMENCEMENT
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-6 bg-surface border border-gold/25 tech-corner-border shadow-lg space-y-1">
              <div className="text-4xl sm:text-5xl font-display font-black text-gold-gradient">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs text-slate-400 font-bold tracking-widest uppercase">
                DAYS
              </div>
            </div>

            <div className="p-6 bg-surface border border-gold/25 tech-corner-border shadow-lg space-y-1">
              <div className="text-4xl sm:text-5xl font-display font-black text-white">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs text-slate-400 font-bold tracking-widest uppercase">
                HOURS
              </div>
            </div>

            <div className="p-6 bg-surface border border-gold/25 tech-corner-border shadow-lg space-y-1">
              <div className="text-4xl sm:text-5xl font-display font-black text-cyan-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs text-slate-400 font-bold tracking-widest uppercase">
                MINUTES
              </div>
            </div>

            <div className="p-6 bg-surface border border-gold/25 tech-corner-border shadow-lg space-y-1">
              <div className="text-4xl sm:text-5xl font-display font-black text-gold-light animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs text-slate-400 font-bold tracking-widest uppercase">
                SECONDS
              </div>
            </div>
          </div>
        </div>

        {/* Live Announcement Marquee matching roboveda.org */}
        <div className="relative overflow-hidden bg-black/80 border-y border-gold/30 py-3.5 px-4 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-gold/15 text-gold border border-gold/30 font-mono text-xs font-bold whitespace-nowrap z-10">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>ANNOUNCEMENTS</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="animate-slide-track font-mono text-xs sm:text-sm text-slate-200 tracking-wider flex items-center gap-8 whitespace-nowrap">
              <span>&bull;&emsp;📢 Registrations for ROBOVEDA'26 are officially OPEN!</span>
              <span>&bull;&emsp;⚡ Rulebooks for all 14 bot categories have been updated!</span>
              <span>&bull;&emsp;🏆 Total Cash Prizes of ₹2,50,000+ to be won!</span>
              <span>&bull;&emsp;🏢 Campus Ambassador & Hospitality applications now live!</span>
              <span>&bull;&emsp;🤖 Welcome to India's Flagship Robotics Symposium — SNIST Hyderabad!</span>
              <span>&bull;&emsp;📢 Registrations for ROBOVEDA'26 are officially OPEN!</span>
              <span>&bull;&emsp;⚡ Rulebooks for all 14 bot categories have been updated!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
