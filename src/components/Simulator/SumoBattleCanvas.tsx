import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Swords, User, Users, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export const SumoBattleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameMode, setGameMode] = useState<'vs_ai' | '2_player'>('vs_ai');
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [matchStatus, setMatchStatus] = useState<'COUNTDOWN' | 'FIGHT' | 'P1_WIN' | 'P2_WIN' | 'DRAW'>('COUNTDOWN');
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [matchTime, setMatchTime] = useState<number>(45);

  const gameState = useRef({
    p1: {
      x: 260,
      y: 210,
      angle: 0,
      speed: 0,
      vx: 0,
      vy: 0,
      radius: 22,
      maxSpeed: 4.5,
      accel: 0.35,
      turnSpeed: 0.08,
      keys: { up: false, down: false, left: false, right: false }
    },
    p2: {
      x: 500,
      y: 210,
      angle: Math.PI,
      speed: 0,
      vx: 0,
      vy: 0,
      radius: 22,
      maxSpeed: 3.2,
      accel: 0.22,
      turnSpeed: 0.055,
      keys: { up: false, down: false, left: false, right: false }
    },
    particles: [] as Particle[],
    arenaRadius: 170,
    startTime: Date.now(),
    countdown: 3,
    isOver: false,
    lastImpact: 0,
    countdownTimerId: null as number | null
  });

  // Handle Keyboard Inputs for P1 (WASD) and P2 (Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const p1k = gameState.current.p1.keys;
      const p2k = gameState.current.p2.keys;
      const code = e.code;
      const key = e.key.toLowerCase();

      // P1: W, A, S, D
      if (code === 'KeyW' || key === 'w') { p1k.up = true; e.preventDefault(); }
      if (code === 'KeyS' || key === 's') { p1k.down = true; e.preventDefault(); }
      if (code === 'KeyA' || key === 'a') { p1k.left = true; e.preventDefault(); }
      if (code === 'KeyD' || key === 'd') { p1k.right = true; e.preventDefault(); }

      // In 1P mode, Arrow keys can also control P1
      if (gameMode === 'vs_ai') {
        if (code === 'ArrowUp') { p1k.up = true; e.preventDefault(); }
        if (code === 'ArrowDown') { p1k.down = true; e.preventDefault(); }
        if (code === 'ArrowLeft') { p1k.left = true; e.preventDefault(); }
        if (code === 'ArrowRight') { p1k.right = true; e.preventDefault(); }
      } else {
        // In 2P mode, Arrow keys control P2
        if (code === 'ArrowUp') { p2k.up = true; e.preventDefault(); }
        if (code === 'ArrowDown') { p2k.down = true; e.preventDefault(); }
        if (code === 'ArrowLeft') { p2k.left = true; e.preventDefault(); }
        if (code === 'ArrowRight') { p2k.right = true; e.preventDefault(); }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const p1k = gameState.current.p1.keys;
      const p2k = gameState.current.p2.keys;
      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyW' || key === 'w') p1k.up = false;
      if (code === 'KeyS' || key === 's') p1k.down = false;
      if (code === 'KeyA' || key === 'a') p1k.left = false;
      if (code === 'KeyD' || key === 'd') p1k.right = false;

      if (gameMode === 'vs_ai') {
        if (code === 'ArrowUp') p1k.up = false;
        if (code === 'ArrowDown') p1k.down = false;
        if (code === 'ArrowLeft') p1k.left = false;
        if (code === 'ArrowRight') p1k.right = false;
      } else {
        if (code === 'ArrowUp') p2k.up = false;
        if (code === 'ArrowDown') p2k.down = false;
        if (code === 'ArrowLeft') p2k.left = false;
        if (code === 'ArrowRight') p2k.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameMode]);

  const startCountdown = () => {
    if (gameState.current.countdownTimerId) {
      clearInterval(gameState.current.countdownTimerId);
    }

    gameState.current.countdown = 3;
    setCountdownNum(3);
    setMatchStatus('COUNTDOWN');
    audioEngine.playHover();

    const interval = window.setInterval(() => {
      gameState.current.countdown -= 1;
      const count = gameState.current.countdown;
      setCountdownNum(count);

      if (count > 0) {
        audioEngine.playHover();
      } else if (count === 0) {
        audioEngine.playPowerUp();
        setMatchStatus('FIGHT');
        gameState.current.startTime = Date.now();
        clearInterval(interval);
        gameState.current.countdownTimerId = null;
      }
    }, 1000);

    gameState.current.countdownTimerId = interval;
  };

  const resetMatch = () => {
    const canvas = canvasRef.current;
    const cx = canvas ? canvas.width / 2 : 380;
    const cy = canvas ? canvas.height / 2 : 210;

    gameState.current.p1 = {
      x: cx - 110,
      y: cy,
      angle: 0,
      speed: 0,
      vx: 0,
      vy: 0,
      radius: 22,
      maxSpeed: 4.5,
      accel: 0.35,
      turnSpeed: 0.08,
      keys: { up: false, down: false, left: false, right: false }
    };

    gameState.current.p2 = {
      x: cx + 110,
      y: cy,
      angle: Math.PI,
      speed: 0,
      vx: 0,
      vy: 0,
      radius: 22,
      maxSpeed: gameMode === '2_player' ? 4.5 : 2.5,
      accel: gameMode === '2_player' ? 0.35 : 0.15,
      turnSpeed: gameMode === '2_player' ? 0.08 : 0.048,
      keys: { up: false, down: false, left: false, right: false }
    };

    gameState.current.particles = [];
    gameState.current.isOver = false;
    gameState.current.lastImpact = 0;
    setMatchTime(45);
    startCountdown();
  };

  const switchMode = (mode: 'vs_ai' | '2_player') => {
    audioEngine.playClick();
    setGameMode(mode);
    setP1Score(0);
    setP2Score(0);
    setTimeout(() => {
      resetMatch();
    }, 50);
  };

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resetMatch();

    const spawnSparks = (x: number, y: number, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 4.5;
        gameState.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: Math.random() > 0.5 ? '#fce49c' : '#00f0ff'
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const arenaR = gameState.current.arenaRadius;
      const g = gameState.current;

      // 1. Draw Arena Dohyo Ring
      ctx.fillStyle = '#060a14';
      ctx.beginPath();
      ctx.arc(cx, cy, arenaR, 0, Math.PI * 2);
      ctx.fill();

      // Dohyo Ring Outer Boundary Line
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, arenaR - 25, 0, Math.PI * 2);
      ctx.stroke();

      // Center Starting Lines (Shikiri-sen)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 30, cy - 25, 4, 50);
      ctx.fillRect(cx + 26, cy - 25, 4, 50);

      // 2. Gameplay Physics (Active during FIGHT and not over)
      if (g.countdown <= 0 && !g.isOver) {
        const remaining = Math.max(0, 45 - Math.floor((Date.now() - g.startTime) / 1000));
        setMatchTime(remaining);

        if (remaining === 0) {
          g.isOver = true;
          setMatchStatus('DRAW');
          audioEngine.playImpact();
        }

        const p1 = g.p1;
        const p2 = g.p2;

        // --- P1 Physics (WASD) ---
        if (p1.keys.up) p1.speed = Math.min(p1.speed + p1.accel, p1.maxSpeed);
        else if (p1.keys.down) p1.speed = Math.max(p1.speed - p1.accel, -p1.maxSpeed * 0.6);
        else p1.speed *= 0.92;

        if (p1.keys.left) p1.angle -= p1.turnSpeed;
        if (p1.keys.right) p1.angle += p1.turnSpeed;

        p1.vx = Math.cos(p1.angle) * p1.speed + p1.vx * 0.85;
        p1.vy = Math.sin(p1.angle) * p1.speed + p1.vy * 0.85;

        p1.x += p1.vx;
        p1.y += p1.vy;

        // --- P2 Physics (AI or 2nd Player) ---
        if (gameMode === '2_player') {
          if (p2.keys.up) p2.speed = Math.min(p2.speed + p2.accel, p2.maxSpeed);
          else if (p2.keys.down) p2.speed = Math.max(p2.speed - p2.accel, -p2.maxSpeed * 0.6);
          else p2.speed *= 0.92;

          if (p2.keys.left) p2.angle -= p2.turnSpeed;
          if (p2.keys.right) p2.angle += p2.turnSpeed;

          p2.vx = Math.cos(p2.angle) * p2.speed + p2.vx * 0.85;
          p2.vy = Math.sin(p2.angle) * p2.speed + p2.vy * 0.85;

          p2.x += p2.vx;
          p2.y += p2.vy;
        } else {
          // AI Opponent Logic
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const targetAngle = Math.atan2(dy, dx);

          let angleDiff = targetAngle - p2.angle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          p2.angle += Math.max(-p2.turnSpeed, Math.min(p2.turnSpeed, angleDiff));
          p2.speed = Math.min(p2.speed + p2.accel, p2.maxSpeed);

          p2.vx = Math.cos(p2.angle) * p2.speed + p2.vx * 0.85;
          p2.vy = Math.sin(p2.angle) * p2.speed + p2.vy * 0.85;

          p2.x += p2.vx;
          p2.y += p2.vy;
        }

        // Clamp positions to avoid leaving canvas
        p1.x = Math.max(20, Math.min(canvas.width - 20, p1.x));
        p1.y = Math.max(20, Math.min(canvas.height - 20, p1.y));
        p2.x = Math.max(20, Math.min(canvas.width - 20, p2.x));
        p2.y = Math.max(20, Math.min(canvas.height - 20, p2.y));

        // --- Robust Elastic Bot-to-Bot Collision Physics ---
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const minDist = p1.radius + p2.radius;

        if (dist < minDist && dist > 0.001) {
          const overlap = minDist - dist;
          const nx = (p2.x - p1.x) / dist;
          const ny = (p2.y - p1.y) / dist;

          // 1. Separate positions cleanly so they never overlap or glitch
          p1.x -= nx * (overlap * 0.55);
          p1.y -= ny * (overlap * 0.55);
          p2.x += nx * (overlap * 0.55);
          p2.y += ny * (overlap * 0.55);

          // 2. Compute impulse
          const now = Date.now();
          if (now - g.lastImpact > 120) {
            audioEngine.playImpact();
            spawnSparks((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, 14);
            g.lastImpact = now;
          }

          // Exchange momentum
          const impulse = Math.max(3.0, Math.abs(p1.speed) + Math.abs(p2.speed) + 2.0);
          p1.vx -= nx * (impulse * 1.2);
          p1.vy -= ny * (impulse * 1.2);
          p2.vx += nx * (impulse * 1.2);
          p2.vy += ny * (impulse * 1.2);

          p1.speed *= -0.4;
          p2.speed *= -0.4;
        }

        // --- Dohyo Ring Out Detection ---
        const p1Dist = Math.hypot(p1.x - cx, p1.y - cy);
        const p2Dist = Math.hypot(p2.x - cx, p2.y - cy);

        if (p2Dist > arenaR && p1Dist <= arenaR) {
          g.isOver = true;
          setMatchStatus('P1_WIN');
          setP1Score((s) => s + 1);
          audioEngine.playVictory();
        } else if (p1Dist > arenaR && p2Dist <= arenaR) {
          g.isOver = true;
          setMatchStatus('P2_WIN');
          setP2Score((s) => s + 1);
          audioEngine.playImpact();
        } else if (p1Dist > arenaR && p2Dist > arenaR) {
          g.isOver = true;
          setMatchStatus('DRAW');
          audioEngine.playImpact();
        }
      }

      // 3. Draw Spark Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.04;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.5, pt.life * 3.5), 0, Math.PI * 2);
        ctx.fill();
        if (pt.life <= 0) g.particles.splice(i, 1);
      }

      // 4. Draw Player 1 (Gold Blade Destroyer)
      ctx.save();
      ctx.translate(g.p1.x, g.p1.y);
      ctx.rotate(g.p1.angle);

      // Wedge Blade
      ctx.fillStyle = '#fce49c';
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-14, -18);
      ctx.lineTo(-14, 18);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Center Core
      ctx.fillStyle = '#05070d';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Draw Player 2 / AI (Crimson Titan or Cyan Blade)
      ctx.save();
      ctx.translate(g.p2.x, g.p2.y);
      ctx.rotate(g.p2.angle);

      ctx.fillStyle = gameMode === '2_player' ? '#38bdf8' : '#ef4444';
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-14, -18);
      ctx.lineTo(-14, 18);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = gameMode === '2_player' ? '#0284c7' : '#b91c1c';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#05070d';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = gameMode === '2_player' ? '#fce49c' : '#ffaa00';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      if (gameState.current.countdownTimerId) {
        clearInterval(gameState.current.countdownTimerId);
      }
    };
  }, [gameMode]);

  const handleVirtualKeyP1 = (dir: 'up' | 'down' | 'left' | 'right', pressed: boolean) => {
    gameState.current.p1.keys[dir] = pressed;
    if (pressed) audioEngine.playHover();
  };

  const handleVirtualKeyP2 = (dir: 'up' | 'down' | 'left' | 'right', pressed: boolean) => {
    gameState.current.p2.keys[dir] = pressed;
    if (pressed) audioEngine.playHover();
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-black/70 border border-gold/20 rounded-lg font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">ARENA FORMAT:</span>
          <div className="flex items-center gap-1.5 bg-surface/60 p-1 rounded border border-gold/20">
            <button
              onClick={() => switchMode('vs_ai')}
              className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
                gameMode === 'vs_ai'
                  ? 'bg-gradient-to-r from-gold-light via-gold to-gold-amber text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1P (VS AI TITAN)</span>
            </button>

            <button
              onClick={() => switchMode('2_player')}
              className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
                gameMode === '2_player'
                  ? 'bg-gradient-to-r from-cyan-300 to-sky-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2P (LOCAL VERSUS)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          {gameMode === 'vs_ai' ? (
            <span><strong>Controls:</strong> WASD or Arrow Keys</span>
          ) : (
            <span><strong>P1 (Gold):</strong> WASD &bull; <strong>P2 (Cyan):</strong> Arrow Keys</span>
          )}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#02050c] border border-gold/30 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={760}
          height={420}
          className="w-full h-full object-contain"
        />

        {/* Live Score & Time HUD */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none font-mono text-xs">
          <div className="bg-black/85 border border-gold/40 px-3.5 py-1.5 rounded flex items-center gap-2 backdrop-blur-md">
            <span className="text-gold font-bold">{gameMode === '2_player' ? 'P1 (GOLD):' : 'PLAYER:'}</span>
            <span className="text-white font-black text-sm">{p1Score}</span>
          </div>

          <div className="bg-black/85 border border-gold/40 px-4 py-1.5 rounded text-center backdrop-blur-md">
            <span className="text-gold-light font-black text-sm">
              {matchStatus === 'COUNTDOWN' ? 'READY' : `${matchTime}s`}
            </span>
          </div>

          <div className={`bg-black/85 border px-3.5 py-1.5 rounded flex items-center gap-2 backdrop-blur-md ${gameMode === '2_player' ? 'border-sky-400/40' : 'border-red-500/40'}`}>
            <span className={gameMode === '2_player' ? 'text-sky-400 font-bold' : 'text-red-400 font-bold'}>
              {gameMode === '2_player' ? 'P2 (CYAN):' : 'AI TITAN:'}
            </span>
            <span className="text-white font-black text-sm">{p2Score}</span>
          </div>
        </div>

        {/* Animated 3-Second Countdown Overlay */}
        {matchStatus === 'COUNTDOWN' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 pointer-events-none animate-fade-in z-20">
            <div className="font-mono text-xs text-gold-light uppercase tracking-[0.3em] font-bold">
              {gameMode === '2_player' ? '2-PLAYER BOUT STARTING IN' : 'YODDHA SUMO BOUT STARTING IN'}
            </div>
            <div className="text-6xl sm:text-7xl font-display font-black text-gold-gradient tracking-tight animate-ping">
              {countdownNum > 0 ? countdownNum : 'BATTLE!'}
            </div>
          </div>
        )}

        {/* Victory / Defeat Overlay Banner */}
        {(matchStatus === 'P1_WIN' || matchStatus === 'P2_WIN' || matchStatus === 'DRAW') && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center space-y-3 animate-fade-in z-20">
            <div className="text-3xl sm:text-4xl font-display font-black tracking-wider uppercase">
              {matchStatus === 'P1_WIN' && (
                <span className="text-gold-gradient">
                  🏆 {gameMode === '2_player' ? 'PLAYER 1 (GOLD) WINS!' : 'RING OUT VICTORY!'}
                </span>
              )}
              {matchStatus === 'P2_WIN' && (
                <span className={gameMode === '2_player' ? 'text-sky-400' : 'text-red-400'}>
                  {gameMode === '2_player' ? '🏆 PLAYER 2 (CYAN) WINS!' : '💥 RING OUT DEFEAT!'}
                </span>
              )}
              {matchStatus === 'DRAW' && <span className="text-slate-300">⏱️ ROUND DRAW!</span>}
            </div>
            <p className="text-xs text-slate-300 font-mono">
              {matchStatus === 'P1_WIN' && (gameMode === '2_player' ? 'Player 2 was forced out of the Dohyō ring!' : 'AI Titan pushed out of the Dohyō ring!')}
              {matchStatus === 'P2_WIN' && (gameMode === '2_player' ? 'Player 1 was pushed out of the Dohyō ring!' : 'Your bot was forced out of the arena!')}
              {matchStatus === 'DRAW' && 'Time expired with both bots holding their ground.'}
            </p>
            <button
              onClick={resetMatch}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-light via-gold to-gold-amber hover:from-white hover:to-gold text-black font-display font-black text-xs uppercase tracking-wider rounded transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              FIGHT NEXT ROUND
            </button>
          </div>
        )}
      </div>

      {/* Control Banner & Steering Buttons */}
      <div className="p-4 rounded-lg bg-black/60 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-gold flex-shrink-0" />
          {gameMode === 'vs_ai' ? (
            <span>Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to ram the opponent out of the ring!</span>
          ) : (
            <span><strong>P1:</strong> WASD keys &bull; <strong>P2:</strong> Arrow Keys</span>
          )}
        </div>

        {/* Dual or Single Steering Buttons Strip */}
        <div className="flex flex-wrap items-center gap-3">
          {/* P1 Controls */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gold font-bold mr-1">P1:</span>
            <button
              onMouseDown={() => handleVirtualKeyP1('left', true)}
              onMouseUp={() => handleVirtualKeyP1('left', false)}
              onTouchStart={() => handleVirtualKeyP1('left', true)}
              onTouchEnd={() => handleVirtualKeyP1('left', false)}
              className="p-2 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
              title="P1 Steer Left (A)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onMouseDown={() => handleVirtualKeyP1('up', true)}
              onMouseUp={() => handleVirtualKeyP1('up', false)}
              onTouchStart={() => handleVirtualKeyP1('up', true)}
              onTouchEnd={() => handleVirtualKeyP1('up', false)}
              className="p-2 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
              title="P1 Forward Ram (W)"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onMouseDown={() => handleVirtualKeyP1('down', true)}
              onMouseUp={() => handleVirtualKeyP1('down', false)}
              onTouchStart={() => handleVirtualKeyP1('down', true)}
              onTouchEnd={() => handleVirtualKeyP1('down', false)}
              className="p-2 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
              title="P1 Reverse (S)"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              onMouseDown={() => handleVirtualKeyP1('right', true)}
              onMouseUp={() => handleVirtualKeyP1('right', false)}
              onTouchStart={() => handleVirtualKeyP1('right', true)}
              onTouchEnd={() => handleVirtualKeyP1('right', false)}
              className="p-2 rounded bg-surface hover:bg-gold/20 active:bg-gold active:text-black border border-gold/30 text-gold-light transition-all"
              title="P1 Steer Right (D)"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* P2 Controls in 2P Mode */}
          {gameMode === '2_player' && (
            <div className="flex items-center gap-1 border-l border-gold/20 pl-3">
              <span className="text-[10px] text-sky-400 font-bold mr-1">P2:</span>
              <button
                onMouseDown={() => handleVirtualKeyP2('left', true)}
                onMouseUp={() => handleVirtualKeyP2('left', false)}
                onTouchStart={() => handleVirtualKeyP2('left', true)}
                onTouchEnd={() => handleVirtualKeyP2('left', false)}
                className="p-2 rounded bg-surface hover:bg-sky-500/20 active:bg-sky-400 active:text-black border border-sky-400/30 text-sky-300 transition-all"
                title="P2 Steer Left (Left Arrow)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onMouseDown={() => handleVirtualKeyP2('up', true)}
                onMouseUp={() => handleVirtualKeyP2('up', false)}
                onTouchStart={() => handleVirtualKeyP2('up', true)}
                onTouchEnd={() => handleVirtualKeyP2('up', false)}
                className="p-2 rounded bg-surface hover:bg-sky-500/20 active:bg-sky-400 active:text-black border border-sky-400/30 text-sky-300 transition-all"
                title="P2 Forward Ram (Up Arrow)"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onMouseDown={() => handleVirtualKeyP2('down', true)}
                onMouseUp={() => handleVirtualKeyP2('down', false)}
                onTouchStart={() => handleVirtualKeyP2('down', true)}
                onTouchEnd={() => handleVirtualKeyP2('down', false)}
                className="p-2 rounded bg-surface hover:bg-sky-500/20 active:bg-sky-400 active:text-black border border-sky-400/30 text-sky-300 transition-all"
                title="P2 Reverse (Down Arrow)"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onMouseDown={() => handleVirtualKeyP2('right', true)}
                onMouseUp={() => handleVirtualKeyP2('right', false)}
                onTouchStart={() => handleVirtualKeyP2('right', true)}
                onTouchEnd={() => handleVirtualKeyP2('right', false)}
                className="p-2 rounded bg-surface hover:bg-sky-500/20 active:bg-sky-400 active:text-black border border-sky-400/30 text-sky-300 transition-all"
                title="P2 Steer Right (Right Arrow)"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={resetMatch}
            className="px-3 py-2 bg-surface hover:bg-gold/20 text-gold-light border border-gold/30 hover:border-gold rounded font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
