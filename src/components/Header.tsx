"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ChevronDown, Terminal } from "lucide-react";

interface HeaderProps {
  onShowExperience: () => void;
  onShowSkills: () => void;
}

export default function Header({ onShowExperience, onShowSkills }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-terminal-bg/95 border-b border-terminal-green/30 backdrop-blur-sm">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Terminal-style logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Terminal className="w-6 h-6 text-terminal-green group-hover:text-terminal-amber transition-colors" />
          <span className="text-lg font-mono text-terminal-green group-hover:text-terminal-amber transition-colors">
            ~/Chriss
          </span>
        </Link>
        
        {/* Navigation */}
        <div className="flex space-x-6 font-mono">
          <button onClick={onShowExperience} className="text-terminal-green hover:text-terminal-amber transition-colors">
            <span className="text-terminal-gray">./</span>experience
          </button>
          <button onClick={onShowSkills} className="text-terminal-green hover:text-terminal-amber transition-colors">
            <span className="text-terminal-gray">./</span>skills
          </button>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/chriss1525"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:text-terminal-amber transition-colors hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/christine-okoth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:text-terminal-amber transition-colors hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] group"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="mailto:okothchris15@gmail.com"
            className="text-terminal-green hover:text-terminal-amber transition-colors hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] group"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </nav>
      
      {/* Terminal-style bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-50"></div>
    </header>
  );
}
