import React, { useEffect } from 'react';
import { EventItem } from '../../types';
import { X, FileText, Phone, ArrowUpRight, Calendar, Award, Video } from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface border border-gold/40 tech-corner-border shadow-[0_0_50px_rgba(212,175,55,0.2)] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-60 overflow-hidden border-b border-gold/30 bg-black">
          <img
            src={event.bannerImage || event.iconBg}
            alt={event.name}
            className="w-full h-full object-cover opacity-60 filter contrast-125"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/img/Images/new21_back.jpeg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/80 border border-gold/40 text-gold-light hover:text-white hover:border-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TechnicalBadge code={`MOD_${event.number}`} label={event.category} variant="gold" />
                {event.schedule && (
                  <span className="font-mono text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {event.schedule}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                {event.name}
              </h2>
            </div>

            {event.prizePool && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-black/90 border border-gold/60 text-gold-light font-mono text-xs shadow-lg">
                <Award className="w-4 h-4 text-gold" />
                <span>{event.prizePool}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-sans text-slate-300 text-sm leading-relaxed">
          {/* Tagline */}
          <p className="text-base sm:text-lg font-medium text-white border-l-2 border-gold pl-4">
            {event.tagline}
          </p>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs text-gold uppercase tracking-widest font-bold">
              // SPECIFICATION & MISSION BRIEF
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {event.fullDesc}
            </p>
          </div>

          {/* Arena Video Preview if Available */}
          {event.arenaVideo && (
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-gold-light uppercase tracking-widest flex items-center gap-2">
                <Video className="w-4 h-4 text-gold" /> ARENA LAYOUT PREVIEW
              </h3>
              <div className="rounded border border-gold/30 overflow-hidden bg-black max-w-lg">
                <video controls className="w-full h-auto">
                  <source src={event.arenaVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="font-mono text-[10px] text-slate-400">* Arena obstacles may vary on match day.</p>
            </div>
          )}

          {/* Technical Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                // TECHNICAL REQUIREMENTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-surface-subtle border border-gold/20 font-mono text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators & Contacts */}
          {event.coordinators && event.coordinators.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-mono text-xs text-gold uppercase tracking-widest font-bold">
                // EVENT COORDINATORS & CONTACTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.coordinators.map((coord, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-surface-subtle border border-gold/20"
                  >
                    <div className="flex items-center gap-3">
                      {coord.image ? (
                        <img
                          src={coord.image}
                          alt={coord.name}
                          className="w-10 h-10 object-cover border border-gold/30"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-800 flex items-center justify-center font-mono text-xs text-gold font-bold">
                          {coord.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-display font-bold text-white text-sm">{coord.name}</div>
                        <div className="font-mono text-[10px] text-slate-400">{coord.role}</div>
                      </div>
                    </div>

                    {coord.phone && (
                      <a
                        href={`tel:${coord.phone}`}
                        className="px-3 py-1.5 bg-black hover:bg-gold hover:text-black transition-colors font-mono text-xs border border-gold/40 text-gold-light flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>CALL</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-gold/30 bg-surface-subtle flex flex-wrap items-center justify-between gap-4">
          {event.pdfRulebook ? (
            <a
              href={event.pdfRulebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-slate-800 border border-gold/50 text-gold-light font-mono text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <FileText className="w-4 h-4 text-gold" />
              <span>DOWNLOAD RULEBOOK (PDF)</span>
            </a>
          ) : (
            <span className="font-mono text-xs text-slate-400">RULEBOOK DIRECT FROM DESK</span>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-slate-400 hover:text-white font-mono text-xs tracking-wider uppercase"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-md shadow-gold/20"
            >
              <span>REGISTER FOR EVENT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
