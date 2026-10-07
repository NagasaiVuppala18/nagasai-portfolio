import React, { useState } from 'react';
import { GitCommit, Code2, Bot, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TIMELINE_PHASES } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface ChronoLogProps {
  onAskPanda: (topic: string) => void;
}

export const ChronoLog: React.FC<ChronoLogProps> = ({ onAskPanda }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#05070D]">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            <span>NARRATIVE FLIGHT LOG // 01</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            The Chrono-Log <span className="text-cyan-400 font-mono text-xl sm:text-2xl font-normal block sm:inline sm:ml-2">[Growth Trajectory]</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            A vertical architectural evolution from low-level memory allocations to multi-tier enterprise systems and edge neural vision.
          </p>
        </div>

        {/* Phase Selector Stepper for Quick Jump */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10">
          {TIMELINE_PHASES.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={phase.phase}
                onClick={() => {
                  soundFx.playClick();
                  setActivePhaseIndex(idx);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-[#0B0F19]/60 border-slate-800 text-slate-400 hover:border-cyan-500/30 hover:text-slate-200'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                    PHASE {phase.phase}
                  </span>
                  <span className="text-[10px] text-slate-500">{phase.era}</span>
                </div>
                <div className="text-xs font-semibold truncate text-slate-200">
                  {phase.codename}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Deep Dive Display */}
        {(() => {
          const current = TIMELINE_PHASES[activePhaseIndex];
          return (
            <div className="hud-glass rounded-2xl p-6 sm:p-8 relative">
              {/* Corner High-tech Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Story & Key Breakthrough (lg:col-span-7) */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                      PHASE {current.phase} // {current.codename}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">
                      Era: {current.era}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  {/* Core Breakthrough Callout */}
                  <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/20 space-y-1.5">
                    <div className="text-[11px] font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ARCHITECTURAL BREAKTHROUGH</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {current.coreBreakthrough}
                    </p>
                  </div>

                  {/* Tech Stack Unboxed Tokens */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Mastered Technologies in this Era
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action: Ask Panda about this phase */}
                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => {
                        soundFx.playPandaChirp();
                        onAskPanda(`Tell me more about Nagasai's Phase ${current.phase}: ${current.codename} and what challenges he overcame.`);
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs hover:border-cyan-300 hover:bg-cyan-900/40 transition-all cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      <span>[Ask Panda about Phase {current.phase}]</span>
                    </button>
                    <span className="text-xs font-mono text-slate-500 italic">
                      Takeaway: {current.takeaway}
                    </span>
                  </div>

                </div>

                {/* Right Side: Code Artifact & Engineering Invariants (lg:col-span-5) */}
                <div className="lg:col-span-5 w-full">
                  <div className="rounded-xl bg-[#030508] border border-cyan-500/25 overflow-hidden font-mono text-xs shadow-2xl">
                    {/* Terminal Window Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A0E17] border-b border-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[11px] text-slate-400 ml-2 font-mono">
                          artifact_{current.phase.toLowerCase()}_{current.snippetLang}.{current.snippetLang}
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-400 uppercase">SYNTAX: {current.snippetLang}</span>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                      <pre>
                        <code>{current.codeSnippet}</code>
                      </pre>
                    </div>

                    {/* Terminal Footer */}
                    <div className="px-4 py-2 bg-[#0A0E17]/80 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
                      <span>VERIFIED ARTIFACT</span>
                      <span className="text-emerald-400">STATUS: COMPILED</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
