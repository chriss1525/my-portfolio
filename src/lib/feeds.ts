export interface Post {
  title: string;
  link: string;
  date: string;
}

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return m ? m[1].trim() : "";
};

/** Latest posts from an RSS feed, refreshed daily. Empty if the feed can't be reached. */
export async function latestPosts(url: string, limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).map(([, item]) => ({
      title: tag(item, "title").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"'),
      link: tag(item, "link"),
      date: new Date(tag(item, "pubDate")).toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    })).filter((p) => p.title && p.link.startsWith("https://"));
  } catch {
    return [];
  }
}
