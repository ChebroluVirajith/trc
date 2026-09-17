import React, { useEffect, useRef } from 'react';

export const AnimatedTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating Cyber Energy Sparks
    interface Spark {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      glowColor: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    // Floating Tech Rings / Holographic Reticles
    interface TechRing {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      segments: number;
      color: string;
      alpha: number;
    }

    const sparks: Spark[] = [];
    const sparkCount = 45;
    const colors = [
      { fill: 'rgba(252, 228, 156, ', glow: '#d4af37' }, // Gold
      { fill: 'rgba(0, 240, 255, ',   glow: '#00f0ff' }, // Electric Cyan
      { fill: 'rgba(245, 158, 11, ',  glow: '#f59e0b' }, // Amber
      { fill: 'rgba(255, 255, 255, ', glow: '#ffffff' }, // White
    ];

    for (let i = 0; i < sparkCount; i++) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1.5,
        speedY: -(Math.random() * 0.6 + 0.2), // gentle upward float
        speedX: (Math.random() - 0.5) * 0.4,
        color: c.fill,
        glowColor: c.glow,
        alpha: Math.random() * 0.6 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const techRings: TechRing[] = [];
    const ringCount = 8;
    for (let r = 0; r < ringCount; r++) {
      techRings.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 35 + 20,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        segments: Math.floor(Math.random() * 4) + 3,
        color: Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(0, 240, 255, ',
        alpha: Math.random() * 0.35 + 0.2,
      });
    }

    // Mouse Ripple Interaction
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Digital Holographic Perspective Cyber Wave Grid
      const gridCols = 24;
      const gridRows = 16;
      const spacingX = width / gridCols;
      const waveBaseY = height * 0.65;

      ctx.lineWidth = 1;
      
      // Horizontal wave ribbons
      for (let row = 0; row < gridRows; row++) {
        const rowNorm = row / gridRows;
        const yOffset = waveBaseY + rowNorm * (height * 0.35);
        const waveAlpha = Math.max(0.05, (1 - rowNorm * 0.5) * 0.22);

        ctx.beginPath();
        for (let col = 0; col <= gridCols; col++) {
          const x = col * spacingX;
          // Sine wave undulation
          const waveHeight = Math.sin(col * 0.35 + time + row * 0.4) * 18 + Math.cos(col * 0.2 - time * 0.8) * 12;
          
          // Mouse proximity displacement
          let mouseDisp = 0;
          if (mouse.active) {
            const mdx = x - mouse.x;
            const mdy = yOffset - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 180) {
              mouseDisp = Math.sin((1 - mDist / 180) * Math.PI) * 22;
            }
          }

          const y = yOffset + waveHeight - mouseDisp;

          if (col === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = row % 2 === 0 ? `rgba(212, 175, 55, ${waveAlpha})` : `rgba(0, 240, 255, ${waveAlpha})`;
        ctx.stroke();
      }

      // Vertical connecting rib lines
      for (let col = 0; col <= gridCols; col += 2) {
        const x = col * spacingX;
        ctx.beginPath();
        for (let row = 0; row < gridRows; row++) {
          const rowNorm = row / gridRows;
          const yOffset = waveBaseY + rowNorm * (height * 0.35);
          const waveHeight = Math.sin(col * 0.35 + time + row * 0.4) * 18 + Math.cos(col * 0.2 - time * 0.8) * 12;
          const y = yOffset + waveHeight;

          if (row === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(212, 175, 55, 0.12)`;
        ctx.stroke();
      }

      // 2. Draw Floating Tech Rings / Holographic Reticles
      for (let r = 0; r < techRings.length; r++) {
        const ring = techRings[r];
        ring.y += ring.speedY;
        ring.x += ring.speedX;
        ring.rotation += ring.rotSpeed;

        // Wrap around top/bottom
        if (ring.y < -80) ring.y = height + 80;
        if (ring.x < -80) ring.x = width + 80;
        if (ring.x > width + 80) ring.x = -80;

        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.rotation);

        // Outer segmented ring
        ctx.beginPath();
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 1.5);
        ctx.strokeStyle = `${ring.color}${ring.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner dashed concentric ring
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.arc(0, 0, ring.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${ring.alpha * 0.75})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center crosshair
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(-5, 0); ctx.lineTo(5, 0);
        ctx.moveTo(0, -5); ctx.lineTo(0, 5);
        ctx.strokeStyle = `${ring.color}${ring.alpha * 0.9})`;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Draw Floating Upward Cyber Sparks / Energy Orbs
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.y += s.speedY;
        s.x += s.speedX;
        s.pulse += s.pulseSpeed;

        if (s.y < -20) {
          s.y = height + 20;
          s.x = Math.random() * width;
        }
        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;

        const dynAlpha = s.alpha + Math.sin(s.pulse) * 0.25;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${Math.max(0.15, dynAlpha)})`;
        ctx.shadowColor = s.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // 4. Scanning Radar Sweep Line
      const scanY = ((time * 35) % (height + 200)) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.14)');
      scanGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, width, 60);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
