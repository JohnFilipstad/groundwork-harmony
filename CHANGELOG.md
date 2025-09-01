## [2.0.0] - 2025-08-25

### Summary
Major architectural overhaul featuring modular token system and WCAG 2.2 AA compliance improvements.

### 🚨 BREAKING CHANGES

* **Token Architecture**: All CSS design tokens moved to separate `@johnfilipstad/groundwork-tokens` package
* **Installation**: Now requires both packages: `npm install @johnfilipstad/groundwork-tokens @johnfilipstad/groundwork-harmony`
* **Build System**: Removed inline token generation - tokens must be loaded before harmony.css
* **File Structure**: Removed `src/css/tokens/` directory and all token files
* **Script Changes**: Removed `generate-colors.cjs` and `validate-css-vars.cjs` scripts

### ✨ New Features

* **Modular Architecture**: Separate token package allows reuse across multiple projects
* **Automation Scripts**: Added changelog generation and code change tracking
* **Test Structure**: Moved examples to `test-specimens/` for better organization

### 🐛 Accessibility Fixes

* **WCAG 2.2 AA Compliance**: Enhanced form control target sizes (24x24px minimum)
* **Interactive Elements**: Improved checkbox, radio, and button sizing
* **Form Controls**: Added `min-height: 24px` to all form inputs and interactive elements

### 🔄 Changed

* **Package Structure**: Streamlined to focus on styling layer only  
* **Dependencies**: Now requires `@johnfilipstad/groundwork-tokens` as peer dependency
* **File Organization**: Renamed `examples/` to `test-specimens/` for clarity
* **Build Output**: Updated distributions reflect token-based architecture

### ❌ Removed

* All files in `src/css/tokens/` directory
* `scripts/build-docs.js`
* `scripts/generate-colors.cjs` 
* `scripts/validate-css-vars.cjs`
* Root-level kitchen sink demo (moved in v1.1.0)

---

## [unreleased] - 2025-08-20

### Summary
44 files changed, 12648 insertions(+), 2119 deletions(-)

Major expansion featuring comprehensive demo suite and improved project structure. Key highlights: complete demo collection showcasing all framework components, kitchen sink moved to dedicated demos directory, enhanced build outputs with updated distributions, new automation scripts for changelog generation, and refined base styling across multiple components including quotes, semantic elements, and tables.

### Changes

#### **New Files**
* `demos/assets/demos.css`: Stylesheet for the demo pages providing consistent styling across all demonstration examples.
* `demos/assets/theme-toggle.js`: JavaScript functionality for theme switching capabilities within the demo environment.
* `demos/code.html`: Demonstration page showcasing code styling and syntax highlighting capabilities.
* `demos/embedded.html`: Demo page for embedded content like images, videos, and iframes.
* `demos/forms.html`: Comprehensive form elements demonstration including inputs, buttons, and form layouts.
* `demos/groundwork-harmony-default-colors.html`: Color palette showcase displaying the default color system.
* `demos/groundwork-harmony-kitchen-sink.html`: Complete kitchen sink demo relocated to the demos directory.
* `demos/index.html`: Main index page for the demo collection with navigation to all component demonstrations.
* `demos/interactive.html`: Interactive elements demo including dialogs, details/summary, and other interactive components.
* `demos/links.html`: Link styling demonstrations showing various link states and styles.
* `demos/lists.html`: List element demonstrations including ordered, unordered, and definition lists.
* `demos/quotes.html`: Quote and citation styling showcase for blockquotes and inline quotes.
* `demos/tables.html`: Table styling demonstrations with various table layouts and configurations.
* `demos/text-semantics.html`: Semantic text element demonstrations including emphasis, strong, code, and other inline elements.
* `demos/typography.html`: Typography showcase displaying heading hierarchy, body text, and typographic scales.

#### **Deleted Files**
* `groundwork-harmony-kitchensink.html`: Removed from root directory as it has been relocated to the demos folder.

#### **Modified Files**
* `.gitignore`: Updated to include generated change documentation files.
* `dist/groundwork-harmony.css`: Updated build output reflecting all recent changes to base styles and tokens.
* `dist/groundwork-harmony.css.map`: Updated source map for the main CSS distribution.
* `dist/groundwork-harmony.min.css`: Updated minified CSS distribution.
* `dist/groundwork-harmony.min.css.map`: Updated source map for the minified CSS distribution.
* `package.json`: Updated with new npm scripts for changelog generation and code change tracking.
* `postcss.config.mjs`: Minor configuration updates and corrections.
* `scripts/generate-colors.cjs`: Enhanced color generation script with improved algorithms and semantic palette support.
* `src/css/base/embedded.css`: Refined styling for embedded content elements like images and figures.
* `src/css/base/forms.css`: Enhanced form element styling with improved accessibility and visual consistency.
* `src/css/base/interactive.css`: Updated interactive element styling including dialogs and other interactive components.
* `src/css/base/links.css`: Improved link styling with better navigation link support and alignment.
* `src/css/base/lists.css`: Enhanced list styling with updated marker colors and spacing.
* `src/css/base/quotes.css`: Enhanced quote styling with improved typography and spacing for blockquotes and inline citations.
* `src/css/base/semantic.css`: Refined semantic element styling for better consistency and accessibility.
* `src/css/base/tables.css`: Improved table styling with better borders, spacing, and responsive behavior.
* `src/css/base/typography.css`: Typography improvements with better heading margins and readable text widths.
* `src/css/tokens/groundwork-colors.css`: Updated with new semantic color system replacing foundational palettes.
* `src/css/tokens/groundwork-theme-base.css`: Enhanced theme system with systematic lightness scales and brand color preservation.
* `src/css/tokens/groundwork-tokens.css`: Updated token system with new color-mix() functionality and improved surface colors.

