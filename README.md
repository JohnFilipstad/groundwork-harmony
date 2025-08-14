# Groundwork Harmony 🎶

*A class-less CSS base for the modern web. Supercharge and harmonize your HTML with modern, accessible defaults, and powerful customization.*

---

## 🎤 Why Settle for Noise? Orchestrate with Harmony.

Welcome to **Groundwork Harmony** — the CSS base designed for creators who want their web projects to look striking, modern, and ***semantically sound*** right out of the box.
Why drown your markup in utility classes when you can let your HTML sing with **meaningful, accessible structure**?

Groundwork Harmony is more than a stylesheet — it's a philosophy. Your HTML should be music: clean, harmonious, and effortless to scale. By embracing ***semantic elements as the foundation***, Harmony supercharges them with modern, accessible defaults — no extra classes required.
Think of it as `normalize.css` in high gear, blending innovation with reliability so you can focus on content, not configuration — and keep your markup readable, meaningful, and future-proof.

---

## 🚀 Features That Hit All the Right Notes

* **🎷 Class-less by Design:**  Write semantic HTML and watch your site transform into a modern, visually balanced masterpiece. No more tangled class spaghetti.
* **🌓 Automatic Dark Mode:**  Adapts to your user's preference instantly, or set your own theme with one attribute. Day or night, always in tune.
* **♿ Accessibility Baked In:**  Focus states, skip links, screen reader helpers, and reduced motion support—out-of-the-box inclusivity.
* **🎨 Effortless Customization:**  Change a few CSS variables and watch your entire interface take on a new mood. Your brand, your style, zero hassle.
* **⚖️ Single Source of Truth for Tokens:**  All of your design tokens for colors, fonts, and spacing are defined in a central location, ensuring consistency and making global changes a breeze.
* **📏 Modular Scales for Everything:**  Typographic rhythm, spacing, grids, and more—all defined in scalable, responsive variables.
* **🧠 Modern CSS Magic:**  Powered by `:has()`, `color-mix()`, `text-wrap`, `dvh`, and more. Built for today and the future.
* **🌐 LTR & RTL Support:**  Logical properties and adaptive layouts ensure your content shines in every language, for every audience.
* **⚡ Lightweight & Fast:**  The CSS file is just **~43.8 KB** — small enough for rapid loads, big enough to deliver full accessibility and customization features.

---

## 💡 Get Started in 3 Steps

### 1. **Install via npm**

```bash
npm install groundwork-harmony
```

and copy from `node_modules/groundwork-harmony/dist/` into your own public assets.

**CDN (auto-served from npm)**

