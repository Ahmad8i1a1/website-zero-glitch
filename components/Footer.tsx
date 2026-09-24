"use client";

import { useState } from "react";
import { 
  ArrowUp, 
  Mail, 
  Check, 
  Send 
} from "lucide-react";
import { playUiClick, playSuccessChime } from "./SoundEffects";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    playSuccessChime();
    setNewsletterEmail("");
  };

  const scrollToTop = () => {
    playUiClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon-purple flex items-center justify-center font-mono font-black text-xs text-white shadow-[0_0_15px_rgba(188,19,254,0.5)]">
                ZG
              </div>
              <span className="font-black text-xl tracking-tight">ZeroGlitch Studio</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
              A high-precision game development studio building cross-platform, ad-minimal experiences in Unity and Unreal Engine. Creators of Beatstar.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/zeroglitch-studio/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                </svg>
              </a>

              <a
                href="https://github.com/ZeroGlitch-Studio"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              <a
                href="mailto:contact@zeroglitch.studio"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Solutions & Services
            </h5>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#services" className="hover:text-white transition-colors">Full-Cycle Game Dev</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cross-Platform Porting</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Multiplayer Netcode</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Technical Art & Shaders</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Zero-Glitch QA Testing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Co-Development Sprints</a></li>
            </ul>
          </div>

          {/* Games & Tech Column */}
          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neon-purple mb-4">
              Showcase & Games
            </h5>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#games" className="hover:text-white transition-colors">Beatstar (5M+ Mobile)</a></li>
              <li><a href="#games" className="hover:text-white transition-colors">Project Nova (AAA RPG)</a></li>
              <li><a href="#games" className="hover:text-white transition-colors">Cyber Siege: Outpost 9</a></li>
              <li><a href="#games" className="hover:text-white transition-colors">Chrono Drift (Switch/PC)</a></li>
              <li><a href="#arcade" className="hover:text-white transition-colors">Reflex Arena (Web Demo)</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Budget Calculator</a></li>
            </ul>
          </div>

          {/* Devlog Newsletter Column */}
          <div>
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Devlogs & Updates
            </h5>
            <p className="text-xs text-zinc-400 mb-3 font-light">
              Receive technical post-mortems, optimization deep dives, and studio beta invites.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscribed to Devlogs!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter studio email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full h-10 px-3 pr-9 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 text-xs"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  Zero spam. Unsubscribe anytime.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} ZeroGlitch Studio. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-zinc-300 transition-colors">Manifesto</a>
            <a href="#services" className="hover:text-zinc-300 transition-colors">TRC Guarantee</a>
            <a href="#contact" className="hover:text-zinc-300 transition-colors">Mutual NDA</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px]">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
