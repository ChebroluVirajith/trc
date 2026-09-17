import React, { useState } from 'react';
import { BlueprintSchematics } from './BlueprintSchematics';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { PhaseInfo, BlueprintPhase } from '../../types';
import { Sparkles, Gem, Cog, Zap, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const PHASES: PhaseInfo[] = [
  {
    phase: 1,
    name: 'ROCK & MINERALS',
    sub: 'PHASE 01 // TERRESTRIAL QUARTZ & METALLURGY',
    desc: 'Extracting raw quartz crystals (SiO₂) and smelting primordial ores in high-temperature crucibles into elemental copper, bronze, and iron.',
    schematicTag: 'SCHEMATIC_01_QUARTZ_LATTICE'
  },
  {
    phase: 2,
    name: 'MECHANISMS & STEAM',
    sub: 'PHASE 02 // CLOCKWORK & KINEMATICS',
    desc: 'Metals forged into interlocking bronze gear trains, epicyclic planetary drives, astrolabes, and mechanical kinematic automata.',
    schematicTag: 'SCHEMATIC_02_GEAR_TRAIN'
  },
  {
    phase: 3,
    name: 'ELECTROMAGNETISM & ROBOTICS',
    sub: 'PHASE 03 // COPPER COILS & INDUSTRIAL ACTUATORS',
    desc: 'Electromagnetic solenoids and 3-phase dynamos powering high-precision 6-DOF articulated robotic manipulator arms and cybernetic joints.',
    schematicTag: 'SCHEMATIC_03_ELECTROMAGNETIC_SERVO'
  },
  {
    phase: 4,
    name: 'SILICON & MICROCHIPS',
    sub: 'PHASE 04 // 300mm WAFERS & NEURAL CORES',
    desc: 'Purifying raw quartz into 99.9999999% monocrystalline silicon wafers. Nanometer EUV lithography etching 64-TOPS neural AI compute matrices.',
    schematicTag: 'SCHEMATIC_04_SILICON_WAFER_NPU'
  },
  {
    phase: 5,
    name: 'ASCENSION',
    sub: 'PHASE 05 // ROCK TO SILICON TRANSCENDENCE',
    desc: 'The grand evolutionary cycle completed: from primordial earth-bound rock to conscious silicon intelligence and divine seraphic ascension.',
    schematicTag: 'SCHEMATIC_05_ASCENSION_TRANSCENDENCE'
  }
];

const PHASE_ICONS = [
  <Gem key="1" className="w-4 h-4 text-gold" />,
  <Cog key="2" className="w-4 h-4 text-gold-light" />,
  <Zap key="3" className="w-4 h-4 text-amber-400" />,
  <Cpu key="4" className="w-4 h-4 text-cyan-400" />,
  <Sparkles key="5" className="w-4 h-4 text-gold" />
];

export const BlueprintSystem: React.FC = () => {
  const [activePhase, setActivePhase] = useState<BlueprintPhase>(1);

  const handleSelectPhase = (p: BlueprintPhase) => {
    setActivePhase(p);
  };

  const currentPhaseData = PHASES[activePhase - 1];

  return (
    <section
      id="blueprint"
      className="relative flex flex-col justify-center py-16 sm:py-20 bg-[#02050b] border-b border-gold/20 overflow-hidden tech-grid-bg"
    >
      {/* Radiant Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-black pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold/20 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TechnicalBadge code="RV26-EVO" label="ASCENSION THEME" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-widest hidden sm:inline">
                // 5-STAGE SYSTEM EVOLUTION
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              FROM ROCK TO <span className="text-gold-gradient">SILICON</span>
            </h2>
          </div>

          {/* Stepper HUD summary */}
          <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
            <span className="text-gold font-bold text-sm">PHASE 0{activePhase}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">05</span>
            <span className="text-slate-500 hidden sm:inline">— {currentPhaseData.name}</span>
          </div>
        </div>

        {/* Spacious Interactive Phase Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {PHASES.map((p, idx) => {
            const isActive = activePhase === p.phase;
            return (
              <button
                key={p.phase}
                onClick={() => handleSelectPhase(p.phase)}
                className={`p-3 sm:p-3.5 text-left transition-all duration-300 rounded-sm border flex flex-col justify-between gap-2 relative ${
                  isActive
                    ? 'border-gold bg-gold/15 text-white shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-gold'
                    : 'border-gold/15 bg-black/40 hover:bg-black/70 text-slate-400 hover:text-slate-200 hover:border-gold/40'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-gold-light' : 'text-gold/70'}`}>
                    0{p.phase}
                  </span>
                  <div className={`p-1 rounded ${isActive ? 'bg-gold/20' : 'bg-transparent'}`}>
                    {PHASE_ICONS[idx]}
                  </div>
                </div>
                <div className={`font-display font-bold uppercase tracking-wider text-xs sm:text-sm truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {p.name.split(' ')[0]}
                </div>

                {/* Active Underline Glow */}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Spacious Blueprint Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Schematic Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-3 sm:p-4 rounded-lg border border-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative bg-[#040711] backdrop-blur-md">
              <BlueprintSchematics phase={activePhase} />
            </div>
          </div>

          {/* Clean & Spacious Narrative Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 bg-black/60 rounded-lg border border-gold/25 space-y-5 shadow-2xl backdrop-blur-sm relative">
              <div className="space-y-2">
                <div className="font-mono text-xs text-gold-light tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping inline-block" />
                  {currentPhaseData.sub}
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {currentPhaseData.name}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed pt-1">
                  {currentPhaseData.desc}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gold/20 font-mono text-xs">
                <div className="p-2.5 rounded bg-black/50 border border-gold/15">
                  <div className="text-slate-400 text-[10px]">PRIMARY COMPONENT</div>
                  <div className="text-cyan-300 font-bold mt-0.5 truncate">
                    {activePhase === 1 ? 'SiO₂ Quartz Crystal' : activePhase === 2 ? 'Bronze Gear Train' : activePhase === 3 ? 'Electromagnetic Arm' : activePhase === 4 ? 'Monocrystalline Wafer' : 'Quantum Lotus Wings'}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-black/50 border border-gold/15">
                  <div className="text-slate-400 text-[10px]">EVOLUTION STAGE</div>
                  <div className="text-gold font-bold mt-0.5">
                    STAGE 0{activePhase} // {(activePhase * 20)}% COMPLETE
                  </div>
                </div>
              </div>

              {/* Intuitive Next/Prev Step Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                <button
                  onClick={() => handleSelectPhase(Math.max(1, activePhase - 1) as BlueprintPhase)}
                  disabled={activePhase === 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-gold/15 border border-gold/20 disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV PHASE</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <button
                      key={step}
                      onClick={() => handleSelectPhase(step as BlueprintPhase)}
                      className={`h-1.5 rounded-full transition-all ${
                        step === activePhase
                          ? 'bg-gold shadow-[0_0_10px_#d4af37] w-6'
                          : 'bg-slate-700 hover:bg-slate-500 w-2'
                      }`}
                      aria-label={`Jump to stage 0${step}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPhase(Math.min(5, activePhase + 1) as BlueprintPhase)}
                  disabled={activePhase === 5}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold text-gold-light hover:text-white hover:bg-gold/15 border border-gold/30 disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <span>NEXT PHASE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
