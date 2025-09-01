import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssBanner from "postcss-banner";
import discardComments from "postcss-discard-comments";
import { readFileSync } from "fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";

const bannerProd = ` Groundwork Harmony v.${packageJson.version} by John Filipstad`;

const bannerDev = `
  Groundwork Harmony 🎶

  A class-less CSS base for the modern web. Supercharge and harmonize your HTML
  with modern, accessible defaults, and powerful customization.
  ---
  🎤 Why Settle for Noise? Orchestrate with Harmony.

  Welcome to Groundwork Harmony—the CSS base designed for creators who want their
  web projects to look striking, modern, and accessible right out of the box.
  Why drown your markup in utility classes when you can let your HTML sing with
  semantic elegance?

  Groundwork Harmony is more than a stylesheet—it's a philosophy.
  I believe your code should be music: clean, harmonious, and effortless to scale.
  Groundwork Harmony supercharges HTML elements with modern, accessible defaults.
  Think of it as normalize.css in high gear, blending innovation with reliability
  so you can focus on content, not configuration.

  Version: v.${packageJson.version}
  (c) 2025 John Filipstad
`.trim();

/**
 * ✅ Reminder: always generate **external** source maps (dev + prod).
 * PostCSS will derive the correct map name from CLI `-o` target:
 *   dist/groundwork-harmony.css      -> groundwork-harmony.css.map
 *   dist/groundwork-harmony.min.css  -> groundwork-harmony.min.css.map
 *
 * Embed `sourcesContent` so users don’t need the /src tree.
 */
export default {
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true,
    sourceRoot: "..",
  },

  plugins: [
    postcssImport(),
    autoprefixer(),

    // Add the banner FIRST. It will be an "important" comment (/*! ... */).
    postcssBanner({
      banner: isProd ? bannerProd : bannerDev,
      important: true,
    }),

    // DEV ONLY: Strip all OTHER comments. The banner survives because it's "important".
    !isProd && discardComments(),

    // PROD ONLY: Minify. cssnano is configured to preserve the /*! banner */.
    isProd &&
      cssnano({
        preset: [
          "default",
          {
            discardComments: { removeAll: false }, // keep /*! ... */
            calc: false,
          },
        ],
      }),
  ].filter(Boolean),
};
