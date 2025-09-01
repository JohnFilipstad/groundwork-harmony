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
* **🧠 Modern CSS Magic:**  Powered by `:has()`, `color-mix()`, `text-wrap`, `dvh`, and more. Built for today and the future.
* **🌍 LTR & RTL Support:**  Logical properties and adaptive layouts ensure your content shines in every language, for every audience.
* **⚡ Lightweight & Fast:**  The Groundwork Harmony CSS file is just **~20.0 KB** while Groundwork Tokens is just **~19.1 KB** — small enough for rapid loads, big enough to deliver full accessibility and customization features.

---

## 🗂️ Prerequisites: Design Tokens Required

**⚠️ Important:** Groundwork Harmony v2+ requires **Groundwork Tokens v2+** as a foundation. The tokens must be loaded **before** Harmony to provide the CSS variables that power the entire system.

### Why This Change?

Starting with v2, I've separated the **design tokens** from the **styling layer** to create a more modular and flexible system. This allows you to:

- 🎯 Use tokens across multiple frameworks and projects
- 🔄 Mix and match Groundwork layers as needed  
- 🎨 Create consistent theming across your entire ecosystem
- 📦 Keep each package focused and lightweight

---

## 📦 Install

### npm Package

```bash
# Required: Install both tokens and harmony
npm install @johnfilipstad/groundwork-tokens
npm install @johnfilipstad/groundwork-harmony
```

### Basic HTML Setup

**⚠️ Critical:** Tokens must be loaded **first**, before Harmony:

```html
<!-- REQUIRED: Tokens must come first -->
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css">

<!-- Then: Harmony can use the token variables -->
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```

### CDN

```html
<!-- REQUIRED: Tokens first -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css">

<!-- Then: Harmony -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```

### Framework Integration

**Bundlers (Vite, Webpack, Parcel):**
```js
// REQUIRED: Import tokens first
import '@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css';
// Then: Import harmony
import '@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css';
```

**Next.js:**
```js
// In _app.js or layout.js
import '@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css';
import '@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css';
```

**React/Vue/Svelte:** Same as bundler approach above.

**Static Site Generators (Hugo, Jekyll, 11ty):** Include both in your template head, tokens first.

---

## 📤 Fonts (bundled in `dist/`)

Harmony ships fonts in `dist/fonts/`. To use them:

1. **Copy the folder** to your project (or reference it directly from `node_modules`).
2. **Include `fonts.css`** before the other stylesheets so the font-faces are available.

**Example (copied assets)**

```html
<link rel="stylesheet" href="/fonts/fonts.css">
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css">
<link rel="stylesheet" href="/css/groundwork-harmony.min.css">
```

**Example (from node\_modules)**

```html
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/fonts/fonts.css">
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-tokens/dist/groundwork-tokens.min.css">
<link rel="stylesheet" href="/node_modules/@johnfilipstad/groundwork-harmony/dist/groundwork-harmony.min.css">
```

---

## ⚡ Quick Start 

### Complete Setup Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    
    <!-- 1. Fonts (optional) -->
    <link rel="stylesheet" href="/fonts/fonts.css">
    
    <!-- 2. Tokens (REQUIRED FOUNDATION) -->
    <link rel="stylesheet" href="/css/groundwork-tokens.min.css">
    
    <!-- 3. Harmony (semantic HTML styling) -->
    <link rel="stylesheet" href="/css/groundwork-harmony.min.css">
    
    <title>Hello, Harmony</title>
  </head>
  <body>
    <header>
      <h1>Groundwork Harmony</h1>
      <p>A class-less CSS base that lets semantic HTML sing.</p>
    </header>

    <main>
      <section>
        <h2>Beautiful by Default</h2>
        <p>Typography, forms, tables, buttons—all styled with <strong>zero classes</strong>.</p>
        
        <p>
          <button type="button">Primary Action</button>
          <a href="#demo">View Demo</a>
        </p>
      </section>

      <section>
        <h2>Try a Form</h2>
        <form>
          <label for="name">Your Name</label>
          <input id="name" type="text" placeholder="Enter your name">
          
          <label for="message">Message</label>
          <textarea id="message" rows="4" placeholder="Tell us what you think..."></textarea>
          
          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>

    <footer>
      <small>&copy; 2025 Your Project Name</small>
    </footer>
  </body>
