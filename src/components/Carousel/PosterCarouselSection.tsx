import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, UserCheck, Home, ExternalLink } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';

interface PosterCarouselProps {
  onOpenRegister?: () => void;
}

export const PosterCarouselSection: React.FC<PosterCarouselProps> = ({ onOpenRegister }) => {
  const posters = [
    {
      src: '/img/RV25 Posters/all in one poster.jpg',
      title: "ROBOVEDA'26 ALL-IN-ONE FESTIVAL",
      subtitle: '14 Flagship National Robotics Arenas & Workshops',
    },
    {
      src: '/img/RV25 Posters/campus ambassador.jpg',
      title: 'CAMPUS AMBASSADOR PROGRAM',
      subtitle: 'Lead the robotics revolution at your university campus',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [posters.length]);

  const handlePrev = () => {
    audioEngine.playClick();
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const handleNext = () => {
    audioEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-[#0a111c] border-b border-gold/20 overflow-hidden">
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="gold" particleCount={25} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Poster Slideshow Carousel */}
        <div className="relative max-w-4xl mx-auto bg-black/80 border border-gold/30 rounded-lg overflow-hidden shadow-2xl group">
          {/* Main Image Slides */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center bg-black">
            {posters.map((poster, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                  idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={poster.src}
                  alt={poster.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to title banner if specific image isn't available
                    (e.target as HTMLImageElement).src = '/img/Events_Banners/yoddha_banner.jpg';
                  }}
                />
              </div>
            ))}

            {/* Left/Right Carousel Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-gold hover:text-black text-gold-light border border-gold/30 transition-all opacity-80 group-hover:opacity-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-gold hover:text-black text-gold-light border border-gold/30 transition-all opacity-80 group-hover:opacity-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 p-3 bg-black/90 border-t border-gold/20">
            {posters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioEngine.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Campus Ambassador & Hospitality Cards matching roboveda.org */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* 1. Campus Ambassador Card */}
          <div className="p-6 sm:p-8 bg-surface border border-gold/30 tech-corner-border shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-gold">
                <UserCheck className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold-light">
                  CAMPUS AMBASSADOR PROGRAM
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                Represent ROBOVEDA'26 in your College!
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Grab the exclusive opportunity to lead student cohorts, build institutional networks, gain certified leadership credentials, and earn special organizer passes.
              </p>
            </div>

            <a
              href="https://forms.gle/bnNtH7c5x2SM3MjGA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-display font-black text-xs uppercase tracking-wider rounded transition-transform hover:scale-[1.02] shadow-lg shadow-gold/20"
            >
              <span>JOIN AS AMBASSADOR</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Hospitality & Accommodation Card */}
          <div className="p-6 sm:p-8 bg-surface border border-gold/30 tech-corner-border shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <Home className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                  HOSPITALITY SERVICES
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
                Outstation Accommodation & Stay
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Participants requiring verified lodging, food, and transport assistance during ROBOVEDA'26 can book campus hospitality in advance.
              </p>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdftJdlL_9tZYBHYCpTuKjXscZXITjRajQLgn96ZR8nUZzqjA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-400/40 hover:border-cyan-400 font-display font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              <span>HOSPITALITY REGISTRATION</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
