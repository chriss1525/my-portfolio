"use client";
import { useState } from "react";
import { activity } from "@/data/activity";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (key: string) => {
  const [y, m] = key.split("-");
  return `${MONTHS[+m - 1]} ${y}`;
};

const W = 520, H = 260, L = 44, R = 6, T = 10, B = 44, MAX = 1000;
const iw = W - L - R, ih = H - T - B, step = iw / activity.length, bw = step - 4;
const y = (v: number) => T + ih - (v / MAX) * ih;
const ticks = [0, 250, 500, 750, 1000];

export default function ActivityChart() {
  const [hover, setHover] = useState<number | null>(null);
  const first = label(activity[0][0]);
  const last = label(activity[activity.length - 1][0]);

  return (
    <figure className="rounded-lg border border-line bg-surface p-5">
      <figcaption>
        <p className="font-medium">
          My commits per month, {first} to {last}
        </p>
        <p className="mt-1 font-mono text-xs text-dim">from git history across my repos</p>
      </figcaption>
      <div className="relative mt-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img"
          aria-label={`Commits per month, ${activity.map(([k, v]) => `${label(k)} ${v}`).join(", ")}`}>
          {ticks.map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="var(--line)" />
              <text x={L - 6} y={y(v) + 4} textAnchor="end" fill="var(--dim)" fontSize="13" className="font-mono">{v}</text>
            </g>
          ))}
          {activity.map(([k, v], i) => {
            const [yr, m] = k.split("-");
            const x = L + i * step + 2;
            const h = (v / MAX) * ih;
            const top = T + ih - h;
            const r = Math.min(4, h / 2, bw / 2);
            const showLabel = m === "02" || m === "06" || m === "10";
            return (
              <g key={k}>
                {h > 0 && (
                  <path
                    d={`M${x},${T + ih} V${top + r} Q${x},${top} ${x + r},${top} H${x + bw - r} Q${x + bw},${top} ${x + bw},${top + r} V${T + ih} Z`}
                    fill="var(--accent)"
                    opacity={hover === null || hover === i ? 1 : 0.45}
                  />
                )}
                {showLabel && (
                  <>
                    <text x={x + bw / 2} y={H - 24} textAnchor="middle" fill="var(--dim)" fontSize="13" className="font-mono">{MONTHS[+m - 1]}</text>
                    {m !== "06" && <text x={x + bw / 2} y={H - 6} textAnchor="middle" fill="var(--dim)" fontSize="13" className="font-mono">{yr}</text>}
                  </>
                )}
                <rect x={L + i * step} y={T} width={step} height={ih} fill="transparent" tabIndex={0}
                  aria-label={`${label(k)}: ${v} commits`} className="outline-none"
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)} onBlur={() => setHover(null)} />
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-fg px-2 py-1 font-mono text-xs text-bg"
            style={{
              left: `clamp(60px, ${((L + hover * step + step / 2) / W) * 100}%, calc(100% - 60px))`,
              top: `calc(${(y(activity[hover][1]) / H) * 100}% - 6px)`,
            }}
          >
            {label(activity[hover][0])} · {activity[hover][1]} commits
          </div>
        )}
      </div>
    </figure>
  );
}
