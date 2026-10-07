import React from 'react';
import { ArrowUp, Terminal, Shield, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-[#030509] py-10 relative overflow-hidden font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Identity & Motto */}
          <div className="text-center md:text-left space-y-1">
            <div className="text-sm font-bold text-cyan-400 glow-cyan">
              {PERSONAL_INFO.callsign}
            </div>
            <div className="text-slate-400 text-[11px]">
              &ldquo;{PERSONAL_INFO.tagline}&rdquo; · Architected by {PERSONAL_INFO.fullName}
            </div>
            <div className="text-slate-600 text-[10px]">
              Single Page Application · High-Performance Systems · React 19 & Tailwind CSS
            </div>
          </div>

          {/* Center: System Telemetry */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400">STATUS: 99.9% UPTIME</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="text-slate-400">
              RUNTIME: VITE / REACT 19
            </div>
          </div>

          {/* Right: Scroll to top command */}
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <span>[TOP]</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
