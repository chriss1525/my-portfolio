import Section from "./Section";
import ActivityChart from "./ActivityChart";
import { experience } from "@/data/experience";

const robin = experience[0];

export default function Now() {
  return (
    <Section id="now" cmd="cat now.md" title="Building Robin">
      <div className="grid gap-10 md:grid-cols-[1fr_1.15fr]">
        <div className="min-w-0 space-y-4">
          <p className="max-w-prose">
            Robin is an AI second brain for organisations. People talk to it through Claude, the web app or any MCP
            client, and it breaks what they say into atomic notes and files them into topic wikis the whole workspace
            can search. Each organisation runs its own instance, and every wiki has one guardian who owns it.
          </p>
          <p className="font-mono text-sm text-second">What I work on</p>
          <ul className="space-y-2 text-dim">
            {robin.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-accent">›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-dim">TypeScript · Hono · PostgreSQL + pgvector · Next.js · MCP · BullMQ</p>
          {robin.link && (
            <a href={robin.link} target="_blank" rel="noreferrer" className="inline-block font-mono text-sm text-accent underline underline-offset-4">
              withrobin.ai/knowledge →
            </a>
          )}
        </div>
        <ActivityChart />
      </div>
    </Section>
  );
}
