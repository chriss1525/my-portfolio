"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import MatrixRain from "./MatrixRain";
import Typewriter from "./Typewriter";
import { openShell } from "./TerminalCommands";

/** Typing plays once per visit; reduced motion or a repeat visit shows it typed. Decided once, on first read. */
let playHero: boolean | undefined;
function shouldPlay() {
  if (playHero === undefined) {
    try {
      playHero = !matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem("hero-played");
      sessionStorage.setItem("hero-played", "1");
    } catch {
      playHero = false;
    }
  }
  return playHero;
}
const noSubscribe = () => () => {};

export default function Hero() {
  const play = useSyncExternalStore(noSubscribe, shouldPlay, () => false);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="top" className="relative overflow-hidden">
      {play && <MatrixRain />}
      <div className="relative grid gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div className="min-w-0">
          <p className="font-mono text-sm text-dim">
            <span className="text-accent">okoth@chriss</span>:~${" "}
            {play ? <Typewriter text="whoami" speed={90} delay={200} /> : <>whoami</>}
            <span className="cursor ml-1" aria-hidden="true" />
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-tighter">
            Christine
            <br />
            Okoth
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg">{profile.pitch}</p>
          <p className="mt-6 border-l-[3px] border-accent bg-chip px-4 py-2 font-mono text-sm">
            <span className="text-second">now →</span> {profile.now.label} · {profile.now.stack}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 font-mono text-sm">
            <a href="#projects" className="rounded-md bg-accent px-4 py-2 font-semibold text-bg">
              ls projects
            </a>
            <a href={profile.cv} download className="rounded-md border border-accent px-4 py-2 text-accent">
              cat cv.pdf
            </a>
            <button onClick={openShell} className="rounded-md border border-accent px-4 py-2 text-accent">
              open shell
            </button>
          </div>
        </div>

        <div className="self-start rounded-lg border border-line bg-bg/80 p-4 font-mono text-[13px] backdrop-blur-sm">
          <p className="mb-1 text-dim">$ ls ~/projects --featured</p>
          {featured.map((p) => (
            <a
              key={p.slug}
              href={`#project-${p.slug}`}
              className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 border-b border-dashed border-line py-2.5 last:border-0"
            >
              <span className="font-semibold text-accent">{p.slug}/</span>
              <span className="text-right text-second">
                {p.year} · {p.tags[0]}
              </span>
              <span className="col-span-2 font-sans text-sm text-dim">{p.summary.split(". ")[0].replace(/\.$/, "")}.</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
