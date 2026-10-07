import React, { useState } from 'react';
import { X, Bot, ArrowRight, Sparkles, Activity, Layers, Play, Pause, RefreshCw, CheckCircle, Database } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onAskPanda: (query: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onAskPanda }) => {
  if (!project) return null;

  // Interactive Simulator States
  // 1. Traffic Simulator state
  const [trafficVehicles, setTrafficVehicles] = useState(24);
  const calculatedGreen = Math.min(75, Math.max(15, Math.round(trafficVehicles * 2.8)));

  // 2. Iris Simulator state
  const [sepalLength, setSepalLength] = useState(5.8);
  const [petalLength, setPetalLength] = useState(4.2);
  const predictedSpecies = petalLength < 2.5 ? "Iris Setosa (100% conf)" : petalLength < 4.8 ? "Iris Versicolor (96.4% conf)" : "Iris Virginica (98.1% conf)";

  // 3. Audio Simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioFreq, setAudioFreq] = useState(440);
  const [audioFrame, setAudioFrame] = useState(0);

  React.useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioFrame((prev) => prev + 1);
    }, 80);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // 4. Sketch transform stage state
  const [sketchStage, setSketchStage] = useState<'rgb' | 'gray' | 'invert' | 'blur' | 'dodge'>('dodge');

  // 5. ACID Transaction Simulator
  const [txStep, setTxStep] = useState<number>(0);
  const [txStatus, setTxStatus] = useState<string>('IDLE');

  const runAcidTx = () => {
    soundFx.playTelemetry();
    setTxStatus('ACQUIRING CONNECTION & ISOLATION LOCK...');
    setTxStep(1);
    setTimeout(() => {
      setTxStatus('VERIFYING INVENTORY (SELECT FOR UPDATE)...');
      setTxStep(2);
      setTimeout(() => {
        setTxStatus('ATOMIC DEDUCTION & ORDER INSERTION...');
        setTxStep(3);
        setTimeout(() => {
          setTxStatus('COMMIT SUCCESSFUL // 0 RACE CONDITIONS');
          setTxStep(4);
          soundFx.playTransmitSuccess();
        }, 500);
      }, 500);
    }, 500);
  };

  const toggleAudioSim = () => {
    soundFx.playClick();
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      soundFx.playTelemetry();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#070B14] border border-cyan-500/40 rounded-2xl shadow-2xl p-5 sm:p-8 text-left my-8">
        
        {/* Corner Neon Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">
              <span>PROJECT SPECIFICATION // {project.category.toUpperCase()}</span>
              <span>·</span>
              <span className="text-emerald-400">STATUS: VERIFIED</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-cyan-300/80 mt-0.5">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          
          {/* Problem & Solution Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/25">
              <div className="font-mono text-xs text-red-400 font-bold mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>ARCHITECTURAL BOTTLENECK (PROBLEM)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25">
              <div className="font-mono text-xs text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>ARCHITECTURAL RESOLUTION (SOLUTION)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Flow Pipeline Visualization */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0A0F1D] border border-cyan-500/30">
            <div className="font-mono text-xs text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>END-TO-END DATA & ARCHITECTURE PIPELINE</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.architectureNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20 relative group hover:border-cyan-400/50 transition-colors"
                >
                  <div className="font-mono text-[10px] text-cyan-400 font-bold mb-1">
                    {node.step}
                  </div>
                  <div className="text-xs font-semibold text-white mb-1">
                    {node.role}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {node.detail}
                  </p>
                  {idx < project.architectureNodes.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-500/60">
                      ›
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Innovations */}
          <div>
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Key Architectural Innovations & Invariants</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyInnovations.map((inno, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="text-cyan-400 font-mono mt-0.5 font-bold">›</span>
                  <span>{inno}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Project Telemetry & Simulator Sandbox */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#0A0F1D] to-[#060A14] border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs text-cyan-400 font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>INTERACTIVE ARCHITECTURE SANDBOX</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">REAL-TIME TELEMETRY</span>
            </div>

            {/* Sub-Interactive Sandbox based on project type */}
            {project.demoType === 'traffic' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  Simulate real-time vehicle load in a quadrant intersection to observe how YOLOv3-tiny dynamic green signal window calculates:
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-2/3">
                    <label className="text-xs font-mono text-slate-400 flex justify-between mb-1">
                      <span>Detected Vehicles in Queue:</span>
                      <span className="text-cyan-300 font-bold">{trafficVehicles} units</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="35"
                      value={trafficVehicles}
                      onChange={(e) => setTrafficVehicles(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                  <div className="w-full sm:w-1/3 p-3 rounded bg-slate-900 border border-cyan-500/30 text-center font-mono">
                    <div className="text-[10px] text-slate-400">CALCULATED GREEN DURATION</div>
                    <div className="text-xl font-bold text-emerald-400">{calculatedGreen}s</div>
                    <div className="text-[10px] text-cyan-400">Dynamic Scaling: 15s - 75s</div>
                  </div>
                </div>
              </div>
            )}

            {project.demoType === 'iris' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  Tweak flower biometric features to test Scikit-Learn multi-class classification boundaries in real time:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 flex justify-between mb-1">
                      <span>Sepal Length:</span>
                      <span className="text-cyan-300">{sepalLength} cm</span>
                    </label>
                    <input
                      type="range"
                      min="4.0"
                      max="8.0"
                      step="0.1"
                      value={sepalLength}
                      onChange={(e) => setSepalLength(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 flex justify-between mb-1">
                      <span>Petal Length:</span>
                      <span className="text-cyan-300">{petalLength} cm</span>
                    </label>
                    <input
                      type="range"
                      min="1.0"
                      max="7.0"
                      step="0.1"
                      value={petalLength}
                      onChange={(e) => setPetalLength(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="p-3 rounded bg-slate-900 border border-emerald-500/40 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">PREDICTED SPECIES:</span>
                  <span className="text-emerald-300 font-bold">{predictedSpecies}</span>
                </div>
              </div>
            )}

            {project.demoType === 'audio' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="text-slate-300">
                  HTTP 206 Partial Content byte streaming simulation. Toggle player to render real-time frequency oscillations:
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAudioSim}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? "HALT STREAM" : "START STREAM"}</span>
                  </button>
                  <span className="text-cyan-400">
                    {isPlayingAudio ? "STREAMING BYTES: 206 PARTIAL CONTENT [OK]" : "STREAM IDLE"}
                  </span>
                </div>
                {/* Visualizer frequency bars */}
                <div className="h-10 bg-slate-950 rounded p-2 flex items-end justify-between gap-1 border border-cyan-500/20">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const dynamicHeight = isPlayingAudio
                      ? Math.min(100, Math.max(15, Math.round(
                          (Math.sin((i * 0.45) + (audioFrame * 0.4)) * 0.35 +
                           Math.cos((i * 0.7) - (audioFrame * 0.25)) * 0.35 +
                           0.5) * 100
                        )))
                      : 12;
                    return (
                      <div
                        key={i}
                        className="w-full bg-cyan-400 rounded-t transition-all duration-75"
                        style={{
                          height: `${dynamicHeight}%`,
                          opacity: isPlayingAudio ? 0.9 : 0.3
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {project.demoType === 'sketch' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="text-slate-300">
                  Select image transform stage to inspect mathematical linear algebra step:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['rgb', 'gray', 'invert', 'blur', 'dodge'] as const).map((stage) => (
                    <button
                      key={stage}
                      onClick={() => {
                        soundFx.playClick();
                        setSketchStage(stage);
                      }}
                      className={`px-2.5 py-1 rounded uppercase text-[11px] font-mono cursor-pointer transition-colors ${
                        sketchStage === stage
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded bg-slate-900 border border-cyan-500/30 text-slate-300">
                  {sketchStage === 'rgb' && "STAGE 1: 3-channel RGB raster frame (HxWx3)."}
                  {sketchStage === 'gray' && "STAGE 2: cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY) -> Luminance vector."}
                  {sketchStage === 'invert' && "STAGE 3: cv2.bitwise_not(gray) -> 255 - pixel_val."}
                  {sketchStage === 'blur' && "STAGE 4: cv2.GaussianBlur(inverted, (21,21), sigmaX=0, sigmaY=0)."}
                  {sketchStage === 'dodge' && "STAGE 5: cv2.divide(gray, 255 - blur, scale=256.0) -> Finished Pencil Sketch!"}
                </div>
              </div>
            )}

            {project.demoType === 'ecommerce' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="text-slate-300">
                  Simulate concurrent database transaction with ACID isolation & rollback safeguard:
                </div>
                <button
                  onClick={runAcidTx}
                  className="px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 cursor-pointer flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>TRIGGER ATOMIC CHECKOUT TRANSACTION</span>
                </button>
                <div className="p-2.5 rounded bg-slate-900 border border-cyan-500/30 text-emerald-300">
                  TRANSACTION STATE: {txStatus}
                </div>
              </div>
            )}

            {project.demoType === 'book' && (
              <div className="space-y-2 font-mono text-xs text-slate-300">
                <p>
                  Mongoose Aggregation Pipeline Model: <code className="text-cyan-300">Book.aggregate([ {`{$match}`}, {`{$lookup: from: "reviews"}`}, {`{$project: weightedRating}`} ])</code>
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300">
                  Average Query Cost: 4.1ms | Max Document Growth: 0 bytes (Normalized ObjectIds)
                </div>
              </div>
            )}

          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <span className="font-mono text-xs text-slate-500 mr-2">TECH STACK:</span>
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              soundFx.playPandaChirp();
              onClose();
              onAskPanda(`Can you explain the architecture and key challenges of the "${project.title}" that Nagasai built?`);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-900/60 transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>[Ask Panda to explain this project]</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded bg-slate-900 text-slate-300 font-mono text-xs border border-slate-700 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
          >
            Close Terminal
          </button>
        </div>

      </div>
    </div>
  );
};
