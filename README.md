# Groundwork Harmony 🎶

_The class-less CSS framework for the modern web. Features dark mode, RTL/LTR, accessibility, and powerful customization._

---

## 🎤 Why Settle for Noise? Orchestrate with Harmony.

Welcome to **Groundwork Harmony**—the CSS framework designed for creators who want their web projects to look striking,
modern, and accessible right out of the box. Why drown your markup in utility classes when you can let your HTML sing
with semantic elegance?

**Groundwork Harmony** is more than a stylesheet—it's a philosophy. I believe your code should be music: clean,
harmonious, and effortless to scale. Groundwork Harmony brings a new standard for class-less frameworks, blending
innovation with reliability, so you can focus on content, not configuration.

---

## 🚀 Features That Hit All the Right Notes

- **🎷 Class-less by Design:**
  Write semantic HTML and watch your site transform into a modern, visually balanced masterpiece. No more tangled class spaghetti.

- **🌓 Automatic Dark Mode:**
  Adapts to your user's preference instantly, or set your own theme with one attribute. Day or night, always in tune.

- **🌐 LTR & RTL Support:**
  Logical properties and adaptive layouts ensure your content shines in every language, for every audience.

- **♿ Accessibility Baked In:**
  Focus states, skip links, screen reader helpers, and reduced motion support—out-of-the-box inclusivity.

- **🎨 Effortless Customization:**
  Change a few CSS variables and watch your entire interface take on a new mood. Your brand, your style, zero hassle.

- **📏 Modular Scales for Everything:**
  Typographic rhythm, spacing, grids, and more—all defined in scalable, responsive variables.

- **🧠 Modern CSS Magic:**
  Powered by `:has()`, `color-mix()`, `text-wrap`, `dvh`, and more. Built for today and the future.

---

## 💡 Get Started in 3 Steps

1. **Install**
   ```sh
   npm install groundwork-harmony
   ```
   Or simply [download the CSS file](./dist/groundwork-harmony.min.css).

2. **Include in Your Project**
   ```html
   <link rel="stylesheet" href="groundwork-harmony.min.css">
   ```

3. **Write Semantic HTML**
   ```html
   <main>
     <h1>Groundwork Harmony Awaits</h1>
     <p>No classes. No hassle. Just beautiful web experiences.</p>
     <button>Play Now</button>
   </main>
   ```

---

I recommend inserting the **Fonts** section right after the **Get Started in 3 Steps** section and before the **Make It Yours (Customization)** section.

That keeps it close to the installation instructions, so users are immediately aware they need to include the fonts separately.

---

## 📚 Fonts

Groundwork Harmony ships with fonts located in the `src/fonts/` directory.
These are **not** bundled into the minified `groundwork-harmony.min.css` file.

To use them, either:

1. Include the fonts stylesheet directly:

   ```html
   <link rel="stylesheet" href="fonts/fonts.css">
   ```

2. Or copy the `src/fonts/` folder into your project and update the `url()` paths in `fonts.css` if needed.

Custom fonts include **Groundwork Sans** and **Groundwork Serif**, referenced in the default CSS variables:

```css
:root {
  --font-family-sans: "Groundwork Sans", system-ui, sans-serif;
  --font-family-serif: "Groundwork Serif", ui-serif, serif;
}
```

---

## 🎛️ Make It Yours (Customization)

Groundwork  Harmony thrives on customization. Override any variable to match your vision:

```css
:root {
  --color-primary: #009cde;
}
```

Change one note, and the whole song follows.

---

## 🌒 Dark Mode—In Perfect Pitch

- Respects OS-level `prefers-color-scheme`.
- Manual override:
  `<html data-theme="dark"> ... </html>`

---

## 🌍 Accessibility & Global Reach

- Keyboard-friendly navigation and focus
- Screen reader-only helpers
- RTL/LTR adaptive by default
- Honors `prefers-reduced-motion`

---

## 🏆 Why Developers & Designers Love Harmony

- **Ridiculously fast prototyping:**
  Drop in the CSS and your site looks polished, instantly.

- **Zero lock-in:**
  Harmony styles semantic elements. Use it as your foundation, or pair with your own components and utilities.

- **Future-proof:**
  Built on modern CSS, ready for tomorrow's browsers.

- **Open source & community-driven:**
  Have an idea or need a fix? [Contribute!](https://github.com/IbentaLab/groundwork_harmony)

---

## 📖 Learn More

- Full variable reference
- Theming & advanced usage
- Accessibility details

See the [docs](./docs/index.md) for the complete story.

---

## 🎹 Compose. Harmonize. Ship.

Let your HTML sing and your UI stay in tune—with **Groundwork Harmony**, the modern class-less CSS framework for
creators who want more melody, less mess.

---

**Ready to orchestrate your next project?**
Install Groundwork Harmony and let your website find its voice.

---
