# ~/chriss

Christine Okoth's portfolio, in two sides. Built with Next.js 16, TypeScript, Tailwind CSS and [chess.js](https://github.com/jhlywa/chess.js).

- **Play** (`/`): you play white in a real game of chess. Each kind of move unlocks a Lego brick with part of the story: a pawn move, a knight, a bishop, a capture, your queen, a check, and checkmate. Hint walks you through Légal's mate, a famous seven-move win; "show me everything" unlocks it all.
- **Terminal** (`/terminal`): the same content as a shell. Type `help`. Tab completes, ↑ recalls history.

⌘K (Ctrl+K) flips between the sides.

## Content

Everything on both sides comes from `src/data/`:

| File | What it holds |
|---|---|
| `profile.ts` | name, pitch, links, education, the pawn's path, story, fun facts |
| `projects.ts` | your own projects, client work, and the early archive |
| `experience.ts` | roles with dates |
| `skills.ts` | skills; each links to the projects whose `stack` uses it |
| `game.ts` | the bricks: what unlocks each, the lines they say, and Légal's mate |

The writing brick pulls the latest Medium and Substack posts from their RSS feeds, refreshed daily.

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
