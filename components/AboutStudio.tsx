"use client";

import { 
  Users, 
  ShieldCheck, 
  Terminal, 
  GitBranch 
} from "lucide-react";
import { playUiHover } from "./SoundEffects";

export default function AboutStudio() {
  const teamMembers = [
    {
      role: "Lead Systems Architect & Game Director",
      experience: "Ex-AAA Engine Lead • 12+ Yrs",
      focus: "Deterministic simulation, low-level engine optimization, and combat loop design.",
      stats: "5.2M+ players served with Beatstar",
      tag: "CORE ARCHITECTURE"
    },
    {
      role: "Technical Art & Graphics Engineering Lead",
      experience: "Compute Shaders & PBR Specialist",
      focus: "Custom HLSL shaders, Niagara/VFX graph, and 120 FPS high-refresh rate rendering.",
      stats: "Reduced VRAM usage by up to 50%",
      tag: "VFX & SHADERS"
    },
    {
      role: "Multiplayer Netcode & Gameplay Systems Lead",
      experience: "Rollback & Cross-Play Specialist",
      focus: "State synchronization, dedicated server orchestration, and console TRC/TCR certification.",
      stats: "100% 1st-pass console pass rate",
      tag: "NETCODE & CERTS"
    }
  ];

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>The Minds Behind The Code</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Crafting The Future of Zero-Glitch Gaming
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
          We are a tight-knit core team of 3 specialized developers. No bloated middle management, no communication breakdown—just elite game engineering delivered directly to your milestones.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="p-7 rounded-3xl bg-zinc-950 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,249,0.12)] transition-all flex flex-col justify-between group"
            onMouseEnter={() => playUiHover()}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                  {member.tag}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {member.role}
              </h4>
              <div className="text-xs font-mono text-zinc-500 mb-4">{member.experience}</div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {member.focus}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Milestone Feat:</span>
              <span className="text-emerald-400 font-semibold">{member.stats}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Studio Manifesto Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/15 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neon-purple block mb-2">
              Our Core Manifesto
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Why We Call Ourselves ZeroGlitch
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
              In an industry plagued by day-one 50GB patches, stuttering PC ports, predatory microtransactions, and unplayable frame rates, ZeroGlitch Studio stands for <span className="text-white font-medium">engineering discipline and player respect</span>.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Ad-Minimal Experiences:</strong> Gameplay immersion always comes before ad monetization.</span>
              </div>
              <div className="flex items-center gap-3">
                <GitBranch className="w-4 h-4 text-neon-purple shrink-0" />
                <span><strong className="text-white">Transparent Sprints:</strong> Direct Git repo access, weekly playable builds, and open Slack/Discord channels.</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-white">Commercial Accountability:</strong> Milestone payments tied strictly to playable performance acceptance tests.</span>
              </div>
            </div>
          </div>

          {/* Visual Interactive Terminal Element */}
          <div className="p-6 rounded-2xl bg-black border border-white/10 font-mono text-xs text-zinc-400 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-zinc-500">zeroglitch-ci ~ pipeline</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="text-cyan-400">$ ./run_soak_test.sh --duration=72h</div>
              <div className="text-zinc-500">[INFO] Initializing 500 headless simulated player bots...</div>
              <div className="text-zinc-500">[INFO] Simulating heavy physics combat & particle stress...</div>
              <div className="text-emerald-400">[PASS] Native Memory: 0 leaks detected (Δ = +0.00KB)</div>
              <div className="text-emerald-400">[PASS] Frame Budget: 16.6ms avg (0 dropped frames)</div>
              <div className="text-emerald-400">[PASS] Network Rollback: 0 desyncs in 1,000,000 packets</div>
              <div className="text-neon-purple font-bold mt-2">[RESULT] ALL ZERO-GLITCH QUALITY GATES VERIFIED. READY FOR GOLD MASTER.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
