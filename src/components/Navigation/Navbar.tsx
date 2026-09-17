import React, { useEffect, useState } from 'react';
import { Menu, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { audioEngine } from '../../utils/audioEngine';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const unsubscribe = audioEngine.onMuteChange((muted) => setIsMuted(muted));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const toggleAudio = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'EVENTS', href: '#events' },
    { label: 'OUR TEAM', href: '#ourteam' },
    { label: 'LEGACY', href: '#legacy' },
    { label: 'CONTACT', href: '#contacts' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-gold/30 py-2 sm:py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Side: 3rd Footer Image (RV Metallic Emblem) + Desktop Navigation Links */}
          <div className="flex-1 flex items-center justify-start gap-3 sm:gap-4 2xl:gap-6">
            <a
              href="#"
              onClick={() => audioEngine.playClick()}
              className="flex items-center group focus:outline-none flex-shrink-0"
              aria-label="ROBOVEDA Emblem Home"
            >
              <div className="h-8 sm:h-10 md:h-12 flex items-center">
                <img
                  src="/img/footer3.png"
                  alt="ROBOVEDA Emblem"
                  className="h-full w-auto object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.7)] transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('public/img')) {
                      target.src = 'img/footer3.png';
                    }
                  }}
                />
              </div>
            </a>

            <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="font-mono text-xs text-slate-300 hover:text-gold-light tracking-widest relative py-1 transition-colors group focus:outline-none whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Large Official Title Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <a
              href="#"
              onClick={() => audioEngine.playClick()}
              className="flex items-center justify-center group focus:outline-none"
              aria-label="ROBOVEDA'26 Home"
            >
              <div className="h-11 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center py-1">
                <img
                  src="/img/theme/roboveda26_title_logo.png"
                  alt="ROBOVEDA'26 - Explore The Unwritten Lore"
                  className="h-full w-auto max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.45)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </a>
          </div>

          {/* Right Side: Sound FX + ASCEND / REGISTER + Mobile Menu Toggle */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
            {/* Cybernetic Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded border transition-all flex items-center gap-1.5 font-mono text-[10px] ${
                !isMuted
                  ? 'bg-gold/15 border-gold text-gold-light shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'bg-surface border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={!isMuted ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Toggle Audio Sound FX"
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-gold animate-pulse" />
                  <span className="hidden 2xl:inline">SFX ON</span>
                  {/* Equalizer Wave Bars */}
                  <span className="flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 bg-gold h-2 animate-bounce" />
                    <span className="w-0.5 bg-gold-light h-3 animate-pulse" />
                    <span className="w-0.5 bg-cyan-400 h-1.5 animate-bounce" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden 2xl:inline">SFX OFF</span>
                </>
              )}
            </button>

            {/* Register Action CTA */}
            <button
              onClick={() => {
                audioEngine.playClick();
                onOpenRegister();
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light transition-all duration-300 border border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] group overflow-hidden focus:outline-none rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-1.5 font-black whitespace-nowrap">
                <span className="hidden sm:inline">ASCEND / </span>REGISTER
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(true);
              }}
              className="xl:hidden p-2 text-gold-light hover:text-white border border-gold/40 bg-surface rounded"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        onOpenRegister={() => {
          setMobileMenuOpen(false);
          onOpenRegister();
        }}
      />
    </>
  );
};
