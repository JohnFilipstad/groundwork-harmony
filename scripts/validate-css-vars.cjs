#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const TOKENS_FILE = 'src/css/tokens//groundwork-tokens.css';
const CSS_DIRECTORY = 'src/css/';

/**
 * Extract CSS variables from a CSS file content
 * @param {string} content - CSS file content
 * @param {string} type - 'definitions' for :root declarations, 'usages' for var() calls
 * @returns {Set} Set of variable names
 */
function extractCSSVariables(content, type) {
  const variables = new Set();
  
  if (type === 'definitions') {
    // Match CSS custom property definitions in :root or * selectors
    const definitionRegex = /(?::root|^\s*\*)\s*\{[^}]*\}/gs;
    const matches = content.match(definitionRegex);
    
    if (matches) {
      matches.forEach(block => {
        // Extract individual variable definitions
        const varRegex = /--([a-zA-Z0-9-_]+)\s*:/g;
        let match;
        while ((match = varRegex.exec(block)) !== null) {
          variables.add(`--${match[1]}`);
        }
      });
    }
  } else if (type === 'usages') {
    // Match var() function calls
    const usageRegex = /var\(\s*(--[a-zA-Z0-9-_]+)/g;
    let match;
    while ((match = usageRegex.exec(content)) !== null) {
      variables.add(match[1]);
    }
  }
  
  return variables;
}

/**
 * Read and parse the tokens file to get all defined variables
 * @returns {Set} Set of defined variable names
 */
function getDefinedVariables() {
  try {
    const tokensContent = fs.readFileSync(TOKENS_FILE, 'utf8');
    return extractCSSVariables(tokensContent, 'definitions');
  } catch (error) {
    console.error(`❌ Error reading tokens file: ${TOKENS_FILE}`);
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Get all CSS files in the specified directory
 * @returns {Array} Array of file paths
 */
function getCSSFiles() {
  const pattern = path.join(CSS_DIRECTORY, '**/*.css');
  return glob.sync(pattern);
}

/**
 * Analyze a single CSS file for undefined variables
 * @param {string} filePath - Path to the CSS file
 * @param {Set} definedVars - Set of defined variables
 * @returns {Object} Analysis results
 */
function analyzeFile(filePath, definedVars) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const usedVars = extractCSSVariables(content, 'usages');
    const undefinedVars = new Set();
    
    usedVars.forEach(varName => {
      if (!definedVars.has(varName)) {
        undefinedVars.add(varName);
      }
    });
    
    return {
      file: filePath,
      totalUsed: usedVars.size,
      undefined: Array.from(undefinedVars),
      undefinedCount: undefinedVars.size
    };
  } catch (error) {
    console.error(`❌ Error reading file: ${filePath}`);
    console.error(error.message);
    return {
      file: filePath,
      totalUsed: 0,
      undefined: [],
      undefinedCount: 0,
      error: error.message
    };
  }
}

/**
 * Main function to run the validation
 */
function main() {
  console.log('🔍 CSS Variable Validator');
  console.log('='.repeat(50));
  console.log(`Tokens file: ${TOKENS_FILE}`);
  console.log(`CSS directory: ${CSS_DIRECTORY}`);
  console.log();

  // Get defined variables from tokens file
  console.log('📖 Reading tokens file...');
  const definedVars = getDefinedVariables();
  console.log(`✅ Found ${definedVars.size} defined variables`);
  console.log();

  // Get all CSS files
  console.log('📁 Scanning CSS files...');
  const cssFiles = getCSSFiles();
  
  // Filter out the tokens file itself
  const filesToAnalyze = cssFiles.filter(file => 
    path.resolve(file) !== path.resolve(TOKENS_FILE)
  );
  
  console.log(`✅ Found ${filesToAnalyze.length} CSS files to analyze`);
  console.log();

  // Analyze each file
  let totalIssues = 0;
  let filesWithIssues = 0;
  const allUndefinedVars = new Set();

  console.log('🔍 Analyzing files...');
  console.log('-'.repeat(50));

  filesToAnalyze.forEach(file => {
    const result = analyzeFile(file, definedVars);
    
    if (result.error) {
      console.log(`❌ ${result.file}: ERROR - ${result.error}`);
      return;
    }

    if (result.undefinedCount > 0) {
      filesWithIssues++;
      totalIssues += result.undefinedCount;
      
      console.log(`❌ ${result.file}`);
      console.log(`   Used: ${result.totalUsed} variables, Undefined: ${result.undefinedCount}`);
      result.undefined.forEach(varName => {
        console.log(`   • ${varName}`);
        allUndefinedVars.add(varName);
      });
      console.log();
    } else {
      console.log(`✅ ${result.file} (${result.totalUsed} variables used)`);
    }
  });

  // Summary
  console.log();
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total files analyzed: ${filesToAnalyze.length}`);
  console.log(`Files with issues: ${filesWithIssues}`);
  console.log(`Total undefined variable usages: ${totalIssues}`);
  console.log(`Unique undefined variables: ${allUndefinedVars.size}`);

  if (allUndefinedVars.size > 0) {
    console.log();
    console.log('🚨 UNDEFINED VARIABLES:');
    console.log('-'.repeat(30));
    Array.from(allUndefinedVars).sort().forEach(varName => {
      console.log(`• ${varName}`);
    });
  }

  console.log();
  
  if (totalIssues > 0) {
    console.log('❌ Validation failed! Please fix the undefined variables above.');
    process.exit(1);
  } else {
    console.log('✅ All CSS variables are properly defined in the tokens file!');
    process.exit(0);
  }
}

// Run the script
main();