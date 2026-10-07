import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, MessageSquare, ChevronDown, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { PANDA_KNOWLEDGE_BASE, PERSONAL_INFO, PROJECTS, SKILL_NODES, TIMELINE_PHASES } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

interface Message {
  id: string;
  sender: 'panda' | 'user';
  text: string;
  timestamp: string;
}

interface PandaChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  externalQuery?: string | null;
  onClearExternalQuery?: () => void;
}

export const PandaChatbot: React.FC<PandaChatbotProps> = ({
  isOpen,
  onToggle,
  externalQuery,
  onClearExternalQuery
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'panda',
      text: "Hey! I'm Panda, Nagasai's AI Digital Twin. 🐼⚡ Ask me about how we tackled YOLO dynamic traffic zoning, Spring Boot CORS & audio streaming, or how we 'think simple and work smarter'!",
      timestamp: 'NOW'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Explain Music App Architecture",
    "Why use Zone-based Traffic AI?",
    "What databases does he work with?",
    "What is Nagasai's philosophy?",
    "How does he handle Spring Boot streaming?",
    "Tell me about his journey from C to AI"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle queries passed from external buttons like "[Ask Panda to explain this project]"
  useEffect(() => {
    if (externalQuery && externalQuery.trim() !== '') {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) {
        onClearExternalQuery();
      }
    }
  }, [externalQuery]);

  const generatePandaResponse = (input: string): string => {
    const lower = input.toLowerCase();

    // Check specific knowledge triggers
    for (const item of PANDA_KNOWLEDGE_BASE) {
      if (item.triggers.some(t => lower.includes(t.toLowerCase()))) {
        return item.response;
      }
    }

    // Check if asking about a specific project
    for (const p of PROJECTS) {
      if (lower.includes(p.title.toLowerCase()) || lower.includes(p.id.toLowerCase())) {
        return `Regarding ${p.title}: Nagasai engineered this using ${p.techStack.join(', ')}. The key breakthrough was: ${p.keyInnovations[0]}. ${p.solution}`;
      }
    }

    // Check if asking about skills
    for (const s of SKILL_NODES) {
      if (lower.includes(s.name.toLowerCase())) {
        return `${s.name} is part of Nagasai's core tech stack. In architecture, he applies it for: ${s.architectureContext}. In particular: ${s.highlight}.`;
      }
    }

    // Default conversational AI fallback in Panda persona
    return `Great question! As Nagasai's digital twin, I focus on building systems that 'Think Simple, Work Smarter.' Nagasai has deep expertise across Java Enterprise (Spring Boot, Tomcat, ACID transactions), the modern MERN stack, edge computer vision (OpenCV, YOLOv3-tiny), and scalable distributed REST microservices. What specific architecture or project would you like me to dive deeper into?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    soundFx.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generatePandaResponse(text);
      const pandaMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'panda',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, pandaMsg]);
      setIsTyping(false);
      soundFx.playPandaChirp();
    }, 600);
  };

  return (
    <>
      {/* Persistent Floating Widget Badge (Always visible on bottom right) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              soundFx.playPandaChirp();
              onToggle();
            }}
            className="group flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0B0F19]/90 border border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-md"
            aria-label="Engage Panda AI Digital Twin"
          >
            {/* Cyber Panda Avatar Hologram */}
            <div className="relative w-9 h-9 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center overflow-hidden">
              <span className="text-lg">🐼</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-ping" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
            </div>

            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                <span>Panda AI</span>
                <span className="text-[10px] text-emerald-400 px-1 py-0.2 rounded bg-emerald-950/60 border border-emerald-500/40">
                  ONLINE
                </span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                Nagasai's Digital Twin
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Floating HUD Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[550px] max-h-[85vh] rounded-2xl bg-[#070B14]/95 border border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.3)] flex flex-col overflow-hidden backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#0C1222] to-[#080E1C] border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center">
                <span className="text-base">🐼</span>
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold font-mono text-white flex items-center gap-1">
                  <span>Panda // Digital Twin</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-cyan-300">
                  Autonomous Knowledge Agent
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMessages([
                    {
                      id: '1',
                      sender: 'panda',
                      text: "Chat telemetry cleared! What would you like to explore next about Nagasai's architectures?",
                      timestamp: 'NOW'
                    }
                  ]);
                }}
                className="p-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggle();
                }}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Minimize Panda HUD"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#050810] border-b border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/25 text-[10px] font-mono text-cyan-300 whitespace-nowrap hover:border-cyan-400 hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs text-left">
            {messages.map((msg) => {
              const isPanda = msg.sender === 'panda';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isPanda ? 'justify-start' : 'justify-end'}`}
                >
                  {isPanda && (
                    <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xs">🐼</span>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      isPanda
                        ? 'bg-slate-900/90 border border-cyan-500/25 text-slate-200'
                        : 'bg-cyan-500 text-slate-950 font-medium'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        isPanda ? 'text-slate-500' : 'text-slate-800'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0">
                  <span className="text-xs">🐼</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-cyan-400 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-400 ml-1">Panda is formulating...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0A0E1A] border-t border-cyan-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Panda about Nagasai's code, systems..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-[#04060C] border border-slate-700 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40 cursor-pointer"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
