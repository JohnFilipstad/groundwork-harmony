# Groundwork Harmony 🎶

*A class-less CSS base for the modern web. Supercharge and harmonize your HTML with modern, accessible defaults, and powerful customization.*

---

## 🎤 Why Settle for Noise? Orchestrate with Harmony.

Welcome to **Groundwork Harmony** – the CSS base designed for creators who want their web projects to look striking, modern, and ***semantically sound*** right out of the box.
Why drown your markup in utility classes when you can let your HTML sing with **meaningful, accessible structure**?

Groundwork Harmony is more than a stylesheet – it's a philosophy. Your HTML should be music: clean, harmonious, and effortless to scale. By embracing ***semantic elements as the foundation***, Harmony supercharges them with modern, accessible defaults – no extra classes required.
Think of it as `normalize.css` in high gear, blending innovation with reliability so you can focus on content, not configuration – and keep your markup readable, meaningful, and future-proof.

---

## 🚀 Features That Hit All the Right Notes

* **🎷 Class-less by Design:**  Write semantic HTML and watch your site transform into a modern, visually balanced masterpiece. No more tangled class spaghetti.
* **🌓 Automatic Dark Mode:**  Adapts to your user's preference instantly, or set your own theme with one attribute. Day or night, always in tune.
* **♿ Accessibility Baked In:**  Focus states, skip links, screen reader helpers, and reduced motion support—out-of-the-box inclusivity.
* **🎨 Effortless Customization:**  Change a few CSS variables and watch your entire interface take on a new mood. Your brand, your style, zero hassle.
* **⚖️ Single Source of Truth for Tokens:**  All of your design tokens for colors, fonts, and spacing are defined in a central location, ensuring consistency and making global changes a breeze.
* **📐 Modular Scales for Everything:**  Typographic rhythm, spacing, grids, and more—all defined in scalable, responsive variables.
* **🧠 Modern CSS Magic:**  Powered by `:has()`, `color-mix()`, `text-wrap`, `dvh`, and more. Built for today and the future.
* **🌍 LTR & RTL Support:**  Logical properties and adaptive layouts ensure your content shines in every language, for every audience.
* **⚡ Lightweight & Fast:**  The CSS file is just **~43.8 KB** – small enough for rapid loads, big enough to deliver full accessibility and customization features.

---

## 📦 Install

**npm**

```bash
npm i @johnfilipstad/groundwork-harmony
```

**Use in HTML**

Use from node_modules

```html
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```
or copy to your css folder

```html
<link rel="stylesheet" href="css/groundwork-harmony.min.css">
```

**CDN (example)**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```

**Static Site Generators (Gatsby, Next.js, Hugo)** – same as above, include in your global CSS file or import in your layout component.

**Bundlers (Vite, Webpack, Parcel)** – import directly in your JS/TS entry point:

  ```js
  import 'groundwork-harmony/dist/groundwork-harmony.min.css';
  ```

**Frameworks (React, Vue, Svelte)** – same as bundler approach, or include in a global CSS file.

**Drupal/WordPress** – enqueue/register the CSS and fonts in the theme or plugin setup.

---

## 🔤 Fonts (bundled in `dist/`)

Harmony ships fonts in `dist/fonts/`. To use them:

1. **Copy the folder** to your project (or reference it directly from `node_modules`).
2. **Include `fonts.css`** before Harmony so the font-faces are available when the base styles apply.

**Example (copied assets)**

```html
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="/css/groundwork-harmony.min.css">
```

**Example (from node\_modules)**

```html
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/fonts/fonts.css">
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```

Use the provided family stacks in your own CSS via variables (Harmony sets sensible defaults).

---

## ⚡ Quick Start (semantic HTML)

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="/fonts/fonts.css">
    <link rel="stylesheet" href="/css/groundwork-harmony.min.css" />
    <title>Hello, Harmony</title>
  </head>
  <body>
    <header>
      <h1>Groundwork Harmony</h1>
      <p>A class-less CSS base that lets semantic HTML sing.</p>
    </header>

    <main>
      <h2>Section heading</h2>
      <p>Buttons, forms, tables, typography—styled out of the box.</p>
      <button type="button">Action</button>
    </main>

    <footer><small>MIT License</small></footer>
  </body>
</html>
```

