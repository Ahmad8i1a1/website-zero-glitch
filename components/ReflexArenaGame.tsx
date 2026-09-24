"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { 
  Gamepad2, 
  RotateCcw, 
  Zap, 
  ShieldAlert, 
  Play
} from "lucide-react";
import { 
  playUiClick, 
  playLaser, 
  playScorePoint, 
  playGlitchBuzz, 
  playSuccessChime 
} from "./SoundEffects";

interface Item {
  x: number;
  y: number;
  radius: number;
  speed: number;
  type: "cyan_orb" | "purple_core" | "glitch_hazard";
  points: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ReflexArenaGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zg_reflex_highscore");
      if (saved) return parseInt(saved, 10);
    }
    return 0;
  });
  const [shields, setShields] = useState(3);
  const [pulseCount, setPulseCount] = useState(1);

  // Mutable refs for high-frequency game loop
  const playerRef = useRef({
    x: 300,
    y: 380,
    width: 60,
    height: 12,
    speed: 9,
    targetX: 300
  });

  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const itemsRef = useRef<Item[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const loopIdRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  const spawnParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 0,
        maxLife: Math.random() * 20 + 15
      });
    }
  };

  const triggerZeroGlitchPulse = useCallback(() => {
    if (gameState !== "playing" || pulseCount <= 0) return;
    setPulseCount((prev) => prev - 1);
    playLaser();

    // Destroy all red glitch hazards on screen and reward bonus
    const canvas = canvasRef.current;
    if (!canvas) return;

    itemsRef.current = itemsRef.current.filter((item) => {
      if (item.type === "glitch_hazard") {
        spawnParticles(item.x, item.y, "#ff0055", 14);
        setScore((s) => s + 50);
        return false;
      }
      return true;
    });

    // Flash canvas screen
    spawnParticles(canvas.width / 2, canvas.height / 2, "#00fff9", 30);
  }, [gameState, pulseCount]);

  const startGame = () => {
    playUiClick();
    setScore(0);
    setCombo(1);
    setShields(3);
    setPulseCount(2);
    itemsRef.current = [];
    particlesRef.current = [];
    setGameState("playing");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = true;
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        triggerZeroGlitchPulse();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        keysRef.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        keysRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerZeroGlitchPulse]);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = 640);
    const height = (canvas.height = 420);
    playerRef.current.x = width / 2;
    playerRef.current.y = height - 25;

    let localScore = score;
    let localCombo = combo;
    let localShields = shields;

    const gameLoop = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // Cyber Grid Background
      ctx.strokeStyle = "rgba(0, 255, 249, 0.06)";
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (gameState === "playing") {
        // Handle input
        const p = playerRef.current;
        if (keysRef.current.left) p.x -= p.speed;
        if (keysRef.current.right) p.x += p.speed;

        // Mouse/Touch tracking smoothly if active
        if (p.targetX) {
          p.x += (p.targetX - p.x) * 0.15;
        }

        // Clamp inside bounds
        p.x = Math.max(p.width / 2, Math.min(width - p.width / 2, p.x));

        // Spawn Items
        if (timestamp - lastSpawnRef.current > 600) {
          lastSpawnRef.current = timestamp;
          const rand = Math.random();
          let type: Item["type"] = "cyan_orb";
          let points = 100;
          let speed = Math.random() * 2 + 3;

          if (rand < 0.45) {
            type = "cyan_orb";
            points = 100;
          } else if (rand < 0.70) {
            type = "purple_core";
            points = 250;
            speed = Math.random() * 2.5 + 3.5;
          } else {
            type = "glitch_hazard";
            points = 0;
            speed = Math.random() * 2 + 3.2;
          }

          itemsRef.current.push({
            x: Math.random() * (width - 60) + 30,
            y: -15,
            radius: type === "purple_core" ? 10 : 8,
            speed,
            type,
            points
          });
        }

        // Update Items
        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
          const item = itemsRef.current[i];
          item.y += item.speed;

          // Check Collision with player paddle
          const playerLeft = p.x - p.width / 2;
          const playerRight = p.x + p.width / 2;
          const playerTop = p.y - p.height / 2;
          const playerBottom = p.y + p.height / 2;

          if (
            item.y + item.radius >= playerTop &&
            item.y - item.radius <= playerBottom &&
            item.x >= playerLeft &&
            item.x <= playerRight
          ) {
            // Hit!
            if (item.type === "glitch_hazard") {
              playGlitchBuzz();
              spawnParticles(item.x, item.y, "#ff0055", 15);
              localShields -= 1;
              localCombo = 1;
              setShields(localShields);
              setCombo(1);

              if (localShields <= 0) {
                setGameState("gameover");
                if (localScore > highScore) {
                  setHighScore(localScore);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("zg_reflex_highscore", String(localScore));
                  }
                }
              }
            } else {
              playScorePoint();
              const gain = item.points * localCombo;
              localScore += gain;
              localCombo = Math.min(localCombo + 1, 8);
              setScore(localScore);
              setCombo(localCombo);
              spawnParticles(
                item.x, 
                item.y, 
                item.type === "cyan_orb" ? "#00fff9" : "#bc13fe", 
                12
              );

              // Periodic extra pulse award
              if (localScore > 0 && localScore % 1500 === 0) {
                setPulseCount((c) => Math.min(c + 1, 3));
                playSuccessChime();
              }
            }

            itemsRef.current.splice(i, 1);
            continue;
          }

          // Offscreen
          if (item.y > height + 20) {
            if (item.type !== "glitch_hazard") {
              // Missed good orb breaks combo
              localCombo = 1;
              setCombo(1);
            }
            itemsRef.current.splice(i, 1);
          }
        }
      }

      // Draw Items
      itemsRef.current.forEach((item) => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);

        if (item.type === "cyan_orb") {
          ctx.fillStyle = "#00fff9";
          ctx.shadowColor = "#00fff9";
          ctx.shadowBlur = 12;
        } else if (item.type === "purple_core") {
          ctx.fillStyle = "#bc13fe";
          ctx.shadowColor = "#bc13fe";
          ctx.shadowBlur = 15;
        } else {
          ctx.fillStyle = "#ff0055";
          ctx.shadowColor = "#ff0055";
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;

        const alpha = 1 - pt.life / pt.maxLife;
        if (alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw Player Paddle
      const p = playerRef.current;
      ctx.save();
      ctx.translate(p.x, p.y);

      // Outer glow shield
      ctx.fillStyle = "rgba(0, 255, 249, 0.15)";
      ctx.strokeStyle = "#00fff9";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00fff9";
      ctx.shadowBlur = 15;

      ctx.beginPath();
      ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, 6);
      ctx.fill();
      ctx.stroke();

      // Core center neon light
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-p.width / 4, -1, p.width / 2, 2);

      ctx.restore();

      loopIdRef.current = requestAnimationFrame(gameLoop);
    };

    loopIdRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (loopIdRef.current) cancelAnimationFrame(loopIdRef.current);
    };
  }, [gameState, score, combo, shields, highScore]);

  // Touch / Mouse dragging for the paddle
  const handleCanvasPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = e.clientX - rect.left;
    playerRef.current.targetX = clientX * scaleX;
  };

  return (
    <section id="arcade" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Interactive Browser Technology Demo</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Reflex Arena: Zero-Glitch Engine Demo
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 font-light">
          Test our responsive 60 FPS gameplay engine right in your browser. Catch cyan orbs & purple cores, dodge red glitch hazards, and trigger the EMP pulse!
        </p>
      </div>

      {/* Main Arcade Cabinet Container */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6 rounded-3xl bg-zinc-950 border border-white/15 shadow-[0_0_50px_rgba(0,255,249,0.15)] relative">
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block">Score</span>
              <span className="text-lg font-black text-white">{score}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block">Multiplier</span>
              <span className="text-lg font-black text-cyan-400">x{combo}</span>
            </div>
          </div>

          {/* Shields Meter */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase text-[10px]">Shields:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-3.5 h-5 rounded-sm transition-all ${
                    s <= shields
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,249,0.8)]"
                      : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* High Score & Pulses */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-zinc-500 uppercase text-[10px] block">High Score</span>
              <span className="text-xs font-bold text-amber-400">{highScore}</span>
            </div>

            <button
              onClick={triggerZeroGlitchPulse}
              disabled={pulseCount <= 0 || gameState !== "playing"}
              className="px-3 py-1.5 rounded-lg bg-neon-purple hover:bg-neon-purple-dim disabled:opacity-30 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-[0_0_12px_rgba(188,19,254,0.4)] transition-all"
            >
              <Zap className="w-3 h-3 text-cyan-300" />
              <span>EMP ({pulseCount})</span>
            </button>
          </div>
        </div>

        {/* Canvas Display Viewport */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onPointerMove={handleCanvasPointer}
            onPointerDown={handleCanvasPointer}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {/* Overlay: Ready to Play */}
          {gameState === "ready" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_30px_rgba(0,255,249,0.4)]">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                ZeroGlitch Reflex Arena
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mb-6 font-light">
                Use <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-cyan-400">A / D</kbd> or <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-cyan-400">Arrow Keys</kbd> or Drag Mouse / Touch to steer. Press <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-neon-purple">Spacebar</kbd> for EMP pulse!
              </p>
              <button
                type="button"
                onClick={startGame}
                className="px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-neon-purple to-cyan-500 text-white shadow-[0_0_25px_rgba(0,255,249,0.4)] hover:shadow-[0_0_35px_rgba(188,19,254,0.6)] transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Initialize Match</span>
              </button>
            </div>
          )}

          {/* Overlay: Game Over */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
              <div className="p-3 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 mb-3">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
                Shield Integrity Depleted
              </h3>
              <div className="font-mono text-xs text-zinc-400 mb-4">
                Final Score: <span className="text-cyan-400 font-bold text-base">{score}</span>
              </div>
              <button
                type="button"
                onClick={startGame}
                className="px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_25px_rgba(0,255,249,0.5)] transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Onscreen Touch Controller */}
        <div className="mt-4 flex sm:hidden items-center justify-between gap-3">
          <button
            onTouchStart={() => (keysRef.current.left = true)}
            onTouchEnd={() => (keysRef.current.left = false)}
            className="flex-1 py-4 rounded-xl bg-white/10 active:bg-cyan-500/30 font-mono font-bold text-sm text-white"
          >
            ◀ LEFT
          </button>
          <button
            onClick={triggerZeroGlitchPulse}
            disabled={pulseCount <= 0 || gameState !== "playing"}
            className="py-4 px-6 rounded-xl bg-neon-purple active:bg-neon-purple-dim text-white font-mono font-bold text-xs uppercase"
          >
            EMP
          </button>
          <button
            onTouchStart={() => (keysRef.current.right = true)}
            onTouchEnd={() => (keysRef.current.right = false)}
            className="flex-1 py-4 rounded-xl bg-white/10 active:bg-cyan-500/30 font-mono font-bold text-sm text-white"
          >
            RIGHT ▶
          </button>
        </div>

        {/* Technical Callout Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 pt-3 border-t border-white/5">
          <span>Engine: Custom Web Audio & HTML5 60Hz Loop</span>
          <span>Zero external game assets loaded • 100% Native Code</span>
        </div>
      </div>
    </section>
  );
}
