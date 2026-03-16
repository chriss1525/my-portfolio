"use client";
import React, { useState, useEffect } from "react";
import Typewriter from "./Typewriter";
import TerminalCommands from "./TerminalCommands";

interface HeroProps {
  onSkip?: () => void;
}

const Hero = ({ onSkip }: HeroProps) => {
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 300); // start sequence
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setSkipped(true);
    setStep(6);
    if (onSkip) onSkip();
  };

  const asciiArt = `
     ██████╗ ██╗  ██╗██████╗ ██╗███████╗███████╗
    ██╔════╝ ██║  ██║██╔══██╗██║██╔════╝██╔════╝
    ██║      ███████║██████╔╝██║███████╗███████╗
    ██║      ██╔══██║██╔══██╗██║╚════██║╚════██║
    ╚██████╗ ██║  ██║██║  ██║██║███████║███████║
     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
  `;

  const roles = "Role: Fullstack Software Engineer | Web3 Developer | Educator";
  const status = "Status: Architecting scalable backend systems | Code, coffee, and continuous learning";
  const mission = "Mission: Building robust, innovative software solutions that solve real-world problems";

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="terminal-window max-w-6xl w-full p-8 mx-auto mt-16">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-terminal-green/30">
          <div className="w-3 h-3 bg-terminal-red rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-amber rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
        </div>
        
        {/* Escape Hatch Button */}
        {step < 6 && (
          <button 
            onClick={handleSkip} 
            className="absolute top-6 right-6 text-terminal-gray hover:text-terminal-white text-xs font-mono border border-terminal-gray/30 px-2 py-1 rounded transition-colors z-10 bg-terminal-bg/80"
          >
            [Skip Animation]
          </button>
        )}

        <div className="space-y-4">
          {/* 1) whoami */}
          {step >= 1 && (
            <div className="flex items-start">
              <span className="text-terminal-green font-mono mr-2">$</span>
              {skipped ? (
                <span className="text-terminal-green font-mono">whoami</span>
              ) : (
                <Typewriter
                  key="whoami"
                  text="whoami"
                  speed={20}
                  showCursor={false}
                  onComplete={() => setTimeout(() => setStep(2), 120)}
                  className="text-terminal-green"
                />
              )}
            </div>
          )}

          {/* 2) ASCII + Name */}
          {step >= 2 && (
            <div className="space-y-2">
              <pre className="text-terminal-green text-xs md:text-sm font-mono leading-tight opacity-60">
                {asciiArt}
              </pre>
              {skipped ? (
                <span className="text-terminal-green block font-mono">Name: Christine Adhiambo Okoth</span>
              ) : (
                <Typewriter
                  key="name"
                  text="Name: Christine Okoth"
                  speed={12}
                  showCursor={false}
                  className="text-terminal-green block"
                  onComplete={() => setTimeout(() => setStep(3), 120)}
                />
              )}
            </div>
          )}

          {/* 3) Roles */}
          {step >= 3 && (
            <div className="space-y-2">
              {skipped ? (
                <span className="text-terminal-amber block font-mono">{roles}</span>
              ) : (
                <Typewriter
                  key="roles"
                  text={roles}
                  speed={12}
                  showCursor={false}
                  className="text-terminal-amber block"
                  onComplete={() => setTimeout(() => setStep(4), 150)}
                />
              )}
            </div>
          )}

          {/* 4) Status */}
          {step >= 4 && (
            skipped ? (
              <span className="text-terminal-cyan block font-mono">{status}</span>
            ) : (
              <Typewriter
                key="status"
                text={status}
                speed={12}
                showCursor={false}
                className="text-terminal-cyan block"
                onComplete={() => setTimeout(() => setStep(5), 120)}
              />
            )
          )}

          {/* 5) Mission */}
          {step >= 5 && (
            skipped ? (
              <span className="text-terminal-white block font-mono">{mission}</span>
            ) : (
              <Typewriter
                key="mission"
                text={mission}
                speed={12}
                showCursor={false}
                className="text-terminal-white block"
                onComplete={() => setTimeout(() => setStep(6), 150)}
              />
            )
          )}

          {/* 6) Ready prompt */}
          {step >= 6 && (
            <div className="mt-6 pt-6 border-t border-terminal-green/30 animate-in fade-in duration-500">
              <TerminalCommands />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
