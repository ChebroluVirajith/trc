import React, { useState } from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { LineFollowerCanvas } from './LineFollowerCanvas';
import { SumoBattleCanvas } from './SumoBattleCanvas';
import { Swords, Compass } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

export const BotSimulatorSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'line' | 'sumo'>('line');

  return (
    <section
      id="simulator"
      className="relative py-20 sm:py-28 bg-[#05070d] border-b border-gold/20 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="04 // SIMULATION" label="ARENA TRIAL LAB" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                INTERACTIVE 2D BOT PHYSICS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              ROBOVEDA <span className="text-gold-gradient">ARENA SIMULATOR</span>
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-black/60 p-1.5 rounded-lg border border-gold/25 font-mono text-xs w-full lg:w-auto">
            <button
              onClick={() => {
                audioEngine.playClick();
                setActiveMode('line');
              }}
              className={`flex-1 sm:flex-none justify-center px-4 py-2.5 rounded transition-all font-bold flex items-center gap-2 text-xs text-center ${
                activeMode === 'line'
                  ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 flex-shrink-0" />
              <span>LAKSHMANREKHA (CIRCUIT)</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                setActiveMode('sumo');
              }}
              className={`flex-1 sm:flex-none justify-center px-4 py-2.5 rounded transition-all font-bold flex items-center gap-2 text-xs text-center ${
                activeMode === 'sumo'
                  ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Swords className="w-3.5 h-3.5 flex-shrink-0" />
              <span>YODDHA (SUMO CLASH)</span>
            </button>
          </div>
        </div>

        {/* Main Canvas Viewport */}
        <div>
          {activeMode === 'line' ? <LineFollowerCanvas /> : <SumoBattleCanvas />}
        </div>
      </div>
    </section>
  );
};
