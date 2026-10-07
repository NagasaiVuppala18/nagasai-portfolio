import React, { useState } from 'react';
import { Send, Terminal, Mail, Github, Linkedin, ShieldCheck, CheckCircle2, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioFx';

export const ConnectSection: React.FC = () => {
  const [formData, setFormData] = useState({
    callsign: '',
    email: '',
    directive: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [packetHash, setPacketHash] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.callsign || !formData.email || !formData.directive) return;

    soundFx.playTelemetry();
    setIsTransmitting(true);

    // Simulate futuristic cryptographic transmission
    setTimeout(() => {
      const generatedHash = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setPacketHash(generatedHash);
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      soundFx.playTransmitSuccess();
    }, 1200);
  };

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="connect" className="py-24 relative overflow-hidden bg-[#05070D]">
      {/* Background Neon Accents */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>COMMUNICATION RELAY // 04</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Transmit Directive <span className="text-cyan-400 font-mono text-xl sm:text-2xl font-normal block sm:inline sm:ml-2">[Let's Connect]</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono">
            &ldquo;{PERSONAL_INFO.tagline}&rdquo; Available for high-impact full-stack engineering, distributed systems, and intelligent applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Contact Terminal / Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="hud-glass rounded-2xl p-6 sm:p-8 relative">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/20 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-semibold">COMMUNICATION_RELAY_TERMINAL</span>
                </div>
                <span className="text-emerald-400">PROTOCOL: DIRECT_DISPATCH</span>
              </div>

              {transmissionSuccess ? (
                /* Success State Animation */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Directive Transmitted Successfully!
                  </h3>
                  <div className="p-3 bg-slate-900/90 rounded border border-emerald-500/30 max-w-md mx-auto text-xs font-mono text-slate-300 space-y-1">
                    <div className="text-emerald-400 font-bold">TRANSMISSION PACKET DISPATCHED</div>
                    <div className="text-[11px] text-slate-400">HASH: <span className="text-cyan-300">{packetHash}</span></div>
                    <div className="text-[10px] text-slate-500">RECIPIENT: vuppalanagasai5@gmail.com</div>
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Nagasai has received your transmission handshake and will process your inquiry promptly.
                  </p>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setTransmissionSuccess(false);
                      setFormData({ callsign: '', email: '', directive: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-900 cursor-pointer"
                  >
                    [Transmit Another Directive]
                  </button>
                </div>
              ) : (
                /* Active Terminal Input Form */
                <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 flex justify-between">
                      <span>[Full Name / Callsign]</span>
                      <span className="text-slate-500">REQUIRED</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commander Sarah Chen / CTO"
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-[#04060B] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 flex justify-between">
                      <span>[Return Address / Email]</span>
                      <span className="text-slate-500">SECURE HANDSHAKE</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@systems.domain"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-[#04060B] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5 flex justify-between">
                      <span>[Directive / Collaboration Inquiry]</span>
                      <span className="text-slate-500">MESSAGE PAYLOAD</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe architectural challenges, roles, or project specifications..."
                      value={formData.directive}
                      onChange={(e) => setFormData({ ...formData, directive: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-[#04060B] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isTransmitting}
                      className="w-full py-3 px-4 rounded bg-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50 cursor-pointer"
                    >
                      {isTransmitting ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                          <span>ENCRYPTING & DISPATCHING PACKET...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>[Transmit Message Directive]</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Channels & Social Hub (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Badge with Copy Button */}
            <div className="p-5 rounded-xl bg-[#0B0F19] border border-cyan-500/20 text-left">
              <div className="font-mono text-xs text-slate-400 mb-1">PRIMARY DIRECT CHANNEL</div>
              <div className="text-sm font-bold font-mono text-cyan-300 break-all mb-3">
                {PERSONAL_INFO.email}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "COPIED" : "COPY ADDRESS"}</span>
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-950 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-900 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>MAILTO DIRECT</span>
                </a>
              </div>
            </div>

            {/* Social Link Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded bg-slate-900 border border-slate-700 group-hover:border-cyan-400 text-cyan-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">LinkedIn</div>
                  <div className="text-[10px] text-slate-400 font-mono">Professional Network</div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded bg-slate-900 border border-slate-700 group-hover:border-cyan-400 text-cyan-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">GitHub</div>
                  <div className="text-[10px] text-slate-400 font-mono">Source Repositories</div>
                </div>
              </a>
            </div>

            {/* Core Invariant & Location Tag */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 font-mono text-xs text-slate-400 space-y-2">
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-slate-200">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY:</span>
                <span className="text-emerald-400 font-bold">READY TO DEPLOY</span>
              </div>
              <div className="flex justify-between">
                <span>ENGINEERING MOTTO:</span>
                <span className="text-cyan-300">Think Simple, Work Smarter.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
