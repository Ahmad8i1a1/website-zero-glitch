"use client";

import { useState } from "react";
import { 
  FolderGit2, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight
} from "lucide-react";
import { playUiClick, playUiHover } from "./SoundEffects";

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      id: "beatstar-latency",
      title: "Zero-Latency Mobile Audio Architecture",
      client: "Beatstar (Original IP)",
      genre: "Mobile Rhythm Action",
      challenge: "Standard mobile audio output on Android suffers from 40ms to 90ms of variable latency across heterogeneous hardware DACs, rendering rhythm-game timing unplayable.",
      solution: "Engineered a low-level C++ native audio HAL interface with sub-millisecond audio synchronization and deterministic touch event polling that bypasses OS event queuing.",
      metrics: [
        { label: "Audio Sync Latency", value: "< 1.5ms" },
        { label: "Global Downloads", value: "5.2M+" },
        { label: "App Store Rating", value: "4.8 ★" },
        { label: "Crash-Free Rate", value: "99.99%" }
      ],
      deliverables: ["Custom C++ Audio Plugin", "Deterministic Timing Loop", "Sub-Frame Touch Poller"]
    },
    {
      id: "nova-switch-port",
      title: "Porting a 64GB PC RPG to Nintendo Switch",
      client: "Project Nova",
      genre: "Sci-Fi Action RPG",
      challenge: "The original PC title was consuming 11GB of VRAM and 14GB of system RAM, far exceeding the strict memory constraints of the Nintendo Switch hardware.",
      solution: "Engineered dynamic virtual texture streaming, automated LOD mesh generation with vertex clustering, channel-packed shader textures, and trimmed audio buffers.",
      metrics: [
        { label: "RAM Footprint Cut", value: "-48%" },
        { label: "Framerate Stability", value: "30 FPS Lock" },
        { label: "TCR Certification", value: "1st Pass Pass" },
        { label: "Load Time Trim", value: "-62%" }
      ],
      deliverables: ["Nintendo Switch TRC Master", "Shader Pre-Caching Pipeline", "Dynamic Asset Streamer"]
    },
    {
      id: "swarm-netcode",
      title: "10,000+ Concurrent Entity Rollback Netcode",
      client: "Cyber Siege: Outpost 9",
      genre: "Multiplayer Co-Op Swarm Defense",
      challenge: "High-density horde encounters choked network bandwidth and dropped client frame rates below 15 FPS when thousands of synthetic alien units rendered simultaneously.",
      solution: "Refactored enemy swarm simulations to Unity DOTS / ECS using the SIMD Burst Compiler. Architected a custom bit-packed delta compression network protocol.",
      metrics: [
        { label: "Simultaneous Units", value: "10,000+" },
        { label: "Bandwidth Savings", value: "78%" },
        { label: "Steam Deck FPS", value: "60 FPS" },
        { label: "Tick-Rate Consistency", value: "64 Hz" }
      ],
      deliverables: ["DOTS / ECS Swarm Engine", "Custom Delta UDP Protocol", "Steam Deck Optimization"]
    }
  ];

  return (
    <section id="case-studies" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Proven Engineering Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Case Studies & Technical Breakthroughs
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
          Real technical challenges, algorithmic solutions, and measurable performance results.
        </p>
      </div>

      {/* Case Study Selector & Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Selector Tabs (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                playUiClick();
                setActiveCase(idx);
              }}
              onMouseEnter={() => playUiHover()}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                activeCase === idx
                  ? "bg-zinc-900 border-cyan-400/60 shadow-[0_0_20px_rgba(0,255,249,0.15)]"
                  : "bg-zinc-950/60 border-white/5 hover:border-white/20 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {c.client}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeCase === idx ? "text-cyan-400 translate-x-1" : "text-zinc-600"}`} />
              </div>
              <h4 className="font-bold text-white text-base leading-snug">
                {c.title}
              </h4>
              <span className="text-xs text-zinc-500 font-mono mt-2">
                {c.genre}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Case View (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/15 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-purple block mb-1">
                  {cases[activeCase].genre}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {cases[activeCase].title}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                Verified Outcome
              </span>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {cases[activeCase].metrics.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-cyan-400">{m.value}</div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-medium">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 block mb-1">
                  The Technical Bottleneck:
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {cases[activeCase].challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  ZeroGlitch Solution:
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {cases[activeCase].solution}
                </p>
              </div>
            </div>

            {/* Deliverables Delivered */}
            <div className="flex flex-wrap gap-2 items-center mb-6">
              <span className="text-xs font-mono text-zinc-500 mr-2">Artifacts:</span>
              {cases[activeCase].deliverables.map((d, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>{d}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              Need similar engineering for your title?
            </span>
            <a
              href="#contact"
              onClick={() => playUiClick()}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition-colors"
            >
              <span>Discuss Your Bottlenecks</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
