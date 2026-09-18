import React, { useEffect } from 'react';
import { TICKETS_DATA, HOSPITALITY_DATA, CAMPUS_AMBASSADOR_DATA } from '../../data/ticketsData';
import { X, ArrowUpRight, CheckCircle2, Hotel, Megaphone } from 'lucide-react';
import { TechnicalBadge } from '../Common/TechnicalBadge';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier?: (tierId: string) => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, onSelectTier }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-surface border border-gold/40 tech-corner-border shadow-[0_0_50px_rgba(212,175,55,0.2)] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/30 bg-surface-subtle">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TechnicalBadge code="PASS_PORTAL" label="REGISTRATION TIERS" variant="gold" />
              <span className="font-mono text-xs text-gold-light font-semibold">
                ● SPOT & ONLINE REGISTRATIONS ACTIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
              ROBOVEDA'26 ENTRY & WORKSHOP PASSES
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-gold/40 text-gold-light hover:text-white hover:border-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main 4 Passes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TICKETS_DATA.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 bg-surface border flex flex-col justify-between space-y-4 relative tech-corner-border ${
                  tier.isPopular
                    ? 'border-gold bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                    : 'border-gold/20'
                }`}
              >
                {tier.badge && (
                  <div
                    className={`text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest font-bold w-max border ${
                      tier.isPopular
                        ? 'border-gold text-gold-light bg-gold/20'
                        : 'border-slate-700 text-slate-400 bg-slate-900'
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide">
                    {tier.title}
                  </h3>
                  <div className="font-mono font-bold text-2xl text-gold-light">
                    {tier.price}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-gold/20 text-xs text-slate-300">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="font-mono text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTier) {
                      onSelectTier(tier.id);
                    } else {
                      window.open(tier.link, '_blank');
                    }
                  }}
                  className={`w-full py-3 text-center font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold-light text-black shadow-gold/20'
                      : 'bg-surface-subtle hover:bg-slate-800 text-slate-200 border border-gold/30 hover:border-gold'
                  }`}
                >
                  <span>CONFIRM SEAT & PAY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Hospitality & Campus Ambassador Sub-portals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gold/20">
            {/* Hospitality Card */}
            <div className="p-6 bg-surface-subtle border border-gold/30 flex flex-col justify-between space-y-4 tech-corner-border">
              <div className="flex items-center gap-3 text-cyan-400">
                <Hotel className="w-5 h-5" />
                <h4 className="font-display font-bold text-white text-lg uppercase">
                  {HOSPITALITY_DATA.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {HOSPITALITY_DATA.description}
              </p>
              <a
                href={HOSPITALITY_DATA.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-black border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase hover:bg-cyan-950/40 transition-colors w-max"
              >
                <span>HOSPITALITY APPLICATION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Campus Ambassador Card */}
            <div className="p-6 bg-surface-subtle border border-gold/30 flex flex-col justify-between space-y-4 tech-corner-border">
              <div className="flex items-center gap-3 text-gold">
                <Megaphone className="w-5 h-5" />
                <h4 className="font-display font-bold text-white text-lg uppercase">
                  {CAMPUS_AMBASSADOR_DATA.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {CAMPUS_AMBASSADOR_DATA.description}
              </p>
              <a
                href={CAMPUS_AMBASSADOR_DATA.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-black border border-gold/50 text-gold-light font-mono text-xs font-bold uppercase hover:bg-gold/20 transition-colors w-max"
              >
                <span>APPLY AS AMBASSADOR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gold/30 bg-surface-subtle flex justify-between items-center text-xs font-mono text-slate-400">
          <span>THE ROBOTICS CLUB — SNIST // ISO 20121:2012</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
