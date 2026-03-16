"use client";
import { useState } from "react";
import Header from "../components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import MatrixRain from "@/components/MatrixRain";
// import Contact from "@/components/Contact";

export default function Home() {
  const [showExperience, setShowExperience] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const handleShowExperience = () => {
    setShowExperience(true);
    // Give the DOM a tiny moment to render the section before scrolling to it
    setTimeout(() => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShowSkills = () => {
    setShowSkills(true);
    setTimeout(() => {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const revealAll = () => {
    setShowExperience(true);
    setShowSkills(true);
  };

  return (
    <main className="relative min-h-screen crt-effect">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      <Header onShowExperience={handleShowExperience} onShowSkills={handleShowSkills} />
      <Hero onSkip={revealAll} />
      
      {showExperience && <Timeline />}
      
      {showSkills && <Skills />}
      {/* <Contact /> */}
    </main>
  );
}
