import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChronoLog } from './components/ChronoLog';
import { ProjectMatrix } from './components/ProjectMatrix';
import { TechArsenal } from './components/TechArsenal';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PandaChatbot } from './components/PandaChatbot';
import { AutoPilotOverlay } from './components/AutoPilotOverlay';
import { Project } from './data/portfolioData';
import { soundFx } from './utils/audioFx';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPandaOpen, setIsPandaOpen] = useState<boolean>(false);
  const [pandaQuery, setPandaQuery] = useState<string | null>(null);

  // Auto-Pilot Cinematic Tour State
  const [isAutoPilot, setIsAutoPilot] = useState<boolean>(false);
  const [isAutoPilotPaused, setIsAutoPilotPaused] = useState<boolean>(false);
  const [isAutoPilotCompleted, setIsAutoPilotCompleted] = useState<boolean>(false);
  const [autoPilotStep, setAutoPilotStep] = useState<number>(0);

  const isProgrammaticScrollingRef = useRef<boolean>(false);
  const programmaticScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoPilotTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tourChapters = [
    { id: 'hero', name: 'Command Center // Core Telemetry' },
    { id: 'journey', name: 'Chrono-Log // Growth Trajectory' },
    { id: 'projects', name: 'Project Matrix // 6 Flagship Systems' },
    { id: 'tech-matrix', name: 'Technical Arsenal // Core Competencies' },
    { id: 'connect', name: 'Communication Relay // Transmit Directive' }
  ];

  // Helper to execute smooth scroll to a chapter with protection against false interaction pauses
  const scrollToChapter = useCallback((stepIndex: number) => {
    const chapter = tourChapters[stepIndex];
    if (!chapter) return;

    const targetElement = document.getElementById(chapter.id);
    if (targetElement) {
      // Mark as programmatic scroll so user wheel listeners don't immediately pause the tour
      isProgrammaticScrollingRef.current = true;
      if (programmaticScrollTimerRef.current) clearTimeout(programmaticScrollTimerRef.current);
      
      programmaticScrollTimerRef.current = setTimeout(() => {
        isProgrammaticScrollingRef.current = false;
      }, 1200);

      targetElement.scrollIntoView({ behavior: 'smooth' });
      soundFx.playTelemetry();
    }
  }, [tourChapters]);

  // Auto-Pilot Step Timer execution
  useEffect(() => {
    if (!isAutoPilot || isAutoPilotPaused || isAutoPilotCompleted) {
      if (autoPilotTimerRef.current) clearTimeout(autoPilotTimerRef.current);
      return;
    }

    // Scroll to the active step immediately
    scrollToChapter(autoPilotStep);

    // Schedule progression to next chapter after 8.5 seconds
    autoPilotTimerRef.current = setTimeout(() => {
      setAutoPilotStep((prev) => {
        const next = prev + 1;
        if (next >= tourChapters.length) {
          setIsAutoPilotCompleted(true);
          return prev;
        }
        return next;
      });
    }, 8500);

    return () => {
      if (autoPilotTimerRef.current) clearTimeout(autoPilotTimerRef.current);
    };
  }, [isAutoPilot, isAutoPilotPaused, isAutoPilotCompleted, autoPilotStep, scrollToChapter, tourChapters.length]);

  // Graceful pause on deliberate user manual scroll/gesture
  useEffect(() => {
    if (!isAutoPilot || isAutoPilotPaused || isAutoPilotCompleted) return;

    const handleUserInteraction = () => {
      // Ignore if browser is currently performing the programmatic smooth-scroll
      if (isProgrammaticScrollingRef.current) return;

      // Deliberate user interaction: pause tour without fighting user or slinging scroll
      setIsAutoPilotPaused(true);
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
    };
  }, [isAutoPilot, isAutoPilotPaused, isAutoPilotCompleted]);

  // Active section observer for Navbar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    const sectionIds = ['hero', 'journey', 'projects', 'tech-matrix', 'connect'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Controls Handlers
  const handleToggleAutoPilot = () => {
    if (!isAutoPilot || isAutoPilotCompleted) {
      setIsAutoPilot(true);
      setIsAutoPilotPaused(false);
      setIsAutoPilotCompleted(false);
      setAutoPilotStep(0);
    } else if (isAutoPilotPaused) {
      setIsAutoPilotPaused(false);
    } else {
      setIsAutoPilotPaused(true);
    }
  };

  const handleStartTourFromHero = () => {
    setIsAutoPilot(true);
    setIsAutoPilotPaused(false);
    setIsAutoPilotCompleted(false);
    setAutoPilotStep(1); // Proceed directly to Chapter 1: Chrono-Log
  };

  const handlePauseTour = () => {
    setIsAutoPilotPaused(true);
  };

  const handleResumeTour = () => {
    setIsAutoPilotPaused(false);
  };

  const handleNextChapter = () => {
    setAutoPilotStep((prev) => {
      const next = prev + 1;
      if (next >= tourChapters.length) {
        setIsAutoPilotCompleted(true);
        return prev;
      }
      return next;
    });
    setIsAutoPilotPaused(false);
  };

  const handlePrevChapter = () => {
    setAutoPilotStep((prev) => Math.max(0, prev - 1));
    setIsAutoPilotPaused(false);
  };

  const handleStopTour = () => {
    setIsAutoPilot(false);
    setIsAutoPilotPaused(false);
    setIsAutoPilotCompleted(false);
  };

  const handleRestartTour = () => {
    setIsAutoPilot(true);
    setIsAutoPilotPaused(false);
    setIsAutoPilotCompleted(false);
    setAutoPilotStep(0);
  };

  const handleAskPanda = (query: string) => {
    setPandaQuery(query);
    setIsPandaOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Subtle Scanlines effect overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-30 opacity-40" />

      {/* Sci-Fi HUD Header */}
      <Navbar
        isAutoPilot={isAutoPilot}
        isAutoPilotPaused={isAutoPilotPaused}
        onToggleAutoPilot={handleToggleAutoPilot}
        activeSection={activeSection}
      />

      {/* Main Structural Modules */}
      <main>
        {/* Module A: Command Center Hero */}
        <Hero
          onStartTour={handleStartTourFromHero}
          onOpenPanda={() => {
            setIsPandaOpen(true);
          }}
        />

        {/* Module B: Narrative Journey (Chrono-Log) */}
        <ChronoLog onAskPanda={handleAskPanda} />

        {/* Module C: Interactive Project Matrix */}
        <ProjectMatrix
          onSelectProject={(project) => setSelectedProject(project)}
          onAskPanda={handleAskPanda}
        />

        {/* Module D: Technical Arsenal & Skill Nodes */}
        <TechArsenal onAskPanda={handleAskPanda} />

        {/* Module E: Communication Relay / Let's Connect */}
        <ConnectSection />
      </main>

      {/* Sci-Fi HUD Footer */}
      <Footer />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onAskPanda={handleAskPanda}
      />

      {/* Auto-Pilot Active Tour HUD Overlay with Full Controls */}
      <AutoPilotOverlay
        isActive={isAutoPilot}
        isPaused={isAutoPilotPaused}
        isCompleted={isAutoPilotCompleted}
        currentStepIndex={autoPilotStep}
        totalSteps={tourChapters.length}
        currentStepName={tourChapters[autoPilotStep]?.name || ''}
        onPause={handlePauseTour}
        onResume={handleResumeTour}
        onNext={handleNextChapter}
        onPrev={handlePrevChapter}
        onStop={handleStopTour}
        onRestart={handleRestartTour}
      />

      {/* Panda AI Digital Twin Chatbot (Persistent Bottom-Right HUD Overlay) */}
      <PandaChatbot
        isOpen={isPandaOpen}
        onToggle={() => setIsPandaOpen(!isPandaOpen)}
        externalQuery={pandaQuery}
        onClearExternalQuery={() => setPandaQuery(null)}
      />

    </div>
  );
}
