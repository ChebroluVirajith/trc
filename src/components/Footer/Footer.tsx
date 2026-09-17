import React from 'react';
import { ChevronUp } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (tab: 'privacy' | 'terms' | 'refund' | 'shipping') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0f1d] via-[#050811] to-[#020408] text-white pt-16 pb-12 overflow-hidden border-t border-gold/30 tech-grid-bg">
      {/* Ambient Theme Lighting Effects */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-electric/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3 Logos Section with Theme Glows */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pb-12">
          {/* Logo 1: The Robotics Club Seal */}
          <div className="flex justify-center md:justify-start w-full md:w-auto group">
            <img
              src="/img/footer1.png"
              alt="The Robotics Club SNIST"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/img')) {
                  target.src = 'img/footer1.png';
                }
              }}
            />
          </div>

          {/* Logo 2: Sreenidhi Educational Group Card */}
          <div className="flex justify-center w-full md:w-auto group">
            <img
              src="/img/footer2.png"
              alt="Sreenidhi Educational Group - SNIST"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain rounded-xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/img')) {
                  target.src = 'img/footer2.png';
                }
              }}
            />
          </div>

          {/* Logo 3: Roboveda Metallic RV Emblem */}
          <div className="flex justify-center md:justify-end w-full md:w-auto group">
            <img
              src="/img/footer3.png"
              alt="ROBOVEDA"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('public/img')) {
                  target.src = 'img/footer3.png';
                }
              }}
            />
          </div>
        </div>

        {/* Policy Links Row */}
        <div className="pb-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base font-medium text-slate-300">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-gold-light hover:shadow-gold-glow transition-all duration-200 cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <span className="text-gold/40 select-none">|</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-gold-light hover:shadow-gold-glow transition-all duration-200 cursor-pointer text-left"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-gold/40 select-none">|</span>
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-gold-light hover:shadow-gold-glow transition-all duration-200 cursor-pointer text-left"
            >
              Refund Policy
            </button>
            <span className="text-gold/40 select-none">|</span>
            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-gold-light hover:shadow-gold-glow transition-all duration-200 cursor-pointer text-left"
            >
              Shipping Policy
            </button>
          </div>
        </div>

        {/* Themed Gradient Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent my-6" />

        {/* Bottom Credits & Scroll-To-Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 font-sans">
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
            <p className="text-slate-300">
              © 2025 <span className="text-gold font-semibold tracking-wide">ROBOVEDA</span>, <span className="text-slate-200">Sreenidhi Institute of Science and Technology</span>. All rights reserved.
            </p>
            <p>
              <strong className="text-gold-light font-medium">Legal Entity Name:</strong>{' '}
              <span className="text-slate-300">ROBOVEDA, Sreenidhi Institute of Science and Technology</span>
            </p>
            <p className="text-slate-400">
              Designed by <span className="text-gold font-medium">Tanmay</span> and <span className="text-gold font-medium">Induja</span>
            </p>
            <p className="text-slate-400">
              Redesigned by <span className="text-gold font-medium">Virajith Chebrolu</span>
            </p>
          </div>

          {/* Glowing Theme Scroll to Top Button */}
          <div className="self-end sm:self-center">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-11 h-11 rounded-full bg-gradient-to-b from-[#131f36] to-[#0c1424] border border-gold/50 text-gold hover:text-black hover:bg-gold hover:border-gold shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
