#!/usr/bin/env node
'use strict';
/**
 * Export code changes to a single Markdown file for summarization.
 * Supported scopes:
 *   --scope=staged     Current STAGED changes (index)
 *   --scope=since-tag  All changes since the latest tag (TAG..HEAD)
 *
 * Options:
 *   --out=FILENAME.md   Custom output filename (default: CODE_CHANGES_YYYY-MM-DD.md)
 *   --exclude=dir1,dir2 Comma-separated path prefixes to ignore (e.g., dist,coverage)
 *
 * Output sections:
 *   - Summary (shortstat)
 *   - Files (git name-status)
 *   - Diff (unified, --no-color, fenced as ```diff)
 */

const { execSync } = require('node:child_process');
const { writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

function sh(cmd, { quietOk = false } = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    if (quietOk) return '';
    throw e;
  }
}

function hasChanges(diffBase) {
  try {
    execSync(`git diff ${diffBase} --quiet`, { stdio: 'ignore' });
    return false; // exit 0 → no changes
  } catch {
    return true;  // non-zero → there are changes
  }
}

// Ensure we run at the repo root
process.chdir(sh('git rev-parse --show-toplevel'));

const args = process.argv.slice(2);
const getArg = (k) => {
  const hit = args.find(a => a.startsWith(k + '='));
  return hit ? hit.split('=').slice(1).join('=') : null;
};

const scope = getArg('--scope') || 'staged';
const outName = getArg('--out') || `CODE_CHANGES_${new Date().toISOString().slice(0,10)}.md`;
const excludes = (getArg('--exclude') || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

let title = `Changes for summarization (${new Date().toISOString().slice(0,10)})`;
let base = '';

if (scope === 'staged') {
  if (!hasChanges('--staged')) {
    console.log('No staged changes.');
    process.exit(1);
  }
  base = '--staged';
  title += ' — staged';
} else if (scope === 'since-tag') {
  // Find latest tag; fail nicely if none
  let tag;
  try {
    tag = sh('git describe --tags --abbrev=0');
  } catch {
    console.error('No tags found. Create a tag first (e.g., git tag v1.0.0 && git push --tags).');
    process.exit(1);
  }
  if (!hasChanges(`${tag}..HEAD`)) {
    console.log(`No changes since ${tag}.`);
    process.exit(1);
  }
  base = `${tag}..HEAD`;
  title += ` — since ${tag}`;
} else {
  console.error('Unsupported --scope. Use --scope=staged or --scope=since-tag');
  process.exit(1);
}

// Collect diffs
const shortstat = sh(`git diff ${base} --shortstat`, { quietOk: true });
let nameStatus = sh(`git diff ${base} --name-status`, { quietOk: true });
const unified = sh(`git diff ${base} --no-color`, { quietOk: true });

// Apply excludes to file list (name-status)
if (excludes.length && nameStatus) {
  nameStatus = nameStatus
    .split('\n')
    .filter(Boolean)
    .filter(row => {
      // name-status uses tabs; format:
      //   M\tpath
      //   R100\toldpath\tnewpath
      const parts = row.split(/\t+/);
      const isRename = /^R/.test(parts[0]);
      const file = isRename ? parts[2] : parts[1];
      return file && !excludes.some(p => file.startsWith(p + '/') || file === p);
    })
    .join('\n');
}

// Build Markdown (keep it simple for LLM ingestion)
const md = [
  `# ${title}`,
  '',
  '## Summary',
  shortstat || '(no summary)',
  '',
  '## Files',
  nameStatus || '(no files)',
  '',
  '## Diff',
  '```diff',
  unified || '',
  '```',
  ''
].join('\n');

const outPath = resolve(process.cwd(), outName);
writeFileSync(outPath, md, 'utf8');
console.log(`Wrote ${outPath}`);
