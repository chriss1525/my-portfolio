"use client";
import { useState, useEffect, useRef } from "react";
import { experience } from "../data/experience";
import Typewriter from "./Typewriter";

export default function Timeline() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Wait until section is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            setTimeout(() => setShowCommand(true), 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  const revealItems = () => {
    setShowContent(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleItems(count);
      if (count === experience.length) clearInterval(interval);
    }, 400); // Reveal one job every 400ms
  };

  return (
    <section ref={sectionRef} id="experience" className="w-full px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="max-w-4xl mx-auto terminal-window p-4 md:p-6 min-h-[200px]">
        <div className="relative">
          <div className="mb-8">
            {showCommand && (
              <div className="flex items-center gap-2">
                <span className="text-terminal-green font-mono">$</span>
                <Typewriter
                  text="cat ./experience.log"
                  speed={20}
                  showCursor={!showContent}
                  onComplete={() => setTimeout(revealItems, 300)}
                  className="text-terminal-green"
                />
              </div>
            )}
          </div>

          {showContent && (
            <div className="space-y-10">
              {experience.slice(0, visibleItems).map((item, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 border-l border-terminal-green/40 opacity-0"
                  style={{ animation: 'fadeUp 0.5s ease-out forwards' }}
                >
                  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-terminal-green rounded-full shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                  <h3 className="text-xl md:text-2xl font-mono text-terminal-amber mb-3">
                    {item.title}
                    {item.link !== "#" && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-terminal-cyan hover:text-terminal-amber transition-colors underline underline-offset-4"
                      >
                        Visit →
                      </a>
                    )}
                  </h3>
                  <div className="space-y-2">
                    {item.description.split("\n").map((line, i) => (
                      <p key={i} className="text-terminal-gray font-mono text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
