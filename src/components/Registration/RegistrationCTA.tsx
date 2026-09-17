import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="ascend"
      className="relative py-32 bg-background border-b border-gold/25 tech-grid-bg overflow-hidden text-center"
    >
      {/* Converging Vector Lines & Rays in Shimmering Gold */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="50%" y2="50%" stroke="#d4af37" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#fce49c" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#fce49c" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#d4af37" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="50%" cy="50%" r="280" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
          <circle cx="50%" cy="50%" r="380" fill="none" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Central Radial Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="inline-flex items-center gap-3">
          <TechnicalBadge code="08 // ASCEND" label="FINAL CALL FOR ARENA PILOTS" variant="gold" />
        </div>

        <div className="space-y-4">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display text-white uppercase tracking-tight leading-none">
            READY TO <br />
            <span className="text-gold-gradient">
              ASCEND?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Enter the premier robotics arena of India. Test your machines, build certified masterclass hardware, and compete for prestigious national accolades.
          </p>
        </div>

        {/* Big Action Button Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRegister}
            className="px-10 py-5 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono font-black text-base tracking-wider uppercase flex items-center gap-3 transition-all duration-300 border border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
          >
            <span>REGISTER FOR ROBOVEDA'26</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdftJdlL_9tZYBHYCpTuKjXscZXITjRajQLgn96ZR8nUZzqjA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-5 bg-surface hover:bg-slate-800 text-gold-light border border-gold/40 hover:border-gold font-mono text-sm tracking-wider uppercase transition-colors shadow-lg"
          >
            HOSPITALITY APPLICATION
          </a>
        </div>

        {/* Telemetry Notice */}
        <div className="font-mono text-xs text-slate-300 space-y-1 pt-6">
          <div className="text-gold-light font-bold">OFFICIAL NOTICE: SPOT REGISTRATIONS ACTIVE AT CAMPUS DESK</div>
          <div className="text-slate-400">THE ROBOTICS CLUB — SNIST // ISO 20121:2012 CERTIFIED</div>
        </div>
      </div>
    </section>
  );
};