</html>
```

### Add Theme Toggle (Optional)

Want to add dark mode? Just paste this script before the closing `</body>` tag:

```html
<script>
window.addEventListener("DOMContentLoaded", () => {
  const styles = `
    .theme-toggle {
      position: fixed;
      top: var(--spacing-s);
      right: var(--spacing-s);
      padding: var(--spacing-s);
      z-index: var(--z-index-toast);
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const themeToggleButton = document.createElement("button");
  themeToggleButton.className = "theme-toggle";
  document.body.appendChild(themeToggleButton);
  
  const html = document.documentElement;

  function toggleTheme() {
    let currentTheme = html.getAttribute("data-theme");
    if (!currentTheme) {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonText(newTheme);
  }

  function updateButtonText(theme) {
    themeToggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  themeToggleButton.addEventListener("click", toggleTheme);

  // Load saved theme or respect OS preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateButtonText(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    updateButtonText(prefersDark ? 'dark' : 'light');
  }
});
</script>
```

### Explore Further

Visit [Groundwork vNext](https://groundwork.filipstad.dev/) website for more info.

---

## 🌓 Dark Mode

Harmony supports **`[data-theme="dark" | "light"]` on `<html>`** and respects the user's OS setting via `prefers-color-scheme`.
If you don't set an attribute, the system will match the OS preference automatically. 

**Note:** Dark mode functionality is provided by **Groundwork Tokens** — Harmony just styles the elements according to the token values.

The theme toggle script above works with any Groundwork-powered site and uses the design tokens for consistent styling.

---

## 🎨 Customization

GroundworkHarmony v2 gets its design tokens from the separate **@johnfilipstad/groundwork-tokens** package. All customization happens at the token level:

**Quick Theme Example:**
```css
:root {
  /* Override tokens to customize Harmony */
  --color-primary-brand: hsl(280deg 100% 60%);   /* Purple brand */
  --color-secondary-brand: hsl(200deg 80% 50%);  /* Blue accent */
  --color-accent-brand: hsl(45deg 90% 60%);      /* Golden highlights */
  
  /* Typography tokens */
  --font-family-headings: "Your Brand Font", sans-serif;
  --font-size-scale-base: 1.8rem;         /* Larger base size */
  --scale-type: var(--scale-golden-section); /* 1.618 ratio */
  
  /* Spacing tokens */
  --spacing-s: 1rem;
  --spacing-m: 2rem;  
  --spacing-l: 3rem;
}
```

**For complete customization options:** See the [Groundwork Tokens README](https://github.com/JohnFilipstad/groundwork-tokens) which powers all the variables used by Harmony.

**🛠️ Visual Theme Generator:** Use the [Groundwork vNext Theme Generator](https://groundwork.filipstad.dev/theme-generator) - a powerful tool for creating custom themes with live preview and export capabilities.

---

## 📚 Documentation & Demos

**Documentation and live demos** are available at the [Groundwork vNext](https://groundwork.filipstad.dev/) website.

---

## 🌍 RTL / LTR

* Uses **logical properties** and `:dir()` to adapt spacing and alignment.
* Works automatically when you set `dir="rtl"` on `<html>` or a subtree.
* Avoid left/right overrides in app CSS; prefer logical shorthands.

---

## ♿ Accessibility

* Keyboard-friendly navigation and focus
* Visible, high-contrast focus indicators
* Comfortable line lengths and vertical rhythm
* Motion-reduced states respect `prefers-reduced-motion`
* Hit-targets and defaults aim for **WCAG 2.2 AA**

---

## 📝 Version & Changelog

**Current Version:** 2.0.0

**🚀 Version 2.0 Breaking Changes:**
- **Tokens Separated:** Design tokens moved to separate `@johnfilipstad/groundwork-tokens` package
- **Dependencies:** Groundwork Harmony now requires Groundwork Tokens as a peer dependency
- **Installation:** Two packages must be installed and loaded in correct order
- **Customization:** All theming now happens through token overrides

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes and migration guide from v1.x.

---

## 🌐 Browser Support

Harmony uses **modern CSS features** for the best developer and user experience:

**Fully Supported:**
- Chrome/Edge 88+ (Chromium-based browsers)
- Firefox 87+
- Safari 14.1+

**Key Modern Features:**
- `:has()` pseudo-class for advanced selectors
- `color-mix()` for dynamic color blending
- `dvh`/`dvw` viewport units
- CSS `text-wrap: balance`
- CSS Logical Properties (`margin-inline`, `padding-block`)
- `@media (prefers-color-scheme)`
- `@media (prefers-reduced-motion)`

**Progressive Enhancement:**
- Graceful fallbacks for older browsers where possible
- Modern features enhance but don't break core functionality
- Core typography and layout work in all browsers

---

## 🗂️ Groundwork Design Stack

The **Groundwork Design Stack** is a layered system that turns tokens into a coherent, accessible UI—fast. A single source of truth for design tokens powers a class-less base (Harmony), fluid layout intelligence (Flow), pragmatic utilities (Atoms), and ready-to-use UI (Components).

**The Foundation:**  
0. **[Groundwork Tokens](https://github.com/JohnFilipstad/groundwork-tokens)** — **design variables**: colors, typography, spacing, shadows, and more (REQUIRED)

**The Layers:**
1. **Groundwork Harmony (this package)** — **class-less base**: element defaults, typography, forms, tables, a11y, RTL/LTR, dark/light
2. **[Groundwork Flow](https://github.com/JohnFilipstad/groundwork-flow)** — **layout intelligence**: fluid spacing, content-aware containers, and proportional scales
3. **[Groundwork Atoms](https://github.com/JohnFilipstad/groundwork-atoms)** — **utilities** derived from tokens for rare, opt-in adjustments
4. **[Groundwork Components](https://github.com/JohnFilipstad/groundwork-components)** — **UI building blocks** that inherit tokens and Harmony's defaults

**Mix and Match:**
```html
<!-- Just tokens + semantic HTML styling -->
<link rel="stylesheet" href="groundwork-tokens.css">
<link rel="stylesheet" href="groundwork-harmony.css">

<!-- Add layout utilities -->
<link rel="stylesheet" href="groundwork-tokens.css">
<link rel="stylesheet" href="groundwork-harmony.css">
<link rel="stylesheet" href="groundwork-flow.css">

<!-- Full stack -->
<link rel="stylesheet" href="groundwork-tokens.css">
<link rel="stylesheet" href="groundwork-harmony.css">
<link rel="stylesheet" href="groundwork-flow.css">
<link rel="stylesheet" href="groundwork-atoms.css">
<link rel="stylesheet" href="groundwork-components.css">
```

> **Note:** Tokens are always required first. Other layers can be mixed and matched based on your needs.

---

## 🏆 Why Developers & Designers Love Harmony

* **Ridiculously fast prototyping:** Drop in the CSS and your site looks polished, instantly
* **Zero lock-in:** Harmony styles semantic elements. Use it as your foundation, or pair with your own components and utilities
* **Future-proof:** Built on modern CSS, ready for tomorrow's browsers
* **Modular architecture:** Use just what you need, when you need it
* **Open source & community-driven:** Have an idea or need a fix? [Send me a message!](https://github.com/JohnFilipstad/groundwork-harmony)
* **Consistent design system:** Centralized tokens ensure your project's aesthetic is always harmonious

---

## 📖 Documentation & Support

**Complete documentation** is coming soon at **groundwork.filipstad.dev** covering the entire Groundwork ecosystem.

**For immediate help:**
- **Token reference:** [Groundwork Tokens documentation](https://github.com/JohnFilipstad/groundwork-tokens)
- **Community support:** [GitHub Issues](https://github.com/JohnFilipstad/groundwork-harmony/issues)
- **Quick examples:** Use the Quick Start section above as your foundation

## 🤝 Community

Early adopters welcome! Share feedback at [GitHub Issues](https://github.com/JohnFilipstad/groundwork-harmony/issues).

---

## 🛠️ Contributing 

Issues and PRs welcome. Please follow accessibility, RTL, and token guidelines.

**Development setup:**
```bash
# Clone both repositories
git clone https://github.com/JohnFilipstad/groundwork-tokens.git
git clone https://github.com/JohnFilipstad/groundwork-harmony.git

# Install dependencies in both
cd groundwork-tokens && npm install
cd ../groundwork-harmony && npm install

# Link for local development
cd ../groundwork-tokens && npm link
cd ../groundwork-harmony && npm link @johnfilipstad/groundwork-tokens
```

---

## 🎹 Compose. Harmonize. Ship.

Let your HTML sing and your UI stay in tune—with **Groundwork Harmony**, the modern class-less CSS base for creators who want more melody, less mess.

**Ready to orchestrate your next project?** 
1. Install Groundwork Tokens for the foundation
2. Install Groundwork Harmony for beautiful semantic HTML  
3. Let your website find its voice

---

**🔗 Related Packages:**
- **[Groundwork Tokens](https://github.com/JohnFilipstad/groundwork-tokens)** - The foundation (required)
- **[Groundwork Flow](https://github.com/JohnFilipstad/groundwork-flow)** - Layout intelligence
- **[Groundwork Atoms](https://github.com/JohnFilipstad/groundwork-atoms)** - Utility classes
- **[Groundwork Components](https://github.com/JohnFilipstad/groundwork-components)** - UI building blocks