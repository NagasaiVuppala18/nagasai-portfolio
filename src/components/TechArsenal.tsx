import React, { useState } from 'react';
import { Cpu, Terminal, Database, Code2, Server, CheckCircle2 } from 'lucide-react';
import { SKILL_NODES, SkillNode } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface TechArsenalProps {
  onAskPanda: (query: string) => void;
}

export const TechArsenal: React.FC<TechArsenalProps> = ({ onAskPanda }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const categories = [
    'All',
    'Languages',
    'Frameworks & Engines',
    'Databases & Tools'
  ];

  const filteredNodes = activeCategory === 'All'
    ? SKILL_NODES
    : SKILL_NODES.filter((n) => n.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Languages': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'Frameworks & Engines': return <Server className="w-4 h-4 text-blue-400" />;
      case 'Databases & Tools': return <Database className="w-4 h-4 text-emerald-400" />;
      default: return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="tech-matrix" className="py-24 relative overflow-hidden bg-[#05070D]">
      {/* Background Neon Halo */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL ARSENAL // 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Skill Nodes & Technical Matrix <span className="text-cyan-400 font-mono text-xl sm:text-2xl font-normal block sm:inline sm:ml-2">[Core Competencies]</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Core technologies, frameworks, and tools applied across production architectures and distributed systems.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Cards Grid (Clean presentation showing know-how without percentages or proficiency rankings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNodes.map((node) => {
            return (
              <div
                key={node.name}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
                className="p-5 rounded-xl border bg-[#0B0F19]/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-200 cursor-pointer relative group flex flex-col justify-between"
              >
                <div>
                  {/* Header: Name & Verified Stack Tag */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-slate-900 border border-slate-700">
                        {getCategoryIcon(node.category)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                          {node.name}
                        </h3>
                        <div className="text-[10px] font-mono text-slate-400">
                          {node.category}
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>IN STACK</span>
                    </span>
                  </div>

                  {/* Highlights / Features */}
                  <div className="space-y-2 text-xs pt-1">
                    <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                      {node.highlight}
                    </p>
                    <p className="text-slate-400 text-[11px] italic leading-normal border-t border-slate-800/80 pt-2">
                      {node.architectureContext}
                    </p>
                  </div>
                </div>

                {/* Subtle inspect prompt on hover */}
                <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>CLICK TO INSPECT NODE</span>
                  <span>›</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Detail Callout */}
        {selectedNode && (
          <div className="mt-8 p-4 sm:p-5 rounded-xl bg-[#0B0F19] border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <div className="font-mono text-xs text-cyan-400 flex items-center gap-2">
                <span>ACTIVE NODE INSPECTION: {selectedNode.name}</span>
                <span>·</span>
                <span className="text-emerald-400">VERIFIED ARCHITECTURE COMPONENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                Architectural application: {selectedNode.architectureContext} ({selectedNode.highlight})
              </p>
            </div>
            <button
              onClick={() => {
                soundFx.playPandaChirp();
                onAskPanda(`Hey Panda, how does Nagasai apply ${selectedNode.name} in his projects and system architectures?`);
              }}
              className="px-4 py-2 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-900/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              [Ask Panda about {selectedNode.name}]
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
