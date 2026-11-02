"use client";
import { Chess, type PieceSymbol, type Square } from "chess.js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LOSSES, QUEEN_LOST, SPECIAL, bricks, legalsMate, quietMoves } from "@/data/game";
import { botMove } from "@/lib/bot";
import BrickContent, { type Writing } from "./BrickContent";

const GLYPH: Record<PieceSymbol, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const NAME: Record<PieceSymbol, string> = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
const FILES = "abcdefgh";

/** Brick indexes, matching `bricks` in data/game.ts. */
const B = { pawn: 0, knight: 1, bishop: 2, king: 3, capture: 4, rook: 5, queen: 6, check: 7, fun: 8, mate: 9 } as const;
const OTHERS = bricks.length - 1;

interface Special {
  brick: number;
  eyebrow: string;
  heading?: string;
  note?: string;
}

interface State {
  fen: string;
  moves: number;
  onLine: boolean;
  /** Bricks won, in the order they were won. */
  order: number[];
  /** Brick on show: 0 = welcome, 1–7 = bricks[open - 1]. */
  open: number;
  /** How many times each brick has been shown, to cycle its lines. */
  visits: Record<number, number>;
  queenLost: boolean;
  /** A special move's lines, shown instead of the brick's usual ones until the next move. */
  special: Special | null;
  last: string[];
  selected: Square | null;
  promoting: { from: Square; to: Square } | null;
  hint: boolean;
  showLocked: boolean;
  thinking: boolean;
  message: string;
  /** Phones: the open brick is shown as a sheet over the board. */
  sheet: boolean;
  /** Phones: the bottom bar is announcing a brick that was just won. */
  barNew: boolean;
}

const fresh = (): State => ({
  fen: new Chess().fen(),
  moves: 0,
  onLine: true,
  order: [],
  open: 0,
  visits: {},
  queenLost: false,
  special: null,
  last: [],
  selected: null,
  promoting: null,
  hint: false,
  showLocked: false,
  thinking: false,
  message: "Your move. Try anything.",
  sheet: false,
  barNew: false,
});

/** How long black "thinks" before replying, in ms: 1.3–2.2 s, so it doesn't feel instant. */
const thinkTime = () => 1300 + Math.random() * 900;

function unlock(order: number[], i: number) {
  return order.includes(i) ? order : [...order, i];
}

