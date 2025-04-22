"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

interface HeaderProps {
  onOpenExperiences: () => void;
}

export default function Header({ onOpenExperiences }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-lg shadow-sm">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Christine Okoth
        </Link>
        <div className="flex space-x-6">
          <button 
            onClick={onOpenExperiences} 
            className="hover:text-blue-500 flex items-center gap-1"
          >
            Experience
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link href="#skills" className="hover:text-blue-500">
            Skills
          </Link>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/chriss1525"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="hover:text-blue-500" />
          </a>
          <a
            href="https://linkedin.com/in/christine-okoth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="hover:text-blue-500" />
          </a>
          <a href="mailto:okothchris15@gmail.com">
            <Mail className="hover:text-blue-500" />
          </a>
        </div>
      </nav>
    </header>
  );
}
