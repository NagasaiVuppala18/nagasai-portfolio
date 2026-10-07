import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Sparkles, ArrowRight, Bot, Database, Server, Code } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface HeroProps {
  onStartTour: () => void;
  onOpenPanda: (query?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTour, onOpenPanda }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const fullText = "Think Simple, Work Smarter.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background radial neon glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 cyber-grid opacity-75 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Command Center Text & Actions (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Telemetry Header Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>COMMAND CENTER // SECTOR 01</span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400">CORE SYSTEM: ACTIVE</span>
            </div>

            {/* Display Name & Formal Name */}
            <div>
              <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase mb-1">
                {PERSONAL_INFO.fullName}
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
                Nagasai <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Vuppala</span>
              </h1>
            </div>

            {/* Title / Role Specs */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-medium text-slate-200">
                Full-Stack Engineer <span className="text-cyan-400 font-mono">(MERN & Java Enterprise)</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 font-mono">
                <span className="text-blue-400 flex items-center gap-1">
                  <Cpu className="w-4 h-4 inline" /> AI/ML & Computer Vision Practitioner
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Server className="w-4 h-4 inline" /> Distributed Systems Architect
                </span>
              </div>
            </div>

            {/* Tagline Terminal Quote */}
            <div className="p-4 rounded-lg bg-[#0B0F19]/90 border border-cyan-500/25 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 group-hover:bg-cyan-300 transition-colors" />
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 mb-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>CORE DIRECTIVE // MOTTO</span>
              </div>
              <div className="text-lg sm:text-xl font-mono text-cyan-200 font-bold tracking-tight">
                &ldquo;{typedTitle}<span className="inline-block w-2.5 h-4 bg-cyan-400 ml-1 animate-pulse" />&rdquo;
              </div>
            </div>

            {/* Summary Bio */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Telemetry Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {PERSONAL_INFO.telemetry.map((chip, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700/70 text-xs font-mono text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                >
                  <span className="text-cyan-500 mr-1.5">›</span>
                  {chip}
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => {
                  soundFx.playTelemetry();
                  onStartTour();
                }}
                className="px-5 py-2.5 rounded bg-cyan-500 text-slate-950 font-mono text-sm font-bold tracking-wide hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 group cursor-pointer"
              >
                <span>[Launch Story Tour]</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundFx.playPandaChirp();
                  onOpenPanda();
                }}
                className="px-5 py-2.5 rounded bg-[#0B0F19] text-cyan-300 border border-cyan-400/50 font-mono text-sm font-bold tracking-wide hover:border-cyan-300 hover:bg-cyan-950/40 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>[Engage Panda AI]</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/40 p-2.5 rounded border border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-300 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Holographic Reactor Core Visualizer (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl p-6 hud-glass hud-glass-hover transition-all">
              
              {/* High-tech Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              {/* Top HUD Telemetry Line */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-cyan-300">CORE.TELEMETRY.NODE</span>
                </div>
                <div className="text-emerald-400 tabular-nums">SYNC: 100%</div>
              </div>

              {/* Orbital Reactor Visual in Canvas / SVG */}
              <div className="relative w-full h-[240px] sm:h-[260px] flex items-center justify-center my-4 overflow-hidden">
                
                {/* Concentric Rotating Radar Rings */}
                <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-400/30 animate-[spin_12s_linear_infinite_reverse]" />
                <div className="absolute w-32 h-32 rounded-full border border-emerald-500/30 animate-[spin_8s_linear_infinite]" />

                {/* Central Holographic Core Node */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-950 via-[#0B0F19] to-blue-950 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.5)]">
                  <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
                  <span className="font-mono text-[9px] text-cyan-400 font-bold mt-1">NV.SYS</span>
                </div>

                {/* Satellite Nodes */}
                <div className="absolute top-4 left-6 flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  <Database className="w-3 h-3 text-cyan-400" />
                  <span>MySQL / Mongo</span>
                </div>

                <div className="absolute bottom-6 left-6 flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  <Cpu className="w-3 h-3 text-emerald-400" />
                  <span>OpenCV / YOLO</span>
                </div>

                <div className="absolute top-8 right-6 flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded border border-blue-500/30 text-[10px] font-mono text-blue-300">
                  <Server className="w-3 h-3 text-blue-400" />
                  <span>Spring Boot</span>
                </div>

                <div className="absolute bottom-8 right-4 flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  <Code className="w-3 h-3 text-cyan-400" />
                  <span>React 19</span>
                </div>
              </div>

              {/* Bottom Telemetry Status Log */}
              <div className="bg-black/50 p-2.5 rounded border border-cyan-500/20 font-mono text-[10px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">OPERATIONAL ENVIRONMENT:</span>
                  <span className="text-cyan-300">LINUX / VITE / RUNTIME</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SYSTEM ARCHITECTURE:</span>
                  <span className="text-emerald-400">DISTRIBUTED & MODULAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DIGITAL TWIN STATUS:</span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Bot className="w-3 h-3" /> PANDA STANDBY
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
