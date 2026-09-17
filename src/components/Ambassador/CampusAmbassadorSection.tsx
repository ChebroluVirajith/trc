import React, { useState } from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { AmbassadorModal } from './AmbassadorModal';
import { Award, Users, Gift, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const AMBASSADOR_PERKS = [
  {
    title: 'Free Workshop & Arena Passes',
    desc: 'Get full complimentary access to RoboVeda’26 flagship hands-on masterclasses and priority arena seats.',
    icon: <Gift className="w-5 h-5 text-gold" />
  },
  {
    title: 'Certificate of Excellence & Leadership',
    desc: 'Receive an official letter of recommendation and ISO 20121 certified leadership certificate from TRC - SNIST.',
    icon: <Award className="w-5 h-5 text-gold-light" />
  },
  {
    title: 'Exclusive RoboVeda Merchandise',
    desc: 'Official RoboVeda’26 custom apparel, organizer badges, robotics toolkits, and commemorative stickers.',
    icon: <Sparkles className="w-5 h-5 text-cyan-400" />
  },
  {
    title: 'Direct Industry & Networking Access',
    desc: 'Connect directly with industry robotics founders, research professors, and student teams across India.',
    icon: <Users className="w-5 h-5 text-purple-400" />
  }
];

export const CampusAmbassadorSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="ambassador"
      className="relative py-20 sm:py-28 bg-[#040813] border-b border-gold/20 tech-grid-bg overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="08 // OUTREACH" label="STUDENT LEADERSHIP" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                PAN-INDIA CAMPUS INITIATIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              CAMPUS <span className="text-gold-gradient">AMBASSADOR PROGRAM</span>
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-display font-black text-xs uppercase tracking-wider rounded transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
          >
            <span>APPLY AS AMBASSADOR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Ambassador Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMBASSADOR_PERKS.map((perk) => (
            <div
              key={perk.title}
              className="p-6 sm:p-7 rounded-lg bg-black/60 border border-gold/20 flex flex-col justify-between space-y-4 hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="p-2.5 w-fit rounded-lg bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white uppercase">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Action Banner */}
        <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-r from-gold/15 via-black/80 to-gold/10 border border-gold/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
              Ready to lead the robotics wave at your college?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Join over 150+ student leaders across top engineering institutions in India representing RoboVeda’26.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 bg-gold text-black font-display font-black text-xs uppercase tracking-wider hover:bg-white transition-colors rounded whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            BECOME AN AMBASSADOR
          </button>
        </div>
      </div>

      {/* Ambassador Application Modal */}
      <AmbassadorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