export default function ChessGame({ writing }: { writing: Writing }) {
  const router = useRouter();
  const [st, setSt] = useState<State>(fresh);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const game = useMemo(() => new Chess(st.fen), [st.fen]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => clearTimers, []);

  // ⌘K / Ctrl+K flips to the terminal side.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        router.push("/terminal");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = st.sheet ? "hidden" : "";
  }, [st.sheet]);

  const over = game.isGameOver();
  const target = st.onLine && st.moves < legalsMate.length ? legalsMate[st.moves].white : null;

  function playWhite(from: Square, to: Square, promotion?: PieceSymbol) {
    const g = new Chess(st.fen);
    const m = g.move({ from, to, promotion: promotion ?? "q" });
    const line = legalsMate[st.moves];
    const onLine = st.onLine && !!line && line.white[0] === from && line.white[1] === to;

    const blackKing = g.board().flat().find((c) => c?.type === "k" && c.color === "b")?.square;
    const checkers = g.isCheck() && blackKing ? g.attackers(blackKing, "w") : [];
    const checker = checkers.length === 1 ? g.get(checkers[0])?.type : undefined;
    const castled = m.isKingsideCastle() || m.isQueensideCastle();
    const enPassant = m.isEnPassant();
    let special: Special | null = null;
    if (g.isCheckmate()) special = { brick: B.mate, ...SPECIAL.mate };
    else if (m.promotion) special = { brick: B.pawn, ...SPECIAL.promotion };
    else if (checkers.length > 1) special = { brick: B.check, ...SPECIAL.doubleCheck };
    else if (checkers.length && m.captured) special = { brick: B.check, ...SPECIAL.captureCheck };
    else if (checkers.length && !checkers.includes(to)) special = { brick: B.check, ...SPECIAL.discoveredCheck };
    else if (checker === "n") special = { brick: B.check, ...SPECIAL.knightCheck };
    else if (checker === "q") special = { brick: B.check, ...SPECIAL.queenCheck };
    else if (enPassant) special = { brick: B.fun, ...SPECIAL.enPassant };
    else if (m.captured) special = { brick: B.capture, ...SPECIAL.took[m.captured] };

    const hits: number[] = [];
    if (g.isCheckmate()) hits.push(B.mate);
    if (m.promotion) hits.push(B.pawn);
    if (g.isCheck()) hits.push(B.check);
    if (m.captured) hits.push(B.capture);
    if (castled || enPassant) hits.push(B.fun);
    if (m.piece === "q") hits.push(B.queen);
    if (m.piece === "r") hits.push(B.rook);
    if (m.piece === "k" && !castled) hits.push(B.king);
    if (m.piece === "b") hits.push(B.bishop);
    if (m.piece === "n") hits.push(B.knight);
    if (m.piece === "p") hits.push(B.pawn);

    let order = st.order;
    hits.forEach((i) => (order = unlock(order, i)));
    if (order.length === OTHERS && !order.includes(B.mate)) {
      order = unlock(order, B.mate);
      hits.push(B.mate);
      special ??= { brick: B.mate, ...SPECIAL.allFound };
    }
    const newly = order.filter((i) => !st.order.includes(i));
    const pick = special ? special.brick : newly.length ? newly[newly.length - 1] : hits.length ? hits[0] : -1;
    const visits = pick > -1 ? { ...st.visits, [pick]: (st.visits[pick] ?? 0) + 1 } : st.visits;
    const moves = st.moves + 1;
    const ended = g.isGameOver();

    setSt((s) => ({
      ...s,
      fen: g.fen(),
      moves,
      onLine,
      order,
      visits,
      open: pick > -1 ? pick + 1 : s.open,
      barNew: newly.length > 0 ? true : pick > -1 ? false : s.barNew,
      queenLost: false,
      special,
      last: [from, to],
      selected: null,
      promoting: null,
      hint: false,
      thinking: !ended,
      message: g.isCheckmate()
        ? "Checkmate. You win."
        : ended
          ? "Stalemate: black has no legal move but isn’t in check. A draw. Press new game to try for mate."
          : (newly.includes(B.mate) && pick !== B.mate ? "Every other brick found, so say hello is unlocked too! " : newly.length ? "You won a brick! " : pick > -1 ? "Back to an old brick. " : `${quietMoves[moves % quietMoves.length]} `) + "Black is thinking…",
    }));
    if (ended) return;

    later(() => {
      const reply = onLine && line?.black ? g.move({ from: line.black[0], to: line.black[1] }) : (() => {
        const b = botMove(g.fen());
        return b ? g.move(b) : null;
      })();
      if (!reply) return;
      setSt((s) => {
        let o = s.order;
        let open = s.open;
        let special = s.special;
        const lost = reply.captured === "q";
        if (lost) {
          o = unlock(o, B.queen);
          open = B.queen + 1;
          special = null;
          if (o.length === OTHERS) o = unlock(o, B.mate);
        }
        const loss = !onLine && reply.captured ? `${LOSSES[reply.captured]} ` : "";
        return {
          ...s,
          fen: g.fen(),
          order: o,
          open,
          barNew: lost ? true : s.barNew,
          queenLost: lost,
          special,
          thinking: false,
          last: [from, to, reply.from, reply.to],
          message: g.isCheckmate()
            ? "Black checkmated you. Your bricks are safe: press new game to keep building."
            : `${onLine ? `${line.reply} ` : loss || "Black does its own thing. "}Your move.${g.isCheck() ? " You’re in check." : ""}`,
        };
      });
    }, thinkTime());
  }

  function click(square: Square) {
    if (over || st.thinking || st.promoting) return;
    const piece = game.get(square);
    if (piece?.color === "w") return setSt((s) => ({ ...s, selected: square }));
    if (!st.selected) return;
    const legal = game.moves({ square: st.selected, verbose: true }).find((m) => m.to === square);
    if (!legal) {
      return setSt((s) => ({
        ...s,
        message: game.isCheck() ? "You’re in check. That move doesn’t get your king out." : "That piece can’t go there. The dots show where it can.",
      }));
    }
    if (legal.promotion) return setSt((s) => ({ ...s, promoting: { from: legal.from, to: legal.to } }));
    playWhite(legal.from, legal.to);
  }

  function showAll() {
    clearTimers();
    setSt((s) => ({ ...s, order: bricks.map((_, i) => i), open: 1, onLine: false, thinking: false, hint: false, barNew: false, message: "Everything is unlocked. Tap any brick." }));
  }

  function replay() {
    clearTimers();
    setSt(fresh());
    const g = new Chess();
    const wins = [[B.pawn], [B.knight], [B.bishop], [], [B.capture], [B.check], [B.mate]];
    let order: number[] = [];
    legalsMate.forEach((m, i) => {
      later(() => {
        g.move({ from: m.white[0], to: m.white[1] });
        wins[i].forEach((k) => (order = unlock(order, k)));
        const o = order;
        setSt((s) => ({ ...s, fen: g.fen(), moves: i + 1, order: o, open: o.length ? o[o.length - 1] + 1 : 0, last: m.white, thinking: true, message: `${i + 1}. ${m.hint}` }));
      }, 900 + i * 1600);
      if (m.black) {
        const black = m.black;
        later(() => {
          g.move({ from: black[0], to: black[1] });
          const lost = i === 4;
          if (lost) order = unlock(order, B.queen);
          const o = order;
          setSt((s) => ({ ...s, fen: g.fen(), order: o, open: o[o.length - 1] + 1, queenLost: lost, last: [...m.white, ...black] }));
        }, 1700 + i * 1600);
      }
    });
    later(() => setSt((s) => ({ ...s, thinking: false, onLine: true, special: { brick: B.mate, ...SPECIAL.mate }, message: "Légal’s mate, 1750. Seven moves. Some bricks are still hidden: try castling, your king and your rooks." })), 900 + 6 * 1600 + 300);
  }

  // What the board shows.
  const dots = st.selected ? game.moves({ square: st.selected, verbose: true }).map((m) => m.to as string) : [];
  const kingInCheck = game.isCheck() ? (game.turn() === "w" ? "K" : "k") : null;
  const mated = game.isCheckmate();
  const rows = game.board();

  const done = st.order.length === bricks.length;
  const cur = st.open > 0 ? bricks[st.open - 1] : { bg: "#ffffff", fg: "#1b1b1f" };
  const light = cur.fg !== "#ffffff";
  const visitsOf = (i: number) => Math.max(0, (st.visits[i] ?? 1) - 1);
  const brick = st.open > 0 ? bricks[st.open - 1] : null;
  let eyebrow = brick ? brick.eyebrows[visitsOf(st.open - 1) % brick.eyebrows.length] : "";
  let title = brick && brick.headings.length ? brick.headings[visitsOf(st.open - 1) % brick.headings.length] : "";
  if (st.open === B.queen + 1 && st.queenLost) {
    eyebrow = QUEEN_LOST.eyebrow;
    title = QUEEN_LOST.heading;
  }
  const special = st.special && st.special.brick === st.open - 1 ? st.special : null;
  if (special) {
    eyebrow = special.eyebrow;
    if (special.heading) title = special.heading;
  }
  const locked = bricks.map((b, i) => ({ b, i })).filter(({ i }) => !st.order.includes(i));
  const message = st.hint ? (target ? legalsMate[st.moves].hint : "You’ve left the famous line, so try what’s still hidden.") : st.message;
  const brickProps = { open: st.open, eyebrow, title, note: special?.note, finale: mated ? "Checkmate." : "Built.", tint: light ? "bg-black/[.08]" : "bg-white/[.12]", writing };
  const btn = "whitespace-nowrap rounded-lg border-2 border-black px-3.5 py-2 font-mono text-[13px] shadow-[0_3px_0_#000] active:translate-y-[2px] active:shadow-[0_1px_0_#000]";

  return (
    <div className="mx-auto flex max-w-[1360px] flex-wrap items-start justify-center gap-8 px-4 pb-28 pt-1 md:px-7 lg:gap-11 lg:pb-14">
      <div className="w-full min-w-0 max-w-[600px] flex-[0_1_600px]">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <p className="whitespace-nowrap font-display text-[17px] font-extrabold tracking-tight sm:text-[22px]">
            {mated ? (game.turn() === "b" ? "Checkmate." : "Checkmated.") : over ? "Draw." : st.thinking ? "Black to move…" : done ? "Built." : "Your move."}
          </p>
          <p className="whitespace-nowrap font-mono text-xs text-dim">
            <span className="sm:hidden">
              {st.order.length}/{bricks.length} bricks
            </span>
            <span className="hidden sm:inline">
              {st.order.length} of {bricks.length} bricks · {over ? `${st.moves} moves` : `move ${st.moves + 1}`}
            </span>
          </p>
        </div>

        <div className="relative rounded-[14px] bg-black p-2.5 shadow-[0_0_0_2px_#2a2a30,0_24px_60px_rgba(0,0,0,.6)] md:p-3">
          <div role="grid" aria-label="Chessboard. You play white." className="grid grid-cols-8 overflow-hidden rounded-md">
            {rows.flatMap((row, r) =>
              row.map((cell, c) => {
                const name = `${FILES[c]}${8 - r}` as Square;
                const isLight = (r + c) % 2 === 0;
                let bg = isLight ? "#f7f7f4" : "#2f6fd6";
                if (st.last.includes(name)) bg = isLight ? "#fff1a8" : "#e0b400";
                if (st.selected === name) bg = "#fe8a18";
                const sym = cell ? (cell.color === "w" ? cell.type.toUpperCase() : cell.type) : null;
                if (sym && sym === kingInCheck) bg = mated ? "#c91a09" : "#ff8a80";
                const glowing = st.hint && target?.[0] === name && st.selected !== name;
                const isDot = dots.includes(name);
                const coord = (c === 0 ? String(8 - r) : "") + (r === 7 ? (c === 0 ? " " : "") + FILES[c] : "");
                return (
                  <button
                    key={name}
                    onClick={() => click(name)}
                    aria-label={`${name}, ${cell ? `${cell.color === "w" ? "white" : "black"} ${NAME[cell.type]}` : "empty"}`}
                    className={`relative flex aspect-square items-center justify-center ${glowing ? "animate-[glow_1s_ease-in-out_infinite]" : ""}`}
                    style={{ background: bg }}
                  >
                    {cell && (
                      <span
                        className="relative z-[1] text-[clamp(26px,8.2vw,52px)] leading-none"
                        style={
                          cell.color === "w"
                            ? { color: "#fff", textShadow: "-1.5px 0 #1b1b1f,1.5px 0 #1b1b1f,0 -1.5px #1b1b1f,0 1.5px #1b1b1f,0 4px 0 rgba(0,0,0,.18)" }
                            : { color: "#1b1b1f", textShadow: "0 4px 0 rgba(0,0,0,.18)" }
                        }
                      >
                        {GLYPH[cell.type]}
                        {"︎"}
                      </span>
                    )}
                    {isDot &&
                      (cell ? (
                        <span aria-hidden="true" className="absolute inset-[6%] rounded-full border-[5px] border-[rgba(27,27,31,.45)]" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute h-[26%] w-[26%] rounded-full"
                          style={{ background: st.hint && target?.[1] === name && st.selected === target[0] ? "#fe8a18" : "rgba(27,27,31,.35)" }}
                        />
                      ))}
                    <span aria-hidden="true" className="absolute bottom-0.5 left-1 font-mono text-[10px] font-semibold" style={{ color: isLight ? "#2f6fd6" : "#f7f7f4" }}>
                      {coord}
                    </span>
                  </button>
                );
              }),
            )}
          </div>

          {st.promoting && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-black/70">
              <div className="rounded-xl bg-surface p-4 text-center">
                <p className="mb-3 font-mono text-sm">Promote your pawn to…</p>
                <div className="flex gap-2">
                  {(["q", "r", "b", "n"] as PieceSymbol[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => playWhite(st.promoting!.from, st.promoting!.to, p)}
                      aria-label={NAME[p]}
                      className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#f7f7f4] text-4xl text-white"
                      style={{ textShadow: "-1.5px 0 #1b1b1f,1.5px 0 #1b1b1f,0 -1.5px #1b1b1f,0 1.5px #1b1b1f" }}
                    >
                      {GLYPH[p]}
                      {"︎"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="min-h-6 max-w-[380px] font-medium">
            {message}
          </p>
          <div className="flex flex-wrap gap-2">
            {done && !mated && (
              <button onClick={replay} className={`${btn} bg-[#c91a09] font-semibold text-white`}>
                show me the mate
              </button>
            )}
            <button onClick={() => setSt((s) => ({ ...s, hint: true }))} className={`${btn} flex items-center gap-2 bg-[#ffd500] font-semibold text-[#1b1b1f]`}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
              </svg>
              hint
            </button>
            <button
              onClick={() => {
                clearTimers();
                setSt((s) => ({ ...fresh(), order: s.order, visits: s.visits, open: s.open, message: s.order.length ? "New board. Your bricks are still here." : fresh().message }));
              }}
              className={`${btn} bg-raised text-fg`}
            >
              new game
            </button>
            <button onClick={showAll} className={`${btn} bg-raised text-fg lg:hidden`}>
              everything
            </button>
          </div>
        </div>
      </div>

      <section aria-label="Your build" className="flex w-full min-w-0 max-w-[520px] flex-[1_1_440px] flex-col gap-5">
        <div className="hidden justify-end lg:flex">
          <button onClick={showAll} className={`${btn} bg-raised text-xs text-fg`}>
            show me everything
          </button>
        </div>

        <div
          key={`${st.open}-${st.visits[st.open - 1] ?? 0}-${st.queenLost}-${special?.eyebrow ?? ""}`}
          aria-live="polite"
          className={`relative mt-3 animate-[drop_.5s_ease-out] rounded-[10px] px-6 pb-8 pt-7 md:px-7 ${st.open === 0 ? "" : "hidden lg:block"}`}
          style={{
            background: cur.bg,
            color: cur.fg,
            boxShadow: "inset 0 -8px 0 rgba(0,0,0,.18), inset 0 3px 0 rgba(255,255,255,.3), 0 8px 0 rgba(0,0,0,.25)",
          }}
        >
          <div aria-hidden="true" className="absolute -top-3 left-5 right-5 flex justify-between">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="h-[19px] w-[34px] rounded-t-[4px] rounded-b-[2px]" style={{ background: cur.bg, boxShadow: "inset 0 3px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0,0,0,.18)" }} />
            ))}
          </div>
          <BrickContent {...brickProps} />
        </div>

        <div>
          <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dim lg:hidden">Your bricks · tap to open</p>
          <div className="flex min-h-10 gap-2 overflow-x-auto pb-1 pt-2.5 lg:flex-col-reverse lg:items-center lg:gap-0 lg:overflow-visible lg:pb-0 lg:pt-0">
            {st.order.map((k, i) => {
              const b = bricks[k];
              return (
                <button
                  key={k}
                  onClick={() => setSt((s) => ({ ...s, open: k + 1, queenLost: false, special: null, sheet: true, barNew: false }))}
                  aria-label={`Open brick: ${b.label}`}
                  className={`relative h-[42px] w-auto max-w-full shrink-0 rounded px-4 font-mono text-[13px] font-semibold lg:mt-2 lg:w-[var(--w)] lg:px-0 ${i === st.order.length - 1 ? "animate-[drop_.45s_ease-out]" : ""}`}
                  style={{
                    ["--w" as string]: `${b.width}px`,
                    background: b.bg,
                    color: b.fg,
                    boxShadow: `inset 0 -5px 0 rgba(0,0,0,.2), inset 0 2px 0 rgba(255,255,255,.3)${st.open === k + 1 ? ", 0 0 0 3px #ecebe7" : ""}`,
                  }}
                >
                  <span aria-hidden="true" className="absolute -top-2 left-3.5 right-3.5 hidden justify-between lg:flex">
                    {Array.from({ length: Math.max(2, Math.round(b.width / 60)) }, (_, j) => (
                      <span key={j} className="h-3 w-[22px] rounded-t-[4px] rounded-b-[2px]" style={{ background: b.bg, boxShadow: "inset 0 3px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0,0,0,.18)" }} />
                    ))}
                  </span>
                  {b.label}
                </button>
              );
            })}
          </div>
          <div aria-hidden="true" className="h-[18px] rounded bg-[#00852b] bg-[radial-gradient(circle_at_9px_6px,rgba(255,255,255,.35)_4px,transparent_4.5px)] bg-[length:18px_18px] shadow-[inset_0_-4px_0_rgba(0,0,0,.2)]" />
          <p className="mt-2 font-mono text-xs text-dim">
            {st.order.length === 0 ? "Your build starts here." : done ? "Every brick. That’s me. Open any brick again from the tower." : "Open any brick again from the tower."}
          </p>
          {locked.length > 0 && (
            <>
              <button
                onClick={() => setSt((s) => ({ ...s, showLocked: !s.showLocked }))}
                className="mt-4 rounded-lg border-2 border-dashed border-[#55555c] bg-white/[.04] px-3 py-1.5 font-mono text-xs text-dim"
              >
                {st.showLocked ? "hide the hints" : `stuck? see what’s still hidden (${locked.length})`}
              </button>
              {st.showLocked && (
                <>
                  <p className="mb-2 mt-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-dim">Still hidden: how to unlock</p>
                  <div className="flex flex-wrap gap-2">
                    {locked.map(({ b }) => (
                      <span key={b.label} className="rounded-md border-2 border-dashed border-[#55555c] bg-white/[.04] px-2.5 py-1.5 font-mono text-xs text-[#c8c8ce]">
                        {b.label}: {b.how}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {st.open > 0 && !st.sheet && (
        <button
          key={`${st.open}-${st.visits[st.open - 1] ?? 0}-${st.barNew}`}
          onClick={() => setSt((s) => ({ ...s, sheet: true, barNew: false }))}
          className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-40 flex animate-[rise_.4s_ease-out] items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left font-mono text-sm font-semibold shadow-[inset_0_-5px_0_rgba(0,0,0,.2),0_10px_30px_rgba(0,0,0,.5)] lg:hidden"
          style={{ background: cur.bg, color: cur.fg }}
        >
          <span>
            {st.barNew ? "You won: " : ""}
            {brick?.label}
          </span>
          <span className="text-xs opacity-80">tap to open ↑</span>
        </button>
      )}

      {st.sheet && st.open > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 lg:hidden" onClick={() => setSt((s) => ({ ...s, sheet: false }))}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={brick?.label}
            className="max-h-[88vh] overflow-y-auto rounded-t-2xl px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-4"
            style={{ background: cur.bg, color: cur.fg }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSt((s) => ({ ...s, sheet: false }))} className="mb-4 flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2 font-mono text-[13px] font-semibold">
              ← back to the board
            </button>
            <BrickContent {...brickProps} />
          </div>
        </div>
      )}
    </div>
  );
}
