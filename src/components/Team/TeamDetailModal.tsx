import React, { useEffect } from 'react';
import { TeamCategory } from '../../types';
import { X, Users, Shield, Sparkles, Phone, Mail, PhoneCall, ArrowLeft, ExternalLink } from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { audioEngine } from '../../utils/audioEngine';

interface TeamDetailModalProps {
  team: TeamCategory | null;
  onClose: () => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({ team, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (team) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [team, onClose]);

  if (!team) return null;

  const defaultPhone = team.members?.[0]?.phone || '+916301932007';

  return (
    <div className="fixed inset-0 z-[200] bg-[#060a14] overflow-y-auto flex flex-col animate-in fade-in duration-300">
      {/* Background Cyber Ambient Lights */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed inset-0 bg-gold-grid bg-grid-md opacity-20 pointer-events-none" />

      {/* 1. Fullscreen Top Sticky Control Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#060a14]/95 backdrop-blur-md border-b border-gold/30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-surface hover:bg-gold hover:text-black text-gold-light border border-gold/40 font-mono text-xs font-bold rounded transition-all group cursor-pointer"
            aria-label="Back to Teams"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden xs:inline">BACK TO TEAMS</span>
          </button>

          <div className="h-6 w-[1px] bg-gold/30 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gold-light font-bold uppercase tracking-wider truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {team.title}
            </span>
          </div>
        </div>

        {/* Header Right Actions: Quick Directorate Helpline & Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${defaultPhone}`}
            onClick={() => audioEngine.playClick()}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono font-black text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">CALL DIRECTORATE</span>
            <span className="sm:hidden">CALL</span>
          </a>

          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 bg-surface hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded transition-colors cursor-pointer"
            title="Close (ESC)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Main Full-Screen Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
        {/* Directorate Cinematic Hero Card */}
        <div className="relative rounded-2xl overflow-hidden border border-gold/40 bg-black shadow-[0_0_40px_rgba(212,175,55,0.2)]">
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <img
              src={team.image}
              alt={team.title}
              className="w-full h-full object-cover filter contrast-110 opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060a14] via-transparent to-transparent hidden md:block" />
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <TechnicalBadge code="TRC // DIRECTORATE" label="EXECUTIVE CREW" variant="gold" />
                <span className="px-2.5 py-0.5 rounded bg-black/70 border border-gold/30 text-gold-light font-mono text-[11px] font-bold">
                  THE ROBOTICS CLUB &bull; SNIST
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight leading-none drop-shadow-lg">
                {team.title}
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 font-sans font-normal leading-relaxed pt-1">
                {team.lead}
              </p>
            </div>

            {/* Quick Call Directorate Floating Widget */}
            <div className="bg-[#0b1220]/90 border border-gold/40 p-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-gold-light uppercase font-bold tracking-wider">
                  DIRECT HELPLINE
                </div>
                <a
                  href={`tel:${defaultPhone}`}
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-gold transition-colors block"
                >
                  {defaultPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Directorate Mandate & Responsibilities */}
        <div className="p-6 sm:p-8 bg-[#0b1220]/80 border border-gold/30 rounded-xl backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2 text-gold font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>DIRECTORATE SCOPE &amp; OPERATIONS</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            The <strong className="text-gold-light">{team.title}</strong> is responsible for end-to-end planning, management, and technical orchestration of ROBOVEDA'26. Working in coordination with The Robotics Club, institutional faculty, and industry leaders, this wing ensures seamless execution of national robotics arenas and symposium events.
          </p>
        </div>

        {/* Members & Leadership Roster in Full Screen Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold/20 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-wider flex items-center gap-3">
                <Users className="w-6 h-6 text-gold" />
                <span>DIRECTORATE CREW &amp; LEADS</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Tap any member's call button to immediately connect via phone
              </p>
            </div>

            <div className="font-mono text-xs text-gold-light">
              {team.members?.length || 0} LEADERSHIP MEMBERS
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.members && team.members.length > 0 ? (
              team.members.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#0b1220]/90 border border-gold/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 group"
                >
                  {/* Member Image Header */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-black flex items-center justify-center p-2">
                    <img
                      src={member.image || team.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent pointer-events-none" />

                    {/* Verified Tag */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-gold/40 text-gold-light text-[10px] font-mono font-bold">
                      TRC CREW
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-wide group-hover:text-gold-gradient transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-gold-light font-semibold mt-1">
                        {member.role}
                      </p>
                      <p className="font-mono text-[11px] text-slate-400 mt-1">
                        The Robotics Club &bull; SNIST
                      </p>
                    </div>

                    {/* Direct Call and Email CTAs */}
                    <div className="pt-3 border-t border-gold/15 space-y-2">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          onClick={() => audioEngine.playClick()}
                          className="w-full py-2.5 px-3 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono text-xs font-black rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:scale-105 uppercase"
                          title={`Call ${member.name} at ${member.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>CALL {member.phone}</span>
                        </a>
                      )}

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          onClick={() => audioEngine.playClick()}
                          className="w-full py-1.5 px-3 bg-surface hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-gold/40 rounded font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                          title={`Email ${member.email}`}
                        >
                          <Mail className="w-3 h-3 text-gold" />
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-slate-400 font-mono text-sm bg-surface rounded-xl border border-gold/20">
                Directorate members actively coordinating festival operations.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation & Close Bar */}
        <div className="pt-8 border-t border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 pb-12">
          <div className="flex items-center gap-2 text-slate-300">
            <Shield className="w-4 h-4 text-gold flex-shrink-0" />
            <span>ROBOVEDA'26 &bull; SREENIDHI INSTITUTE OF SCIENCE AND TECHNOLOGY</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${defaultPhone}`}
              onClick={() => audioEngine.playClick()}
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-black uppercase tracking-wider rounded text-center flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>DIRECT HELPLINE</span>
            </a>

            <button
              onClick={() => {
                audioEngine.playClick();
                onClose();
              }}
              className="px-6 py-3 bg-surface hover:bg-slate-800 text-gold-light hover:text-white border border-gold/40 font-bold transition-all rounded cursor-pointer uppercase"
            >
              RETURN TO MAIN SITE
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
