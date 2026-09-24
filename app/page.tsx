"use client";

import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GamesShowcase from "@/components/GamesShowcase";
import ReflexArenaGame from "@/components/ReflexArenaGame";
import ProjectEstimator from "@/components/ProjectEstimator";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";
import AboutStudio from "@/components/AboutStudio";
import ContactRFP from "@/components/ContactRFP";
import Footer from "@/components/Footer";

export default function Home() {
  const [estimateSpec, setEstimateSpec] = useState("");

  const handleApplyEstimate = (spec: string) => {
    setEstimateSpec(spec);
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-neon-purple selection:text-white overflow-hidden bg-cyber-grid">
      {/* Background Interactive Particles with Resource-Pausing */}
      <ParticleBackground />

      {/* Persistent Audio-Interactive Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Game Development Solutions & Services */}
        <Services />

        {/* Portfolio Games & Originals */}
        <GamesShowcase />

        {/* Interactive Playable Browser Arcade Mini-Game */}
        <ReflexArenaGame />

        {/* Project Scope & Ballpark Budget Estimator */}
        <ProjectEstimator onApplyEstimateToForm={handleApplyEstimate} />

        {/* Technology Ecosystem & Architecture Standards */}
        <TechStack />

        {/* Technical Case Studies & Optimization Deep Dives */}
        <CaseStudies />

        {/* Studio Origins, 3 Veteran Leads, & Manifesto */}
        <AboutStudio />

        {/* Request for Proposal & Consultation Form */}
        <ContactRFP initialSpec={estimateSpec} />
      </main>

      {/* Comprehensive Studio Footer */}
      <Footer />
    </div>
  );
}
