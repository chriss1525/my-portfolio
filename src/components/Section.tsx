/** A page section headed by the shell command that would print it. */
export default function Section({
  id,
  cmd,
  title,
  intro,
  children,
}: {
  id: string;
  cmd: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-dashed border-line py-14 md:py-20">
      <p className="font-mono text-sm text-dim">
        <span className="text-accent">okoth@chriss</span>:~$ {cmd}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">{title}</h2>
      {intro && <p className="mt-3 max-w-prose text-dim">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
