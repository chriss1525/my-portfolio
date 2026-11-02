"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { allProjects, clientWork, learning, levellingUp, onChain } from "@/data/projects";
import { skillsByCategory } from "@/data/skills";

const homeFiles = ["now.md", "projects/", "experience.log", "skills/", "writing.md", "CHRISTINE_OKOTH.pdf", "scan_skills.sh"];
const commands = [
  "help", "whoami", "man", "ls", "cd", "pwd", "cat", "open", "projects", "experience", "skills", "writing",
  "contact", "download", "funfact", "coffee", "history", "echo", "clear", "exit",
];
const whoami = [
  "Fullstack engineer: backend systems, AI knowledge tools and smart contracts.",
  "Rust, TypeScript and Solidity, with a soft spot for Postgres.",
  "A teacher at heart: the web, how software gets built, and Web3 once you're ready.",
  "A critical thinker with a soft spot for crossing tech with real-world use.",
];
const slugs = allProjects.map((p) => p.slug);

interface Line {
  input: string;
  dir: string;
  output: React.ReactNode;
}

const C = {
  ok: "text-fg",
  info: "text-blue",
  dim: "text-dim",
  err: "text-coral",
  hi: "text-green",
};

function dirOf(cwd: string, arg?: string) {
  const a = arg?.replace(/\/$/, "");
  if (!a || a === "~") return "~";
  if (a === "..") return cwd === "~" ? "~" : cwd.split("/").slice(0, -1).join("/") || "~";
  const target = a.startsWith("~/") ? a : cwd === "~" ? `~/${a}` : `${cwd}/${a}`;
  if (target === "~/projects" || target === "~/skills") return target;
  if (target.startsWith("~/projects/") && slugs.includes(target.slice(11))) return target;
  return null;
}

function listing(dir: string): string[] {
  if (dir === "~") return homeFiles;
  if (dir === "~/projects") return slugs.map((s) => `${s}/`);
  if (dir === "~/skills") return Object.keys(skillsByCategory).map((c) => `${c}.txt`);
  if (dir.startsWith("~/projects/")) return ["README.md"];
  return [];
}

function ProjectCard({ slug }: { slug: string }) {
  const p = allProjects.find((x) => x.slug === slug)!;
  return (
    <div className="space-y-1">
      <p className={C.hi}>{p.name} <span className={C.dim}>· {p.year}{p.client ? " · client work" : p.stage ? ` · ${p.stage}` : ""}</span></p>
      <p>{p.summary}</p>
      {p.story && <p className="italic">“{p.story}”</p>}
      {p.role && <p className={C.info}>{p.role}</p>}
      <p className={C.dim}>{p.stack.join(" · ")}</p>
      {(p.repo || p.live) && (
        <p className="flex gap-4">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className={`${C.info} underline`}>[live]</a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className={`${C.info} underline`}>[code]</a>}
        </p>
      )}
    </div>
  );
}

const ExperienceLog = () => (
  <div className="space-y-3">
    {experience.map((r) => (
      <div key={r.company}>
        <p><span className={C.info}>{r.start} → {r.end}</span> <span className={C.hi}>{r.title} @ {r.company}</span></p>
        {r.points.map((pt) => <p key={pt} className={`${C.dim} pl-4`}>› {pt}</p>)}
      </div>
    ))}
  </div>
);

const WritingLinks = () => (
  <div className="space-y-1">
    <p><span className={C.info}>Medium:</span> <a href={profile.links.medium} target="_blank" rel="noreferrer" className="underline">technical deep dives &amp; Web3 tutorials</a></p>
    <p><span className={C.info}>Substack:</span> <a href={profile.links.substack} target="_blank" rel="noreferrer" className="underline">Musings of a Mad Woman</a></p>
    <p className={`${C.dim} text-xs italic`}>Warning: the Substack contains high levels of honesty and zero semicolons.</p>
  </div>
);

function HomeListing() {
  return (
    <p className="flex flex-wrap gap-x-5">
      {listing("~").map((f) => <span key={f} className={f.endsWith("/") ? C.hi : f.endsWith(".sh") ? C.info : ""}>{f}</span>)}
    </p>
  );
}

function ProjectList() {
  const groups = [
    ["where I started", learning],
    ["levelling up", levellingUp],
    ["built on-chain", onChain],
    ["client work", clientWork],
  ] as const;
  return (
    <div className="space-y-2">
      {groups.map(([label, list]) => (
        <div key={label}>
          <p className={C.info}># {label}</p>
          {list.map((p) => (
            <p key={p.slug}>
              <span className={`${C.hi} inline-block w-56 max-w-[45%] align-top`}>{p.slug}/</span>
              <span className={C.dim}>{p.summary.split(". ")[0].replace(/\.$/, "")}</span>
            </p>
          ))}
        </div>
      ))}
      <p className={C.dim}>cat projects/&lt;name&gt; for the story, open &lt;name&gt; to visit it.</p>
    </div>
  );
}

