import Link from "next/link";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { allProjects, clientWork, learning, levellingUp, onChain, type Project } from "@/data/projects";
import { projectsUsing, skillsByCategory } from "@/data/skills";
import type { Post } from "@/lib/feeds";

export interface Writing {
  medium: Post[];
  substack: Post[];
}

const mono = "font-mono";
const label = "mt-6 mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] opacity-80";
const heading = "mt-1.5 font-display text-[28px] font-extrabold leading-[1.05] text-balance md:text-[30px]";

function Now() {
  return (
    <span className="inline-block rounded-full bg-[#1b1b1f] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[#ffd500] align-[2px]">
      I work here right now
    </span>
  );
}

function Panel({ tint, children }: { tint: string; children: React.ReactNode }) {
  return <div className={`rounded-lg px-3.5 py-3 ${tint}`}>{children}</div>;
}

/** A project with where it came from and the story behind it. */
function ProjectStories({ list, tint }: { list: Project[]; tint: string }) {
  return (
    <div className="mt-4 flex flex-col gap-2.5 text-[13.5px]">
      {list.map((p) => (
        <Panel key={p.slug} tint={tint}>
          <p className="flex flex-wrap items-baseline justify-between gap-x-3">
            <span className="font-mono font-bold">
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">{p.name} →</a>
              ) : (
                p.name
              )}
            </span>
            <span className="font-mono text-[11px] opacity-75">
              {p.stage} · {p.year}
            </span>
          </p>
          <p className="my-1">{p.summary}</p>
          {p.story && <p className="my-1 italic">“{p.story}”</p>}
          <p className="font-mono text-[11.5px] opacity-80">{p.stack.join(" · ")}</p>
        </Panel>
      ))}
    </div>
  );
}

