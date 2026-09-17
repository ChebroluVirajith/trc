import React, { useEffect, useRef } from 'react';

interface TechBackgroundProps {
  variant?: 'gold' | 'cyan' | 'mixed';
  nodeCount?: number;
  particleCount?: number;
}

interface CircuitNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  isPin: boolean;
}

interface DataPacket {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  color: string;
  glowColor: string;
  size: number;
}

interface MicroSpark {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  alpha: number;
  color: string;
  type: 'cross' | 'diamond';
}

export const MinimalTechBackground: React.FC<TechBackgroundProps> = ({
  variant = 'mixed',
  nodeCount = 38,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Color definitions
    const goldPalettes = [
      { fill: 'rgba(252, 228, 156, ', glow: '#fce49c' },
      { fill: 'rgba(212, 175, 55, ',  glow: '#d4af37' },
      { fill: 'rgba(245, 158, 11, ',  glow: '#f59e0b' },
    ];

    const cyanPalettes = [
      { fill: 'rgba(0, 240, 255, ',    glow: '#00f0ff' },
      { fill: 'rgba(56, 189, 248, ',   glow: '#38bdf8' },
      { fill: 'rgba(226, 232, 240, ',  glow: '#ffffff' },
    ];

    const mixedPalettes = [...goldPalettes, ...cyanPalettes];
    const palettes = variant === 'gold' ? goldPalettes : variant === 'cyan' ? cyanPalettes : mixedPalettes;

    // 1. Initialize Circuit Nodes
    const nodes: CircuitNode[] = [];
    const count = Math.min(60, Math.max(24, Math.floor((width * height) / 22000)));

    for (let i = 0; i < count; i++) {
      const pal = palettes[Math.floor(Math.random() * palettes.length)];
      const isPin = i % 4 === 0;
      const r = isPin ? Math.random() * 2 + 2.5 : Math.random() * 1.5 + 1.2;
      const alpha = Math.random() * 0.4 + 0.45;

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: r,
        baseRadius: r,
        color: pal.fill,
        glowColor: pal.glow,
        alpha: alpha,
        baseAlpha: alpha,
        pulseSpeed: 0.025 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        isPin: isPin,
      });
    }

    // 2. Data Packets (Travelling energy pulses)
    const packets: DataPacket[] = [];
    const maxPackets = 8;

    // 3. Floating Micro-Sparks (+ and ◇ glyphs)
    const sparks: MicroSpark[] = [];
    const sparkCount = 14;
    for (let s = 0; s < sparkCount; s++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 2,
        alpha: Math.random() * 0.4 + 0.35,
        color: Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(0, 240, 255, ',
        type: Math.random() > 0.5 ? 'cross' : 'diamond',
      });
    }

    // Mouse Coordinates
    let mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Spawn data packets along connected nodes periodically
    const packetSpawner = setInterval(() => {
      if (packets.length < maxPackets && nodes.length > 2) {
        const i1 = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        for (let j = 0; j < nodes.length; j++) {
          if (i1 === j) continue;
          const dx = nodes[i1].x - nodes[j].x;
          const dy = nodes[i1].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            packets.push({
              startNode: i1,
              endNode: j,
              progress: 0,
              speed: 0.02 + Math.random() * 0.025,
              color: Math.random() > 0.4 ? '#fce49c' : '#00f0ff',
              glowColor: Math.random() > 0.4 ? '#d4af37' : '#00f0ff',
              size: Math.random() * 1.5 + 2,
            });
            break;
          }
        }
      }
    }, 450);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Engineering Blueprint Grid
      const gridSize = 44;
      ctx.lineWidth = 0.65;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Light Sweep Wave across Grid
      const sweepY = ((time * 38) % (height + 250)) - 120;
      const sweepGrad = ctx.createLinearGradient(0, sweepY - 50, 0, sweepY + 50);
      sweepGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      sweepGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.09)');
      sweepGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, sweepY - 50, width, 100);

      // 3. Draw Floating Micro-Sparks (+ & ◇)
      for (let s = 0; s < sparks.length; s++) {
        const sp = sparks[s];
        sp.y += sp.speedY;
        sp.x += sp.speedX;

        if (sp.y < -20) {
          sp.y = height + 20;
          sp.x = Math.random() * width;
        }
        if (sp.x < -20) sp.x = width + 20;
        if (sp.x > width + 20) sp.x = -20;

        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.strokeStyle = `${sp.color}${sp.alpha})`;
        ctx.lineWidth = 1;

        if (sp.type === 'cross') {
          ctx.beginPath();
          ctx.moveTo(-sp.size, 0); ctx.lineTo(sp.size, 0);
          ctx.moveTo(0, -sp.size); ctx.lineTo(0, sp.size);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -sp.size);
          ctx.lineTo(sp.size, 0);
          ctx.lineTo(0, sp.size);
          ctx.lineTo(-sp.size, 0);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Update and Draw Circuit Traces (Connecting Lines)
      const maxDist = 135;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Mouse Laser Beam connection
        const mdx = mouse.x - n1.x;
        const mdy = mouse.y - n1.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.65;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 5. Update and Draw Data Packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const start = nodes[pkt.startNode];
        const end = nodes[pkt.endNode];
        if (!start || !end) {
          packets.splice(k, 1);
          continue;
        }

        const px = start.x + (end.x - start.x) * pkt.progress;
        const py = start.y + (end.y - start.y) * pkt.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Subtle electric spark trail
        const trailX = start.x + (end.x - start.x) * Math.max(0, pkt.progress - 0.12);
        const trailY = start.y + (end.y - start.y) * Math.max(0, pkt.progress - 0.12);
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = pkt.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // 6. Update and Draw Circuit Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.vx;
        n.y += n.vy;

        // Wrap or bounce boundaries
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > height) { n.y = height; n.vy *= -1; }

        n.pulsePhase += n.pulseSpeed;
        const dynAlpha = Math.min(1, Math.max(0.2, n.baseAlpha + Math.sin(n.pulsePhase) * 0.25));

        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${dynAlpha})`;
        ctx.shadowColor = n.glowColor;
        ctx.shadowBlur = n.isPin ? 12 : 7;
        ctx.fill();

        // Concentric Tech Ring around Microcontroller Pins
        if (n.isPin) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = `${n.color}${dynAlpha * 0.45})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(packetSpawner);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [variant, nodeCount]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
};
