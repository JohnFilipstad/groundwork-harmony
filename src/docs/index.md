# Getting Started with Groundwork Harmony

Once you've installed Groundwork Harmony, you're just a few steps away from building modern, semantic, and accessible websites. Follow this guide to get started quickly.

---

## 1. Include the CSS

### Option 1: Use a `<link>` Tag
If you're not using a build tool, simply include the precompiled CSS file in your HTML:
```html
<link rel="stylesheet" href="path-to-groundwork-harmony.min.css">
```

### Option 2: Import it in Your JavaScript
For projects with a build tool like Webpack or Vite, import the CSS directly:
```javascript
import 'groundwork-harmony/dist/groundwork-harmony.min.css';
```

---

## 2. Add Fonts

Groundwork Harmony ships with custom fonts located in the `dist/fonts/` folder. To use them, you can:

### Option 1: Link the Fonts CSS
Add the following to your HTML:
```html
<link rel="stylesheet" href="path-to-fonts/fonts.css">
```

### Option 2: Copy the Fonts
Copy the `fonts` folder to your project and update the paths in `fonts.css` as needed.

---

## 3. HTML Element Defaults

Groundwork Harmony supercharges your HTML elements with modern, accessible defaults. Think of it as `normalize.css` in high gear. It not only normalizes styles but also harmonizes them. Here's what it does:

- **Typography**: Sets sensible font sizes, line heights, and spacing for readability.
- **Headings and Text**: Ensures proper hierarchy with consistent margins and font weights.
- **Forms and Buttons**: Styles inputs and buttons for usability without requiring additional classes.
- **Lists and Tables**: Applies clean, consistent styles for lists and tables.
- **Accessibility Features**: Focus styles, contrast adjustments, and support for reduced motion out of the box.

With these enhanced defaults, you can focus on writing semantic HTML while Groundwork Harmony ensures it looks great across browsers.

---

## 4. First Page Setup

Here’s a basic example to get you started with Groundwork Harmony:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="path-to-groundwork-harmony.min.css">
  <title>My First Page</title>
</head>
<body>
  <header>
    <h1>Welcome to Groundwork Harmony</h1>
    <p>Start building beautiful, semantic websites effortlessly.</p>
  </header>
  <main>
    <section>
      <h2>Getting Started</h2>
      <p>This is a simple example of how to use Groundwork Harmony.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
</body>
</html>
```

---

## What's Next?

- Explore the **[Usage Guide](usage.html)** for tips on building layouts and using semantic HTML patterns.
- Customize your design with **[Theming](theming/index.html)**.
- Check out **[Examples](examples/index.html)** to see Groundwork Harmony in action.

---