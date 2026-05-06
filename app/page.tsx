"use client";

import { useState } from "react";
import { Mail, ArrowRight, Code, Globe, MessageSquare } from "lucide-react";

export default function ComingSoon() {
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative z-10 w-full max-w-2xl px-6 py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">
            Something special is brewing
          </span>
        </div>

        {/* Logo/Brand */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          Zero Glitch
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-lg leading-relaxed">
          We&apos;re building the future of seamless digital experiences. 
          Stay tuned as we prepare to launch something extraordinary.
        </p>

        {/* Form */}
        <div className="w-full max-w-md">
          {status === "success" ? (
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 animate-in fade-in zoom-in duration-300">
              <p className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 px-8 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Notify Me"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-20 flex gap-6 text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Code className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-sm text-zinc-600">
        &copy; {new Date().getFullYear()} Zero Glitch. All rights reserved.
      </footer>
    </div>
  );
}
