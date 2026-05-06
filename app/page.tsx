"use client";

import { useState } from "react";
import { 
  Mail, 
  ArrowRight, 
  Linkedin, 
  Github, 
  Apple, 
  Gamepad2, 
  Music,
  ChevronRight,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";

export default function Portfolio() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  const games = [
    {
      title: "Musicality Beats",
      description: "A high-octane mobile rhythm game that challenges your reflexes and musical timing.",
      platform: "Mobile (iOS & Android)",
      status: "Released",
      icon: <Music className="w-8 h-8 text-neon-purple" />,
      link: "#"
    },
    {
      title: "Project Nova",
      description: "An unannounced sci-fi adventure pushing the limits of cross-platform play.",
      platform: "PC & Console",
      status: "In Development",
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-purple selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-purple rounded flex items-center justify-center animate-pulse">
            <span className="text-black text-xs font-black">ZG</span>
          </div>
          <span className="hidden sm:inline">ZeroGlitch Studio</span>
        </div>
        <div className="flex gap-8 items-center text-sm font-medium text-zinc-400">
          <a href="#games" className="hover:text-neon-purple transition-colors">Games</a>
          <a href="#about" className="hover:text-neon-purple transition-colors">About</a>
          <a href="#contact" className="hover:text-black hover:bg-white px-4 py-2 rounded-full bg-white/5 transition-all">Join Beta</a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neon-purple">Now Live: Musicality Beats</span>
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter glitch-text" 
            data-text="ZeroGlitch Studio"
          >
            ZeroGlitch Studio
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl leading-relaxed font-light">
            Precision Gaming. <span className="text-white font-medium">Zero Glitch Experiences.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#games" 
              className="px-8 py-4 bg-neon-purple text-white font-bold rounded-lg hover:bg-neon-purple-dim transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(188,19,254,0.3)]"
            >
              Explore Our Games
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#social" 
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Our Community
            </a>
          </div>
        </section>

        {/* Games Showcase */}
        <section id="games" className="px-6 py-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-4">Games Showcase</h2>
              <p className="text-zinc-500 max-w-md">Our focus is on delivering high-quality, ad-minimal gaming experiences across platforms.</p>
            </div>
            <div className="h-px flex-1 bg-zinc-800 mx-8 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:border-neon-purple/50 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {game.icon}
                </div>
                <div className="mb-6">{game.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">{game.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 px-2 py-1 rounded bg-white/5 border border-white/10">
                    {game.platform}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${game.status === 'Released' ? 'text-green-400' : 'text-blue-400'}`}>
                    {game.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="px-6 py-32 bg-zinc-950/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Crafting the Future of Gaming</h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed">
                <p>
                  ZeroGlitch Studio is a team of <span className="text-white font-medium">3 dedicated developers</span> building cross-platform gaming experiences using Unity.
                </p>
                <p>
                  Our main motive is to make games that have the <span className="text-neon-purple font-medium">least amount of ads</span>, focusing purely on gameplay integrity and player immersion.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-neon-purple shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">Ad-Minimal</h4>
                      <p className="text-xs">Gameplay first, always.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-neon-purple shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">Community Led</h4>
                      <p className="text-xs">Built for players, by players.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center p-8">
                    <div className="text-4xl font-black italic tracking-tighter mb-2 opacity-20">UNITY POWERED</div>
                    <div className="text-xs font-mono text-zinc-500 tracking-[0.5em]">SYSTEM STABLE</div>
                 </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-purple w-2/3 animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>
        </section>

        {/* Social Links & Newsletter */}
        <section id="social" className="px-6 py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">Connect With Us</h2>
              <p className="text-zinc-500 mb-10 max-w-md">Follow our journey and stay updated with the latest from ZeroGlitch Studio.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.linkedin.com/company/zeroglitch-studio/" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href="https://github.com/ZeroGlitch-Studio" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 transition-colors">
                    <Apple className="w-5 h-5" />
                  </div>
                  <span className="font-medium">App Store</span>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-purple/20 transition-colors">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Play Store</span>
                </a>
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-3xl border border-neon-purple/20 bg-neon-purple/5 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Join the Inner Circle</h3>
                <p className="text-zinc-400 mb-8">Be the first to know about new game releases and beta testing opportunities.</p>
                
                {status === "success" ? (
                  <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400">
                    <p className="font-bold mb-1">Success!</p>
                    <p className="text-sm opacity-80">You&apos;re now on the list for early access.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-14 rounded-xl bg-neon-purple text-white font-bold hover:bg-neon-purple-dim transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === "loading" ? "Processing..." : "Notify Me"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-neon-purple/10 blur-[80px] rounded-full pointer-events-none" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="text-lg font-bold tracking-tighter flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-[10px] font-black">ZG</span>
            </div>
            <span>ZeroGlitch Studio</span>
          </div>
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} ZeroGlitch Studio. Built with precision.
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-700">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
