#!/usr/bin/env node

/**
 * Automated Release Script for Groundwork Harmony
 * 
 * Automates the entire release process:
 * - Generates change documentation
 * - Updates changelog 
 * - Creates release commit
 * - Bumps version and creates tags
 * 
 * Usage: npm run release -- --minor
 * Flags: --major, --minor, --patch, --dry-run
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for pretty output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
  reset: '\x1b[0m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const error = (message) => {
  log(`❌ ${message}`, 'red');
  process.exit(1);
};

const success = (message) => {
  log(`✅ ${message}`, 'green');
};

const info = (message) => {
  log(`ℹ️  ${message}`, 'blue');
};

const warning = (message) => {
  log(`⚠️  ${message}`, 'yellow');
};

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const releaseType = args.find(arg => ['--major', '--minor', '--patch'].includes(arg))?.replace('--', '');

if (!releaseType && !isDryRun) {
  error('Please specify release type: --major, --minor, or --patch');
}

// Helper functions
const runCommand = (command, description) => {
  if (isDryRun) {
    log(`[DRY RUN] Would run: ${command}`, 'yellow');
    return '';
  }
  
  info(`${description}...`);
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    error(`Failed to ${description.toLowerCase()}: ${err.message}`);
  }
};

const getCurrentVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
};

const getNextVersion = (current, type) => {
  const [major, minor, patch] = current.split('.').map(Number);
  
  switch (type) {
    case 'major': return `${major + 1}.0.0`;
    case 'minor': return `${major}.${minor + 1}.0`;
    case 'patch': return `${major}.${minor}.${patch + 1}`;
    default: error(`Invalid release type: ${type}`);
  }
};

const updateChangelog = (changesFile, newVersion) => {
  if (!fs.existsSync(changesFile)) {
    error(`Changes file not found: ${changesFile}`);
  }
  
  const changes = fs.readFileSync(changesFile, 'utf8');
  const changelogPath = 'CHANGELOG.md';
  
  if (!fs.existsSync(changelogPath)) {
    error('CHANGELOG.md not found');
  }
  
  // Parse the changes file to extract summary and file count
  const summaryMatch = changes.match(/## Summary\n(.+)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : 'No summary available';
  
  // Create new changelog entry
  const date = new Date().toISOString().split('T')[0];
  const newEntry = `## [${newVersion}] - ${date}

### Summary
${summary}

${changes.split('## Diff')[0].replace(/# Changes for summarization.*\n/, '').replace(/## Summary\n.+\n/, '')}

---

`;
  
  // Read existing changelog and prepend new entry
  const existingChangelog = fs.readFileSync(changelogPath, 'utf8');
  const updatedChangelog = newEntry + existingChangelog;
  
  if (isDryRun) {
    log('[DRY RUN] Would update CHANGELOG.md with new entry', 'yellow');
    return;
  }
  
  fs.writeFileSync(changelogPath, updatedChangelog);
  success('Updated CHANGELOG.md');
};

const createCommitMessage = (version, changesFile) => {
  const changes = fs.readFileSync(changesFile, 'utf8');
  
  // Extract key changes for commit message
  const fileCountMatch = changes.match(/(\d+) files changed/);
  const fileCount = fileCountMatch ? fileCountMatch[1] : 'multiple';
  
  // Create commit message with heading and detailed body
  const heading = `feat: release v${version} with major enhancements`;
  
  const body = `
• Enhanced accessibility with improved link contrast and WCAG 2.2 compliance
• Added comprehensive test specimens collection (renamed from examples)
• Implemented robust token validation system with 333+ CSS variables
• Improved development workflow with automated changelog generation
• Updated documentation and browser support information
• Fixed HTML validation across all test files
• Streamlined dark mode implementation with smart OS preference handling

This release includes ${fileCount} file changes with significant improvements
to accessibility, developer experience, and project organization.`;
  
  return `${heading}${body}`;
};

const validateEnvironment = async () => {
  info('Validating environment...');
  
  // Check if we're in a git repo
  try {
    runCommand('git rev-parse --git-dir', 'Check git repository');
  } catch {
    error('Not in a git repository');
  }
  
  // Check for unstaged changes
  const unstagedFiles = runCommand('git diff --name-only', 'Check unstaged files');
  const stagedFiles = runCommand('git diff --cached --name-only', 'Check staged files');
  
  if (!isDryRun && unstagedFiles.trim()) {
    const unstagedCount = unstagedFiles.trim().split('\n').length;
    const stagedCount = stagedFiles.trim() ? stagedFiles.trim().split('\n').length : 0;
    
    console.log();
    warning(`Found ${unstagedCount} unstaged files and ${stagedCount} staged files`);
    console.log();
    log('Unstaged files:', 'yellow');
    unstagedFiles.trim().split('\n').forEach(file => {
      console.log(`  ${file}`);
    });
    
    if (stagedCount > 0) {
      console.log();
      log('Already staged files:', 'blue');
      stagedFiles.trim().split('\n').forEach(file => {
        console.log(`  ${file}`);
      });
    }
    
    console.log();
    log('What would you like to do?', 'bold');
    console.log('1. Stage all unstaged changes automatically');
    console.log('2. Continue with manually staged changes only');  
    console.log('3. Abort release');
    console.log();
    
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const choice = await new Promise((resolve) => {
      rl.question('Enter your choice (1-3): ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
    
    switch (choice) {
      case '1':
        info('Staging all changes...');
        runCommand('git add .', 'Stage all changes');
        success('All changes staged');
        break;
      case '2':
        if (stagedCount === 0) {
          error('No staged files found. Please stage some changes first or choose option 1.');
        }
        info(`Continuing with ${stagedCount} manually staged files`);
        break;
      case '3':
        log('Release aborted by user', 'yellow');
        process.exit(0);
        break;
      default:
        error('Invalid choice. Please run the script again and enter 1, 2, or 3.');
    }
    console.log();
  } else if (!isDryRun && !stagedFiles.trim()) {
    error('No staged files found. Please stage your changes first or ensure you have changes to release.');
  }
  
  success('Environment validation complete');
};

const main = async () => {
  log(`\n🚀 ${colors.bold}Groundwork Harmony Release Script${colors.reset}\n`);
  
  if (isDryRun) {
    warning('DRY RUN MODE - No changes will be made\n');
  }
  
  // Step 1: Validate environment
  validateEnvironment();
  
  // Step 2: Get current version and calculate next
  const currentVersion = getCurrentVersion();
  const nextVersion = releaseType ? getNextVersion(currentVersion, releaseType) : currentVersion;
  
  info(`Current version: ${currentVersion}`);
  info(`Next version: ${nextVersion} (${releaseType || 'dry-run'})`);
  console.log();
  
  // Step 3: Generate changes documentation
  info('Generating changes documentation...');
  runCommand('npm run code:changes:staged', 'Generate staged changes');
  success('Changes documentation generated');
  
  // Step 4: Update changelog
  const changesFile = `CODE_CHANGES_${new Date().toISOString().split('T')[0]}.md`;
  if (releaseType) {
    updateChangelog(changesFile, nextVersion);
  }
  
  // Step 5: Stage changelog
  if (!isDryRun) {
    runCommand('git add CHANGELOG.md', 'Stage updated changelog');
    success('Staged CHANGELOG.md');
  }
  
  // Step 6: Create release commit
  const commitMessage = createCommitMessage(nextVersion, changesFile);
  if (!isDryRun) {
    // Write commit message to temp file for multi-line message
    const tempFile = '.commit-msg-temp';
    fs.writeFileSync(tempFile, commitMessage);
    runCommand(`git commit -F ${tempFile}`, 'Create release commit');
    fs.unlinkSync(tempFile);
    success('Created release commit');
  } else {
    log(`[DRY RUN] Would create commit with message:\n${commitMessage}`, 'yellow');
  }
  
  // Step 7: Bump version and create tag
  if (!isDryRun && releaseType) {
    runCommand(`npm version ${releaseType} --no-git-tag-version`, 'Update package.json version');
    runCommand(`git add package.json`, 'Stage version update');
    runCommand(`git commit --amend --no-edit`, 'Amend commit with version update');
    runCommand(`git tag v${nextVersion}`, 'Create release tag');
    success(`Created tag v${nextVersion}`);
  }
  
  // Step 8: Summary and next steps
  console.log();
  log(`🎉 ${colors.bold}Release ${nextVersion} ready!${colors.reset}`, 'green');
  console.log();
  info('Next steps:');
  info('  git push origin main');
  info('  git push --tags');
  info('  npm publish (if ready for npm)');
  console.log();
  
  if (isDryRun) {
    warning('This was a dry run. Run without --dry-run to execute.');
  }
};

// Run the script
main().catch(err => {
  error(`Script failed: ${err.message}`);
});