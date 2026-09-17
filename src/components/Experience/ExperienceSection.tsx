import React from 'react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { Play, Sparkles, Cpu, Award, Users, ArrowUpRight } from 'lucide-react';

interface LegacyReel {
  edition: string;
  year: string;
  image: string;
  url: string;
  tagline: string;
}

const LEGACY_ARCHIVE: LegacyReel[] = [
  {
    edition: "ROBOVEDA'24",
    year: '2024',
    image: '/img/All_RG/RG24.png',
    url: 'https://www.instagram.com/reel/DPoQFgwj8Zg/?igsh=MzBqaTJiMWVzOGlu',
    tagline: 'Record arena engagement & heavyweight clashes'
  },
  {
    edition: "ROBOVEDA'23",
    year: '2023',
    image: '/img/All_RG/RG23.jpeg',
    url: 'https://www.instagram.com/reel/DAgSmM8KbLO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    tagline: 'Autonomous AI algorithms & swarm rover trials'
  },
  {
    edition: "ROBOVEDA'22",
    year: '2022',
    image: '/img/All_RG/RG22.jpg',
    url: 'https://www.instagram.com/reel/CrGZgt_JKCb/?igshid=MzRlODBiNWFlZA==',
    tagline: 'Decade celebration of national maker excellence'
  },
  {
    edition: "ROBOVEDA'21",
    year: '2021',
    image: '/img/All_RG/RG21.jpg',
    url: 'https://youtu.be/BjEjTBasJjE',
    tagline: 'Virtual & physical hybrid innovation chapters'
  }
];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative py-28 bg-background border-b border-gold/25 tech-grid-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Dominant Editorial Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <TechnicalBadge code="04 // CINEMATICS" label="FESTIVAL EXPERIENCE" variant="gold" />
            <span className="font-mono text-xs text-gold-light">EXPLORE THE UNWRITTEN LORE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight leading-tight">
            THE IMMERSIVE <br />
            <span className="text-gold-gradient">
              ROBOVEDA EXPERIENCE
            </span>
          </h2>

          <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            More than a competition — RoboVeda is an arena where hands-on engineering, certified masterclasses, prototype exhibitions, and intense national camaraderie ignite the future of robotics.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-surface border border-gold/30 tech-corner-border space-y-4 group hover:border-gold transition-colors shadow-lg">
            <div className="w-12 h-12 bg-black border border-gold/50 flex items-center justify-center text-gold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white uppercase">
              HANDS-ON LABS
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Intensive drone piloting and IoT microcontroller workshops guided by certified UAV instructors with complete hardware take-home kits.
            </p>
          </div>

          <div className="p-6 bg-surface border border-gold/30 tech-corner-border space-y-4 group hover:border-cyan-400 transition-colors shadow-lg">
            <div className="w-12 h-12 bg-black border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white uppercase">
              PROJECT EXPO
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Pradarshan prototype showcase where student makers exhibit patented IoT, robotics, and defense hardware before distinguished academic juries.
            </p>
          </div>

          <div className="p-6 bg-surface border border-gold/30 tech-corner-border space-y-4 group hover:border-gold-light transition-colors shadow-lg">
            <div className="w-12 h-12 bg-black border border-gold-light/50 flex items-center justify-center text-gold-light">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white uppercase">
              IDEATHON GRANTS
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Pitch engineering problem solutions and disruptive blueprints directly to incubation leaders and industrial mentors.
            </p>
          </div>

          <div className="p-6 bg-surface border border-gold/30 tech-corner-border space-y-4 group hover:border-emerald-400 transition-colors shadow-lg">
            <div className="w-12 h-12 bg-black border border-emerald-400/50 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white uppercase">
              85+ COLLEGES
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Uniting thousands of student roboticists, programmers, and drone pilots from premier engineering institutes nationwide.
            </p>
          </div>
        </div>

        {/* Legacy Archive Section (Real Preserved Video Reels) */}
        <div className="space-y-6 pt-8 border-t border-gold/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                LEGACY ARCHIVES // PREVIOUS EDITIONS
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Official aftermovies and arena match chronicles across 16+ years of RoboVeda.
              </p>
            </div>
            <span className="font-mono text-xs text-gold">
              [TRC_CINEMATIC_REELS]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEGACY_ARCHIVE.map((item) => (
              <a
                key={item.edition}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-surface border border-gold/20 hover:border-gold overflow-hidden block tech-corner-border transition-all"
              >
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.edition}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-gold-light to-gold text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>

                  <div className="absolute top-2 left-2 font-mono text-[10px] text-gold-light bg-black/80 px-2 py-0.5 border border-gold/30">
                    {item.year}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-white text-base group-hover:text-gold-light transition-colors">
                      {item.edition}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
