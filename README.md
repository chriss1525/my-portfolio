# ~/chriss

Christine Okoth's portfolio: a terminal-flavoured site built with Next.js 16, TypeScript and Tailwind CSS.

Every section renders on load and reads top to bottom. The interactive shell opens anywhere with **⌘K** (or Ctrl+K, or the `shell` button). Type `help` to see what it can do.

## Content

Everything on the page and in the shell comes from `src/data/`:

| File | What it holds |
|---|---|
| `profile.ts` | name, pitch, links, education, story, fun facts |
| `projects.ts` | projects, client work (described, never linked), archive |
| `experience.ts` | roles with dates |
| `skills.ts` | skills; each one links to the projects whose `stack` uses it |
| `activity.ts` | commits per month for the chart in the Robin section |

Writing pulls the latest Medium and Substack posts from their RSS feeds, refreshed daily.

## Look

Light mode is line-printer paper; dark mode is a phosphor screen. Colours are tokens in `src/app/globals.css`. There are four palettes: violet (default), amber, ice and green. Visitors switch them with `theme` in the shell, and light/dark with the header button or `mode`.

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
