import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Trophy, Zap, Gauge, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface LineFollowerCanvasProps {
  onLapComplete?: (lapTime: number) => void;
}

export const LineFollowerCanvas: React.FC<LineFollowerCanvasProps> = ({ onLapComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lapTime, setLapTime] = useState<number>(0);
  const [bestLap, setBestLap] = useState<number | null>(null);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [lapCount, setLapCount] = useState<number>(0);

  const botState = useRef({
    x: 120,
    y: 200,
    angle: Math.PI / 2,
    speed: 0,
    maxSpeed: 5.5,
    accel: 0.35,
    turnSpeed: 0.08,
    keys: { left: false, right: false, up: false, down: false },
    lapStart: Date.now(),
    checkpoints: [false, false, false, false]
  });

  const getTrackCenter = (t: number, width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const rx = width * 0.38;
    const ry = height * 0.34;
    const x = cx + rx * Math.cos(t) + (rx * 0.2) * Math.sin(2 * t);
    const y = cy + ry * Math.sin(t) - (ry * 0.15) * Math.sin(2 * t);
    return { x, y };
  };

  // Keyboard Controller
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = botState.current.keys;
      const key = e.key.toLowerCase();

      if (['arrowup', 'w'].includes(key) || e.code === 'KeyW' || e.code === 'ArrowUp') {
        k.up = true;
        e.preventDefault();
      }
      if (['arrowdown', 's'].includes(key) || e.code === 'KeyS' || e.code === 'ArrowDown') {
        k.down = true;
        e.preventDefault();
      }
      if (['arrowleft', 'a'].includes(key) || e.code === 'KeyA' || e.code === 'ArrowLeft') {
        k.left = true;
        e.preventDefault();
      }
      if (['arrowright', 'd'].includes(key) || e.code === 'KeyD' || e.code === 'ArrowRight') {
        k.right = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = botState.current.keys;
      const key = e.key.toLowerCase();

      if (['arrowup', 'w'].includes(key) || e.code === 'KeyW' || e.code === 'ArrowUp') k.up = false;
      if (['arrowdown', 's'].includes(key) || e.code === 'KeyS' || e.code === 'ArrowDown') k.down = false;
      if (['arrowleft', 'a'].includes(key) || e.code === 'KeyA' || e.code === 'ArrowLeft') k.left = false;
      if (['arrowright', 'd'].includes(key) || e.code === 'KeyD' || e.code === 'ArrowRight') k.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const resetBot = () => {
    audioEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pt = getTrackCenter(0, canvas.width, canvas.height);
    botState.current = {
      x: pt.x,
      y: pt.y,
      angle: Math.PI / 2,
      speed: 0,
      maxSpeed: 5.5,
      accel: 0.35,
      turnSpeed: 0.08,
      keys: { left: false, right: false, up: false, down: false },
      lapStart: Date.now(),
      checkpoints: [false, false, false, false]
    };
    setLapTime(0);
  };

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Position at start line
    const initPt = getTrackCenter(0, canvas.width, canvas.height);
    botState.current.x = initPt.x;
    botState.current.y = initPt.y;
    botState.current.angle = Math.PI / 2;

    const samples = 400;
    const trackPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * Math.PI * 2;
      trackPoints.push(getTrackCenter(t, canvas.width, canvas.height));
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Grid Background
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Circuit Asphalt Border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 42;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(trackPoints[0].x, trackPoints[0].y);
      for (let i = 1; i < trackPoints.length; i++) {
        ctx.lineTo(trackPoints[i].x, trackPoints[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // 3. Golden Optical Guidance Line
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.strokeStyle = '#fce49c';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Checkpoint Markers
      [0, 100, 200, 300].forEach((idx, i) => {
        const pt = trackPoints[idx];
        ctx.fillStyle = botState.current.checkpoints[i] ? '#00f0ff' : 'rgba(212, 175, 55, 0.4)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Finish / Start Line
      const startPt = trackPoints[0];
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(startPt.x - 20, startPt.y);
      ctx.lineTo(startPt.x + 20, startPt.y);
      ctx.stroke();

      // 4. Update Bot Physics with Direct Manual Steering
      const b = botState.current;

      // Acceleration / Throttle
      if (b.keys.up) {
        b.speed = Math.min(b.speed + b.accel, b.maxSpeed);
      } else if (b.keys.down) {
        b.speed = Math.max(b.speed - b.accel, -b.maxSpeed * 0.5);
      } else {
        b.speed *= 0.94; // Friction
      }

      // Steering
      if (b.keys.left) {
        b.angle -= b.turnSpeed;
      }
      if (b.keys.right) {
        b.angle += b.turnSpeed;
      }

      // Position update
      b.x += Math.cos(b.angle) * b.speed;
      b.y += Math.sin(b.angle) * b.speed;

      // Keep bot in canvas bounds
      b.x = Math.max(20, Math.min(canvas.width - 20, b.x));
      b.y = Math.max(20, Math.min(canvas.height - 20, b.y));

      // Calculate distance to closest track point
      let minDist = Infinity;
      let closestIdx = 0;
      for (let i = 0; i < trackPoints.length; i++) {
        const d = Math.hypot(trackPoints[i].x - b.x, trackPoints[i].y - b.y);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      }

      // Checkpoint passing & Lap completion
      const cpIndex = Math.floor((closestIdx / samples) * 4);
      b.checkpoints[cpIndex] = true;
      if (closestIdx < 12 && b.checkpoints[1] && b.checkpoints[2] && b.checkpoints[3]) {
        const elapsed = (Date.now() - b.lapStart) / 1000;
        if (elapsed > 3.5) {
          audioEngine.playVictory();
          setLapCount((c) => c + 1);
          setBestLap((prev) => (!prev || elapsed < prev ? Number(elapsed.toFixed(2)) : prev));
          if (onLapComplete) onLapComplete(elapsed);
          b.lapStart = Date.now();
          b.checkpoints = [false, false, false, false];
        }
      }

      setCurrentSpeed(Number(Math.abs(b.speed * 14).toFixed(1)));
      setLapTime(Number(((Date.now() - b.lapStart) / 1000).toFixed(1)));

      // 5. Draw Rover Chassis
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);

      // Headlight Beam
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(48, -16);
      ctx.lineTo(48, 16);
      ctx.closePath();
      ctx.fill();

      // Optical IR Sensors
      [-8, 0, 8].forEach((offsetY) => {
        ctx.fillStyle = minDist < 20 ? '#00f0ff' : '#d4af37';
        ctx.beginPath();
        ctx.arc(16, offsetY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rover Body
      ctx.fillStyle = '#0a101e';
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-16, -14, 32, 28, 4);
      ctx.fill();
      ctx.stroke();

      // Heading Direction Indicator Arrow
      ctx.fillStyle = '#fce49c';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-4, -6);
      ctx.lineTo(-4, 6);
      ctx.closePath();
      ctx.fill();

      // Dual Wheels
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(-12, -18, 24, 4);
      ctx.fillRect(-12, 14, 24, 4);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Virtual Key Handlers for on-screen controls
  const handleVirtualKey = (dir: 'up' | 'down' | 'left' | 'right', pressed: boolean) => {
    botState.current.keys[dir] = pressed;
    if (pressed) audioEngine.playHover();
  };

  return (
    <div className="space-y-4">
      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#03060f] border border-gold/30 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={760}
          height={420}
          className="w-full h-full object-contain"
        />

        {/* Live HUD Overlay */}
        <div className="absolute top-3 left-3 bg-black/85 border border-gold/30 px-3.5 py-2 rounded font-mono text-[11px] text-slate-300 space-y-1 pointer-events-none backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold font-bold">SPEED:</span>
            <span className="text-white font-black">{currentSpeed} cm/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-400 font-bold">CURRENT LAP:</span>
            <span className="text-gold-light font-bold">{lapTime}s</span>
          </div>
          {bestLap && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold pt-0.5 border-t border-gold/20">
              <Trophy className="w-3 h-3" />
              <span>RECORD: {bestLap}s (Lap {lapCount})</span>
            </div>
          )}
        </div>

        {/* Control Status Indicator */}
        <div className="absolute top-3 right-3 bg-black/85 border border-gold/30 px-3 py-1.5 rounded font-mono text-[10px] text-slate-300 flex items-center gap-2 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-gold-light font-bold">MANUAL DRIVER ONLINE</span>
        </div>
      </div>

      {/* Driver Controls & Reset Strip */}
      <div className="p-4 rounded-lg bg-black/60 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3 text-slate-300 text-xs">
          <span className="px-2.5 py-1 rounded bg-gold/15 text-gold border border-gold/30 font-bold">CONTROLS:</span>
          <span>Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to steer, throttle, and complete laps around the circuit!</span>
        </div>

        {/* Interactive Virtual Steering Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onMouseDown={() => handleVirtualKey('left', true)}
            onMouseUp={() => handleVirtualKey('left', false)}
            onTouchStart={() => handleVirtualKey('left', true)}
            onTouchEnd={() => handleVirtualKey('left', false)}
            className="p-2.5 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
            title="Steer Left (A / Left Arrow)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onMouseDown={() => handleVirtualKey('up', true)}
            onMouseUp={() => handleVirtualKey('up', false)}
            onTouchStart={() => handleVirtualKey('up', true)}
            onTouchEnd={() => handleVirtualKey('up', false)}
            className="p-2.5 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
            title="Throttle Forward (W / Up Arrow)"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onMouseDown={() => handleVirtualKey('down', true)}
            onMouseUp={() => handleVirtualKey('down', false)}
            onTouchStart={() => handleVirtualKey('down', true)}
            onTouchEnd={() => handleVirtualKey('down', false)}
            className="p-2.5 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
            title="Brake / Reverse (S / Down Arrow)"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onMouseDown={() => handleVirtualKey('right', true)}
            onMouseUp={() => handleVirtualKey('right', false)}
            onTouchStart={() => handleVirtualKey('right', true)}
            onTouchEnd={() => handleVirtualKey('right', false)}
            className="p-2.5 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
            title="Steer Right (D / Right Arrow)"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={resetBot}
            className="ml-3 px-3.5 py-2 bg-surface hover:bg-gold/20 text-gold-light border border-gold/30 hover:border-gold rounded font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>
    </div>
  );
};
