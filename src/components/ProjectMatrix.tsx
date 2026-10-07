import React, { useState } from 'react';
import { Layers, ArrowUpRight, Cpu, Bot, Music, BookOpen, Car, ShoppingBag, Eye, Flower2 } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface ProjectMatrixProps {
  onSelectProject: (project: Project) => void;
  onAskPanda: (query: string) => void;
}

export const ProjectMatrix: React.FC<ProjectMatrixProps> = ({ onSelectProject, onAskPanda }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'AI/ML', 'Enterprise'];

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'music-listener': return <Music className="w-5 h-5 text-cyan-400" />;
      case 'book-review-system': return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'smart-traffic-system': return <Car className="w-5 h-5 text-emerald-400" />;
      case 'tech-store-ecommerce': return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      case 'iris-classification-ml': return <Flower2 className="w-5 h-5 text-emerald-400" />;
      case 'digital-pencil-sketch': return <Eye className="w-5 h-5 text-cyan-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#05070D]">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURAL MATRIX // 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Interactive Project Matrix <span className="text-cyan-400 font-mono text-xl sm:text-2xl font-normal block sm:inline sm:ml-2">[6 Systems]</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Production architectures engineered with strict separation of concerns, high throughput, and mathematical efficiency.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setFilter(cat);
                  }}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)] font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat === 'All' ? 'All Systems' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="hud-glass hud-glass-hover rounded-xl p-6 flex flex-col justify-between transition-all duration-300 relative group"
            >
              {/* Corner Bracket Accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Top Card Bar: Category & Icon */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-slate-900 border border-cyan-500/30">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="font-mono text-[11px] text-cyan-400 font-semibold tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {project.id.slice(0, 8)}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Problem & Solution Preview */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Architecture Highlights Pill-Free Tokens */}
                <div className="space-y-1.5 py-3 border-y border-slate-800/80 mb-4 font-mono text-[11px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    Pipeline Architecture
                  </div>
                  <div className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    {project.architectureNodes.map((node, i) => (
                      <span key={i} className="text-slate-300">
                        {node.role}
                        {i < project.architectureNodes.length - 1 && (
                          <span className="text-cyan-400 mx-1">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-2 rounded border border-slate-800 font-mono">
                      <div className="text-[9px] text-slate-400">{m.label}</div>
                      <div className="text-xs font-bold text-cyan-300 tabular-nums">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onSelectProject(project);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-900/60 hover:border-cyan-400 transition-colors cursor-pointer"
                >
                  <span>[Inspect Architecture]</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playPandaChirp();
                    onAskPanda(`Hey Panda, can you break down the architectural decisions behind ${project.title}?`);
                  }}
                  title="Ask Panda about this project"
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
