import React from 'react';

interface TechnicalBadgeProps {
  label: string;
  code?: string;
  variant?: 'gold' | 'cyan' | 'platinum' | 'orange';
  className?: string;
}

export const TechnicalBadge: React.FC<TechnicalBadgeProps> = ({
  label,
  code,
  variant = 'gold',
  className = ''
}) => {
  const variantStyles = {
    gold: 'border-gold/40 text-gold-light bg-gold/10 shadow-[0_0_12px_rgba(212,175,55,0.15)]',
    cyan: 'border-cyan-400/40 text-cyan-300 bg-cyan-950/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
    platinum: 'border-platinum/30 text-white bg-white/5',
    orange: 'border-amber-500/40 text-amber-300 bg-amber-950/20'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest uppercase border ${variantStyles[variant]} rounded-none backdrop-blur-sm ${className}`}>
      {code && <span className="opacity-70 text-[10px] text-gold font-bold">{code} //</span>}
      <span className="font-semibold">{label}</span>
    </div>
  );
};
