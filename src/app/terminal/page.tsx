import type { Metadata } from "next";
import Header from "@/components/Header";
import TerminalCommands from "@/components/TerminalCommands";

export const metadata: Metadata = { title: "Christine Okoth · terminal" };

export default function Terminal() {
  return (
    <>
      <Header side="terminal" />
      <main className="mx-auto max-w-[1180px] px-4 pb-16 pt-2 md:px-7">
        <h1 className="sr-only">Christine Okoth&apos;s portfolio as a terminal</h1>
        <TerminalCommands />
      </main>
    </>
  );
}
