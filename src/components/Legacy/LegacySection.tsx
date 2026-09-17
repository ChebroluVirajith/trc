import React from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Play, Sparkles, ExternalLink } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';

export const LegacySection: React.FC = () => {
  const legacyItems = [
    {
      year: 'Roboveda 24',
      image: '/img/All_RG/RG24.png',
      link: 'https://www.instagram.com/reel/DPoQFgwj8Zg/?igsh=MzBqaTJiMWVzOGlu',
      theme: 'Quantum Automata & Mechatronics',
    },
    {
      year: 'Roboveda 23',
      image: '/img/All_RG/RG23.jpeg',
      link: 'https://www.instagram.com/reel/DAgSmM8KbLO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      theme: 'Cybernetic Resilience & AI',
    },
    {
      year: 'Roboveda 22',
      image: '/img/All_RG/RG22.jpg',
      link: 'https://www.instagram.com/reel/CrGZgt_JKCb/?igshid=MzRlODBiNWFlZA==',
      theme: 'Robotics Renaissance',
    },
    {
      year: 'Roboveda 21',
      image: '/img/All_RG/RG21.jpg',
      link: 'https://youtu.be/BjEjTBasJjE',
      theme: 'Virtual Robotics Conclave',
    },
    {
      year: 'Roboveda 19',
      image: '/img/All_RG/RG19.jpeg',
      link: 'https://youtu.be/eT4igs4Kkdk',
      theme: 'Decade of Robotic Mastery',
    },
    {
      year: 'Roboveda 18',
      image: '/img/All_RG/RG18.jpeg',
      link: 'https://www.youtube.com/watch?v=bSycdyOPokE',
      theme: 'Autonomous Arena Supremacy',
    },
    {
      year: 'Roboveda 17',
      image: '/img/All_RG/RG17.jpg',
      link: 'https://www.youtube.com/watch?v=JE9dsO3pCt0',
      theme: 'Mechanical Innovation Lab',
    },
    {
      year: 'Roboveda 16',
      image: '/img/All_RG/RG16.jpg',
      link: 'https://www.youtube.com/watch?v=JE9dsO3pCt0',
      theme: 'Genesis of National Combat',
    },
  ];

  return (
    <section
      id="legacy"
      className="relative py-24 sm:py-32 bg-[#0a101d] border-b border-gold/25 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(10, 16, 29, 0.88), rgba(15, 25, 41, 0.92)), url(/img/Images/ethereal-environment-with-big-windows.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="gold" particleCount={28} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading matching roboveda.org */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <TechnicalBadge code="04 // CHRONICLES" label="HISTORIC ARCHIVE" variant="gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
            ROBOVEDA'S <span className="text-gold-gradient">LEGACY</span>
          </h2>
          <p className="font-mono text-xs text-slate-300 max-w-xl mx-auto">
            Relive the memories, historic robot battles, and cinematic aftermovies from 16+ glorious national editions.
          </p>
        </div>

        {/* Legacy Cards Grid matching roboveda.org */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {legacyItems.map((item) => (
            <a
              key={item.year}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              className="bg-surface/90 border border-gold/25 tech-corner-border rounded-lg overflow-hidden group hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all flex flex-col justify-between shadow-xl"
            >
              {/* Image Container with Play Button Overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.year}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 text-center space-y-1 bg-surface">
                <div className="flex items-center justify-center gap-1.5 font-display font-black text-white text-base group-hover:text-gold-gradient transition-colors uppercase">
                  <span>{item.year}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 text-gold" />
                </div>
                <div className="font-mono text-[10px] text-slate-400">
                  {item.theme}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
