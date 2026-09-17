import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.dataset.cursor === 'hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[1000] transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Precision Golden Core Dot */}
      <div
        className={`w-1.5 h-1.5 rounded-full bg-gold transition-all duration-150 shadow-[0_0_8px_#d4af37] ${
          isClicking ? 'scale-150 bg-white shadow-[0_0_12px_#ffffff]' : ''
        }`}
      />

      {/* Target Crosshair Ring */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 transition-all duration-200 pointer-events-none ${
          isHovered
            ? 'w-10 h-10 border-gold-light bg-gold/10 scale-125 rotate-45 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            : 'w-6 h-6 border-dashed opacity-60'
        }`}
      />

      {/* Technical HUD Coordinates */}
      {isHovered && (
        <div className="absolute top-6 left-6 font-mono text-[9px] text-gold-light tracking-widest uppercase bg-black/90 px-2 py-0.5 border border-gold/40 shadow-lg whitespace-nowrap">
          RELIC LOCKED [{Math.round(position.x)},{Math.round(position.y)}]
        </div>
      )}
    </div>
  );
};
