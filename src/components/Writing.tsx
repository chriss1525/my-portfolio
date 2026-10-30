import { profile } from "@/data/profile";
import { latestPosts } from "@/lib/feeds";
import Section from "./Section";

const sources = [
  { name: "Medium", blurb: "Technical deep dives and Web3 tutorials", url: profile.links.medium, feed: "https://medium.com/feed/@okothchris15" },
  { name: "Substack", blurb: "Musings of a Mad Woman: essays and honest thoughts", url: profile.links.substack, feed: "https://amadwoman.substack.com/feed" },
];

export default async function Writing() {
  const posts = await Promise.all(sources.map((s) => latestPosts(s.feed)));
  return (
    <Section id="writing" cmd="cat writing" title="Writing" intro="I build with words as much as with code.">
      <div className="grid gap-8 md:grid-cols-2">
        {sources.map((s, i) => (
          <div key={s.name} className="min-w-0">
            <a href={s.url} target="_blank" rel="noreferrer" className="font-mono font-semibold text-accent hover:underline">
              {s.name} →
            </a>
            <p className="text-sm text-dim">{s.blurb}</p>
            {posts[i].length > 0 && (
              <ul className="mt-4 border-t border-line">
                {posts[i].map((p) => (
                  <li key={p.link} className="border-b border-line">
                    <a href={p.link} target="_blank" rel="noreferrer" className="flex items-baseline justify-between gap-4 py-3 hover:text-accent">
                      <span className="min-w-0">{p.title}</span>
                      <span className="shrink-0 font-mono text-xs text-dim">{p.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
