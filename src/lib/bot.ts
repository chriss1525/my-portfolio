import { Chess, type Move, type PieceSymbol } from "chess.js";

/**
 * Black's brain: a two-ply search (its move, then white's best reply) over material and a little
 * positional sense. Strong enough that a good player is playing real chess, soft enough that a
 * casual player still gets to most of the bricks.
 */

const VALUE: Record<PieceSymbol, number> = { p: 100, n: 310, b: 320, r: 500, q: 900, k: 0 };
const MATE = 100_000;
/** How often black settles for a decent move instead of its best one. */
const SOFTNESS = 0.2;

/** Small bonus for pieces near the centre; pawns also for advancing. */
function placement(type: PieceSymbol, square: string, color: "w" | "b") {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]) - 1;
  const centre = 3.5 - Math.max(Math.abs(file - 3.5), Math.abs(rank - 3.5));
  if (type === "p") return (color === "w" ? rank : 7 - rank) * 6 + centre * 2;
  if (type === "n" || type === "b") return centre * 8;
  if (type === "q") return centre * 2;
  return 0;
}

/** Score from black's point of view. */
function evaluate(game: Chess) {
  if (game.isCheckmate()) return game.turn() === "b" ? -MATE : MATE;
  if (game.isDraw()) return 0;
  let score = 0;
  for (const row of game.board()) {
    for (const cell of row) {
      if (!cell) continue;
      const v = VALUE[cell.type] + placement(cell.type, cell.square, cell.color);
      score += cell.color === "b" ? v : -v;
    }
  }
  return score;
}

/** Black's move for the position, or null if black has none. */
export function botMove(fen: string): Move | null {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });
  if (!moves.length) return null;

  const scored = moves.map((m) => {
    game.move(m);
    let score: number;
    if (game.isCheckmate()) score = MATE;
    else {
      // White replies with whatever is worst for black.
      const replies = game.moves({ verbose: true });
      score = replies.length ? Infinity : evaluate(game);
      for (const r of replies) {
        game.move(r);
        score = Math.min(score, evaluate(game));
        game.undo();
      }
    }
    game.undo();
    return { m, score: score + Math.random() * 12 };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (best.score >= MATE) return best.m;
  // Now and then, play a decent move that isn't the best, as long as it doesn't throw away material.
  if (Math.random() < SOFTNESS) {
    const decent = scored.filter((s) => s.score > best.score - 120).slice(0, 4);
    return decent[Math.floor(Math.random() * decent.length)].m;
  }
  return best.m;
}
