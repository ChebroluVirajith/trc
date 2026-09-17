import React from 'react';
import { SPONSORS_DATA } from '../../data/sponsorsData';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { ExternalLink } from 'lucide-react';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';

export const SponsorsSection: React.FC = () => {
  const titleSponsor = SPONSORS_DATA.find((s) => s.category === 'Title Sponsor') || SPONSORS_DATA[0];
  const previousSponsors = SPONSORS_DATA.filter((s) => s.category !== 'Title Sponsor');

  return (
    <section
      id="alliances"
      className="relative py-24 sm:py-32 bg-black border-b border-gold/25 overflow-hidden"
    >
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="mixed" particleCount={24} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Title Sponsor Section matching roboveda.org */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <TechnicalBadge code="05 // ALLIANCES" label="CORPORATE PATRONS" variant="gold" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
            TITLE <span className="text-gold-gradient">SPONSOR</span>
          </h2>

          <div className="max-w-lg mx-auto p-8 bg-[#0a101d] border border-gold/30 tech-corner-border rounded-lg shadow-2xl space-y-4">
            <a
              href="https://www.epiroc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <img
                src={titleSponsor.logo}
                alt="Epiroc Logo"
                className="h-20 sm:h-24 w-auto mx-auto object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/Sponsers/epiroc-logo.png';
                }}
              />
            </a>
            <p className="font-mono text-xs text-slate-300">
              {titleSponsor.description}
            </p>
          </div>
        </div>

        {/* Previous Sponsors Continuous Slider Track matching roboveda.org */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wider">
              PREVIOUS <span className="text-gold-gradient">SPONSORS</span>
            </h3>
          </div>

          {/* Infinite Moving Slider Track */}
          <div className="relative overflow-hidden py-6 bg-[#0f1929] border-y border-gold/20 rounded-lg">
            <div className="animate-slide-track flex items-center gap-10">
              {[...previousSponsors, ...previousSponsors].map((sponsor, idx) => (
                <div
                  key={`${sponsor.name}-${idx}`}
                  className="flex-shrink-0 w-44 h-24 p-3 bg-surface/80 border border-gold/20 rounded flex items-center justify-center hover:border-gold transition-colors shadow-md group"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0.4';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
