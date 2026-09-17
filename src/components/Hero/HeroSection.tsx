import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import { SystemStatus } from './SystemStatus';
import { FESTIVAL_METADATA } from '../../data/statsData';
import { gsap } from '../../animations/gsapConfig';
import { audioEngine } from '../../utils/audioEngine';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const guruRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        gridRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2 }
      )
        .fromTo(
          guruRef.current,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.4)' },
          '-=0.8'
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!guruRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = guruRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 14;
    setTilt({
      x: (y / (rect.height / 2)) * -maxTilt,
      y: (x / (rect.width / 2)) * maxTilt
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-start pt-20 sm:pt-28 lg:pt-32 pb-4 overflow-hidden bg-background tech-grid-bg"
    >
      {/* Background Engineering Blueprint & Sacred Geometries Overlay */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-70 transition-opacity"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        
        {/* Divine Golden Radial Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/10 blur-[150px] pointer-events-none" />
        
        {/* Ancient Sacred Astrological Compass Rings */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] border border-gold/15 rounded-full hidden xl:flex items-center justify-center animate-spin-slow pointer-events-none">
          <div className="w-[450px] h-[450px] border border-dashed border-gold/25 rounded-full" />
          <div className="w-[350px] h-[350px] border border-gold/20 rounded-full" />
          <div className="w-[250px] h-[250px] border border-dashed border-cyan-400/20 rounded-full" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-start py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Festival Narrative, Dates & CTAs (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Editorial Subtitle with modern typography and explicit festival dates */}
            <div ref={sublineRef} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-gold-light text-xs sm:text-sm font-mono tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>OCTOBER 12, 13 &amp; 14, 2026</span>
              </div>

              <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-sans font-normal leading-relaxed">
                The ancient lore of human ingenuity meets the future of robotics on <strong className="text-gold-light font-semibold">October 12, 13 &amp; 14, 2026</strong>.
              </p>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-sans font-normal leading-relaxed">
                Featuring 10 flagship combat and autonomous arenas across all 3 days, hands-on <strong className="text-white font-medium">Workshops &amp; 24H Hackathon (Oct 13–14)</strong>, and the grand <strong className="text-white font-medium">Pradarshan Project Expo on Day 2 (Oct 13)</strong>.
              </p>
            </div>

            {/* Action Buttons Strip */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenRegister();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="w-full sm:w-auto justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-display font-extrabold tracking-wider uppercase text-xs sm:text-sm flex items-center gap-3 transition-all duration-300 border border-gold shadow-[0_0_25px_rgba(212,175,55,0.35)] group rounded-sm"
              >
                <span>ASCEND / REGISTER</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <a
                href="#about"
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3.5 sm:py-4 bg-surface hover:bg-slate-800 text-gold-light font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 border border-gold/40 hover:border-gold transition-colors rounded-sm text-center"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>ABOUT ROBOVEDA</span>
              </a>

              <a
                href="#events"
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3.5 sm:py-4 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 border border-white/15 transition-colors rounded-sm text-center"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>ARENAS &amp; EVENTS</span>
              </a>
            </div>
          </div>

          {/* Right Column: Balanced RoboGuru Centerpiece with 3D Mouse Tilt Parallax (6 Cols) */}
          <div
            ref={guruRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 flex flex-col items-center justify-center relative cursor-grab active:cursor-grabbing py-2"
            style={{ perspective: 1100 }}
          >
            {/* Glowing Golden Aura Disk with 3D Transform */}
            <div
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 via-gold/10 to-cyan-400/15 blur-3xl animate-pulse-slow pointer-events-none" />

              {/* Floating RoboGuru Mascot Graphic */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center animate-float"
                style={{ transform: 'translateZ(45px)' }}
              >
                <img
                  src="/img/theme/roboguru_26.png"
                  alt="RoboGuru '26 - The Divine Robotic Sage"
                  className="w-full h-full max-h-[340px] sm:max-h-[420px] md:max-h-[480px] lg:max-h-[540px] object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.65)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live System Telemetry Bar */}
      <div className="relative z-10 w-full mt-6">
        <SystemStatus />
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-16 right-8 hidden lg:flex flex-col items-center gap-2 text-slate-400 font-mono text-[10px] tracking-widest uppercase pointer-events-none">
        <span className="rotate-90 origin-right translate-x-2 translate-y-3 text-gold font-bold">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 text-gold animate-bounce" />
      </div>
    </section>
  );
};
