import { experience } from "@/data/experience";
import Section from "./Section";

export default function Timeline() {
  return (
    <Section id="experience" cmd="git log --oneline experience" title="Experience">
      <ol className="relative ml-1 border-l border-line">
        {experience.map((role) => (
          <li key={role.company} className="relative pb-10 pl-6 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-accent" aria-hidden="true" />
            <p className="font-mono text-xs tabular-nums text-second">
              {role.start} → {role.end}
            </p>
            <h3 className="mt-1 font-mono text-lg font-semibold">
              {role.title} <span className="text-dim">@</span>{" "}
              {role.link ? (
                <a href={role.link} target="_blank" rel="noreferrer" className="text-accent hover:underline">{role.company}</a>
              ) : (
                <span className="text-accent">{role.company}</span>
              )}
            </h3>
            <ul className="mt-3 max-w-prose space-y-1.5 text-dim">
              {role.points.map((pt) => (
                <li key={pt} className="flex gap-2"><span className="text-accent">›</span><span>{pt}</span></li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
