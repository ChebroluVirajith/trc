import React, { useState, useRef } from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { ANCIENT_RELICS } from '../../data/statsData';
import { Sun, Eye, ShieldCheck, Compass } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const RoboGuruSection: React.FC = () => {
  const relicIcons = [
    <Sun key="1" className="w-5 h-5 text-gold" />,
    <Eye key="2" className="w-5 h-5 text-cyan-400" />,
    <ShieldCheck key="3" className="w-5 h-5 text-amber-400" />,
    <Compass key="4" className="w-5 h-5 text-gold-light" />
  ];

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 12;
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
      id="roboguru"
      className="relative py-28 bg-[#04070e] border-b border-gold/25 tech-grid-bg overflow-hidden"
    >
      {/* Background Sacred Geometric Circular Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="320" fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="50%" cy="50%" r="480" fill="none" stroke="rgba(212, 175, 55, 0.05)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="LORE_00" label="DIVINE ICONOGRAPHY" variant="gold" />
              <span className="font-mono text-xs text-gold-light">THE KEEPER OF ASCENSION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
              MEET <span className="text-gold-gradient">ROBOGURU</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-300 max-w-md leading-relaxed">
            The embodiment of RoboVeda'26 — a seraphic cybernetic sage uniting millennia of global civilization wisdom with cutting-edge robotics.
          </p>
        </div>

        {/* Central Display: Mascot and Relics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Mascot Visual Showcase with 3D Parallax Tilt (5 cols) */}
          <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000 }}
          >
            <div
              className="relative w-full max-w-md p-6 bg-surface/90 border border-gold/40 tech-corner-border shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col items-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="w-full aspect-square flex items-center justify-center relative"
                style={{ transform: 'translateZ(30px)' }}
              >
                <img
                  src="/img/theme/roboguru_26.png"
                  alt="RoboGuru 2026"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(212,175,55,0.55)] animate-float"
                />
              </div>
              <div
                className="w-full text-center pt-4 border-t border-gold/20 space-y-1"
                style={{ transform: 'translateZ(45px)' }}
              >
                <div className="font-display font-bold text-white text-lg uppercase tracking-wide">
                  ROBOGURU '26
                </div>
                <div className="font-mono text-xs text-gold-light">
                  SERAPHIC WINGS // 4-ARM KINEMATICS // 4 SEALS
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 4 Civilization Relic Seals Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-gold tracking-widest font-bold">
                // THE FOUR SACRED SEALS OF ROBOTICS
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Floating around RoboGuru's outstretched golden manipulators are four ancient civilization medallions, each governing a fundamental domain of the festival:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ANCIENT_RELICS.map((relic, idx) => (
                <div
                  key={relic.id}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="p-5 bg-surface border border-gold/20 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all tech-corner-border space-y-3 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-black/80 border border-gold/40 rounded-none">
                        {relicIcons[idx]}
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gold uppercase font-bold">
                          SEAL 0{idx + 1}
                        </div>
                        <h3 className="font-display font-bold text-white text-sm uppercase">
                          {relic.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-mono text-[11px] text-cyan-300">
                      DOMAIN: {relic.domain}
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans text-[12px]">
                      {relic.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Strip */}
            <div className="p-4 bg-gradient-to-r from-gold/10 via-surface to-surface border-l-2 border-gold font-mono text-xs text-slate-300 italic">
              "To ascend into tomorrow's robotics, one must first decode the unwritten lore of yesterday's master builders."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
