import React, { useEffect, useRef, useState } from 'react';
import { STATS_DATA } from '../../data/statsData';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Radio, ShieldCheck, TrendingUp, Users, Building, Cpu, Award } from 'lucide-react';

const STAT_ICONS = [
  <Users key="1" className="w-5 h-5 text-gold" />,
  <Building key="2" className="w-5 h-5 text-cyan-400" />,
  <Cpu key="3" className="w-5 h-5 text-amber-400" />,
  <Award key="4" className="w-5 h-5 text-gold-light" />
];

export const StatisticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(STATS_DATA.map((s) => s.value));
  const animatedRef = useRef(false);

  useEffect(() => {
    // Initialize with 0 to prepare for count-up
    setCounts(STATS_DATA.map(() => 0));

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animateCounts = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS_DATA.map((stat) => Math.floor(stat.value * easeProgress))
            );

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setCounts(STATS_DATA.map((stat) => stat.value));
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#03060f] border-b border-gold/20 tech-grid-bg overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold/20 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="05 // TELEMETRY" label="VERIFIED FESTIVAL METRICS" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                AUDITED BY TRC — SNIST
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              PROVEN <span className="text-gold-gradient">IMPACT</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-black/40 px-3 py-1.5 border border-gold/20 rounded">
            <Radio className="w-4 h-4 text-gold animate-pulse" />
            <span>REAL-TIME AUDIT ACCREDITATION</span>
          </div>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STATS_DATA.map((stat, i) => (
            <div
              key={stat.code}
              className="p-6 sm:p-8 bg-black/60 border border-gold/25 rounded-lg flex flex-col justify-between space-y-5 hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              {/* Top Code Badge & Icon */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="text-gold font-bold">{stat.code} //</span>
                <div className="p-1.5 rounded bg-gold/10 border border-gold/20">
                  {STAT_ICONS[i]}
                </div>
              </div>

              {/* Dominant Count Number */}
              <div className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-light to-gold">
                  {counts[i].toLocaleString()}
                </span>
                <span className="text-gold font-mono ml-1 text-3xl sm:text-4xl">{stat.suffix}</span>
              </div>

              {/* Metric Label */}
              <div className="space-y-1.5 pt-3 border-t border-gold/15">
                <h3 className="font-display font-bold text-white text-base sm:text-lg uppercase tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {stat.caption}
                </p>
              </div>

              {/* Subtle Corner Glow */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gold/10 rounded-full blur-xl pointer-events-none group-hover:bg-gold/25 transition-colors" />
            </div>
          ))}
        </div>

        {/* Institutional Accreditation Footnote */}
        <div className="p-5 sm:p-6 bg-black/50 border border-gold/25 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
            <span>
              Certified under <strong>ISO 20121:2012</strong> Event Sustainability Management System. All attendance & collegiate stats strictly verified.
            </span>
          </div>
          <span className="text-gold font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            SNIST HYDERABAD
          </span>
        </div>
      </div>
    </section>
  );
};
