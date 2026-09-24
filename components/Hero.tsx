"use client";

import { 
  Gamepad2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Terminal, 
  Sparkles,
  Layers,
  ChevronDown
} from "lucide-react";
import { playUiClick, playUiHover, playLaser } from "./SoundEffects";

export default function Hero() {
  const metrics = [
    { label: "Commercial Titles Shipped", value: "15+", sub: "PC, Console & Mobile", icon: Gamepad2, color: "text-cyan-400" },
    { label: "Crash-Free Session Rate", value: "99.98%", sub: "Over 10M+ sessions", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Target Frame Performance", value: "60/120 FPS", sub: "Strict budget profiling", icon: Zap, color: "text-neon-purple" },
    { label: "Multiplayer Latency Netcode", value: "< 24ms", sub: "Rollback & state-sync", icon: Cpu, color: "text-amber-400" },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow radial accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-neon-purple/20 via-cyan-500/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-neon-purple/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Availability Status Badge */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-md mb-8 group cursor-default hover:border-cyan-400/60 transition-all shadow-[0_0_20px_rgba(0,255,249,0.15)]"
          onMouseEnter={() => playUiHover()}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            Open for New Projects: Q3/Q4 2026 Production Slots
          </span>
          <Terminal className="w-3.5 h-3.5 text-cyan-400 opacity-70" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 max-w-5xl leading-[1.08]">
          Precision Game Dev.{" "}
          <span className="bg-gradient-to-r from-neon-purple via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent glitch-text" data-text="Zero Glitch">
            Zero Glitch
          </span>{" "}
          Experiences.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mb-10 font-normal leading-relaxed">
          We architect and ship commercial-grade games with impeccable performance. From <span className="text-white font-semibold">full-cycle game production</span> to <span className="text-white font-semibold">cross-platform porting</span> and <span className="text-white font-semibold">deterministic netcode</span>, our engineering leaves zero room for bugs.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto mb-16">
          <a
            href="#estimator"
            onClick={() => {
              playLaser();
            }}
            onMouseEnter={() => playUiHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-neon-purple to-purple-700 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(188,19,254,0.45)] hover:shadow-[0_0_40px_rgba(0,255,249,0.5)] transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>Estimate Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#arcade"
            onClick={() => playUiClick()}
            onMouseEnter={() => playUiHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/50 text-white backdrop-blur-sm transition-all flex items-center justify-center gap-3 group"
          >
            <Gamepad2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Play Browser Demo</span>
          </a>

          <a
            href="#services"
            onClick={() => playUiClick()}
            onMouseEnter={() => playUiHover()}
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-neon-purple" />
            <span>View Services</span>
          </a>
        </div>

        {/* Engine & Platform Ticker */}
        <div className="w-full max-w-4xl py-3 px-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md mb-16">
          <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
            Production Ready On Modern Engines & Platforms
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-zinc-400">
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Unity 6 (URP & HDRP)
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" /> Unreal Engine 5.5 (Lumen/Nanite)
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> PS5 & Xbox Series X|S
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Nintendo Switch
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> iOS & Android (Ad-Minimal)
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> WebGPU / WebGL 2.0
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md hover:border-cyan-400/40 hover:bg-zinc-900/70 transition-all text-left group overflow-hidden"
                onMouseEnter={() => playUiHover()}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black text-white font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.value}
                  </span>
                </div>
                <div className="font-bold text-sm text-zinc-200 mb-1">{item.label}</div>
                <div className="text-xs text-zinc-400 font-mono">{item.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#services" 
          aria-label="Scroll to services"
          className="mt-14 text-zinc-600 hover:text-cyan-400 transition-colors flex flex-col items-center gap-1 group"
          onClick={() => playUiClick()}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Explore Services</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
