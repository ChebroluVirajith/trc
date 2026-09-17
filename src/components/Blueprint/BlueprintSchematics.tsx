import React from 'react';
import '../../styles/blueprint.css';

interface BlueprintSchematicsProps {
  phase: number;
}

export const BlueprintSchematics: React.FC<BlueprintSchematicsProps> = ({ phase }) => {
  return (
    <svg
      viewBox="0 0 800 480"
      className="w-full h-full min-h-[320px] max-h-[55vh] select-none transition-all duration-500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Engineering Gold & Mineral Patterns */}
        <pattern id="rock-hatch" width="12" height="12" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
        </pattern>
        <pattern id="silicon-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="0.6" />
          <circle cx="8" cy="8" r="1.2" fill="#00f0ff" opacity="0.8" />
        </pattern>
        <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(212, 175, 55, 0.15)" />
        </pattern>
        
        {/* Glow & Radiance Gradients */}
        <linearGradient id="gold-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce49c" stopOpacity="1" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#946f1b" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="crystal-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#fce49c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="silicon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="forge-fire" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff5500" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e5a93b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fce49c" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="ascension-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fce49c" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Blueprint Grid Lines Background */}
      <rect width="800" height="480" fill="url(#dot-grid)" />

      {/* Sleek Corner Accent Markers */}
      <path d="M 20 35 L 20 20 L 35 20" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 780 35 L 780 20 L 765 20" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 20 445 L 20 460 L 35 460" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 780 445 L 780 460 L 765 460" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* =========================================================================
          STAGE 01: ROCK & MINERALS (Quartz Crystal Spire & Metallurgic Forge)
      ========================================================================= */}
      <g
        id="stage-1"
        className={`transition-all duration-500 transform ${
          phase === 1
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        {/* Background Harmonic Field */}
        <circle cx="400" cy="240" r="190" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1" fill="none" strokeDasharray="6 6" />
        <circle cx="400" cy="240" r="130" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" fill="none" />

        {/* Metallurgic Forge Crucible (Left) */}
        <g transform="translate(170, 240)">
          <circle r="65" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle r="48" stroke="#d4af37" strokeWidth="2" fill="rgba(10, 16, 28, 0.9)" />
          <circle r="32" fill="url(#forge-fire)" stroke="#ff5500" strokeWidth="1.5" />
          <line x1="-40" y1="0" x2="40" y2="0" stroke="#fce49c" strokeWidth="1" opacity="0.7" />
          <line x1="0" y1="-40" x2="0" y2="40" stroke="#fce49c" strokeWidth="1" opacity="0.7" />
          <circle cx="0" cy="0" r="8" fill="#fce49c" className="animate-ping" />
          <text x="0" y="80" textAnchor="middle" className="blueprint-label font-bold text-gold-light text-[11px]">
            SMELTING CRUCIBLE [1400°C]
          </text>
          <text x="0" y="94" textAnchor="middle" className="blueprint-label text-[9px] text-slate-400">
            ORE REDUCTION → Cu, Sn, Fe
          </text>
        </g>

        {/* Central Faceted Quartz Crystal Spire */}
        <g transform="translate(400, 220)">
          {/* Main Crystal Spire */}
          <polygon
            points="0,-150 75,-60 55,100 -55,100 -75,-60"
            fill="url(#rock-hatch)"
            stroke="#d4af37"
            strokeWidth="2.5"
          />
          <polygon
            points="0,-150 0,100 55,100 75,-60"
            fill="url(#crystal-glow)"
            stroke="#fce49c"
            strokeWidth="1.5"
          />
          
          {/* Internal Geometric Facet Lines */}
          <line x1="0" y1="-150" x2="-55" y2="100" stroke="#fce49c" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="-75" y1="-60" x2="55" y2="100" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="5 5" />
          <line x1="0" y1="-150" x2="0" y2="100" stroke="#ffffff" strokeWidth="1.8" />

          {/* Sibling Crystal Shards */}
          <polygon points="-60,-75 -110,-20 -85,75 -40,75" fill="url(#rock-hatch)" stroke="#d4af37" strokeWidth="1.8" />
          <polygon points="55,-90 100,-25 80,70 35,70" fill="url(#rock-hatch)" stroke="#d4af37" strokeWidth="1.8" />

          {/* Glowing Lattice Vertices */}
          <circle cx="0" cy="-150" r="7" fill="#ffffff" className="animate-pulse" />
          <circle cx="75" cy="-60" r="5" fill="#fce49c" />
          <circle cx="-75" cy="-60" r="5" fill="#fce49c" />
          <circle cx="0" cy="100" r="6" fill="#fce49c" />
          <circle cx="-110" cy="-20" r="4" fill="#d4af37" />
          <circle cx="100" cy="-25" r="4" fill="#d4af37" />

          <text x="0" y="130" textAnchor="middle" className="blueprint-label font-black text-white text-[13px] tracking-wider">
            RAW QUARTZ CRYSTAL (SiO₂)
          </text>
          <text x="0" y="146" textAnchor="middle" className="blueprint-label text-gold-light text-[10px] tracking-widest font-mono">
            SILICON DIOXIDE LATTICE // MOHS HARDNESS: 7.0
          </text>
        </g>

        {/* Astrolabe Stone Ring (Right) */}
        <g transform="translate(630, 240)">
          <circle r="65" stroke="#d4af37" strokeWidth="2" fill="none" />
          <circle r="48" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle r="22" fill="rgba(212, 175, 55, 0.15)" stroke="#fce49c" strokeWidth="1.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line key={deg} x1="0" y1="-60" x2="0" y2="-48" stroke="#fce49c" strokeWidth="1.5" transform={`rotate(${deg})`} />
          ))}
          <text x="0" y="80" textAnchor="middle" className="blueprint-label font-bold text-gold-light text-[11px]">
            ARCHAIC MECHANISMS
          </text>
          <text x="0" y="94" textAnchor="middle" className="blueprint-label text-[9px] text-slate-400">
            STONE WHEEL & ASTRONOMY
          </text>
        </g>
      </g>

      {/* =========================================================================
          STAGE 02: MECHANISMS & CLOCKWORK (Interlocking Gear Trains & Planetary Drive)
      ========================================================================= */}
      <g
        id="stage-2"
        className={`transition-all duration-500 transform ${
          phase === 2
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        <circle cx="400" cy="220" r="210" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1" fill="none" strokeDasharray="8 8" />

        {/* Central Sun Gear */}
        <g transform="translate(400, 220)">
          <circle r="115" className="blueprint-stroke-dashed" />
          <circle r="95" className="blueprint-stroke-primary" strokeWidth="2.5" />
          <circle r="45" className="blueprint-stroke-gold" fill="rgba(212, 175, 55, 0.2)" strokeWidth="2" />
          <circle r="12" fill="#fce49c" />

          {/* Rotating Main Gear Teeth */}
          <g className="blueprint-gear-rotate">
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
              <rect
                key={deg}
                x="-6"
                y="-110"
                width="12"
                height="22"
                rx="2"
                className="blueprint-stroke-primary"
                fill="rgba(212, 175, 55, 0.3)"
                transform={`rotate(${deg})`}
              />
            ))}
            <line x1="-80" y1="0" x2="80" y2="0" stroke="rgba(212, 175, 55, 0.7)" strokeWidth="2.5" />
            <line x1="0" y1="-80" x2="0" y2="80" stroke="rgba(212, 175, 55, 0.7)" strokeWidth="2.5" />
          </g>
        </g>

        {/* Planetary Pinion (Top Left) */}
        <g transform="translate(220, 125)">
          <circle r="56" className="blueprint-stroke-primary" strokeWidth="2" />
          <circle r="24" className="blueprint-stroke-gold" fill="rgba(212, 175, 55, 0.15)" strokeWidth="1.5" />
          <g className="blueprint-gear-rotate-reverse">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <rect key={deg} x="-5" y="-64" width="10" height="15" rx="1.5" className="blueprint-stroke-primary" fill="rgba(212, 175, 55, 0.25)" transform={`rotate(${deg})`} />
            ))}
          </g>
          <text x="0" y="80" textAnchor="middle" className="blueprint-label text-[10.5px] font-bold text-gold-light">
            PLANETARY PINION [1:2.4]
          </text>
        </g>

        {/* Output Shaft Gear (Bottom Right) */}
        <g transform="translate(590, 300)">
          <circle r="68" className="blueprint-stroke-primary" strokeWidth="2" />
          <circle r="28" className="blueprint-stroke-gold" fill="rgba(212, 175, 55, 0.15)" strokeWidth="1.5" />
          <g className="blueprint-gear-rotate-reverse">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <rect key={deg} x="-5" y="-76" width="10" height="16" rx="1.5" className="blueprint-stroke-primary" fill="rgba(212, 175, 55, 0.25)" transform={`rotate(${deg})`} />
            ))}
          </g>
          <text x="0" y="90" textAnchor="middle" className="blueprint-label text-[10.5px] font-bold text-gold-light">
            OUTPUT KINEMATIC SHAFT
          </text>
        </g>

        <text x="400" y="375" textAnchor="middle" className="blueprint-label font-black text-white text-[13px] tracking-wider">
          EPICYCLIC BRONZE GEAR DRIVE
        </text>
        <text x="400" y="392" textAnchor="middle" className="blueprint-label text-gold-light text-[10px] tracking-widest font-mono">
          PRECISION RATIO: 1:4.20 // TORQUE: 850 Nm // Cu-Sn CASTING
        </text>
      </g>

      {/* =========================================================================
          STAGE 03: ELECTROMAGNETISM & ROBOTICS (Solenoid Stator & 6-DOF Robotic Arm)
      ========================================================================= */}
      <g
        id="stage-3"
        className={`transition-all duration-500 transform ${
          phase === 3
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        {/* Electromagnetic Solenoid (Left) */}
        <g transform="translate(190, 220)">
          <rect x="-65" y="-45" width="130" height="90" rx="6" stroke="#d4af37" strokeWidth="2.5" fill="rgba(10, 16, 28, 0.95)" />
          {[-48, -32, -16, 0, 16, 32, 48].map((x) => (
            <ellipse key={x} cx={x} cy="0" rx="6.5" ry="36" stroke="#fce49c" strokeWidth="2" fill="none" />
          ))}
          {/* Pulsing Magnetic Flux Lines */}
          <path d="M -80 -28 C -115 -28, -115 28, -80 28" stroke="rgba(0, 240, 255, 0.8)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          <path d="M 80 -28 C 115 -28, 115 28, 80 28" stroke="rgba(0, 240, 255, 0.8)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          <text x="0" y="68" textAnchor="middle" className="blueprint-label font-bold text-cyan-300 text-[11px]">
            COPPER SOLENOID STATOR [2.4 T]
          </text>
          <text x="0" y="82" textAnchor="middle" className="blueprint-label text-slate-400 text-[9px]">
            ELECTROMAGNETIC FLUX DENSITY
          </text>
        </g>

        {/* 6-DOF Articulated Robotic Manipulator Arm (Right) */}
        <g transform="translate(470, 270)">
          {/* Base Turret */}
          <circle cx="0" cy="0" r="45" stroke="#d4af37" strokeWidth="2.5" fill="rgba(5,10,20,0.9)" />
          <circle cx="0" cy="0" r="28" stroke="#fce49c" strokeWidth="2" fill="rgba(212,175,55,0.2)" />
          <circle cx="0" cy="0" r="8" fill="#ffffff" />
          
          {/* Lower Arm Boom */}
          <line x1="0" y1="0" x2="130" y2="-100" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" />
          <circle cx="130" cy="-100" r="16" stroke="#fce49c" strokeWidth="2.5" fill="#d4af37" />
          <circle cx="130" cy="-100" r="5" fill="#ffffff" />

          {/* Upper Arm Link */}
          <line x1="130" y1="-100" x2="225" y2="-50" stroke="#fce49c" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="225" cy="-50" r="11" fill="#d4af37" stroke="#ffffff" strokeWidth="1.5" />

          {/* Precision End-Effector Gripper */}
          <g transform="translate(225, -50)">
            <path d="M 0 -10 L 32 -22 L 44 -12" fill="none" stroke="#fce49c" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 10 L 32 22 L 44 12" fill="none" stroke="#fce49c" strokeWidth="3" strokeLinecap="round" />
            <circle cx="44" cy="0" r="6" fill="#00f0ff" className="animate-ping" />
            <circle cx="44" cy="0" r="4" fill="#ffffff" />
          </g>

          <text x="75" y="48" textAnchor="middle" className="blueprint-label font-black text-white text-[12.5px] tracking-wider">
            6-DOF ARTICULATED ROBOTIC ARM
          </text>
          <text x="75" y="64" textAnchor="middle" className="blueprint-label text-gold-light text-[9.5px] tracking-widest font-mono">
            PAYLOAD: 25 KG // 3-PHASE SERVO ACTUATION
          </text>
        </g>
      </g>

      {/* =========================================================================
          STAGE 04: SILICON & MICROCHIPS (300mm Monocrystalline Wafer & NPU)
      ========================================================================= */}
      <g
        id="stage-4"
        className={`transition-all duration-500 transform ${
          phase === 4
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        {/* 300mm Silicon Wafer (Left) */}
        <g transform="translate(250, 220)">
          <circle r="120" fill="url(#silicon-grid)" stroke="#00f0ff" strokeWidth="2.8" />
          <circle r="105" stroke="rgba(212, 175, 55, 0.6)" strokeWidth="1.2" fill="none" strokeDasharray="8 8" />
          <line x1="-105" y1="0" x2="105" y2="0" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.5" />
          <line x1="0" y1="-105" x2="0" y2="105" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" fill="#00f0ff" className="animate-ping" opacity="0.5" />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
          
          <text x="0" y="145" textAnchor="middle" className="blueprint-label font-black text-cyan-300 text-[12px] tracking-wider">
            300mm MONOCRYSTALLINE WAFER
          </text>
          <text x="0" y="160" textAnchor="middle" className="blueprint-label text-[9.5px] text-gold-light tracking-widest font-mono">
            99.9999999% PURITY Si // 3nm EUV DIES
          </text>
        </g>

        {/* Neural Processing Unit Chip Package (Right) */}
        <g transform="translate(560, 220)">
          {/* Outer BGA Substrate */}
          <rect x="-70" y="-60" width="140" height="120" rx="6" stroke="#d4af37" strokeWidth="2.8" fill="#050a16" />
          {/* Inner Silicon Die */}
          <rect x="-55" y="-45" width="110" height="90" fill="rgba(0, 240, 255, 0.08)" stroke="#00f0ff" strokeWidth="1.5" />
          
          <text x="0" y="-8" textAnchor="middle" className="blueprint-label font-black text-white text-[13px] tracking-widest">
            SILICON NPU CORE
          </text>
          <text x="0" y="10" textAnchor="middle" className="blueprint-label text-gold-light text-[10px] tracking-widest font-mono">
            64-TOPS NEURAL ENGINE
          </text>
          
          {/* Gold Bonding Wires */}
          {[-45, -30, -15, 0, 15, 30, 45].map((x) => (
            <React.Fragment key={x}>
              <line x1={x} y1="-60" x2={x} y2="-75" stroke="#d4af37" strokeWidth="2.2" />
              <line x1={x} y1="60" x2={x} y2="75" stroke="#d4af37" strokeWidth="2.2" />
            </React.Fragment>
          ))}
          {[-30, -15, 0, 15, 30].map((y) => (
            <React.Fragment key={y}>
              <line x1="-70" y1={y} x2="-85" y2={y} stroke="#d4af37" strokeWidth="2.2" />
              <line x1="70" y1={y} x2="85" y2={y} stroke="#d4af37" strokeWidth="2.2" />
            </React.Fragment>
          ))}

          <text x="0" y="98" textAnchor="middle" className="blueprint-label font-bold text-white text-[11px]">
            BGA COMPUTE MATRIX
          </text>
        </g>

        {/* High-speed Bus Interconnect */}
        <path d="M 370 220 L 475 220" stroke="#fce49c" strokeWidth="3" strokeDasharray="8 8" className="pulse-circuit" />
      </g>

      {/* =========================================================================
          STAGE 05: SERAPHIC ASCENSION (Divine Wings, Lotus Core & Civilization Orbit)
      ========================================================================= */}
      <g
        id="stage-5"
        className={`transition-all duration-500 transform ${
          phase === 5
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        {/* Divine Golden Halo Background */}
        <circle cx="400" cy="220" r="190" fill="url(#ascension-halo)" />

        {/* Ascending Photonic Elevation Rays */}
        <g stroke="url(#gold-shimmer)" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.6">
          <line x1="160" y1="420" x2="160" y2="40" />
          <line x1="280" y1="420" x2="280" y2="30" />
          <line x1="400" y1="420" x2="400" y2="20" />
          <line x1="520" y1="420" x2="520" y2="30" />
          <line x1="640" y1="420" x2="640" y2="40" />
        </g>

        <g transform="translate(400, 220)">
          {/* Majestic Seraphic Wings (Symmetrical Grand Spans) */}
          <path
            d="M 0 0 C -60 -60, -190 -80, -290 -45 C -190 -5, -95 24, 0 38"
            fill="rgba(212, 175, 55, 0.25)"
            stroke="#fce49c"
            strokeWidth="2.8"
          />
          <path
            d="M 0 0 C -40 -40, -140 -50, -210 -25 C -135 -2, -70 18, 0 28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.8"
          />

          <path
            d="M 0 0 C 60 -60, 190 -80, 290 -45 C 190 -5, 95 24, 0 38"
            fill="rgba(212, 175, 55, 0.25)"
            stroke="#fce49c"
            strokeWidth="2.8"
          />
          <path
            d="M 0 0 C 40 -40, 140 -50, 210 -25 C 135 -2, 70 18, 0 28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Central Seraphic Lotus Core */}
          <circle cx="0" cy="0" r="38" fill="#040814" stroke="#d4af37" strokeWidth="2.8" />
          <circle cx="0" cy="0" r="22" stroke="#00f0ff" strokeWidth="2" fill="rgba(0, 240, 255, 0.25)" />
          <circle cx="0" cy="0" r="10" fill="#fce49c" className="animate-ping" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" />

          {/* 4 Ancient Civilization Planetary Nodes */}
          {[
            { angle: 0, label: 'MAYAN' },
            { angle: 90, label: 'EGYPTIAN' },
            { angle: 180, label: 'INDUS' },
            { angle: 270, label: 'NORDIC' }
          ].map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * 95;
            const y = Math.sin(rad) * 95;
            return (
              <g key={node.label} transform={`translate(${x}, ${y})`}>
                <line x1={-x * 0.4} y1={-y * 0.4} x2="0" y2="0" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <circle r="14" fill="#050a16" stroke="#d4af37" strokeWidth="1.8" />
                <circle r="6" fill="#fce49c" />
                <text x="0" y="24" textAnchor="middle" className="blueprint-label text-[8.5px] font-bold text-gold-light">
                  {node.label}
                </text>
              </g>
            );
          })}

          <text x="0" y="-90" textAnchor="middle" className="blueprint-label font-black text-white text-[15px] tracking-[0.25em]">
            ASCENSION APEX // TRANSCENDED INTELLIGENCE
          </text>
          <text x="0" y="-72" textAnchor="middle" className="blueprint-label font-bold text-gold-light text-[10.5px] tracking-widest">
            ROCK → MECHANICS → ELECTROMAGNETISM → SILICON → ASCENSION
          </text>
        </g>
      </g>
    </svg>
  );
};
