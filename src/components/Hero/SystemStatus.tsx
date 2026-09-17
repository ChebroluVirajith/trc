import React, { useEffect, useState } from 'react';
import { Shield, MapPin, Radio, Sparkles } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full border-y border-gold/25 bg-surface/90 backdrop-blur-md py-2.5 px-4 font-mono text-[11px] text-slate-300 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Telemetry Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          <span className="text-gold-light font-semibold uppercase">LORE MATRIX ONLINE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">SNIST ROBOTICS SANCTUM</span>
        </div>

        {/* Location & Certification */}
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>HYDERABAD, IN</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>ISO 20121:2012 CERTIFIED</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold-light">UNWRITTEN LORE EDITION</span>
          </div>
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0 font-mono text-slate-200">
          <Radio className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-slate-400">IST [UTC+05:30]</span>
          <span className="text-gold-light font-bold tracking-wider">{time || '00:00:00'}</span>
        </div>
      </div>
    </div>
  );
};
