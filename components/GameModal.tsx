"use client";

import { useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  Gamepad2, 
  Cpu, 
  Zap, 
  CheckCircle2 
} from "lucide-react";
import { playUiClick } from "./SoundEffects";

export interface GameItem {
  id: string;
  title: string;
  genre: string;
  platform: string;
  engine: string;
  status: "Released" | "In Development" | "Beta" | "Playable Now";
  statusColor: string;
  tagline: string;
  description: string;
  technicalHighlights: string[];
  specs: {
    targetFps: string;
    engineVer: string;
    monetization: string;
    architecture: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  heroGradient: string;
}

interface GameModalProps {
  game: GameItem | null;
  onClose: () => void;
}

export default function GameModal({ game, onClose }: GameModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (game) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [game, onClose]);

  if (!game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={() => {
        playUiClick();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/15 shadow-[0_0_60px_rgba(0,255,249,0.25)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Area */}
        <div className={`relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-br ${game.heroGradient} overflow-hidden border-b border-white/10`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Gamepad2 className="w-32 h-32 text-white" />
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-black/60 border border-white/20 text-zinc-300 hover:text-white hover:bg-black/80 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Status */}
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${game.statusColor}`}>
                {game.status}
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-300 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10">
                {game.platform}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {game.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl">
              {game.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {game.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-black font-mono text-cyan-400">{m.value}</div>
                <div className="text-[11px] text-zinc-400 font-medium">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Game Synopsis */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Concept & Architecture
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
              {game.description}
            </p>
          </div>

          {/* Technical Feats & Spec Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Feats */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4" />
                <span>Zero-Glitch Technical Feats</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {game.technicalHighlights.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec Sheet */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5">
              <div className="flex items-center gap-2 text-neon-purple text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Cpu className="w-4 h-4" />
                <span>Target Engine & Architecture</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500">Engine & Pipeline:</span>
                  <span className="text-white font-mono font-semibold">{game.specs.engineVer}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500">Framerate Target:</span>
                  <span className="text-emerald-400 font-mono font-semibold">{game.specs.targetFps}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500">Architecture:</span>
                  <span className="text-white font-mono font-semibold">{game.specs.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Player Monetization:</span>
                  <span className="text-cyan-400 font-mono font-semibold">{game.specs.monetization}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <span className="text-xs text-zinc-500 font-mono">
              Designed & Developed by ZeroGlitch Studio
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={() => {
                  playUiClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-neon-purple to-purple-600 hover:from-purple-500 hover:to-cyan-400 text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,19,254,0.35)] transition-all"
              >
                <span>Request Similar Game Solution</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