* **unpkg (latest):** [https://unpkg.com/groundwork-harmony/dist/groundwork-harmony.min.css](https://unpkg.com/groundwork-harmony/dist/groundwork-harmony.min.css)
* **unpkg (pinned):** [https://unpkg.com/groundwork-harmony@0.1.0/dist/groundwork-harmony.min.css](https://unpkg.com/groundwork-harmony@0.1.0/dist/groundwork-harmony.min.css)
* **jsDelivr (latest):** [https://cdn.jsdelivr.net/npm/groundwork-harmony/dist/groundwork-harmony.min.css](https://cdn.jsdelivr.net/npm/groundwork-harmony/dist/groundwork-harmony.min.css)
* **jsDelivr (pinned):** [https://cdn.jsdelivr.net/npm/groundwork-harmony@0.1.0/dist/groundwork-harmony.min.css](https://cdn.jsdelivr.net/npm/groundwork-harmony@0.1.0/dist/groundwork-harmony.min.css)
  
**Fonts via CDN**

Fonts are **not bundled** into the main CDN CSS file. If you need Groundwork Harmony’s custom fonts when using a CDN, you must include the `fonts.css` file separately and ensure the `.woff2` font files are in the same CDN directory structure:

```html
<link rel="stylesheet" href="https://unpkg.com/groundwork-harmony/dist/fonts/fonts.css">
```

The custom fonts — **Groundwork Sans**, **Groundwork Serif**, and **Groundwork Mono** — are referenced in the default CSS variables:

```css
:root {
  --font-family-sans: "Groundwork Sans", system-ui, sans-serif;
  --font-family-serif: "Groundwork Serif", ui-serif, serif;
  --font-family-mono: "Groundwork Mono", ui-monospace, monospace;
}
```

**How to include after `npm install`**

The inclusion method depends on the project type:

* **Static HTML** — copy from `node_modules/groundwork-harmony/dist/` into `public/` and link via `<link>`.
* **Bundlers (Vite, Webpack, Parcel)** — import directly in your JS/TS entry point:

  ```js
  import 'groundwork-harmony/dist/groundwork-harmony.min.css';
  import 'groundwork-harmony/dist/fonts/fonts.css';
  ```
* **Frameworks (React, Vue, Svelte)** — same as bundler approach, or include in a global CSS file.
* **Drupal/WordPress** — enqueue/register the CSS and fonts in the theme or plugin setup.


**Direct file (from the repo)**

* /dist/groundwork-harmony.min.css
* /dist/fonts/fonts.css
* /dist/fonts/*

### 2. **Include in Your Project**

```html
<link rel="stylesheet" href="groundwork-harmony.min.css">
<link rel="stylesheet" href="fonts/fonts.css">
```
See Fonts section below for more details.

### 3. **Write Semantic HTML**

```html
<main>
  <h1>Groundwork Harmony Awaits</h1>
  <p>No classes. No hassle. Just beautiful web experiences.</p>
  <button>Play Now</button>
</main>
```

---

## 📚 Fonts

Groundwork Harmony ships with fonts located in the `dist/fonts/` directory. These are **not** bundled into the minified `groundwork-harmony.min.css` file.

To use them, either:

1. Include the fonts stylesheet directly:

```html
<link rel="stylesheet" href="fonts/fonts.css">
```

2. and copy the `dist/fonts/` folder into your project and update the `url()` paths in `fonts.css` if needed.

Custom fonts include **Groundwork Sans**, **Groundwork Serif**, and **Groundwork Mono**, referenced in the default CSS variables:

```css
:root {
  --font-family-sans: "Groundwork Sans", system-ui, sans-serif;
  --font-family-serif: "Groundwork Serif", ui-serif, serif;
  --font-family-mono: "Groundwork Mono", ui-monospace, monospace;
}
```

---

## 🎛️ Make It Yours (Customization)

Override any variable to match your vision:

```css
:root {
  --color-primary: #009cde;
}
```

---

## 🌒 Dark Mode—In Perfect Pitch

* Respects OS-level `prefers-color-scheme`.
* Manual override: `<html data-theme="dark"> ... </html>`

---

## 🌍 Accessibility & Global Reach

* Keyboard-friendly navigation and focus
* Screen reader-only helpers
* RTL/LTR adaptive by default
* Honors `prefers-reduced-motion`

---

## 🏆 Why Developers & Designers Love Harmony

* **Ridiculously fast prototyping:** Drop in the CSS and your site looks polished, instantly.
* **Zero lock-in:** Harmony styles semantic elements. Use it as your foundation, or pair with your own components and utilities.
* **Future-proof:** Built on modern CSS, ready for tomorrow's browsers.
* **Open source & community-driven:** Have an idea or need a fix? [Send me a message!](https://github.com/IbentaLab/groundwork_harmony)
* **Single Source of Truth:** Centralized design tokens ensure your project's aesthetic is always consistent and a joy to maintain.

---

## 📖 Learn More

* Full variable reference
* Theming & advanced usage
* Accessibility details

See the [docs (coming soon)](/#) for the complete story.

---

## 🎹 Compose. Harmonize. Ship.

Let your HTML sing and your UI stay in tune—with **Groundwork Harmony**, the modern class-less CSS base for creators who want more melody, less mess.

**Ready to orchestrate your next project?** Install Groundwork Harmony and let your website find its voice.
