"use client";

import { useState } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Check, 
  Cpu, 
  Users, 
  Clock, 
  ShieldCheck 
} from "lucide-react";
import { playUiClick, playLaser } from "./SoundEffects";

interface EstimatorProps {
  onApplyEstimateToForm?: (specSummary: string) => void;
}

export default function ProjectEstimator({ onApplyEstimateToForm }: EstimatorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["PC (Steam)", "Mobile (iOS & Android)"]);
  const [engine, setEngine] = useState<string>("Unity 6");
  const [serviceScope, setServiceScope] = useState<string>("Full-Cycle Development");
  const [artStyle, setArtStyle] = useState<string>("Stylized 3D / Cyberpunk");
  const [timeline, setTimeline] = useState<string>("3 to 6 Months (Vertical Slice / Alpha)");

  const togglePlatform = (p: string) => {
    playUiClick();
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((x) => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  // Dynamic calculations
  let baseWeeks = 12;
  let devCount = 3;
  let budgetMin = 25000;
  let budgetMax = 45000;

  if (serviceScope === "Full-Cycle Development") {
    baseWeeks = 24;
    devCount = 4;
    budgetMin = 50000;
    budgetMax = 95000;
  } else if (serviceScope === "Cross-Platform Porting") {
    baseWeeks = 8;
    devCount = 2;
    budgetMin = 18000;
    budgetMax = 35000;
  } else if (serviceScope === "Multiplayer Netcode & Backend") {
    baseWeeks = 10;
    devCount = 2;
    budgetMin = 22000;
    budgetMax = 40000;
  } else if (serviceScope === "Technical Art & VFX") {
    baseWeeks = 6;
    devCount = 2;
    budgetMin = 14000;
    budgetMax = 28000;
  } else if (serviceScope === "Zero-Glitch QA & Performance Audit") {
    baseWeeks = 4;
    devCount = 1;
    budgetMin = 8000;
    budgetMax = 16000;
  }

  // Multiplier for platforms
  const platformMultiplier = 1 + (selectedPlatforms.length - 1) * 0.25;
  const finalBudgetMin = Math.round((budgetMin * platformMultiplier) / 1000) * 1000;
  const finalBudgetMax = Math.round((budgetMax * platformMultiplier) / 1000) * 1000;
  const finalWeeks = Math.round(baseWeeks * (selectedPlatforms.length > 2 ? 1.2 : 1));

  const handleApplyToRfp = () => {
    playLaser();
    const summary = `Scope: ${serviceScope} | Platforms: ${selectedPlatforms.join(", ")} | Engine: ${engine} | Art: ${artStyle} | Timeline: ${timeline} | Est: $${finalBudgetMin.toLocaleString()} - $${finalBudgetMax.toLocaleString()}`;
    if (onApplyEstimateToForm) {
      onApplyEstimateToForm(summary);
    }
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="estimator" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Scope & Budget Engine</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Game Project Estimator
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
          Configure your target platforms, engine preference, and service scope to generate an instant technical pod recommendation and ballpark investment estimate.
        </p>
      </div>

      {/* Main Grid: Controls on left, Live Spec Card on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
          {/* Step 1: Target Platforms */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-3">
              1. Target Platforms (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                "PC (Steam / Epic)",
                "Mobile (iOS & Android)",
                "PlayStation 5",
                "Xbox Series X|S",
                "Nintendo Switch",
                "WebGL / Instant Web",
              ].map((plat) => {
                const isSelected = selectedPlatforms.includes(plat);
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => togglePlatform(plat)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      isSelected
                        ? "bg-cyan-950/50 border-cyan-400/60 text-white shadow-[0_0_12px_rgba(0,255,249,0.15)]"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{plat}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Primary Service Scope */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neon-purple block mb-3">
              2. Core Service Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Full-Cycle Development",
                "Cross-Platform Porting",
                "Multiplayer Netcode & Backend",
                "Technical Art & VFX",
                "Zero-Glitch QA & Performance Audit",
                "Dedicated Co-Dev Sprints",
              ].map((scope) => {
                const isSelected = serviceScope === scope;
                return (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => {
                      playUiClick();
                      setServiceScope(scope);
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                      isSelected
                        ? "bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.2)]"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{scope}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-neon-purple shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Engine Preference */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              3. Target Engine & Ecosystem
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: "Unity 6", sub: "URP / HDRP / DOTS" },
                { name: "Unreal Engine 5.5", sub: "Lumen & Nanite" },
                { name: "Custom / WebGPU", sub: "Lightweight Engine" }
              ].map((eng) => {
                const isSelected = engine === eng.name;
                return (
                  <button
                    key={eng.name}
                    type="button"
                    onClick={() => {
                      playUiClick();
                      setEngine(eng.name);
                    }}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "bg-white/10 border-white/40 text-white"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{eng.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{eng.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Art Style */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              4. Target Art Direction
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "Stylized 3D / Cyberpunk",
                "High-Fidelity Realistic PBR",
                "2D Handcrafted / Pixel",
                "Low-Poly Minimalist"
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setArtStyle(style);
                  }}
                  className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all text-center ${
                    artStyle === style
                      ? "bg-cyan-950/40 border-cyan-400 text-white font-bold"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Timeline Target */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-3">
              5. Production Target Timeline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "Fast Sprint (6-10 Wks)", val: "6 to 10 Weeks" },
                { label: "Vertical Slice (3-6 Mos)", val: "3 to 6 Months" },
                { label: "Full Release (6-12 Mos)", val: "6 to 12 Months" }
              ].map((t) => (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => {
                    playUiClick();
                    setTimeline(t.val);
                  }}
                  className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all text-center ${
                    timeline === t.val
                      ? "bg-amber-950/40 border-amber-400 text-white font-bold shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Pod & Ballpark Estimate Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/15 shadow-[0_0_40px_rgba(188,19,254,0.2)]">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Estimated Pod Architecture
            </span>
            <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5">
              ZeroGlitch Pod
            </span>
          </div>

          {/* Estimated Investment Range */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 mb-6 text-center">
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
              Ballpark Studio Investment
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              ${finalBudgetMin.toLocaleString()}{" "}
              <span className="text-zinc-500 text-xl font-normal">-</span>{" "}
              ${finalBudgetMax.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              Fixed Milestone Delivery • Zero Hidden Fees
            </div>
          </div>

          {/* Specs Summary List */}
          <div className="space-y-3 mb-6 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Estimated Timeline:
              </span>
              <span className="font-mono font-bold text-white">~{finalWeeks} Weeks</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neon-purple" /> Assigned Engineers:
              </span>
              <span className="font-mono font-bold text-white">{devCount} Senior Developers + QA</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" /> Selected Engine:
              </span>
              <span className="font-mono font-bold text-white">{engine}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TRC Certification:
              </span>
              <span className="font-mono font-bold text-emerald-400">Guaranteed Pass</span>
            </div>
          </div>

          {/* Assigned Roles Pillbox */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6 text-xs">
            <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2 font-bold">
              Dedicated Team Composition:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                1x Lead Architect
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[11px] font-mono">
                {devCount - 1}x Gameplay / Netcode Dev
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono">
                1x Zero-Glitch QA Lead
              </span>
            </div>
          </div>

          {/* Lock In & RFP Button */}
          <button
            type="button"
            onClick={handleApplyToRfp}
            className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-neon-purple to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(188,19,254,0.4)] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Lock In Estimate & Request RFP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[10px] font-mono text-zinc-500 text-center mt-3">
            Transfers selected configuration directly to our project proposal form below.
          </p>
        </div>
      </div>
    </section>
  );
}
