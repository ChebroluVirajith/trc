import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onOpenRegister: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  onOpenRegister,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-background/98 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-gold/30 pb-4">
        <div className="h-9 flex items-center">
          <img
            src="/img/theme/roboveda26_title_logo.png"
            alt="ROBOVEDA'26"
            className="h-full w-auto object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2 border border-gold/40 text-gold-light hover:text-white bg-surface rounded"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 flex flex-col justify-center gap-3 py-6 overflow-y-auto">
        {links.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="flex items-center justify-between text-xl font-display font-bold text-slate-200 hover:text-gold-light transition-colors border-b border-gold/10 pb-2.5"
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-xs text-gold font-bold">
                0{idx + 1} //
              </span>
              {link.label}
            </span>
            <ArrowUpRight className="w-4 h-4 opacity-40 text-gold" />
          </a>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="border-t border-gold/30 pt-4 space-y-3">
        <button
          onClick={onOpenRegister}
          className="w-full py-3.5 bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black font-mono font-black text-sm tracking-wider flex items-center justify-center gap-2 uppercase shadow-lg shadow-gold/20"
        >
          <span>ASCEND / REGISTER NOW</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
        <div className="text-center text-[10px] font-mono text-slate-400">
          EXPLORE THE UNWRITTEN LORE // THE ROBOTICS CLUB — SNIST
        </div>
      </div>
    </div>
  );
};