---

## 🌓 Dark Mode

Harmony supports **`[data-theme="dark" | "light"]` on `<html>`** and respects the user's OS setting via `prefers-color-scheme`.
If you don't set an attribute, Harmony will match the OS. To provide a user toggle, use this minimal snippet.

**Add a toggle button (optional)**

```html
<button class="theme-toggle" onclick="toggleTheme()">🌙 Dark Mode</button>
```

**Copy -paste the CSS**

```css
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
    }
```

**Copy-paste toggle script**

```html
<script>
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update button text
  const button = document.querySelector(".theme-toggle");
  if (button) {
    button.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  console.log("Theme switched to:", newTheme);
}

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Set initial button text
  const button = document.querySelector(".theme-toggle");
  if (button) {
    button.textContent =
      savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }

  console.log("Theme loaded:", savedTheme);
});
</script>
```

**Notes**

* Keep theming token-driven: reference tokens (e.g., `var(--color-...)`) rather than hardcoding colors.
* Harmony sets up sensible defaults; your token layer can brand both themes consistently.

---

## 🌍 RTL / LTR

* Uses **logical properties** and `:dir()` to adapt spacing and alignment.
* Works automatically when you set `dir="rtl"` on `<html>` or a subtree.
* Avoid left/right overrides in app CSS; prefer logical shorthands.

---

## ♿ Accessibility

* Keyboard-friendly navigation and focus
* Visible, high-contrast focus indicators.
* Comfortable line lengths and vertical rhythm.
* Motion-reduced states respect `prefers-reduced-motion`.
* Hit-targets and defaults aim for **WCAG 2.2 AA**.

---

## 🏗️ Groundwork Design Stack (overview)

The **Groundwork Design Stack** is a layered system that turns tokens into a coherent, accessible UI—fast. A single source of truth for design tokens powers a class-less base (Harmony), fluid layout intelligence (Flow), pragmatic utilities (Atoms), and ready-to-use UI (Components). The result is consistent theming, fewer overrides, and a smooth path from semantic HTML to production-ready interfaces.

**Layers**

1. **Groundwork Harmony (Layer 1)** – the **class-less base**: element defaults, typography, forms, tables, a11y, RTL/LTR, dark/light.
2. **Groundwork Flow (Layer 2)** – **layout intelligence**: fluid spacing, content-aware containers, and proportional scales (fewer media queries).
3. **Groundwork Atoms (Layer 3)** – **utilities** derived from tokens for rare, opt-in adjustments (kept minimal to preserve class-less DX).
4. **Groundwork Components (Layer 4)** – **UI building blocks** that inherit tokens and Harmony's defaults for consistent, accessible patterns.

> Harmony is intentionally minimal; add Flow, Atoms, and Components as your project grows.

## 🏆 Why Developers & Designers Love Harmony

* **Ridiculously fast prototyping:** Drop in the CSS and your site looks polished, instantly.
* **Zero lock-in:** Harmony styles semantic elements. Use it as your foundation, or pair with your own components and utilities.
* **Future-proof:** Built on modern CSS, ready for tomorrow's browsers.
* **Open source & community-driven:** Have an idea or need a fix? [Send me a message!](https://github.com/JohnFilipstad/groundwork-harmony)
* **Single Source of Truth:** Centralized design tokens ensure your project's aesthetic is always consistent and a joy to maintain.

---

## 📖 Documentation Status
Complete documentation including variable reference and usage guides is coming soon. 
For now, explore the CSS variables in `dist/groundwork-harmony.css` - they're self-documenting with clear naming.

## 🤝 Community
Early adopters welcome! Share feedback at [GitHub Issues](https://github.com/JohnFilipstad/groundwork-harmony/issues).

---

## 🛠️ Contributing 

Issues and PRs welcome. Please follow accessibility, RTL, and token guidelines.
Run local builds with PostCSS (import, autoprefixer, cssnano).

---

## 🎹 Compose. Harmonize. Ship.

Let your HTML sing and your UI stay in tune—with **Groundwork Harmony**, the modern class-less CSS base for creators who want more melody, less mess.

**Ready to orchestrate your next project?** Install Groundwork Harmony and let your website find your voice.