/** What the window shows on arrival, as if these were just typed. */
const intro: Line[] = [
  { input: "whoami", dir: "~", output: <p>{whoami[0]}</p> },
  { input: "ls", dir: "~", output: <HomeListing /> },
  { input: "projects", dir: "~", output: <ProjectList /> },
];

/** The terminal side: a full-page shell over the same content as the play side. */
export default function TerminalCommands() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(intro);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const counters = useRef({ whoami: 1, funfact: 0 });

  // ⌘K / Ctrl+K flips back to the play side.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
  useEffect(() => {
    if (lines !== intro) endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const run = useCallback(
    (raw: string): React.ReactNode | null => {
      const [cmdRaw, ...args] = raw.split(/\s+/);
      const cmd = cmdRaw.toLowerCase();
      const arg = args[0]?.toLowerCase();

      switch (cmd) {
        case "help":
          return (
            <div className="space-y-0.5">
              <p className={C.info}>Commands (Tab completes, ↑↓ for history):</p>
              {[
                ["whoami", "a one-line summary (try it again)"],
                ["man chriss", "the longer story"],
                ["ls / cd / cat / pwd", "look around: try cat now.md"],
                ["open <name>", "visit a project, or open play for the chess side"],
                ["projects, experience, skills, writing", "print a section here"],
                ["contact, download", "get in touch or grab the CV"],
                ["funfact, coffee", "for fun"],
                ["clear, exit", "exit flips to the play side"],
              ].map(([c, d]) => (
                <p key={c}><span className={`${C.hi} inline-block w-64 max-w-[55%] align-top`}>{c}</span><span className={C.dim}>{d}</span></p>
              ))}
            </div>
          );
        case "whoami":
          return <p>{whoami[counters.current.whoami++ % whoami.length]}</p>;
        case "man":
          if (arg !== "chriss" && arg !== "christine") return <p className={C.err}>No manual entry for {args[0] ?? "nothing"}. Try: man chriss</p>;
          return (
            <div className="space-y-2">
              <p className={C.hi}>CHRISS(1)</p>
              <p><span className={C.info}>NAME</span><br />&nbsp;&nbsp;{profile.fullName}: {profile.title.toLowerCase()}, teacher, writer</p>
              <p><span className={C.info}>SYNOPSIS</span><br />&nbsp;&nbsp;chriss [--backend] [--ai] [--web3] [--teach]</p>
              <div><span className={C.info}>DESCRIPTION</span>{profile.story.map((s) => <p key={s} className="pl-4">{s}</p>)}</div>
              <div><span className={C.info}>EDUCATION</span>{profile.education.map((e) => <p key={e.title} className="pl-4">{e.title}, {e.school}</p>)}</div>
              <p><span className={C.info}>LANGUAGES</span><br />&nbsp;&nbsp;{profile.languages.join(", ")}</p>
              <p><span className={C.info}>SEE ALSO</span><br />&nbsp;&nbsp;funfact(1), contact(1)</p>
            </div>
          );
        case "pwd":
          return <p>/home/okoth/chriss{cwd.slice(1)}</p>;
        case "ls": {
          const dir = dirOf(cwd, args[0]);
          if (!dir) return <p className={C.err}>ls: cannot access &apos;{args[0]}&apos;: No such file or directory</p>;
          return (
            <p className="flex flex-wrap gap-x-5">
              {listing(dir).map((f) => <span key={f} className={f.endsWith("/") ? C.hi : f.endsWith(".sh") ? C.info : ""}>{f}</span>)}
            </p>
          );
        }
        case "cd": {
          const dir = dirOf(cwd, args[0]);
          if (!dir) return <p className={C.err}>cd: {args[0]}: No such file or directory</p>;
          setCwd(dir);
          return null;
        }
        case "cat": {
          if (!arg) return <p className={C.err}>Usage: cat [file]</p>;
          const path = arg.replace(/^~\//, "");
          const inProject = cwd.startsWith("~/projects/") ? cwd.slice(11) : null;
          const projectSlug =
            (inProject && (path === "readme.md" || path === "readme") && inProject) ||
            (path.startsWith("projects/") && path.split("/")[1]) ||
            (cwd === "~/projects" && path.replace(/\/.*$/, ""));
          if (projectSlug && slugs.includes(projectSlug)) return <ProjectCard slug={projectSlug} />;
          const skill = path.replace(/^skills\//, "").replace(/\.txt$/, "");
          if ((cwd === "~/skills" || path.startsWith("skills/")) && skill in skillsByCategory)
            return <p className="flex flex-wrap gap-2">{skillsByCategory[skill].map((s) => <span key={s.name} className="rounded border border-line px-2">✓ {s.name}</span>)}</p>;
          if (cwd !== "~") return <p className={C.err}>cat: {args[0]}: No such file or directory</p>;
          if (path === "now.md") return <ProjectCard slug="robin" />;
          if (path === "experience.log" || path === "experience") return <ExperienceLog />;
          if (path === "writing.md") return <WritingLinks />;
          if (path === "christine_okoth.pdf")
            return <p className={C.dim}>This is a PDF, and it prints as gibberish. Try <span className={C.hi}>download</span>.</p>;
          if (path === "scan_skills.sh")
            return <pre className={C.dim}>{"#!/bin/bash\necho \"Initializing skill verification...\"\nfind ./skills -type f -exec cat {} \;"}</pre>;
          if (path === "projects" || path === "skills" || path.endsWith("/")) return <p className={C.err}>cat: {args[0]}: Is a directory</p>;
          return <p className={C.err}>cat: {args[0]}: No such file or directory</p>;
        }
        case "./scan_skills.sh":
          return <p className="flex flex-wrap gap-x-4">{Object.values(skillsByCategory).flat().map((s) => <span key={s.name}><span className={C.info}>[OK]</span> {s.name}</span>)}</p>;
        case "open": {
          if (!arg) return <p className={C.err}>Usage: open &lt;play|project&gt;</p>;
          if (arg === "play") {
            router.push("/");
            return <p className={C.dim}>Flipping to the play side…</p>;
          }
          const p = allProjects.find((x) => x.slug === arg);
          if (!p) return <p className={C.err}>open: {args[0]}: nothing by that name. Try ls projects.</p>;
          const url = p.live ?? p.repo;
          if (!url) return <p className={C.dim}>{p.name} is client work: the code stays with them. Try cat projects/{p.slug}.</p>;
          window.open(url, "_blank", "noopener");
          return <p className={C.dim}>Opening {url}…</p>;
        }
        case "projects":
          return <ProjectList />;
        case "experience":
          return <ExperienceLog />;
        case "skills":
          return (
            <div>
              {Object.entries(skillsByCategory).map(([c, s]) => (
                <p key={c}>drwxr-xr-x&nbsp; <span className={C.hi}>{c}/</span> <span className={C.dim}>({s.map((x) => x.name).join(", ")})</span></p>
              ))}
            </div>
          );
        case "writing":
        case "blogs":
          return <WritingLinks />;
        case "contact":
          return (
            <div>
              <p>Email:&nbsp;&nbsp;&nbsp; <a href={`mailto:${profile.email}`} className={C.hi}>{profile.email}</a></p>
              <p>GitHub:&nbsp;&nbsp; <a href={profile.links.github} target="_blank" rel="noreferrer" className={C.hi}>github.com/chriss1525</a></p>
              <p>LinkedIn: <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={C.hi}>linkedin.com/in/christine-okoth</a></p>
            </div>
          );
        case "download":
        case "cv": {
          const a = document.createElement("a");
          a.href = profile.cv;
          a.download = "CHRISTINE_OKOTH.pdf";
          setTimeout(() => a.click(), 400);
          return <p className={C.info}>Downloading CHRISTINE_OKOTH.pdf…</p>;
        }
        case "funfact":
          return <p>{profile.funfacts[counters.current.funfact++ % profile.funfacts.length]}</p>;
        case "history":
          return <div>{past.map((h, i) => <p key={i}><span className={C.dim}>{String(i + 1).padStart(4)}</span>&nbsp; {h}</p>)}</div>;
        case "echo":
          return <p>{args.join(" ")}</p>;
        case "sudo":
          return <p className={C.err}>chriss is not in the sudoers file. This incident will be reported.</p>;
        case "rm": {
          const target = args.filter((a) => !a.startsWith("-"))[0]?.toLowerCase();
          if (!target) return <p className={C.err}>rm: missing operand</p>;
          const msg =
            target === "experience.log" ? "Deleting my past won't give me a future with you. Permission denied." :
            target === "christine_okoth.pdf" ? "File is currently being read by a potential employer. Try again after I'm hired!" :
            target === "scan_skills.sh" ? "Self-preservation protocol active. This script is too pretty to die." :
            target.startsWith("skills") || target.startsWith("projects") ? "Is a directory. Use rmdir (but please don't)." :
            "No such file or directory. Are you trying to delete my hopes and dreams?";
          return <p className={C.err}>rm: cannot remove &apos;{target}&apos;: {msg}</p>;
        }
        case "rmdir":
          if (!arg) return <p className={C.err}>rmdir: missing operand</p>;
          return arg.replace(/\/$/, "") === "skills" || arg.replace(/\/$/, "") === "projects" ? (
            <div className={C.err}><p>rmdir: failed to remove &apos;{arg}&apos;: Directory not empty.</p><p className="text-xs italic opacity-70">Also, why would you want to delete my talent?</p></div>
          ) : (
            <p className={C.err}>rmdir: failed to remove &apos;{arg}&apos;: No such directory.</p>
          );
        case "coffee":
          return (
            <pre className={`${C.info} text-xs leading-tight`}>{`
   (  )   (   )  )
    ) (   )  (  (
    ( )  (    ) )
    _____________
   <_____________> ___
   |             |/ _ \\
   |               | | |
   |               |_| |
  ___|             |\\___/
 /    \\___________/    \\
 \\_____________________/`}</pre>
          );
        default:
          return <p className={C.err}>Command not found: {cmd}. Type &apos;help&apos; for available commands.</p>;
      }
    },
    [cwd, past, router],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    setInput("");
    setCursor(null);
    if (!raw) return;
    setPast((p) => [...p, raw]);
    const cmd = raw.split(/\s+/)[0].toLowerCase();
    if (cmd === "clear") return setLines([]);
    if (cmd === "exit") return router.push("/");
    setLines((l) => [...l, { input: raw, dir: cwd, output: run(raw) }]);
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      const hits = commands.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (hits.length === 1) setInput(`${hits[0]} `);
      else if (hits.length > 1) setLines((l) => [...l, { input, dir: cwd, output: <p className={C.dim}>{hits.join("  ")}</p> }]);
      return;
    }
    const cmd = parts[0].toLowerCase();
    const word = parts[parts.length - 1];
    const pool =
      cmd === "open" ? ["play", ...slugs] :
      cmd === "man" ? ["chriss"] :
      cmd === "cd" ? listing(cwd).filter((f) => f.endsWith("/")) :
      listing(cwd);
    const hits = pool.filter((c) => c.toLowerCase().startsWith(word.toLowerCase()));
    if (hits.length === 1) setInput([...parts.slice(0, -1), hits[0]].join(" "));
    else if (hits.length > 1) setLines((l) => [...l, { input, dir: cwd, output: <p className={C.dim}>{hits.join("  ")}</p> }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const i = cursor === null ? past.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setInput(past[i]);
    } else if (e.key === "ArrowDown" && cursor !== null) {
      e.preventDefault();
      const i = cursor + 1;
      setCursor(i < past.length ? i : null);
      setInput(i < past.length ? past[i] : "");
    }
  };

  const prompt = (dir: string) => (
    <span className="whitespace-nowrap">
      <span className="font-semibold text-green">okoth@chriss</span>
      <span className="text-dim">:</span>
      <span className="font-semibold text-blue">{dir}</span>
      <span className="text-dim">$</span>
    </span>
  );

  return (
    <div
      className="overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_var(--line),0_24px_70px_rgba(0,0,0,.6)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="relative flex h-[38px] items-center border-b border-line bg-raised px-3.5">
        <span className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 font-sans text-[13px] font-semibold text-dim">~/chriss</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-sm leading-relaxed md:p-6">
        <pre aria-label="CHRISS" className="overflow-x-auto text-[clamp(7px,1.6vw,13px)] leading-[1.1] text-blue">{` ██████╗ ██╗  ██╗██████╗ ██╗███████╗███████╗
██╔════╝ ██║  ██║██╔══██╗██║██╔════╝██╔════╝
██║      ███████║██████╔╝██║███████╗███████╗
██║      ██╔══██║██╔══██╗██║╚════██║╚════██║
╚██████╗ ██║  ██║██║  ██║██║███████║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝`}</pre>
        <div className="text-dim">
          <p>chriss-os 2.0 · fullstack engineer · teacher · writer</p>
          <p>
            Type <span className="font-semibold text-blue">help</span>, or flip to the play side above.
          </p>
        </div>
        {lines.map((l, i) => (
          <div key={i} className="space-y-1">
            <p className="break-all">
              {prompt(l.dir)} {l.input}
            </p>
            {l.output && <div>{l.output}</div>}
          </div>
        ))}
        <form onSubmit={submit} className="flex items-center gap-2">
          <label htmlFor="shell-input">{prompt(cwd)}</label>
          <input
            ref={inputRef}
            id="shell-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="try: whoami, cat projects, funfact, sudo, coffee"
            className="min-w-0 flex-1 bg-transparent text-fg caret-[var(--coral)] outline-none placeholder:text-[#6a6a72]"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}
