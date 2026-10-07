import React, { useState, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Play, Pause, Menu, X, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface NavbarProps {
  isAutoPilot: boolean;
  isAutoPilotPaused?: boolean;
  onToggleAutoPilot: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAutoPilot,
  isAutoPilotPaused = false,
  onToggleAutoPilot,
  activeSection
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundFx.setMuted(nextState);
    if (!nextState) soundFx.playClick();
  };

  const navItems = [
    { label: "01. Journey", target: "#journey", id: "journey" },
    { label: "02. Projects", target: "#projects", id: "projects" },
    { label: "03. Tech Matrix", target: "#tech-matrix", id: "tech-matrix" },
    { label: "04. Connect", target: "#connect", id: "connect" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    soundFx.playClick();
    setMobileMenuOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070D]/90 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-lg shadow-cyan-950/20'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Zone: High-tech Call Sign & Pulsating Status */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:border-cyan-300 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-xs tracking-wider text-cyan-400 font-bold block glow-cyan">
                {PERSONAL_INFO.callsign}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>STATUS: READY TO DEPLOY</span>
              </div>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`font-mono text-xs tracking-wider px-2 py-1 transition-all ${
                  isActive
                    ? 'text-cyan-300 border-b-2 border-cyan-400 glow-cyan'
                    : 'text-slate-400 hover:text-cyan-200 hover:border-b-2 hover:border-cyan-500/50'
                }`}
              >
                [{item.label}]
              </a>
            );
          })}
        </nav>

        {/* Right Zone: Auto-Pilot Tour Toggle + Sound FX Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auto-Pilot Floating Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleAutoPilot();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono font-medium transition-all ${
              isAutoPilot
                ? isAutoPilotPaused
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] animate-pulse'
                : 'bg-slate-900/80 text-slate-400 border-slate-700/80 hover:text-slate-200 hover:border-cyan-500/40'
            }`}
            title="Automatically glide through all portfolio chapters"
          >
            {isAutoPilot ? (
              isAutoPilotPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span className="hidden sm:inline">Auto-Pilot: PAUSED</span>
                  <span className="sm:hidden">Paused</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Auto-Pilot: ON</span>
                  <span className="sm:hidden">Auto</span>
                </>
              )
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Auto-Pilot: OFF</span>
                <span className="sm:hidden">Auto</span>
              </>
            )}
          </button>

          {/* Sound Synthesizer Mute Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute sci-fi audio effects" : "Mute audio effects"}
            className="p-1.5 rounded border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            title={isMuted ? "Sound FX: Muted" : "Sound FX: Active"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 rounded border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#05070D]/95 backdrop-blur-xl border-b border-cyan-500/30 px-6 py-5 mt-2 space-y-3">
          <div className="font-mono text-[11px] text-cyan-400/80 pb-2 border-b border-slate-800">
            // TELEMETRY NAVIGATION SECTORS
          </div>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="block font-mono text-sm text-slate-300 hover:text-cyan-300 py-1.5"
            >
              [{item.label}]
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleAutoPilot();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-cyan-500/40 rounded bg-cyan-950/40 text-cyan-300 font-mono text-xs"
            >
              {isAutoPilot ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              Toggle Auto-Pilot Cinematic Mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
