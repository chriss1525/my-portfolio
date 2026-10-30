"use client";
import Image from "next/image";
import { useState } from "react";
import { archive, clientWork, projects, tags, type Project, type Tag } from "@/data/projects";
import Section from "./Section";

function Links({ p }: { p: Project }) {
  return (
    <span className="flex flex-wrap gap-4 font-mono text-xs">
      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">live →</a>}
      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">code →</a>}
    </span>
  );
}

function ProjectRow({ p }: { p: Project }) {
  return (
    <details id={`project-${p.slug}`} className="group border-b border-line [&_summary::-webkit-details-marker]:hidden">
      <summary className="grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-4 md:grid-cols-[13rem_minmax(0,1fr)_auto]">
        <span className="font-mono font-semibold text-accent">
          <span className="inline-block w-4 text-dim transition-transform group-open:rotate-90">›</span>
          {p.featured && <span className="text-second">★ </span>}
          {p.name}
        </span>
        <span className="order-3 col-span-2 text-sm text-dim md:order-none md:col-span-1">{p.summary}</span>
        <span className="font-mono text-xs tabular-nums text-dim">{p.year}</span>
      </summary>
      <div className="space-y-4 pb-6 pl-4 md:pl-[13rem]">
        <p className="font-mono text-xs text-dim">{p.stack.join(" · ")}</p>
        <Links p={p} />
        {p.images && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {p.images.map((src, i) => (
              <Image key={src} src={src} alt={`${p.name} screenshot ${i + 1}`} width={480} height={300}
                className="h-auto w-64 shrink-0 rounded-md border border-line md:w-80" />
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export default function Projects() {
  const [tag, setTag] = useState<Tag | "all">("all");
  const list = tag === "all" ? projects : projects.filter((p) => p.tags.includes(tag));

  return (
    <Section id="projects" cmd={`ls -la projects${tag === "all" ? "" : ` --tag=${tag}`}`} title="Projects"
      intro="Things I've built on my own or with a team. Open a row for the stack, links and screenshots.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2 font-mono text-xs" role="group" aria-label="Filter by tag">
            {(["all", ...tags] as const).map((t) => (
              <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t}
                className={`rounded-full border px-3 py-1 transition-colors ${tag === t ? "border-accent bg-accent text-bg" : "border-line bg-chip hover:border-accent"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-line">
            {list.map((p) => <ProjectRow key={p.slug} p={p} />)}
          </div>
          <p className="mt-3 font-mono text-xs text-dim">
            {list.length} of {projects.length} · ★ = start here
          </p>

          <details className="mt-8 [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer font-mono text-sm text-dim hover:text-accent">$ ls ~/archive · where I started</summary>
            <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {archive.map((a) => (
                <li key={a.name} className="text-sm">
                  <a href={a.repo} target="_blank" rel="noreferrer" className="font-mono text-accent hover:underline">{a.name}</a>
                  <span className="text-dim"> · {a.what}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <aside aria-labelledby="client-work" className="self-start rounded-lg border border-line bg-surface p-5">
          <h3 id="client-work" className="font-mono text-sm text-second">client work</h3>
          <p className="mt-1 text-xs text-dim">Built for clients. Described here, code stays with them.</p>
          <ul className="mt-4 space-y-5">
            {clientWork.map((p) => (
              <li key={p.slug} id={`project-${p.slug}`} className="space-y-1.5">
                <p className="font-mono font-semibold text-accent">{p.name}</p>
                <p className="text-sm">{p.summary}</p>
                <p className="text-xs text-second">{p.role}</p>
                <p className="font-mono text-[11px] text-dim">{p.stack.join(" · ")} · {p.year}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
