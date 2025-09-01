#!/usr/bin/env node
/* CommonJS version
 * Appends (or prepends with --prepend) a Keep-a-Changelog-style "Unreleased" entry
 * from the CURRENTLY STAGED changes. Exits if nothing is staged.
 *
 * Usage:
 *   node scripts/changelog-staged.cjs           # append
 *   node scripts/changelog-staged.cjs --prepend # put newest entry on top
 */
'use strict';

const { execSync } = require('node:child_process');
const { readFileSync, writeFileSync, appendFileSync, existsSync } = require('node:fs');
const { resolve } = require('node:path');

const PREPEND = process.argv.includes('--prepend');
// Optional path filters to keep noise out (edit to taste)
const EXCLUDES = ['dist/', 'coverage/']; // e.g., build outputs

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

// Ensure repo root
const repoRoot = sh('git rev-parse --show-toplevel');
process.chdir(repoRoot);

// Abort if no staged changes
let hasStaged = true;
try {
  execSync('git diff --staged --quiet'); // exit 0 => no staged changes
  hasStaged = false;
} catch {
  hasStaged = true;
}
if (!hasStaged) {
  console.log('No staged changes to document.');
  process.exit(1);
}

// Collect data
const today = new Date().toISOString().slice(0, 10);
const summary = sh('git diff --staged --shortstat');
const nameStatusRaw = sh('git diff --staged --name-status');

// Build lines (use tab-splitting to be safe with spaces in filenames)
const lines = nameStatusRaw
  .split('\n')
  .filter(Boolean)
  .map((row) => {
    const parts = row.split(/\t+/); // status, [oldPath], path
    const status = parts[0];
    const isRename = /^R/.test(status);
    const file = isRename ? parts[2] : parts[1];
    if (!file) return null;
    if (EXCLUDES.some((p) => file.startsWith(p))) return null;

    let label = status;
    if (status === 'A') label = 'Added';
    else if (status === 'M') label = 'Changed';
    else if (status === 'D') label = 'Removed';
    else if (isRename) label = 'Renamed';

    return `- ${label}: ${file}`;
  })
  .filter(Boolean)
  .join('\n');

const entry = `## [Unreleased] - ${today}

### Summary
${summary}

### Changes
${lines}

`;

const changelogPath = resolve(repoRoot, 'CHANGELOG.md');

// Ensure minimal header if missing
if (!existsSync(changelogPath)) {
  const header = `# Changelog

All notable changes to this project will be documented in this file.

`;
  writeFileSync(changelogPath, header, 'utf8');
}

// Write entry
if (PREPEND) {
  const existing = readFileSync(changelogPath, 'utf8');
  writeFileSync(changelogPath, entry + existing, 'utf8');
} else {
  appendFileSync(changelogPath, entry, 'utf8');
}

console.log('CHANGELOG.md updated.');