/** The content inside the big brick. `open` 0 is the welcome brick; 1–7 are the sections. */
export default function BrickContent({
  open,
  eyebrow,
  title,
  note,
  finale,
  tint,
  writing,
}: {
  open: number;
  eyebrow: string;
  title: string;
  /** A one-off callout above the heading, e.g. after a promotion. */
  note?: string;
  finale: string;
  tint: string;
  writing: Writing;
}) {
  const eyebrowLine = <p className="font-mono text-xs font-semibold opacity-75">{eyebrow}</p>;

  switch (open) {
    case 0:
      return (
        <>
          <p className="font-mono text-[13px] font-semibold">Hi, I’m Christine. This is my portfolio.</p>
          <h2 className="mt-2 font-display text-[34px] font-extrabold leading-[1.02] tracking-tight md:text-[38px]">Play to open it.</h2>
          <p className="mt-3.5 text-[17px]">You’re white. Every kind of move unlocks a different part of my story. Some moves win nothing.</p>
          <p className="mt-3">
            New to chess? Press <strong>hint</strong> and follow the glow. In a hurry? Press <strong>show me everything</strong>.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-black/20 pt-5">
            <p className="font-mono text-sm">
              <span className="font-semibold">Technical? Prefer the command line?</span>
              <br />
              <span className="opacity-75">Everything here works as a shell too.</span>
            </p>
            <Link
              href="/terminal"
              className="flex items-center gap-2 rounded-lg border-2 border-black bg-[#1b1b1f] px-3.5 py-2 font-mono text-[13px] font-semibold text-white shadow-[0_3px_0_#000]"
            >
              <span aria-hidden="true">&gt;_</span> switch to the terminal side
            </Link>
          </div>
        </>
      );

    case 1:
      return (
        <>
          {eyebrowLine}
          {note && (
            <p className="mb-1 mt-2.5 rounded-lg bg-[#1b1b1f] px-3 py-2.5 font-mono text-[13px] font-semibold text-[#ffd500]">
              ♛{"\uFE0E"} {note}
            </p>
          )}
          <h2 className="mt-1.5 font-display text-[32px] font-extrabold leading-none tracking-tighter md:text-[36px]">{profile.name}</h2>
          <p className="mt-3 text-base">{profile.pitch}</p>
          <a href={clientWork[0].live} target="_blank" rel="noreferrer" className={`mt-4 block rounded-lg px-3.5 py-3 ${tint}`}>
            <Now />
            <br />
            <strong className={mono}>Robin →</strong> an AI second brain for organisations. I build its server, web app and AI pipeline.
          </a>
          <p className={label}>A pawn that kept walking</p>
          <div className="grid grid-cols-6 overflow-hidden rounded-lg border-2 border-[#1b1b1f]">
            {["♟", "", "", "", "", "♛"].map((g, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center text-[clamp(18px,4vw,30px)]"
                style={{ background: i === 5 ? "#c91a09" : i % 2 ? "#1b1b1f" : "#ffffff", color: i === 5 ? "#ffffff" : "#1b1b1f" }}
              >
                {g && `${g}︎`}
              </div>
            ))}
          </div>
          <div lang="en" className="mt-1.5 grid grid-cols-6 gap-1 text-center font-mono text-[9px] font-semibold leading-tight hyphens-auto [overflow-wrap:anywhere] sm:text-[10.5px]">
            {profile.path.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
          <p className="mt-3.5 text-sm">{profile.story.join(" ")}</p>
          <div className="mt-4 grid gap-2.5 text-[13px] sm:grid-cols-2">
            <Panel tint={tint}>
              <p className="mb-1 font-mono text-[11px] font-semibold opacity-75">EDUCATION</p>
              {profile.education.map((e) => (
                <p key={e.title} className="mb-1.5 last:mb-0">
                  {e.title}
                  <br />
                  <span className="opacity-75">
                    {e.school}
                    {e.date && ` · ${e.date}`}
                  </span>
                </p>
              ))}
            </Panel>
            <Panel tint={tint}>
              <p className="mb-1 font-mono text-[11px] font-semibold opacity-75">ABOUT</p>
              <p>{profile.location}</p>
              <p className="mt-1.5">{profile.languages.join(", ")}</p>
              <p className="mt-1.5">Writer, former vocalist, chess fan</p>
            </Panel>
          </div>
        </>
      );

    case 2:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <p className="mt-2.5 text-sm opacity-90">Next to each skill: where I’ve used it.</p>
          <div className="mt-4 grid gap-2.5 text-[13px] leading-normal sm:grid-cols-2">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <Panel key={category} tint={tint}>
                <p className="mb-1.5 font-mono text-[11px] font-bold uppercase">{category}</p>
                {skills.map((skill) => {
                  const used = projectsUsing(skill, allProjects);
                  return (
                    <p key={skill.name}>
                      <strong>{skill.name}</strong>
                      {used.length > 0 && <span className="opacity-75"> · {used.map((p) => p.name).join(", ")}</span>}
                    </p>
                  );
                })}
              </Panel>
            ))}
          </div>
        </>
      );

    case 3:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <div className="mt-4 flex flex-col gap-2.5 text-[13.5px]">
            {experience.map((role) => (
              <Panel key={role.company} tint={tint}>
                <p className="font-mono text-[11px] opacity-80">
                  {role.start} → {role.end} {role.end === "now" && <Now />}
                </p>
                <p className="mb-1.5 mt-0.5 font-mono font-bold">
                  {role.title} @{" "}
                  {role.link ? (
                    <a href={role.link} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      {role.company} →
                    </a>
                  ) : (
                    role.company
                  )}
                </p>
                <ul className="space-y-1">
                  {role.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </>
      );

    case 4:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <p className="mt-2.5 text-sm">ALX, a lot of C, and the side projects I built to teach myself. Oldest first.</p>
          <ProjectStories list={learning} tint={tint} />
        </>
      );

    case 5:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <p className="mt-2.5 text-sm">The projects that took me past the basics.</p>
          <ProjectStories list={levellingUp} tint={tint} />
        </>
      );

    case 6:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <p className="mt-2.5 text-sm">How I learned what blockchains are for. BlockCoop, a DeFi protocol I built for a client, is under client work.</p>
          <ProjectStories list={onChain} tint={tint} />
        </>
      );

    case 7:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <p className="mt-2.5 text-sm">Built for other people. The code stays with them; here’s what it was and what I did.</p>
          <div className="mt-4 flex flex-col gap-2.5 text-[13.5px]">
            {clientWork.map((p) => (
              <Panel key={p.slug} tint={tint}>
                {p.current && <Now />}
                <p className={`mb-1 font-mono font-bold ${p.current ? "mt-1.5" : ""}`}>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">{p.name} →</a>
                  ) : (
                    p.name
                  )}
                </p>
                <p className="mb-1.5">{p.summary}</p>
                <p className="mb-1.5">
                  <strong>{p.current ? "What I do:" : "What I did:"}</strong> {p.role}
                </p>
                <p className="font-mono text-[11.5px] opacity-80">{p.stack.join(" · ")}</p>
              </Panel>
            ))}
          </div>
        </>
      );

    case 8:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <div className="mt-4 grid gap-2.5 text-[13.5px] sm:grid-cols-2">
            {[
              { name: "Medium", url: profile.links.medium, blurb: "Technical deep dives and Web3 tutorials.", posts: writing.medium },
              { name: "Substack", url: profile.links.substack, blurb: "Musings of a Mad Woman: essays and honest thoughts. High levels of honesty, zero semicolons.", posts: writing.substack },
            ].map((src) => (
              <Panel key={src.name} tint={tint}>
                <a href={src.url} target="_blank" rel="noreferrer" className="font-mono font-bold hover:underline">{src.name} →</a>
                <p className="mb-2.5 mt-0.5 opacity-85">{src.blurb}</p>
                {src.posts.map((post) => (
                  <p key={post.link} className="mb-2 last:mb-0">
                    <a href={post.link} target="_blank" rel="noreferrer" className="hover:underline">{post.title}</a>
                    <br />
                    <span className="font-mono text-[11px] opacity-75">{post.date}</span>
                  </p>
                ))}
              </Panel>
            ))}
          </div>
        </>
      );

    case 9:
      return (
        <>
          {eyebrowLine}
          <h2 className={heading}>{title}</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
            {profile.funfacts.map((fact) => (
              <li key={fact}>
                <Panel tint={tint}>{fact}</Panel>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs opacity-80">{profile.languages.join(" · ")}</p>
        </>
      );

    default:
      return (
        <>
          {eyebrowLine}
          <h2 className="mt-1.5 font-display text-[40px] font-extrabold leading-none tracking-tight">{finale}</h2>
          <p className="mt-3 text-base">You built me. Now say hello. Hiring, collaborating, or want me to teach your team? Email is quickest.</p>
          <div className="mt-4 flex flex-wrap gap-2.5 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="rounded-lg border-2 border-black bg-[#ffd500] px-4 py-2.5 font-semibold text-[#1b1b1f] shadow-[0_3px_0_#000]">
              {profile.email}
            </a>
            {[
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
            ].map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-lg border-2 border-white bg-raised px-3.5 py-2.5 text-white shadow-[0_3px_0_#000]">
                {name}
              </a>
            ))}
            <a href={profile.cv} download className="rounded-lg border-2 border-white bg-raised px-3.5 py-2.5 text-white shadow-[0_3px_0_#000]">
              CV (PDF)
            </a>
          </div>
          <p className="mt-4 font-mono text-xs opacity-80">{profile.location}</p>
        </>
      );
  }
}
