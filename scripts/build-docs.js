const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const md = new markdownIt();

// Paths
const srcDocsDir = path.join(__dirname, 'src/docs');
const templatesDir = path.join(__dirname, 'src/templates');
const outputDocsDir = path.join(__dirname, 'docs');

// Ensure output directory exists
if (!fs.existsSync(outputDocsDir)) {
  fs.mkdirSync(outputDocsDir, { recursive: true });
}

// Read header and footer templates
const headerTemplate = fs.readFileSync(path.join(templatesDir, 'header.html'), 'utf-8');
const footerTemplate = fs.readFileSync(path.join(templatesDir, 'footer.html'), 'utf-8');

// Function to process a single Markdown file
function processMarkdownFile(fileName) {
  const inputFilePath = path.join(srcDocsDir, fileName);
  const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');
  const bodyHtml = md.render(markdownContent);

  // Combine header, body, and footer
  const fullHtml = `${headerTemplate}\n${bodyHtml}\n${footerTemplate}`;

  // Write output to `docs/` directory
  const outputFileName = fileName.replace('.md', '.html');
  const outputFilePath = path.join(outputDocsDir, outputFileName);aconst fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const md = new markdownIt();

// Paths
const srcDocsDir = path.join(__dirname, '../src/docs'); // Source Markdown files
const templatesDir = path.join(__dirname, '../src/templates'); // Header and footer templates
const outputDocsDir = path.join(__dirname, '../docs'); // Output directory for generated HTML

// Ensure output directory exists
if (!fs.existsSync(outputDocsDir)) {
  fs.mkdirSync(outputDocsDir, { recursive: true });
}

// Read header and footer templates
const headerTemplate = fs.readFileSync(path.join(templatesDir, 'header.html'), 'utf-8');
const footerTemplate = fs.readFileSync(path.join(templatesDir, 'footer.html'), 'utf-8');

// Function to process a single Markdown file
function processMarkdownFile(fileName) {
  const inputFilePath = path.join(srcDocsDir, fileName);
  const markdownContent = fs.readFileSync(inputFilePath, 'utf-8');
  const bodyHtml = md.render(markdownContent);

  // Combine header, body, and footer
  const fullHtml = `${headerTemplate}\n${bodyHtml}\n${footerTemplate}`;

  // Write output to `docs/` directory
  const outputFileName = fileName.replace('.md', '.html');
  const outputFilePath = path.join(outputDocsDir, outputFileName);
  fs.writeFileSync(outputFilePath, fullHtml);

  console.log(`Generated: ${outputFileName}`);
}

// Process all Markdown files in the source docs directory
fs.readdirSync(srcDocsDir).forEach((file) => {
  if (path.extname(file) === '.md') {
    processMarkdownFile(file);
  }
});
  fs.writeFileSync(outputFilePath, fullHtml);

  console.log(`Generated: ${outputFileName}`);
}

// Process all Markdown files in the source docs directory
fs.readdirSync(srcDocsDir).forEach((file) => {
  if (path.extname(file) === '.md') {
    processMarkdownFile(file);
  }
});