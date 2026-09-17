import React from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Trophy, Award, Gift, ShieldCheck, Download, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface PrizePoolSectionProps {
  onOpenRegister: () => void;
}

const PRIZE_TIERS = [
  {
    tier: '01 // GOLD CHAMPIONS',
    title: 'Grand Champions',
    badge: '1ST PLACE',
    icon: <Trophy className="w-8 h-8 text-gold" />,
    perks: [
      'Cash Prize per Arena Category',
      'Official RoboVeda’26 Grand Trophy',
      'Direct Incubation & Hardware Grant Eligibility',
      'ISO 20121:2012 Merit Winner Certificate'
    ],
    borderClass: 'border-gold bg-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.25)]',
    badgeClass: 'bg-gold text-black font-black'
  },
  {
    tier: '02 // SILVER CONTENDERS',
    title: 'First Runners-Up',
    badge: '2ND PLACE',
    icon: <Award className="w-8 h-8 text-slate-200" />,
    perks: [
      'Cash Prize per Arena Category',
      'Official Silver Commendation Memento',
      'Hardware Development & Sensor Kits',
      'ISO 20121:2012 Runner-Up Certificate'
    ],
    borderClass: 'border-slate-400/40 bg-slate-900/60',
    badgeClass: 'bg-slate-200 text-black font-bold'
  },
  {
    tier: '03 // SPECIAL RECOGNITION',
    title: 'Innovation & Best Design',
    badge: 'SPECIAL JURY',
    icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
    perks: [
      'Special Jury Cash Grants & Vouchers',
      'Most Innovative Robot Architecture Award',
      'Best All-Girl / Freshman Team Recognition',
      'Certificate of Engineering Excellence'
    ],
    borderClass: 'border-cyan-400/30 bg-cyan-950/20',
    badgeClass: 'bg-cyan-400 text-black font-bold'
  }
];

export const PrizePoolSection: React.FC<PrizePoolSectionProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="prizepool"
      className="relative py-20 sm:py-28 bg-[#02050c] border-b border-gold/20 tech-grid-bg overflow-hidden"
    >
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="04 // REWARDS" label="NATIONAL PRIZE POOL" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                ACROSS ALL 14 DOMAINS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              GRAND <span className="text-gold-gradient">PRIZE MATRIX</span>
            </h2>
          </div>

          {/* Grand Pool Counter Banner */}
          <div className="p-4 bg-gradient-to-r from-gold/20 via-black/80 to-gold/20 border border-gold rounded-lg flex items-center gap-4 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <Trophy className="w-8 h-8 text-gold flex-shrink-0 animate-bounce" />
            <div>
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">CUMULATIVE FESTIVAL POOL</div>
              <div className="font-display font-black text-2xl sm:text-3xl text-gold-light tracking-tight">
                ₹2,50,000+
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tiered Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRIZE_TIERS.map((tier) => (
            <div
              key={tier.title}
              className={`p-6 sm:p-8 rounded-lg border flex flex-col justify-between space-y-6 transition-all duration-300 hover:scale-[1.02] ${tier.borderClass}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 tracking-wider">{tier.tier}</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono ${tier.badgeClass}`}>
                    {tier.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/60 border border-gold/20">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                    {tier.title}
                  </h3>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-gold/15">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-3 bg-black/60 hover:bg-gold hover:text-black text-gold-light font-display font-bold text-xs uppercase tracking-wider border border-gold/30 hover:border-gold transition-all duration-300 rounded flex items-center justify-center gap-2"
              >
                <span>COMPETE FOR THIS TIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Universal Participation Benefit Strip */}
        <div className="p-6 bg-black/50 border border-gold/25 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-white font-bold">UNIVERSAL PARTICIPATION CERTIFICATION:</span> Every verified participant receives an official ISO 20121:2012 certified certificate of participation & official kit.
            </div>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-6 py-3 bg-gold text-black font-display font-black uppercase text-xs tracking-wider hover:bg-white transition-colors rounded whitespace-nowrap"
          >
            REGISTER TEAM NOW
          </button>
        </div>
      </div>
    </section>
  );
};
