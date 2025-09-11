"use client";
import { useState } from 'react';
import Typewriter from './Typewriter';

interface Command {
  input: string;
  output: string | string[];
  delay?: number;
}

const TerminalCommands = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  
  const commands: Command[] = [
    {
      input: "curl -s https://api.github.com/users/chriss1525 | jq '.public_repos'",
      output: "42 repositories and counting...",
      delay: 1500
    },
    {
      input: "whoami",
      output: "christine@blockchain-developer:~$ Passionate Web3 Builder",
      delay: 800
    },
    {
      input: "echo $INTERESTS",
      output: ["Blockchain", "Smart Contracts", "Decentralized Finance", "AI Integration", "Sustainable Technology"],
      delay: 1000
    },
    {
      input: "ls -la ~/skills/",
      output: [
        "drwxr-xr-x  blockchain/  (Expert)",
        "drwxr-xr-x  rust/        (Advanced)",  
        "drwxr-xr-x  typescript/  (Advanced)",
        "drwxr-xr-x  solidity/    (Intermediate)",
        "drwxr-xr-x  motoko/      (Intermediate)"
      ]
    }
  ];

  const handleNext = () => {
    if (currentCommand < commands.length - 1) {
      setShowOutput(false);
      setTimeout(() => {
        setCurrentCommand(prev => prev + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentCommand > 0) {
      setShowOutput(false);
      setTimeout(() => {
        setCurrentCommand(prev => prev - 1);
      }, 300);
    }
  };

  const currentCmd = commands[currentCommand];

  return (
    <section className="w-full px-6 md:px-16 py-16 bg-terminal-bg">
      <div className="max-w-4xl mx-auto terminal-window p-6">
        <div className="mb-6">
          <h3 className="text-terminal-amber font-mono text-lg mb-4">
            Interactive Terminal Demo
          </h3>
          
          {/* Command Input */}
          <div className="flex items-start mb-4">
            <span className="text-terminal-green font-mono mr-2">$</span>
            <Typewriter 
              key={currentCommand}
              text={currentCmd.input}
              speed={50}
              showCursor={false}
              onComplete={() => setTimeout(() => setShowOutput(true), currentCmd.delay || 1000)}
              className="text-terminal-green"
            />
          </div>

          {/* Command Output */}
          {showOutput && (
            <div className="ml-4 space-y-1">
              {Array.isArray(currentCmd.output) ? (
                currentCmd.output.map((line, index) => (
                  <Typewriter
                    key={index}
                    text={line}
                    speed={30}
                    delay={index * 200}
                    showCursor={false}
                    className="text-terminal-cyan block"
                  />
                ))
              ) : (
                <Typewriter
                  text={currentCmd.output}
                  speed={40}
                  showCursor={false}
                  className="text-terminal-cyan"
                />
              )}
            </div>
          )}

          {/* Navigation */}
          {showOutput && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentCommand === 0}
                className="px-4 py-2 bg-black/60 border border-terminal-green text-terminal-green hover:border-terminal-amber hover:text-terminal-amber disabled:opacity-30 disabled:cursor-not-allowed font-mono text-sm transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentCommand === commands.length - 1}
                className="px-4 py-2 bg-black/60 border border-terminal-green text-terminal-green hover:border-terminal-amber hover:text-terminal-amber disabled:opacity-30 disabled:cursor-not-allowed font-mono text-sm transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TerminalCommands;
