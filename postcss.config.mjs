import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssBanner from "postcss-banner";
import { readFileSync } from "fs";

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url)),
);
const isProd = process.env.NODE_ENV === "production";

export default {
  plugins: [
    postcssImport(),
    autoprefixer(),
    isProd &&
      postcssBanner({
        banner: ` * 2025 Groundwork Harmony v.${packageJson.version} by John Filipstad`,
        important: true,
      }),

    isProd && cssnano({ preset: "default" }),
  ].filter(Boolean),
};
