import React, { useState } from 'react';
import { FESTIVAL_SCHEDULE, ScheduleSlot } from '../../data/scheduleData';
import { EVENTS_DATA } from '../../data/eventsData';
import { EventItem } from '../../types';
import { EventDetailModal } from './EventDetailModal';
import { TechnicalBadge } from '../Common/TechnicalBadge';
import { MinimalTechBackground } from '../Background/MinimalTechBackground';
import { Calendar, MapPin, Sparkles, Trophy, Flame, Filter, ChevronRight, Layers, ExternalLink } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface EventsSectionProps {
  onOpenRegister: (tierId?: string, eventName?: string) => void;
}

const CATEGORY_STYLES: Record<string, { badge: string; border: string; glow: string }> = {
  Combat: {
    badge: 'bg-red-500/15 text-red-400 border-red-500/40',
    border: 'hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]',
    glow: 'rgba(239, 68, 68, 0.5)',
  },
  Autonomous: {
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
    border: 'hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]',
    glow: 'rgba(0, 240, 255, 0.5)',
  },
  Speed: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-400/40',
    border: 'hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    glow: 'rgba(245, 158, 11, 0.5)',
  },
  Aerial: {
    badge: 'bg-purple-500/15 text-purple-300 border-purple-400/40',
    border: 'hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    glow: 'rgba(168, 85, 247, 0.5)',
  },
  Mechanism: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
    border: 'hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    glow: 'rgba(16, 185, 129, 0.5)',
  },
  Aquatic: {
    badge: 'bg-blue-500/15 text-blue-300 border-blue-400/40',
    border: 'hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]',
    glow: 'rgba(59, 130, 246, 0.5)',
  },
  Workshop: {
    badge: 'bg-teal-500/15 text-teal-300 border-teal-400/40',
    border: 'hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.25)]',
    glow: 'rgba(20, 184, 166, 0.5)',
  },
  Pradarshan: {
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/40',
    border: 'hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]',
    glow: 'rgba(99, 102, 241, 0.5)',
  },
  Hackathon: {
    badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/40',
    border: 'hover:border-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]',
    glow: 'rgba(217, 70, 239, 0.5)',
  },
  Ceremony: {
    badge: 'bg-gold/20 text-gold-light border-gold/40',
    border: 'hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]',
    glow: 'rgba(212, 175, 55, 0.6)',
  },
};

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenRegister }) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentDayData = FESTIVAL_SCHEDULE.find((d) => d.dayNumber === activeDay) || FESTIVAL_SCHEDULE[0];

  const categories = [
    'ALL',
    'Robotics',
    'Workshops',
    'Pradarshan',
    'Hackathon',
    'Combat',
    'Autonomous',
    'Speed',
    'Aerial',
    'Mechanism',
    'Aquatic',
  ];

  const filteredSlots = currentDayData.slots.filter((slot) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'Robotics') {
      return ['Combat', 'Autonomous', 'Speed', 'Aerial', 'Mechanism', 'Aquatic'].includes(slot.category);
    }
    if (selectedCategory === 'Workshops') return slot.category === 'Workshop';
    if (selectedCategory === 'Pradarshan') return slot.category === 'Pradarshan';
    if (selectedCategory === 'Hackathon') return slot.category === 'Hackathon';
    return slot.category === selectedCategory || slot.category === 'Ceremony';
  });

  const handleDayChange = (day: number) => {
    audioEngine.playClick();
    setActiveDay(day);
  };

  const handleCategoryChange = (cat: string) => {
    audioEngine.playClick();
    setSelectedCategory(cat);
  };

  const handleOpenDetail = (slot: ScheduleSlot) => {
    audioEngine.playClick();
    if (slot.eventId) {
      const fullEvent = EVENTS_DATA.find((e) => e.id === slot.eventId);
      if (fullEvent) {
        setSelectedEvent(fullEvent);
        return;
      }
    }
    // Fallback item if not directly matched by id
    setSelectedEvent({
      id: slot.eventName.toLowerCase().replace(/\s+/g, '-'),
      number: '01',
      name: slot.eventName,
      category: slot.category,
      tagline: slot.title,
      shortDesc: slot.description,
      fullDesc: slot.description,
      bannerImage: slot.bannerImage || '/img/Events_Banners/ranveera_banner.jpg',
      iconBg: '/img/Event_Icons/ranaveera_icon_bg.jpeg',
      iconFg: '/img/Event_Icons/ranaveera_icon_fg.png',
      prizePool: 'Cash Prizes & Certificates',
      coordinators: [{ name: 'RoboVeda Directorate', role: 'Head', phone: '+91 6301932007' }],
      registrationUrl: 'https://forms.gle/bnNtH7c5x2SM3MjGA',
      tags: [slot.category, slot.stage, slot.venue],
      schedule: `Day ${activeDay}`,
      location: slot.venue,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setMousePos({ x, y });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="events"
      className="relative py-20 sm:py-28 bg-[#0a111c] border-b border-gold/20 overflow-hidden"
    >
      {/* Minimal Tech Background Animation */}
      <MinimalTechBackground variant="mixed" particleCount={32} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gold/20 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <TechnicalBadge code="02 // DIRECTORY" label="FESTIVAL ARENAS" variant="gold" />
              <span className="font-mono text-xs text-gold-light tracking-wider hidden sm:inline">
                10 ROBOTICS ARENAS &bull; WORKSHOPS &bull; PRADARSHAN &bull; 24H HACKATHON
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white uppercase tracking-tight">
              EVENT <span className="text-gold-gradient">SCHEDULE</span>
            </h2>
            <p className="font-mono text-xs text-slate-300 max-w-xl">
              Explore national combat arenas, autonomous rover gauntlets, UAV flight challenges, hands-on engineering workshops, hardware exhibitions, and the 24-hour hackathon across 3 action-packed days.
            </p>
          </div>

          {/* 3D Day Switcher Deck */}
          <div className="flex items-center gap-2 bg-black/70 p-1.5 sm:p-2 rounded-lg border border-gold/30 font-mono text-xs backdrop-blur-md w-full sm:w-auto overflow-x-auto no-scrollbar">
            {FESTIVAL_SCHEDULE.map((day) => {
              const isActive = activeDay === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => handleDayChange(day.dayNumber)}
                  className={`flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-2.5 rounded transition-all font-bold tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 text-xs whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-100 sm:scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>DAY 0{day.dayNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Subheader Banner & Filter Chips */}
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-lg bg-surface/90 border border-gold/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 backdrop-blur-md">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-gold/20 text-gold-light font-mono text-xs font-bold border border-gold/30">
                  {currentDayData.date}
                </span>
                <h3 className="font-display font-bold text-white text-base sm:text-lg uppercase tracking-wide">
                  {currentDayData.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-1">
                {currentDayData.subtitle}
              </p>
            </div>

            {/* Category Filter Chips with mobile swipe */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar py-1">
              <div className="flex items-center gap-1.5 font-mono text-[11px] min-w-max lg:min-w-0 flex-nowrap lg:flex-wrap">
                <span className="text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
                  <Filter className="w-3 h-3 text-gold" /> Filter:
                </span>
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-2.5 py-1 rounded transition-all uppercase font-bold border whitespace-nowrap flex-shrink-0 ${
                        isSelected
                          ? 'bg-gold/25 border-gold text-gold-light shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                          : 'bg-black/50 border-gold/15 text-slate-400 hover:text-white hover:border-gold/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Holographic Perspective Flip Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 perspective-[1200px]">
          {filteredSlots.map((slot, index) => {
            const isHovered = hoveredIndex === index;
            const categoryTheme = CATEGORY_STYLES[slot.category] || CATEGORY_STYLES.Autonomous;

            return (
              <div
                key={`${activeDay}-${slot.eventName}-${index}`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateZ(10px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out',
                }}
                className={`p-5 sm:p-6 rounded-lg border bg-surface/90 backdrop-blur-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group tech-corner-border shadow-lg ${
                  slot.highlight
                    ? 'border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'border-gold/25'
                } ${categoryTheme.border}`}
              >
                {/* Holographic Glowing Top Edge Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-75 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${categoryTheme.glow}, transparent)`,
                  }}
                />

                <div className="space-y-3.5">
                  {/* Top Badges: Category & Stage */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${categoryTheme.badge}`}
                      >
                        {slot.category}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-black/60 border border-gold/20 text-slate-300 font-mono text-[9px] uppercase font-semibold">
                        {slot.stage}
                      </span>
                    </div>

                    {slot.highlight && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 animate-pulse">
                        <Trophy className="w-2.5 h-2.5" /> SPOTLIGHT ARENA
                      </span>
                    )}
                  </div>

                  {/* Main Event Name & Description */}
                  <div className="space-y-2">
                    <h4 className="text-lg sm:text-xl font-display font-black text-white group-hover:text-gold-gradient transition-colors uppercase tracking-wider leading-snug">
                      {slot.eventName}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {slot.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Venue and Dual Action CTAs */}
                <div className="pt-3.5 mt-3.5 border-t border-gold/15 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 group-hover:text-gold-light transition-colors">
                    <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
                    <span className="truncate">{slot.venue}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDetail(slot)}
                      className="flex-1 py-1.5 px-2.5 bg-surface hover:bg-gold/20 text-gold-light border border-gold/30 hover:border-gold font-mono text-[11px] font-bold rounded transition-colors text-center"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      onClick={() => {
                        audioEngine.playClick();
                        const tier = slot.category === 'Workshop' ? 'workshop-pass' : 'single-event-pass';
                        onOpenRegister(tier, slot.eventName);
                      }}
                      className="flex-1 py-1.5 px-2.5 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono text-[11px] font-black rounded transition-transform hover:scale-105 text-center shadow-md cursor-pointer"
                    >
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={() => {
          const evt = selectedEvent;
          setSelectedEvent(null);
          if (evt) {
            const tier = evt.category === 'Workshop' ? 'workshop-pass' : 'single-event-pass';
            onOpenRegister(tier, evt.name);
          } else {
            onOpenRegister('single-event-pass');
          }
        }}
      />
    </section>
  );
};
