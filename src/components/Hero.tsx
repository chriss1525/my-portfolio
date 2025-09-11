"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Typewriter from "./Typewriter";

const Hero = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Start the sequence after a brief delay
    const timer = setTimeout(() => setShowPrompt(true), 150);
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

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="terminal-window max-w-6xl w-full p-8 mx-auto mt-16">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-terminal-green/30">
          <div className="w-3 h-3 bg-terminal-red rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-amber rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
          <span className="ml-4 text-terminal-gray text-sm font-mono">portfolio@christine:~$</span>
        </div>

        <div className="space-y-4">
          {/* Initial command */}
          {showPrompt && (
            <div className="flex items-start">
              <span className="text-terminal-green font-mono mr-2">$</span>
              <Typewriter 
                text="whoami"
                speed={25}
                showCursor={false}
                onComplete={() => setTimeout(() => setShowBio(true), 150)}
                className="text-terminal-green"
              />
            </div>
          )}

          {/* Bio output */}
          {showBio && (
            <div className="space-y-2">
              <pre className="text-terminal-green text-xs md:text-sm font-mono leading-tight opacity-60">
                {asciiArt}
              </pre>
              
              <div className="mt-4 space-y-2">
                <Typewriter 
                  text="Name: Christine Okoth"
                  speed={12}
                  showCursor={false}
                  className="text-terminal-green block"
                  delay={100}
                />
                <Typewriter 
                  text="Role: Blockchain Developer | Web3 Engineer | AI Explorer"
                  speed={12}
                  showCursor={false}
                  className="text-terminal-amber block"
                  delay={300}
                />
                <Typewriter 
                  text="Status: Active - Crafting secure, human-centered Web3 tools"
                  speed={12}
                  showCursor={false}
                  className="text-terminal-cyan block"
                  delay={600}
                />
                <Typewriter 
                  text="Mission: Building sustainable networks and smart economies"
                  speed={12}
                  showCursor={false}
                  className="text-terminal-white block"
                  delay={900}
                  onComplete={() => setTimeout(() => setShowImage(true), 250)}
                />
              </div>

              {/* Next command prompt */}
              {showImage && (
                <div className="mt-6">
                  <div className="flex items-start mb-4">
                    <span className="text-terminal-green font-mono mr-2">$</span>
                    <Typewriter 
                      text="cat profile.img"
                      speed={20}
                      showCursor={false}
                      className="text-terminal-green"
                    />
                  </div>
                  
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden border-2 border-terminal-green shadow-[0_0_20px_rgba(0,255,0,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300">
                        <Image
                          src="/christine.jpg"
                          alt="Christine Okoth - Blockchain Developer"
                          width={300}
                          height={300}
                          className="object-cover w-full h-full filter contrast-110 brightness-90 group-hover:brightness-100 transition-all duration-300"
                          priority
                        />
                      </div>
                      {/* Terminal-style border overlay */}
                      <div className="absolute inset-0 border-2 border-terminal-green rounded-lg pointer-events-none opacity-60"></div>
                    </div>
                  </div>

                  {/* Ready prompt */}
                  <div className="mt-6 flex items-center">
                    <span className="text-terminal-green font-mono mr-2">$</span>
                    <span className="text-terminal-green font-mono animate-blink">_</span>
                    <span className="ml-4 text-terminal-gray text-sm font-mono">Ready for commands...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
