"use client";

import { experience } from "../data/experience";

interface TimelineProps {
  onClose: () => void;
}

export default function Timeline({ onClose }: TimelineProps) {
  return (
    <section className="w-full px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="max-w-4xl mx-auto terminal-window p-6">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-6 -top-2 text-terminal-gray hover:text-terminal-amber transition-colors font-mono"
          >
            ✕ close
          </button>

          <div className="flex items-center gap-2 mb-8">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-terminal-green font-mono">cat ./experience.log</span>
          </div>

          <div className="space-y-10">
            {experience.map((item, index) => (
              <div key={index} className="relative pl-8 border-l border-terminal-green/40">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-terminal-green rounded-full shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                <h3 className="text-xl md:text-2xl font-mono text-terminal-amber mb-3">
                  {item.title}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-terminal-cyan hover:text-terminal-amber transition-colors underline underline-offset-4"
                  >
                    Visit →
                  </a>
                </h3>
                <div className="space-y-2">
                  {item.description.split("\n").map((line, i) => (
                    <p key={i} className="text-terminal-green/90 font-mono">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
