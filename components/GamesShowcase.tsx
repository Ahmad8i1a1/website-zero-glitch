"use client";

import { useState } from "react";
import { 
  Gamepad2, 
  ArrowRight
} from "lucide-react";
import { playUiClick, playUiHover } from "./SoundEffects";
import GameModal, { GameItem } from "./GameModal";

export default function GamesShowcase() {
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [platformFilter, setPlatformFilter] = useState<"all" | "mobile" | "pc-console" | "web">("all");

  const gamesList: GameItem[] = [
    {
      id: "beatstar",
      title: "Beatstar",
      genre: "Rhythm & Reflex Action",
      platform: "Mobile (iOS & Android)",
      engine: "Unity 6 (URP)",
      status: "Released",
      statusColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
      tagline: "A high-octane mobile rhythm game testing lightning reflexes and musical synchronicity.",
      description: "Beatstar is our flagship rhythm game engineered for absolute audio-visual synchronicity. Built from the ground up to respect players with an ad-minimal ethos, it delivers locked 60 FPS performance even on low-end budget smartphones.",
      technicalHighlights: [
        "Sub-millisecond audio latency calibration for 300+ Android hardware DACs",
        "Deterministic touch input sampling avoiding Android OS frame queues",
        "Custom lightweight shader pipeline consuming 40% less battery",
        "0 intrusive interstitial ads – gameplay-first monetization model"
      ],
      specs: {
        targetFps: "60 FPS Locked (all devices)",
        engineVer: "Unity 6 (URP C#)",
        monetization: "Ad-Minimal / Premium Tracks",
        architecture: "Single-Loop Deterministic Audio Clock"
      },
      metrics: [
        { label: "Total Downloads", value: "5.2M+" },
        { label: "Store Rating", value: "4.8 / 5.0" },
        { label: "Crash-Free Rate", value: "99.99%" },
        { label: "Peak Daily Active", value: "420K" }
      ],
      heroGradient: "from-purple-900 via-fuchsia-950 to-black"
    },
    {
      id: "project-nova",
      title: "Project Nova",
      genre: "Sci-Fi Action RPG & Exploration",
      platform: "PC, PS5 & Xbox Series X",
      engine: "Unreal Engine 5.5",
      status: "In Development",
      statusColor: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
      tagline: "Pushing the frontiers of cross-platform fidelity with seamless planetary travel.",
      description: "Project Nova is a AAA-tier sci-fi action RPG featuring real-time orbital physics, deep melee-gunplay hybrid mechanics, and zero-loading-screen planetary descent.",
      technicalHighlights: [
        "Nanite procedural geometry with billions of rendered micro-polygons",
        "Lumen real-time dynamic global illumination across alien biomes",
        "Zero-hitch asynchronous level streaming using custom virtual texture caching",
        "Predictive animation state machines with motion warping"
      ],
      specs: {
        targetFps: "60 FPS (PS5/Xbox) / 120 FPS (PC)",
        engineVer: "Unreal Engine 5.5 (C++)",
        monetization: "Full Premium Title",
        architecture: "Mass Entity / Gameplay Ability System"
      },
      metrics: [
        { label: "Production Phase", value: "Alpha v0.8" },
        { label: "Target Platforms", value: "PC & Next-Gen" },
        { label: "Wishlists", value: "180K+" },
        { label: "Target Release", value: "2027" }
      ],
      heroGradient: "from-blue-900 via-indigo-950 to-black"
    },
    {
      id: "cyber-siege",
      title: "Cyber Siege: Outpost 9",
      genre: "Co-Op Extraction & Swarm Defense",
      platform: "PC (Steam) & Steam Deck",
      engine: "Unity 6 + DOTS",
      status: "Beta",
      statusColor: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      tagline: "High-stakes tactical co-op holding off 10,000+ synthetic swarms.",
      description: "A dark cyberpunk extraction shooter where up to 4 players fortify energy grids against massive deterministic enemy swarms rendered via Unity DOTS / Entities.",
      technicalHighlights: [
        "10,000+ concurrent active AI entities running on CPU Burst Compiler",
        "Server-authoritative rollback netcode with lag compensation (< 25ms feel)",
        "Verified smooth 60 FPS on Steam Deck handheld hardware",
        "Procedural dynamic lighting with volumetric toxic fog shaders"
      ],
      specs: {
        targetFps: "60 FPS on Steam Deck",
        engineVer: "Unity 6 DOTS / ECS + Photon",
        monetization: "Premium Co-Op Experience",
        architecture: "Data-Oriented Tech Stack"
      },
      metrics: [
        { label: "Simultaneous Swarm", value: "10,000+" },
        { label: "Netcode Tick Rate", value: "64 Hz" },
        { label: "Steam Deck Verified", value: "Yes" },
        { label: "Co-op Players", value: "1 to 4" }
      ],
      heroGradient: "from-amber-950 via-zinc-900 to-black"
    },
    {
      id: "chrono-drift",
      title: "Chrono Drift",
      genre: "Anti-Gravity Stylized Racer",
      platform: "Nintendo Switch & PC",
      engine: "Custom Physics + Unity",
      status: "In Development",
      statusColor: "text-neon-purple bg-purple-950/40 border-purple-500/30",
      tagline: "Time-manipulation racing with instantaneous rewind and magnetic grip physics.",
      description: "A neon-soaked anti-gravity racing game inspired by F-Zero and Wipeout with an innovative Chrono-Shift rewind mechanic allowing split-second course corrections.",
      technicalHighlights: [
        "Custom deterministic 6-DOF physics solver running at 120Hz sub-stepping",
        "Local 4-player split-screen locked at steady 60 FPS on Nintendo Switch",
        "Dynamic audio-reactive shaders pulsing to synthwave soundtrack",
        "Procedurally generated track variations with seamless spline extrusion"
      ],
      specs: {
        targetFps: "60 FPS (Switch) / 144 FPS (PC)",
        engineVer: "Unity 6 URP + Custom C# Phys",
        monetization: "Complete Standalone Game",
        architecture: "Deterministic Physics Rewind Buffer"
      },
      metrics: [
        { label: "Max Speed Sim", value: "1,200 km/h" },
        { label: "Split-Screen FPS", value: "60 FPS" },
        { label: "Physics Sub-step", value: "120 Hz" },
        { label: "Rewind Depth", value: "5.0 sec" }
      ],
      heroGradient: "from-violet-950 via-fuchsia-950 to-black"
    },
    {
      id: "void-runner",
      title: "Void Runner: Hyperdrive",
      genre: "WebGPU Neon Bullet Arena",
      platform: "Web Browser & Mobile Web",
      engine: "High-Perf WebGPU Engine",
      status: "Playable Now",
      statusColor: "text-cyan-300 bg-cyan-950/60 border-cyan-400/40",
      tagline: "Instant-play WebGPU arcade shooter with 100,000 GPU compute particles.",
      description: "An instant-loading browser showcase created to demonstrate the capability of modern WebGPU and WebGL standards. No download required, plays right inside modern browsers.",
      technicalHighlights: [
        "Zero-install browser instant start with WebGPU compute pipelines",
        "100,000 simultaneous particle physics calculated directly on the GPU",
        "Gamepad API, keyboard and mobile touch dual-virtual-stick controls",
        "Procedural synth music powered by Web Audio API"
      ],
      specs: {
        targetFps: "60 / 120 FPS in Browser",
        engineVer: "Custom WebGPU / WebGL 2.0",
        monetization: "100% Free Web Showcase",
        architecture: "Compute Shader Particle Simulator"
      },
      metrics: [
        { label: "Install Size", value: "0 MB" },
        { label: "Load Time", value: "< 0.8 sec" },
        { label: "GPU Particles", value: "100K" },
        { label: "Browser Support", value: "Chrome / Safari / Edge" }
      ],
      heroGradient: "from-cyan-950 via-teal-950 to-black"
    }
  ];

  const filtered = gamesList.filter((g) => {
    if (platformFilter === "mobile") return g.platform.toLowerCase().includes("mobile") || g.platform.toLowerCase().includes("android") || g.platform.toLowerCase().includes("ios");
    if (platformFilter === "pc-console") return g.platform.toLowerCase().includes("pc") || g.platform.toLowerCase().includes("ps5") || g.platform.toLowerCase().includes("switch");
    if (platformFilter === "web") return g.platform.toLowerCase().includes("web");
    return true;
  });

  return (
    <section id="games" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Glow Accent */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Studio Production Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Original IPs & Co-Developed Games
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl font-light">
            Every title represents our core philosophy: ad-minimal design, buttery smooth frame rates, and zero game-breaking glitches.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md self-start md:self-end">
          {[
            { id: "all", label: "All Titles" },
            { id: "mobile", label: "Mobile" },
            { id: "pc-console", label: "PC & Consoles" },
            { id: "web", label: "Instant Web" }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                playUiClick();
                setPlatformFilter(f.id as typeof platformFilter);
              }}
              onMouseEnter={() => playUiHover()}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                platformFilter === f.id
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,255,249,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Games Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-md overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,255,249,0.15)] transition-all flex flex-col justify-between"
            onMouseEnter={() => playUiHover()}
          >
            {/* Visual Top Card */}
            <div>
              <div className={`relative h-48 p-6 flex flex-col justify-between bg-gradient-to-br ${game.heroGradient} overflow-hidden border-b border-white/10`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-2 right-2 p-4 opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all">
                  <Gamepad2 className="w-24 h-24 text-white" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${game.statusColor}`}>
                    {game.status}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 px-2 py-0.5 rounded bg-black/50 border border-white/10">
                    {game.specs.targetFps}
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-xs font-mono font-semibold text-cyan-400 block mb-1">
                    {game.genre}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {game.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6 leading-relaxed line-clamp-3">
                  {game.description}
                </p>

                {/* Technical highlights preview */}
                <div className="space-y-1.5 mb-6 text-xs text-zinc-400">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                    Technical Feats
                  </div>
                  {game.technicalHighlights.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-neon-purple mt-0.5">›</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="text-xs font-mono text-zinc-500">
                  {game.platform.split("(")[0]}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setSelectedGame(game);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-black bg-cyan-950/40 hover:bg-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,249,0.1)] group/btn"
                >
                  <span>Game Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Modal */}
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </section>
  );
}
