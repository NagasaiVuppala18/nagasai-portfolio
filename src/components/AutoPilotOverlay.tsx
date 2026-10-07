import React from 'react';
import { Pause, Play, Compass, X, SkipForward, SkipBack, RotateCcw, CheckCircle } from 'lucide-react';
import { soundFx } from '../utils/audioFx';

interface AutoPilotOverlayProps {
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  currentStepIndex: number;
  totalSteps: number;
  currentStepName: string;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onPrev: () => void;
  onStop: () => void;
  onRestart: () => void;
}

export const AutoPilotOverlay: React.FC<AutoPilotOverlayProps> = ({
  isActive,
  isPaused,
  isCompleted,
  currentStepIndex,
  totalSteps,
  currentStepName,
  onPause,
  onResume,
  onNext,
  onPrev,
  onStop,
  onRestart
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className={`p-3 sm:px-4 sm:py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center gap-3 sm:gap-4 ${
        isCompleted
          ? 'bg-[#050E17]/95 border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
          : isPaused
            ? 'bg-[#0E0F14]/95 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
            : 'bg-[#060B18]/95 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.35)]'
      }`}>
        
        {/* Status Radar Icon */}
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
          isCompleted
            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-400'
            : isPaused
              ? 'bg-amber-950/80 border-amber-400 text-amber-400'
              : 'bg-cyan-950/80 border-cyan-400 text-cyan-400'
        }`}>
          {isCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Compass className={`w-4 h-4 ${!isPaused ? 'animate-[spin_6s_linear_infinite]' : ''}`} />
          )}
        </div>

        {/* Telemetry Readout */}
        <div className="text-left font-mono min-w-0 pr-1">
          <div className="flex items-center gap-2 text-[10px] font-bold">
            {isCompleted ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                TOUR COMPLETE
              </span>
            ) : isPaused ? (
              <span className="text-amber-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                AUTO-PILOT PAUSED
              </span>
            ) : (
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                AUTO-PILOT ACTIVE
              </span>
            )}
            <span className="text-slate-400 font-normal">
              ({Math.min(currentStepIndex + 1, totalSteps)}/{totalSteps})
            </span>
          </div>
          
          <div className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[210px] mt-0.5">
            {isCompleted ? 'Transmission Ready · Connect Below' : currentStepName}
          </div>
        </div>

        {/* Controls Cluster */}
        <div className="flex items-center gap-1.5 shrink-0 border-l border-slate-700/60 pl-2 sm:pl-3">
          {isCompleted ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onRestart();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-emerald-950/70 border border-emerald-400 text-emerald-300 hover:bg-emerald-900 font-mono text-[11px] font-bold cursor-pointer transition-colors"
              title="Replay cinematic tour from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onResume();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-amber-500 text-slate-950 hover:bg-amber-400 font-mono text-[11px] font-bold cursor-pointer transition-colors"
              title="Resume automatic tour glide"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Resume</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onPause();
              }}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 cursor-pointer transition-colors"
              title="Pause automatic tour glide"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Previous Chapter */}
          {!isCompleted && currentStepIndex > 0 && (
            <button
              onClick={() => {
                soundFx.playClick();
                onPrev();
              }}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 cursor-pointer transition-colors hidden sm:flex"
              title="Previous Chapter"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Next Chapter */}
          {!isCompleted && currentStepIndex < totalSteps - 1 && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNext();
              }}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 cursor-pointer transition-colors hidden sm:flex"
              title="Next Chapter"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Exit / Dismiss */}
          <button
            onClick={() => {
              soundFx.playClick();
              onStop();
            }}
            className="p-1.5 rounded bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/50 cursor-pointer transition-colors"
            title="Exit Auto-Pilot"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
