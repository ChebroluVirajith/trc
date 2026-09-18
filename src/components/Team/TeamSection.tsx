import React, { useState } from 'react';
import { TEAMS_DATA } from '../../data/teamsData';
import { TeamCategory } from '../../types';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';
import { TeamDetailModal } from './TeamDetailModal';
import { audioEngine } from '../../utils/audioEngine';
import { Users, ExternalLink } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamCategory | null>(null);

  const handleOpenTeam = (team: TeamCategory) => {
    audioEngine.playClick();
    setSelectedTeam(team);
  };

  return (
    <section
      id="ourteam"
      className="relative py-24 sm:py-32 bg-[#0f1929] border-b border-gold/25 overflow-hidden"
    >
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="mixed" particleCount={32} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header matching roboveda.org */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <TechnicalBadge code="03 // CREW" label="ORGANIZING DIRECTORATES" variant="gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
            OUR <span className="text-gold-gradient">TEAM</span>
          </h2>
          <p className="font-mono text-xs text-slate-300 max-w-xl mx-auto">
            12 specialized student directorates and faculties powering the nationwide operations, innovation, and logistics of RoboVeda. Click any team to view full details and committee members.
          </p>
        </div>

        {/* Committees Grid matching roboveda.org */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAMS_DATA.map((team: TeamCategory) => (
            <div
              key={team.id}
              onClick={() => handleOpenTeam(team)}
              onMouseEnter={() => audioEngine.playHover()}
              className="bg-surface/90 border border-gold/25 tech-corner-border overflow-hidden flex flex-col group hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 shadow-lg rounded-lg cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative h-44 sm:h-52 overflow-hidden bg-black flex items-center justify-center p-2">
                <img
                  src={team.image}
                  alt={team.title}
                  className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30 pointer-events-none" />
                
                {/* Hover View Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/80 border border-gold/40 rounded text-gold-light text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg">
                  <Users className="w-3 h-3 text-gold" />
                  <span>VIEW DETAILS</span>
                </div>
              </div>

              <div className="p-4 space-y-1.5 text-center flex-1 flex flex-col justify-between bg-surface">
                <div>
                  <h3 className="font-display font-black text-white text-sm sm:text-base uppercase tracking-wider group-hover:text-gold-gradient transition-colors">
                    {team.title}
                  </h3>
                  <p className="font-mono text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {team.lead}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold/15">
                  <span className="text-[10px] font-mono font-bold text-gold group-hover:text-gold-light flex items-center justify-center gap-1">
                    <span>EXPLORE DIRECTORATE</span>
                    <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Detail Modal */}
      <TeamDetailModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </section>
  );
};
