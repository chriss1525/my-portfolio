import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#141416", color: "#ecebe7", fontFamily: "monospace" }}>
        <div style={{ display: "flex", fontSize: 30, color: "#a8a8b0" }}>
          <span style={{ color: "#3ddc84" }}>okoth@chriss</span>
          <span>:~$ whoami</span>
        </div>
        <div style={{ fontSize: 104, fontWeight: 800, marginTop: 24, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 34, marginTop: 32, maxWidth: 960, lineHeight: 1.35 }}>{profile.pitch}</div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#ffd500" }}>now → {profile.now.label}</div>
      </div>
    ),
    size,
  );
}
