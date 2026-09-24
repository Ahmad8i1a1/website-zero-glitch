"use client";

import { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight,
  Calculator,
  Layers,
  Cpu,
  FolderGit2
} from "lucide-react";
import { isAudioMuted, setAudioMuted, playUiClick, playUiHover } from "./SoundEffects";

export default function Navbar() {
  const [muted, setMuted] = useState(() => isAudioMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = !muted;
    setMuted(nextState);
    setAudioMuted(nextState);
    if (!nextState) {
      setTimeout(() => playUiClick(), 50);
    }
  };

  const navLinks = [
    { label: "Solutions & Services", href: "#services", icon: Layers },
    { label: "Games Showcase", href: "#games", icon: Gamepad2 },
    { label: "Arcade Demo", href: "#arcade", icon: Sparkles, badge: "PLAYABLE" },
    { label: "Project Estimator", href: "#estimator", icon: Calculator },
    { label: "Tech Stack", href: "#tech-stack", icon: Cpu },
    { label: "Case Studies", href: "#case-studies", icon: FolderGit2 },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            onClick={() => playUiClick()}
            onMouseEnter={() => playUiHover()}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(188,19,254,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,249,0.6)] transition-all">
              <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-purple/20 group-hover:bg-cyan-400/20 transition-colors" />
                <span className="font-mono text-xs font-black tracking-tighter text-white">ZG</span>
                <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  ZeroGlitch
                </span>
                <span className="text-neon-purple font-mono font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-neon-purple/10 border border-neon-purple/30">
                  STUDIO
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 block -mt-1">
                PRECISION GAME DEV
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-all relative group flex items-center gap-1.5"
                onClick={() => playUiClick()}
                onMouseEnter={() => playUiHover()}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-neon-purple to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Action CTAs & Audio Toggle */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              type="button"
              aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
              className={`p-2.5 rounded-xl border transition-all text-xs font-mono flex items-center gap-1.5 ${
                muted 
                  ? "border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-300" 
                  : "border-cyan-500/40 bg-cyan-950/30 text-cyan-400 shadow-[0_0_12px_rgba(0,255,249,0.2)]"
              }`}
              title={muted ? "Enable audio FX" : "Mute audio FX"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline text-[11px] uppercase font-bold">
                {muted ? "SFX Off" : "SFX On"}
              </span>
            </button>

            {/* Quick RFP / Consultation CTA */}
            <a
              href="#contact"
              onClick={() => playUiClick()}
              onMouseEnter={() => playUiHover()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-neon-purple to-purple-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(188,19,254,0.35)] hover:shadow-[0_0_25px_rgba(0,255,249,0.4)] transition-all group"
            >
              <span>Get Proposal</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playUiClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-zinc-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center font-mono font-bold text-xs text-white">
                    ZG
                  </div>
                  <span className="font-bold text-white tracking-tight">ZeroGlitch</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        playUiClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-medium text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="#contact"
                onClick={() => {
                  playUiClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-neon-purple hover:bg-neon-purple-dim text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,19,254,0.4)]"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="text-center font-mono text-[10px] text-zinc-500">
                Precision Game Development • Cross-Platform
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