---

## [Unreleased] - 2025-08-20

### Summary
26 files changed, 7124 insertions(+), 1507 deletions(-)

Major refactor featuring complete color system overhaul. Key highlights: new theme generator tool with live preview and export capabilities, semantic color system replacing foundational palettes (success/danger/warning/info/notice/muted), advanced theming engine with systematic lightness scales and brand color preservation, dynamic surface colors using color-mix() for better theme integration, typography improvements for readability and visual hierarchy, and new automation scripts for changelog generation and code change tracking.

### Changes

#### **New Files**
* `CHANGELOG.md`: A changelog has been added to the project. The initial entry documents all the changes included in this update.
* `scripts/changelog-staged.cjs`: A new script has been added to automatically generate a changelog entry from currently staged changes in Git.
* `scripts/export-code-changes.cjs`: This new script exports staged or recent code changes (summary, file list, and diff) into a single Markdown file for review or summarization.
* `theme-generator/chroma.js`: The Chroma.js color manipulation library has been added to the project to power the new theme generator.
* `theme-generator/groundwork-harmony-theme-generator.html`: This is the main file for a powerful new **Theme Generator** tool. It provides a user interface with professional presets, controls for customizing brand colors, typography, and spacing, and a live preview panel.
* `theme-generator/theme-generator.css`: This file contains the styles for the new theme generator page, ensuring a clean and user-friendly interface.
* `theme-generator/theme-generator.js`: This is the core JavaScript for the theme generator. It handles applying presets, dynamically generating color palettes and CSS variables using Chroma.js, updating the live preview, and exporting theme code in various formats (CSS, SCSS, JSON).

---

#### **Deleted Files**
* `scripts/build-docs.js`: The script for building documentation from Markdown files has been removed from the project.

---

#### **Modified Files**
* `dist/groundwork-harmony.css` (and its `.min` and `.map` versions):
    * **Major Color System Overhaul**: The foundational color palettes (grey, red, blue, etc.) have been removed and replaced with a semantic color system (`success`, `danger`, `warning`, `info`, `notice`, `muted`).
    * **Advanced Theming Engine**: The calculation for theme colors (primary, secondary, accent) has been completely refactored with a new, more systematic lightness scale and the addition of `--color-*-brand` tokens to preserve the user's exact input color.
    * **Dynamic Surface Colors**: Surface and body colors now use `color-mix()` and a `--color-body-base` variable, making them themeable and relative to the background for more cohesive designs.
    * **Typography and Layout Refinements**: Default margins for headings have been increased for better visual hierarchy, paragraph width in articles has been slightly reduced for readability, and minor adjustments have been made to links, lists, and form elements for improved alignment and styling.
* `groundwork-harmony-kitchensink.html`:
    * The kitchen sink demo page has been significantly updated to reflect the new color system and theming capabilities.
    * It now features a **brand-tinted background** as a demonstration of the new theme-aware surface colors.
    * Content has been streamlined to better showcase core features, and the GitHub link has been updated to use an SVG icon.
* `package.json`:
    * New npm scripts have been added to support development workflows, including `changelog:generate` and `code:changes:staged`.
* `postcss.config.mjs`:
    * A minor typo was corrected in a comment within the configuration file.
* `scripts/generate-colors.cjs`:
    * The color generation script has been completely rewritten. It now generates semantic palettes instead of foundational ones and uses a more robust algorithm based on **55% lightness** to ensure predictable and accessible color scales. It also introduces the concept of separate "brand" and "systematic" tokens.
* `src/css/base/` (directory):
    * `embedded.css`: Removed opinionated margins and text alignment from `img`, `figure`, and `figcaption` for more neutral defaults.
    * `forms.css`: The `accent-color` for range inputs is now the theme's accent color, and styles were added to ensure the track fills its container.
    * `interactive.css`: The `dialog` element is now centered automatically with `margin: auto`.
    * `links.css`: Navigation links (`nav a`) now use `inline-flex` for better vertical alignment of content.
    * `lists.css`: The list marker (`li::marker`) color has been updated to use a lighter shade of the primary color (`--color-primary-500`).
    * `typography.css`: Margins for headings have been increased, and the readable width for paragraphs in articles has been adjusted to `80ch`.  WCAG 2.1 Success Criterion 1.4.8: Recommends that a block of text should have a line length of 80 characters or fewer.
* `src/css/tokens/` (directory):
    * `groundwork-colors.css`: This file was refactored to contain the new semantic color palettes (`success`, `danger`, etc.).
    * `groundwork-theme-base.css`: The HSL lightness values for theme colors were updated to a new systematic scale (92% down to 8%) and new `--color-*-brand` tokens were added.
    * `groundwork-tokens.css`: This central token file was updated to use the new color system, switching to `color-mix()` for dynamic surface colors and updating the monospace font to `Groundwork Mono`.

---

# Changelog

All notable changes to this project will be documented in this file.

[unreleased]: https://github.com/your-org/groundwork_harmony/compare/latest...HEAD

