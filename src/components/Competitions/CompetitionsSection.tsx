import React, { useState } from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Swords, Plane, Compass, Zap, ArrowUpRight } from 'lucide-react';

interface CompetitionDomain {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  desc: string;
  primaryEvent: string;
  rulebook: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  image: string;
}

const DOMAINS: CompetitionDomain[] = [
  {
    id: 'combat',
    code: 'DOM_01',
    title: 'COMBAT ARENA',
    subtitle: 'HEAVYWEIGHT BATTLES & DOJO SUMO',
    desc: 'Pure mechanical force, armor plating, spinning blades, and crushing torque. Robots clash in reinforced arenas with strict safety lockdowns.',
    primaryEvent: 'RANAVEERA & YODDHA',
    rulebook: '/rulebooks/ranaveera.pdf',
    icon: <Swords className="w-6 h-6 text-gold" />,
    specs: [
      { label: 'WEIGHT CLASS', value: 'UP TO 50 KG' },
      { label: 'WEAPON RPM', value: '6000 RPM MAX' },
      { label: 'ARENA ENCLOSURE', value: '12MM POLYCARBONATE' }
    ],
    image: '/img/Events_Banners/ranveera_banner.jpg'
  },
  {
    id: 'aerial',
    code: 'DOM_02',
    title: 'AERIAL UAV FLIGHT',
    subtitle: 'MULTIROTOR DYNAMICS & AGILITY',
    desc: 'High-speed drone pilots navigate 3D aerial rings, altitude drops, precision gates, and aerodynamic stability trials against the clock.',
    primaryEvent: 'PUSHPAK',
    rulebook: '/rulebooks/pushpak.pdf',
    icon: <Plane className="w-6 h-6 text-cyan-400" />,
    specs: [
      { label: 'FRAME CLASS', value: '250MM - 450MM' },
      { label: 'PROPULSION', value: 'BRUSHLESS 4S' },
      { label: 'FLIGHT TIME', value: '3 MIN FAST LAP' }
    ],
    image: '/img/Events_Banners/pushpak_banner.jpg'
  },
  {
    id: 'autonomous',
    code: 'DOM_03',
    title: 'AUTONOMOUS NAVIGATION',
    subtitle: 'PID OPTICAL TRACKING & MULTI-AGENT SWARMS',
    desc: 'Microcontroller algorithms and optical IR sensor arrays executing high-speed line following, dead reckoning, and dual-robot synchronized teamwork.',
    primaryEvent: 'LAKSHMANAREKHA & SAMANVAYI',
    rulebook: '/rulebooks/lakshmanarekha.pdf',
    icon: <Compass className="w-6 h-6 text-emerald-400" />,
    specs: [
      { label: 'CONTROL LOOP', value: 'PID TUNING' },
      { label: 'SENSOR ARRAY', value: '8-CH OPTICAL IR' },
      { label: 'AUTONOMY LEVEL', value: '100% UNTETHERED' }
    ],
    image: '/img/Events_Banners/lakshmanrekha_banner.jpg'
  },
  {
    id: 'speed-mechanism',
    code: 'DOM_04',
    title: 'SPEEDWAY & KINEMATICS',
    subtitle: 'FORMULA ROBO RACING & GRIPPER ARMS',
    desc: 'Track racers hitting apex hairpins at breakneck velocity, alongside articulated robotic arms sorting multi-tier engineering payloads.',
    primaryEvent: 'GATI & YANTRAA',
    rulebook: '/rulebooks/gati.pdf',
    icon: <Zap className="w-6 h-6 text-gold-light" />,
    specs: [
      { label: 'DRIVE TRAIN', value: 'DIFFERENTIAL 12V' },
      { label: 'ARM KINEMATICS', value: '5-DOF SERVO' },
      { label: 'TRACK SURFACE', value: 'HIGH-TRACTION MAT' }
    ],
    image: '/img/Events_Banners/gati_banner.jpg'
  }
];

export const CompetitionsSection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('combat');

  const current = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <section
      id="competitions"
      className="relative py-28 bg-[#02050c] border-b border-gold/25 tech-grid-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="03 // ARENAS" label="COMPETITIVE DOMAINS" variant="gold" />
              <span className="font-mono text-xs text-gold-light">SACRED ROBOTIC CONFRONTATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight">
              COMPETE<span className="text-gold-gradient">.</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-300 max-w-md">
            Select a competitive discipline to inspect technical telemetry, payload requirements, and safety standards.
          </p>
        </div>

        {/* Domain Grid & Inspection Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Domain Selectors List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {DOMAINS.map((domain) => {
              const isSelected = activeDomain === domain.id;
              return (
                <div
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`p-5 border cursor-pointer transition-all duration-200 relative tech-corner-border ${
                    isSelected
                      ? 'bg-surface border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                      : 'bg-surface/50 border-gold/20 hover:border-gold/50 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gold font-bold">
                          {domain.code} //
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {domain.primaryEvent}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                        {domain.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-400">
                        {domain.subtitle}
                      </p>
                    </div>

                    <div className="p-2.5 bg-black/80 border border-gold/40">
                      {domain.icon}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Domain Telemetry Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-surface border border-gold/30 tech-corner-border p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Background Graphic Preview */}
            <div className="relative h-56 sm:h-64 overflow-hidden border border-gold/30 bg-black">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover opacity-60 filter contrast-125 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/70" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs text-gold-light bg-black/90 px-3 py-1 border border-gold/40">
                  FLAGSHIP ARENA: {current.primaryEvent}
                </span>
                <a
                  href={current.rulebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1 bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black font-mono text-xs font-bold uppercase flex items-center gap-1 hover:from-white hover:to-gold-light transition-all shadow-md"
                >
                  <span>PDF RULES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-gold tracking-widest font-bold">
                // ARENA BRIEFING & DIRECTIVE
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {current.desc}
              </p>
            </div>

            {/* Technical Parameters Readout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gold/20">
              {current.specs.map((spec, i) => (
                <div key={i} className="p-3 bg-surface-subtle border border-gold/20">
                  <div className="font-mono text-[10px] text-slate-400 uppercase">{spec.label}</div>
                  <div className="font-display font-bold text-white text-sm mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
