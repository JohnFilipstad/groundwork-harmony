import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y, configureAxe } from "@axe-core/playwright";
import path from "node:path";
import fs from "node:fs";

const pages = [
  "index.html",
  "typography.html",
  "forms.html",
  "tables.html",
  "media.html",
  "content.html"
];

const fileUrl = (p) =>
  `file://${path.resolve(process.cwd(), "examples", p).replace(/\\/g, "/")}`;

test.describe("A11y: examples/* (WCAG 2.2 AA)", () => {
  for (const page of pages) {
    test(`${page} has no serious/critical violations`, async ({ page: pw }) => {
      const url = fileUrl(page);
      expect(fs.existsSync(path.resolve("examples", page))).toBeTruthy();

      await pw.goto(url);
      await injectAxe(pw);

      // Configure Axe for WCAG 2.2 AA
      await configureAxe(pw, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag22aa"] }
      });

      // Fail the test on serious/critical only (prints all)
      await checkA11y(pw, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
        axeOptions: {},
        includedImpacts: ["serious", "critical"]
      });
    });
  }
});
