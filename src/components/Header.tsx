import Link from "next/link";

/** Top bar with the play / terminal switch. */
export default function Header({ side }: { side: "play" | "terminal" }) {
  const pill = "flex items-center gap-2 rounded-full px-4 py-1.5";
  const on = `${pill} bg-fg font-semibold text-bg`;
  const off = `${pill} text-dim hover:text-fg`;
  return (
    <header className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-7">
      <Link href="/" className="font-mono font-semibold text-blue">
        ~/chriss
      </Link>
      <nav aria-label="Choose a side" className="flex rounded-full border-2 border-[#3a3a42] bg-surface p-1 font-mono text-[13px]">
        <Link href="/" aria-current={side === "play" ? "page" : undefined} className={side === "play" ? on : off}>
          <span aria-hidden="true" className="text-base leading-none">
            ♞{"︎"}
          </span>
          play
        </Link>
        <Link href="/terminal" aria-current={side === "terminal" ? "page" : undefined} className={side === "terminal" ? on : off}>
          <span aria-hidden="true">&gt;_</span>
          terminal
        </Link>
      </nav>
      <span className="hidden font-mono text-xs text-dim sm:inline">
        <kbd>⌘K</kbd> flips sides
      </span>
    </header>
  );
}
