"use client";

import { useState } from "react";
import { 
  Gamepad2, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Terminal,
  Code2,
  Server
} from "lucide-react";
import { playUiClick, playUiHover } from "./SoundEffects";
import ServiceDetailModal, { ServiceDetail } from "./ServiceDetailModal";

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "engineering" | "art" | "multiplayer">("all");

  const servicesData: ServiceDetail[] = [
    {
      id: "full-cycle",
      title: "Full-Cycle Game Development",
      tagline: "From concept design and playable vertical slice to commercial launch & LiveOps.",
      description: "We handle the entire game production lifecycle. Our seasoned leads partner with IP holders, indie studios, and publishers to design, architect, engineer, and ship polished titles on schedule and within budget.",
      deliverables: [
        "Playable Vertical Slice & Alpha Milestones",
        "Deterministic gameplay systems & physics",
        "Complete UI/UX implementation & accessibility",
        "Commercial Release Management (Steam, App Store, PlayStation, Xbox, Switch)",
        "Post-launch telemetry, balance patches & LiveOps"
      ],
      pipeline: ["Design & GDD", "Prototype & Mechanics", "Production & Milestones", "TRC Certification", "Gold Master & Launch"],
      techStack: ["Unity 6", "Unreal Engine 5.5", "C#", "C++", "Perforce", "Git LFS"],
      engagementModels: ["Turnkey Fixed-Bid", "Co-Development Sprints", "Dedicated Pod"],
      caseExample: {
        title: "Beatstar Mobile",
        metrics: "5M+ Downloads • 60 FPS Locked",
        summary: "Delivered ultra-responsive rhythm engine with zero latency audio sync across 300+ Android device profiles."
      }
    },
    {
      id: "porting-optimization",
      title: "Cross-Platform Porting & Optimization",
      tagline: "Bring your PC or mobile game to Nintendo Switch, PS5, Xbox & WebGL with locked frame rates.",
      description: "Porting is not just recompiling—it is deep memory optimization, rendering bottleneck elimination, and strict platform compliance. We guarantee 1st-pass TRC/TCR certification for PlayStation, Xbox, and Nintendo Switch.",
      deliverables: [
        "Nintendo Switch, PS5, Xbox Series X/S native ports",
        "Frame-rate stabilization: 30/60/120 FPS target lock",
        "RAM footprint reduction (up to 50% memory savings)",
        "Shader compilation stutter fixes & pipeline cache",
        "Platform SDKs: Achievements, Cloud Saves, Trophies, Activity Cards"
      ],
      pipeline: ["Hardware Profiling", "Engine Upgrade & SDK Hookup", "Memory & Draw Call Trim", "TRC/TCR Soak Run", "Submission Support"],
      techStack: ["Nintendo SDK", "PlayStation SDK", "GDK (Xbox)", "RenderDoc", "Unreal Insights", "Unity Profiler"],
      engagementModels: ["Fixed-Price Porting Guarantee", "Revenue Share Hybrid"],
      caseExample: {
        title: "Project Nova Console Edition",
        metrics: "45% RAM Reduction • Zero Crashes",
        summary: "Downscaled complex PBR shaders and texture memory to fit tight Nintendo Switch limits without degrading visual art."
      }
    },
    {
      id: "multiplayer-backend",
      title: "Multiplayer Netcode & Backend Infrastructure",
      tagline: "Rock-solid rollback netcode, dedicated servers, and scalable cloud matchmaking.",
      description: "Nothing destroys a multiplayer game faster than desyncs, lag spikes, or server crashes. We architect high-performance netcode with state-sync, lag compensation, and serverless match orchestration capable of handling millions of players.",
      deliverables: [
        "Rollback netcode & deterministic state synchronization",
        "Dedicated game server containerization (Docker, Agones)",
        "Cloud matchmaking, lobby rooms & party systems",
        "Player authentication, anti-cheat & rate limiting",
        "LiveOps leaderboards, seasonal rewards & telemetry"
      ],
      pipeline: ["Network Protocol Spec", "Client Prediction Loop", "Stress & DDoS Simulation", "Edge Cloud Deployment", "Live Monitoring"],
      techStack: ["Photon Fusion", "Photon Quantum", "Mirror", "Nakama", "AWS GameLift", "PlayFab", "WebSockets"],
      engagementModels: ["Netcode Architecture Sprint", "Full Backend Handover"],
      caseExample: {
        title: "Cyber Siege: Outpost 9",
        metrics: "< 24ms Perceived Latency • 100k CCU Ready",
        summary: "Engineered deterministic lockstep rollback allowing 8-player tactical co-op play with cross-platform desktop & handheld sync."
      }
    },
    {
      id: "tech-art-vfx",
      title: "Technical Art, Shaders & VFX Engineering",
      tagline: "Breathtaking visual effects engineered to run like butter on low-end hardware.",
      description: "Where fine art meets hardcore computer graphics. We build custom shaders, procedural VFX, dynamic lighting rigs, and art pipelines that achieve high visual fidelity without killing frame budgets.",
      deliverables: [
        "Custom HLSL / GLSL shaders & Shader Graph nodes",
        "Niagara & Unity VFX Graph dynamic particle systems",
        "Stylized rendering (Cel-shading, Anime, Painterly, Cyberpunk)",
        "Procedural terrain, destruction & cloth physics",
        "Draw call batching, GPU instancing & vertex animation"
      ],
      pipeline: ["Visual R&D", "Shader Prototype", "Performance Profiling", "LOD Matrix Setup", "Artist Tooling Integration"],
      techStack: ["HLSL", "GLSL", "Blender", "Substance Painter", "Houdini", "Niagara VFX", "Shader Graph"],
      engagementModels: ["Art Sprint", "Dedicated Technical Artist"],
      caseExample: {
        title: "Chrono Drift Visual Overhaul",
        metrics: "120 FPS on High-Refresh Displays",
        summary: "Created custom procedural neon trail shaders with GPU vertex animation that cut GPU draw calls by 62%."
      }
    },
    {
      id: "zero-glitch-qa",
      title: "Zero-Glitch QA & Performance Engineering",
      tagline: "Rigorous automated soak testing, frame-budget enforcement, and zero crash guarantees.",
      description: "True to our name, we believe no player should ever experience a glitch. We implement continuous integration testing, automated monkey testing bots, and microsecond frame-profiling to eliminate drops before players see them.",
      deliverables: [
        "72-hour continuous automated soak tests",
        "Memory leak detection & Garbage Collection spike elimination",
        "Device compatibility matrix testing across 50+ hardware configurations",
        "Automated stress testing bots for multiplayer load",
        "Detailed performance audit reports with exact code-level fixes"
      ],
      pipeline: ["Test Suite Automation", "Hardware Matrix Testing", "Stress & Soak Execution", "Bug Triage & Fixes", "Final Sign-off"],
      techStack: ["Unity Test Runner", "Appium", "RenderDoc", "Valgrind", "Memory Profiler", "GitHub Actions CI"],
      engagementModels: ["Pre-Launch QA Audit", "Continuous Integration Retainer"],
      caseExample: {
        title: "Enterprise Studio QA Audit",
        metrics: "99.98% Crash-Free Rate Achieved",
        summary: "Discovered and resolved 14 hidden native memory leaks and 3 race conditions in client code prior to worldwide store launch."
      }
    },
    {
      id: "codev-systems",
      title: "Co-Development & Advanced Gameplay Systems",
      tagline: "Augment your engineering team with elite gameplay and engine programmers.",
      description: "Need specialized firepower to nail that tricky vehicle physics system, enemy combat AI, or complex inventory architecture? Our senior engineers seamlessly integrate into your Git/Perforce repositories, following your conventions.",
      deliverables: [
        "Advanced AI behavior trees, utility systems & navmesh tuning",
        "Custom physics engines (arcade racing, flight, ragdoll)",
        "Modular character controllers & weapon feedback systems",
        "Inventory, crafting, economy, and progression architectures",
        "Custom in-editor tooling to supercharge level designers"
      ],
      pipeline: ["Repo Onboarding", "Architecture Review", "Bi-Weekly Sprints", "Unit Testing", "Seamless Code Merge"],
      techStack: ["C#", "C++", "DOTS / ECS", "Behavior Trees", "PhysX / Havok", "Git / Perforce"],
      engagementModels: ["Embedded Engineers (1-6 devs)", "Sized Feature Pods"],
      caseExample: {
        title: "Void Runner Mechanics",
        metrics: "3x Faster Level Generation",
        summary: "Architected a custom multithreaded procedural level generator utilizing Unity DOTS that builds intricate dungeons in under 80ms."
      }
    }
  ];

  const filteredServices = servicesData.filter((s) => {
    if (activeTab === "engineering") return ["full-cycle", "porting-optimization", "codev-systems"].includes(s.id);
    if (activeTab === "art") return ["tech-art-vfx"].includes(s.id);
    if (activeTab === "multiplayer") return ["multiplayer-backend", "zero-glitch-qa"].includes(s.id);
    return true;
  });

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Core Capabilities & Solutions</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl">
          Engineered for Performance. Built for Players.
        </h2>
        
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
          We combine cutting-edge game engineering with creative vision. Explore our full suite of professional game development solutions.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
          {[
            { id: "all", label: "All Solutions" },
            { id: "engineering", label: "Engine & Core Dev" },
            { id: "multiplayer", label: "Netcode & QA" },
            { id: "art", label: "Tech Art & VFX" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playUiClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              onMouseEnter={() => playUiHover()}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredServices.map((service) => {
          return (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-7 rounded-3xl border border-white/10 bg-zinc-950/70 backdrop-blur-md hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,249,0.12)] transition-all overflow-hidden"
              onMouseEnter={() => playUiHover()}
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl group-hover:bg-cyan-400/15 transition-all pointer-events-none" />

              <div>
                {/* Top Badge & ID */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-950/30 text-cyan-400 transition-colors">
                    {service.id === "full-cycle" && <Gamepad2 className="w-6 h-6" />}
                    {service.id === "porting-optimization" && <Layers className="w-6 h-6" />}
                    {service.id === "multiplayer-backend" && <Server className="w-6 h-6" />}
                    {service.id === "tech-art-vfx" && <Sparkles className="w-6 h-6" />}
                    {service.id === "zero-glitch-qa" && <ShieldCheck className="w-6 h-6" />}
                    {service.id === "codev-systems" && <Code2 className="w-6 h-6" />}
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {service.engagementModels[0]}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-light leading-relaxed">
                  {service.tagline}
                </p>

                {/* Key Deliverables sample */}
                <div className="space-y-2 mb-6 text-xs text-zinc-300">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Benchmark Pill */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-6 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">Benchmark:</span>
                  <span className="text-emerald-400 font-bold">{service.caseExample.metrics}</span>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setSelectedService(service);
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-white/5 hover:bg-cyan-950/30 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Technical Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-cyan-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
