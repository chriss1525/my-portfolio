"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Typewriter from "./Typewriter";

const Hero = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 300); // start sequence
    return () => clearTimeout(timer);
  }, []);

  const asciiArt = `
     ██████╗██╗  ██╗██████╗ ██╗███████╗████████╗██╗███╗   ██╗███████╗
    ██╔════╝██║  ██║██╔══██╗██║██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝
    ██║     ███████║██████╔╝██║███████╗   ██║   ██║██╔██╗ ██║█████╗  
    ██║     ██╔══██║██╔══██╗██║╚════██║   ██║   ██║██║╚██╗██║██╔══╝  
    ╚██████╗██║  ██║██║  ██║██║███████║   ██║   ██║██║ ╚████║███████╗
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝
  `;

  const roles = "Role: Software Engineer | Blockchain Developer | Educator";
  const status = "Status: Building onchain, exploring the EVM | Code, coffee, and curiosity";
  const mission = "Mission: Bridging African innovation with global Web3 infrastructure";

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="terminal-window max-w-6xl w-full p-8 mx-auto mt-16">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-terminal-green/30">
          <div className="w-3 h-3 bg-terminal-red rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-amber rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
          <span className="ml-4 text-terminal-gray text-sm font-mono">~/chains/icp/eth/celo</span>
        </div>

        <div className="space-y-4">
          {/* 1) whoami */}
          {step >= 1 && (
            <div className="flex items-start">
              <span className="text-terminal-green font-mono mr-2">$</span>
              <Typewriter
                key="whoami"
                text="whoami"
                speed={20}
                showCursor={false}
                onComplete={() => setTimeout(() => setStep(2), 120)}
                className="text-terminal-green"
              />
            </div>
          )}

          {/* 2) ASCII + Name */}
          {step >= 2 && (
            <div className="space-y-2">
              <pre className="text-terminal-green text-xs md:text-sm font-mono leading-tight opacity-60">
                {asciiArt}
              </pre>
              <Typewriter
                key="name"
                text="Name: Christine Okoth"
                speed={12}
                showCursor={false}
                className="text-terminal-green block"
                onComplete={() => setTimeout(() => setStep(3), 120)}
              />
            </div>
          )}

          {/* 3) Roles */}
          {step >= 3 && (
            <div className="space-y-2">
              <Typewriter
                key="roles"
                text={roles}
                speed={12}
                showCursor={false}
                className="text-terminal-amber block"
                onComplete={() => setTimeout(() => setStep(4), 150)}
              />
            </div>
          )}

          {/* 4) Status */}
          {step >= 4 && (
            <Typewriter
              key="status"
              text={status}
              speed={12}
              showCursor={false}
              className="text-terminal-cyan block"
              onComplete={() => setTimeout(() => setStep(5), 120)}
            />
          )}

          {/* 5) Mission */}
          {step >= 5 && (
            <Typewriter
              key="mission"
              text={mission}
              speed={12}
              showCursor={false}
              className="text-terminal-white block"
              onComplete={() => setTimeout(() => setStep(6), 150)}
            />
          )}

          {/* 6) profile image */}
          {step >= 6 && (
            <div className="mt-6">
              <div className="flex items-start mb-4">
                <span className="text-terminal-green font-mono mr-2">$</span>
                <Typewriter
                  key="img-cmd"
                  text="cat profile.img"
                  speed={18}
                  showCursor={false}
                  className="text-terminal-green"
                />
              </div>

              <div className="flex justify-center">
                <div className="relative group">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden border-2 border-terminal-green shadow-[0_0_20px_rgba(0,255,0,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300">
                    <Image
                      src="/christine.jpg"
                      alt="Christine Okoth - Software Engineer, Blockchain Developer, Educator"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full filter contrast-110 brightness-90 group-hover:brightness-100 transition-all duration-300"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 border-2 border-terminal-green rounded-lg pointer-events-none opacity-60"></div>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <span className="text-terminal-green font-mono mr-2">$</span>
                <span className="text-terminal-green font-mono animate-blink">_</span>
                <span className="ml-4 text-terminal-gray text-sm font-mono">Ready for commands...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
