"use client";

import { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Clock 
} from "lucide-react";
import { playUiClick, playSuccessChime, playGlitchBuzz } from "./SoundEffects";

interface ContactRFPProps {
  initialSpec?: string;
}

export default function ContactRFP({ initialSpec = "" }: ContactRFPProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [serviceRequired, setServiceRequired] = useState("Full-Cycle Game Development");
  const [budgetRange, setBudgetRange] = useState("$25,000 - $50,000");
  const [timeline, setTimeline] = useState("3 to 6 Months");
  const [ndaRequested, setNdaRequested] = useState(true);
  const [notes, setNotes] = useState(initialSpec ? `[Applied Estimate]: ${initialSpec}` : "");
  const [prevSpec, setPrevSpec] = useState(initialSpec);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (initialSpec !== prevSpec) {
    setPrevSpec(initialSpec);
    setNotes((prev) => (prev ? `${prev}\n\n[Applied Estimate]: ${initialSpec}` : `[Applied Estimate]: ${initialSpec}`));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      playGlitchBuzz();
      return;
    }

    setStatus("submitting");
    playUiClick();

    // Simulate reliable API response
    setTimeout(() => {
      setStatus("success");
      playSuccessChime();
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context, Credentials, Guarantee (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Project Inquiries & RFPs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Let&apos;s Build Your Next Title Together.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
              Whether you are an indie creator looking to nail a Nintendo Switch port, a publisher needing a full-cycle studio pod, or a team requiring deterministic netcode—we are ready.
            </p>
          </div>

          {/* Guarantee Badges */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">24-Hour Technical Assessment</h4>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  Our engineering leads review your requirements and provide an initial feasibility & architecture breakdown within 1 business day.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-purple-950/60 border border-neon-purple/40 text-neon-purple shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Standard Mutual NDA Protection</h4>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  Your GDD, IP, concept art, and codebase are 100% legally secured under mutual confidentiality.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Milestone-Based Security</h4>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  Clear contractual checkpoints tied directly to playable builds and performance criteria before milestone payouts.
                </p>
              </div>
            </div>
          </div>

          {/* Direct channels */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-xs text-zinc-400 space-y-2 font-mono">
            <div className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
              Direct Inquiries
            </div>
            <div>
              Email: <a href="mailto:contact@zeroglitch.studio" className="text-cyan-400 hover:underline">contact@zeroglitch.studio</a>
            </div>
            <div>
              Headquarters: Remote Global Pods • London / San Francisco / Islamabad
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Proposal Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-zinc-950 border border-white/15 shadow-[0_0_50px_rgba(188,19,254,0.15)] relative">
          {status === "success" ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                RFP Successfully Transmitted
              </h3>
              <p className="text-sm text-zinc-300 max-w-md font-light leading-relaxed">
                Thank you, <span className="text-white font-medium">{name}</span>! Our lead system architect will review your project brief and reply with our technical feasibility breakdown within 24 hours.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 max-w-sm">
                A confirmation has been dispatched to <span className="text-cyan-400">{email}</span>.
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setEmail("");
                  setNotes("");
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Send Another Inquire
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Company / Studio Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyperion Interactive"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Project / Working Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Project Odyssey"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Primary Service Needed
                  </label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-white/10 bg-zinc-900 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    <option value="Full-Cycle Game Development">Full-Cycle Game Development</option>
                    <option value="Cross-Platform Porting & Optimization">Cross-Platform Porting & Optimization</option>
                    <option value="Multiplayer Netcode & Backend">Multiplayer Netcode & Backend</option>
                    <option value="Technical Art, Shaders & VFX">Technical Art, Shaders & VFX</option>
                    <option value="Zero-Glitch QA & Performance Audit">Zero-Glitch QA & Performance Audit</option>
                    <option value="Co-Development Sprints">Co-Development Sprints</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Estimated Budget Tier
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-white/10 bg-zinc-900 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    <option value="Under $25,000">Under $25,000 (Sprint / Audit)</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000 (Milestone)</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000 (Production)</option>
                    <option value="$100,000+">$100,000+ (Full Cycle Turnkey)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                    Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-white/10 bg-zinc-900 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    <option value="1 to 3 Months">1 to 3 Months (Fast Sprint)</option>
                    <option value="3 to 6 Months">3 to 6 Months (Alpha / Slice)</option>
                    <option value="6 to 12 Months">6 to 12 Months (Full Production)</option>
                    <option value="Flexible">Flexible / Ongoing Co-Dev</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-bold">
                  Project Concept & Technical Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your game genre, target platforms, engine preference, current blockers, or milestones..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm resize-none font-mono"
                />
              </div>

              {/* NDA Checkbox */}
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={ndaRequested}
                  onChange={(e) => setNdaRequested(e.target.checked)}
                  className="w-4 h-4 rounded bg-black border-white/20 text-cyan-400 focus:ring-cyan-400"
                />
                <span className="text-xs text-zinc-300">
                  Execute standard Mutual Non-Disclosure Agreement (NDA) before detailed code/GDD exchange
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-14 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-neon-purple to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(188,19,254,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
              >
                {status === "submitting" ? (
                  <span>Encrypting & Dispatching RFP...</span>
                ) : (
                  <>
                    <span>Submit Project RFP for Technical Review</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
