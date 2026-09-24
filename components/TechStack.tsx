"use client";

import { useState } from "react";
import { 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Activity 
} from "lucide-react";
import { playUiClick, playUiHover } from "./SoundEffects";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<"engines" | "languages" | "netcode" | "art" | "qa">("engines");

  const categories = [
    {
      id: "engines",
      label: "Game Engines",
      items: [
        { name: "Unity 6", tag: "URP / HDRP / DOTS", desc: "Core engine for cross-platform mobile, PC, and Nintendo Switch titles." },
        { name: "Unreal Engine 5.5", tag: "Lumen & Nanite", desc: "Next-gen cinematic action RPGs and photorealistic PC/Console releases." },
        { name: "WebGPU / WebGL 2.0", tag: "Zero-Install Web", desc: "Instant high-performance browser games running 60 FPS on any modern screen." },
        { name: "Custom C# / C++ Engines", tag: "Deterministic Solvers", desc: "Specialized physics, simulation, and lockstep arcade subsystems." }
      ]
    },
    {
      id: "languages",
      label: "Languages & Shaders",
      items: [
        { name: "C# (.NET 8/9)", tag: "High-Performance", desc: "Memory-managed, allocation-free gameplay loops and systems architecture." },
        { name: "C++ 20", tag: "Low-Level Native", desc: "Hardware-level memory management, custom engine modules, and platform SDKs." },
        { name: "HLSL & GLSL", tag: "Custom Shaders", desc: "Compute shaders, stylized rendering, post-processing, and screen-space VFX." },
        { name: "Rust", tag: "Safety & Speed", desc: "Ultra-fast deterministic simulation engines and backend microservices." }
      ]
    },
    {
      id: "netcode",
      label: "Multiplayer Netcode",
      items: [
        { name: "Photon Fusion & Quantum", tag: "State Sync / Rollback", desc: "Low-latency multiplayer architecture with deterministic input prediction." },
        { name: "Epic Online Services (EOS)", tag: "Cross-Play", desc: "Universal player accounts, voice chat, matchmaking, and cloud saves." },
        { name: "AWS GameLift / Agones", tag: "Dedicated Cloud", desc: "Auto-scaling Kubernetes game servers with global low-ping edge routing." },
        { name: "Nakama / PlayFab", tag: "LiveOps Backend", desc: "Leaderboards, battle passes, player inventories, and dynamic events." }
      ]
    },
    {
      id: "art",
      label: "Art & VFX Pipeline",
      items: [
        { name: "Blender & Maya", tag: "3D Modeling & Rigging", desc: "Optimized low/high-poly meshes, facial rigging, and bone hierarchies." },
        { name: "SideFX Houdini", tag: "Procedural Generation", desc: "Automated destruction, complex level splines, and procedural vegetation." },
        { name: "Substance Painter / 3D", tag: "PBR Texturing", desc: "Channel-packed textures, emissive maps, and stylized hand-painted textures." },
        { name: "Niagara & VFX Graph", tag: "Real-Time Particles", desc: "GPU-driven spells, explosions, weather effects, and holographic UI." }
      ]
    },
    {
      id: "qa",
      label: "QA, Profiling & CI/CD",
      items: [
        { name: "RenderDoc", tag: "GPU Debugger", desc: "Deep frame inspection, overdraw analysis, and draw call batching audits." },
        { name: "Unreal Insights & Unity Profiler", tag: "Frame Budgeting", desc: "CPU/GPU timelines, memory heap analysis, and GC spike elimination." },
        { name: "Automated Soak Test Farm", tag: "72h Continuous", desc: "Simulated player bots running thousands of game cycles to guarantee 0 leaks." },
        { name: "GitHub Actions & Fastlane", tag: "Automated CI/CD", desc: "Continuous build pipelines delivering daily playable builds to publishers." }
      ]
    }
  ];

  const currentCategory = categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="tech-stack" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Accent */}
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technology & Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Battle-Tested Engineering Ecosystem
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
          We do not guess; we engineer. Our toolchain combines industry-standard commercial engines with bespoke optimization software.
        </p>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                playUiClick();
                setActiveCategory(c.id as typeof activeCategory);
              }}
              onMouseEnter={() => playUiHover()}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === c.id
                  ? "bg-gradient-to-r from-neon-purple to-cyan-500 text-white shadow-[0_0_15px_rgba(0,255,249,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {currentCategory.items.map((tech, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400/40 hover:bg-zinc-900/40 transition-all flex flex-col justify-between group"
            onMouseEnter={() => playUiHover()}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </h4>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                  {tech.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {tech.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* The 4 ZeroGlitch Architectural Pillars */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neon-purple">
            Our Code Standards
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            The 4 ZeroGlitch Pillars of Production
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">Zero Frame Drops</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every frame is accounted for: strict 16.6ms (60 FPS) and 8.3ms (120 FPS) CPU/GPU frame budgets enforced in CI.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-neon-purple/40 text-neon-purple flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">Zero Memory Leaks</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              72-hour continuous automated soak testing eliminates native memory fragmentation and Garbage Collection spikes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">Ad-Minimal Integrity</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We design ethical game loops focused on player immersion, retention, and gameplay satisfaction over aggressive ads.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-3">
              <Terminal className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">Deterministic Physics</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lockstep synchronization guarantees identical physical simulations across heterogeneous devices and operating systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
