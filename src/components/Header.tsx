import Link from "next/link";

/** Top bar. */
export default function Header() {
  return (
    <header className="mx-auto flex max-w-[1360px] items-center px-4 py-4 md:px-7">
      <Link href="/" className="font-mono font-semibold text-blue">
        ~/chriss
      </Link>
    </header>
  );
}
