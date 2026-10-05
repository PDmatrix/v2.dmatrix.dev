const KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");
type Theme = "light" | "dark";

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

let theme: Theme = savedTheme() ?? (media.matches ? "dark" : "light");

function reflect() {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document
    .querySelector("#theme-btn")
    ?.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    );
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", getComputedStyle(document.body).backgroundColor);
}

function setup() {
  reflect();
  const button = document.querySelector<HTMLButtonElement>("#theme-btn");
  if (button) {
    // Assignment is idempotent when a persisted element survives navigation.
    button.onclick = () => {
      theme = theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem(KEY, theme);
      } catch {
        // The toggle still works when browser storage is unavailable.
      }
      reflect();
    };
  }
}

setup();
document.addEventListener("astro:after-swap", setup);
document.addEventListener("astro:before-swap", event => {
  const { newDocument } = event as Event & { newDocument: Document };
  newDocument.documentElement.dataset.theme = theme;
  newDocument.documentElement.classList.toggle("dark", theme === "dark");
});
media.addEventListener("change", ({ matches }) => {
  if (savedTheme()) return;
  theme = matches ? "dark" : "light";
  reflect();
});
