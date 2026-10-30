"use client";

import Link from "next/link";
import { Moon, Sun, Terminal } from "lucide-react";
import { useSyncExternalStore } from "react";
import { currentTheme, setTheme, subscribeTheme } from "@/lib/prefs";
import { openShell } from "./TerminalCommands";

const sections = ["now", "projects", "experience", "skills", "writing", "contact"];

export default function Header() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => null);
  const toggle = () => setTheme(currentTheme() === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6" aria-label="Main">
        <Link href="#top" className="font-mono font-semibold text-accent">
          ~/{"chriss"}
        </Link>
        <div className="hidden gap-5 font-mono text-sm text-dim md:flex">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className="transition-colors hover:text-accent">
              {s}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-md border border-line p-1.5 text-dim transition-colors hover:text-accent"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={openShell}
            className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1 font-mono text-xs text-dim transition-colors hover:border-accent hover:text-accent"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>shell</span>
            <kbd className="hidden text-[10px] sm:inline">⌘K</kbd>
          </button>
        </div>
      </nav>
    </header>
  );
}
