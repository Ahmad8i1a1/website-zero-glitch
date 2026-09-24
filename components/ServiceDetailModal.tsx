"use client";

import { useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Cpu, Layers, Zap } from "lucide-react";
import { playUiClick } from "./SoundEffects";

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  pipeline: string[];
  techStack: string[];
  engagementModels: string[];
  caseExample: {
    title: string;
    metrics: string;
    summary: string;
  };
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
}: ServiceDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={() => {
        playUiClick();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-8 shadow-[0_0_50px_rgba(188,19,254,0.25)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playUiClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 inline-block mb-3">
            ZeroGlitch Solutions Spec
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            {service.tagline}
          </p>
        </div>

        {/* Detailed Description */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-zinc-300 leading-relaxed mb-6">
          {service.description}
        </div>

        {/* Two Column Grid: Deliverables & Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Deliverables */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <div className="flex items-center gap-2 mb-3 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Deliverables</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Pipeline */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5">
            <div className="flex items-center gap-2 mb-3 text-neon-purple font-mono text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Production Pipeline</span>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {service.pipeline.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-[10px] font-mono font-bold text-white flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-zinc-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Example Highlight */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-neon-purple/10 to-cyan-500/10 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Case Benchmark: {service.caseExample.title}
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {service.caseExample.metrics}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {service.caseExample.summary}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Engine & Tooling Ecosystem
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs text-zinc-500 font-mono">
            Engagement: Fixed Scope, Dedicated Team, or Milestone Co-Dev
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={() => {
                playUiClick();
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-neon-purple hover:bg-neon-purple-dim text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all"
            >
              <span>Inquire About {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
