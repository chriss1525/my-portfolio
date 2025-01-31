"use client";
import { useState } from "react";
import Header from "../components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";

export default function Home() {
  const [showExperiences, setShowExperiences] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Header onOpenExperiences={() => setShowExperiences(!showExperiences)} />
      <Hero onOpenExperiences={() => setShowExperiences(!showExperiences)} />
      <div
        className={`transition-all duration-500 ${
          showExperiences
            ? "opacity-100 h-auto"
            : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <Timeline />
      </div>
      <Skills />
    </main>
  );
}
