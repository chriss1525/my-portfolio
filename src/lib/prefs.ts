/** Theme (light/dark/system) and palette, kept on <html> and remembered per browser. */
export const palettes = ["violet", "amber", "ice", "green"] as const;
export type Palette = (typeof palettes)[number];
export type Theme = "light" | "dark";

const write = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
};

export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Calls back when the theme attribute or the system preference changes. */
export function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", callback);
  };
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  write("theme", theme);
}

export function currentPalette(): Palette {
  return (document.documentElement.dataset.palette as Palette) ?? "violet";
}

export function setPalette(palette: Palette) {
  if (palette === "violet") delete document.documentElement.dataset.palette;
  else document.documentElement.dataset.palette = palette;
  write("palette", palette === "violet" ? null : palette);
}

/** Runs before first paint (inlined in the layout) so a saved choice never flashes. */
export const prefsBootScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;var p=localStorage.getItem("palette");if(${JSON.stringify(palettes.slice(1))}.indexOf(p)>-1)document.documentElement.dataset.palette=p}catch(e){}`;

