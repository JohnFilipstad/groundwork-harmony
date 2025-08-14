import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright"; // default export ✅
import path from "node:path";
import fs from "node:fs";

const pages = [
  "index.html",
  "typography.html",
  "forms.html",
  "tables.html",
  "media.html",
  "content.html",
];

const fileUrl = (p) =>
  `file://${path.resolve(process.cwd(), "examples", p).replace(/\\/g, "/")}`;

/**
 * Run Axe with WCAG 2.0/2.1/2.2 AA tags and fail on serious/critical.
 */
async function runA11y(page, url) {
  await page.goto(url);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  const problems =
    (results.violations || []).filter(v =>
      ["serious", "critical"].includes(v.impact)
    );

  if (problems.length) {
    console.log("\nA11y violations (serious/critical):\n");
    for (const v of problems) {
      console.log(`- ${v.id} (${v.impact}) — ${v.description}`);
      for (const node of v.nodes.slice(0, 5)) {
        console.log(`  selector: ${node.target?.join(" ")}`);
        if (node.failureSummary) {
          console.log(`  ${node.failureSummary.split("\n")[0]}`);
        }
      }
    }
  }

  expect(problems, "Serious/critical a11y violations found").toHaveLength(0);
}

test.describe("A11y: examples/* (WCAG 2.2 AA)", () => {
  for (const pageName of pages) {
    test(`${pageName} has no serious/critical violations`, async ({ page }) => {
      const fullPath = path.resolve("examples", pageName);
      expect(
        fs.existsSync(fullPath),
        `Missing file: ${fullPath}`
      ).toBeTruthy();

      await runA11y(page, fileUrl(pageName));
    });
  }
});
