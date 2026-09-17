import React from 'react';
import { EventItem } from '../../types';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';

interface EventCardProps {
  event: EventItem;
  onSelect: (event: EventItem) => void;
  onRegister: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onRegister }) => {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[360px] bg-surface border border-gold/25 tech-corner-border flex flex-col justify-between group hover:border-gold transition-all duration-300 relative overflow-hidden shadow-2xl">
      {/* Top Banner & Icon Composite */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-black">
        <img
          src={event.iconBg}
          alt={event.name}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 filter contrast-125"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/70" />

        {/* Floating Foreground Object Graphic */}
        {event.iconFg && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
            <img
              src={event.iconFg}
              alt=""
              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Top Tag Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <TechnicalBadge code={`MOD_${event.number}`} label={event.category} variant="gold" />
          <span className="font-mono text-[10px] text-gold-light bg-black/80 px-2 py-0.5 border border-gold/30">
            TRC_26
          </span>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight group-hover:text-gold-light transition-colors">
            {event.name}
          </h3>
        </div>
      </div>

      {/* Card Content Brief */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-300 line-clamp-3 font-sans leading-relaxed">
          {event.shortDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-black/80 border border-gold/20 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button Strip */}
        <div className="pt-3 border-t border-gold/20 flex items-center gap-2">
          <button
            onClick={() => onSelect(event)}
            className="flex-1 py-2.5 px-3 bg-surface-subtle hover:bg-slate-800 text-slate-200 border border-gold/30 hover:border-gold font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>SPECS & RULES</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold" />
          </button>

          <button
            onClick={() => onRegister(event)}
            className="py-2.5 px-4 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-md shadow-gold/20"
            title="Register for this event"
          >
            <span>JOIN</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
