"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import Section from "./Section";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <Section id="contact" cmd="./contact" title="Say hello" intro="Hiring, collaborating, or want me to teach your team? Email is quickest.">
      <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold text-bg">
          <Mail className="h-4 w-4" /> {profile.email}
        </a>
        <button onClick={copy} className="rounded-md border border-line px-3 py-2 text-dim hover:border-accent hover:text-accent">
          {copied ? "copied ✓" : "copy"}
        </button>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-line px-3 py-2 hover:border-accent hover:text-accent">
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-line px-3 py-2 hover:border-accent hover:text-accent">
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a href={profile.cv} download className="rounded-md border border-line px-3 py-2 hover:border-accent hover:text-accent">
          CV (PDF)
        </a>
      </div>
      <p className="mt-16 font-mono text-xs text-dim">
        okoth@chriss:~$ <span className="text-accent">echo &quot;thanks for reading&quot;</span> · press ⌘K for the shell
      </p>
    </Section>
  );
}
