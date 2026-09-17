import React from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { MapPin, Navigation, Bus, Train, Plane, Hotel, PhoneCall, ExternalLink, ShieldCheck } from 'lucide-react';
import { FESTIVAL_METADATA } from '../../data/statsData';

const TRAVEL_ROUTES = [
  {
    mode: 'BY TRAIN',
    station: 'Secunderabad Jn (SC) / Ghatkesar',
    icon: <Train className="w-5 h-5 text-gold" />,
    details: 'From Secunderabad Station, board TSRTC Bus 280 (or Secunderabad-Kazipet local train to Ghatkesar station). SNIST shuttle autos run continuously from Ghatkesar.',
    distance: '25 km from Secunderabad // 5 km from Ghatkesar'
  },
  {
    mode: 'BY BUS',
    station: 'SNIST College Bus Fleet / TSRTC',
    icon: <Bus className="w-5 h-5 text-cyan-400" />,
    details: 'Dedicated SNIST college buses ply in the morning across major Hyderabad hubs (Uppal, ECIL, Dilsukhnagar, Mehdipatnam, Tarnaka, Secunderabad).',
    distance: 'Direct drop to Campus Main Gate'
  },
  {
    mode: 'BY AIR',
    station: 'Rajiv Gandhi Int. Airport (HYD)',
    icon: <Plane className="w-5 h-5 text-purple-400" />,
    details: 'Board Pushpak Airport Liner to Uppal X Roads, then board Bus 280 or hire an express taxi via Nehru Outer Ring Road (ORR Exit 8/9).',
    distance: '48 km via ORR Express Highway'
  }
];

const HOSPITALITY_PERKS = [
  {
    title: 'On-Campus Student Stay',
    desc: 'Secure lodging facilities with 24/7 security for outstation teams (separate accommodations for male and female participants).',
    icon: <Hotel className="w-5 h-5 text-gold" />
  },
  {
    title: 'Food Court & Refreshments',
    desc: 'Hygienic multi-cuisine food courts and snack hubs operating throughout festival hours inside the campus perimeter.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
  },
  {
    title: '24/7 Helpdesk & Medical Post',
    desc: 'Dedicated volunteer support desk and emergency medical first-aid post available around the clock.',
    icon: <PhoneCall className="w-5 h-5 text-cyan-400" />
  }
];

export const HospitalitySection: React.FC = () => {
  return (
    <section
      id="hospitality"
      className="relative py-20 sm:py-28 bg-[#040713] border-b border-gold/20 tech-grid-bg overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="06 // LOGISTICS" label="TRAVEL & HOSPITALITY" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                CAMPUS NAVIGATION & ACCOMMODATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              REACHING <span className="text-gold-gradient">SNIST HYDERABAD</span>
            </h2>
          </div>

          <a
            href="https://maps.google.com/?q=Sreenidhi+Institute+of+Science+and+Technology+Ghatkesar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded bg-black/60 hover:bg-gold hover:text-black border border-gold/30 text-gold-light font-mono text-xs font-bold uppercase transition-all duration-300 flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>OPEN IN GOOGLE MAPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Travel Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAVEL_ROUTES.map((route) => (
            <div
              key={route.mode}
              className="p-6 sm:p-7 rounded-lg bg-black/50 border border-gold/20 flex flex-col justify-between space-y-4 hover:border-gold transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 font-bold">{route.mode}</span>
                  <div className="p-2 rounded bg-black border border-gold/20">
                    {route.icon}
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white uppercase">
                  {route.station}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {route.details}
                </p>
              </div>

              <div className="pt-3 border-t border-gold/15 font-mono text-[11px] text-gold-light">
                {route.distance}
              </div>
            </div>
          ))}
        </div>

        {/* Outstation Perks & Stay Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {HOSPITALITY_PERKS.map((perk) => (
            <div
              key={perk.title}
              className="p-6 rounded-lg bg-black/40 border border-gold/15 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/20 flex-shrink-0">
                {perk.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-white text-base uppercase">
                  {perk.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Helpline Hotline */}
        <div className="p-5 bg-gradient-to-r from-gold/10 via-black to-gold/10 border border-gold/30 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <PhoneCall className="w-5 h-5 text-gold flex-shrink-0 animate-pulse" />
            <span>
              <strong>HOSPITALITY & TRAVEL HELPLINE:</strong> Reach out to our logistics desk for accommodation bookings and route assistance.
            </span>
          </div>
          <a
            href={`tel:${FESTIVAL_METADATA.contactPhone}`}
            className="text-gold-light font-bold hover:text-white border-b border-gold/40 pb-0.5 whitespace-nowrap"
          >
            {FESTIVAL_METADATA.contactPhone}
          </a>
        </div>
      </div>
    </section>
  );
};
