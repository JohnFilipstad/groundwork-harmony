// generate-colors.cjs
const fs = require("fs");
const path = require("path");
const chroma = require("chroma-js");

// ====================================================================
//  CONFIGURATION
// ====================================================================

const foundationalColors = {
  grey: "#7d7d7d",
  red: "#cb180b",
  magenta: "#c31377",
  orange: "#fa9600",
  amber: "#f5b800",
  yellow: "#ffea29",
  brown: "#865e50",
  green: "#337539",
  teal: "#00756a",
  cyan: "#007894",
  blue: "#0678be",
  indigo: "#594af6",
  purple: "#8f2fe9"
};

const themeColors = {
  primary: foundationalColors.purple,
  secondary: foundationalColors.indigo,
  accent: foundationalColors.amber
};

const wcag_aa_ratio = 4.6;

// ====================================================================
//  COLOR SCALE GENERATION
// ====================================================================

function generateProperScale(baseColor) {
  const base = chroma(baseColor);
  const MIN_LIGHTNESS = 8;   // Near-black (8% lightness)
  const MAX_LIGHTNESS = 92;  // Near-white (92% lightness)
  
  // Special handling for grayscale colors
  if (base.get('hsl.s') < 0.05) {
    const baseLightness = base.get('hsl.l') * 100;
    return [
      chroma.lch(MAX_LIGHTNESS, 0, 0).hex(),  // 100
      chroma.lch(82, 0, 0).hex(),            // 200
      chroma.lch(72, 0, 0).hex(),            // 300
      chroma.lch(62, 0, 0).hex(),            // 400
      base.hex(),                            // 500
      chroma.lch(38, 0, 0).hex(),            // 600
      chroma.lch(28, 0, 0).hex(),            // 700
      chroma.lch(18, 0, 0).hex(),            // 800
      chroma.lch(MIN_LIGHTNESS, 0, 0).hex()  // 900
    ];
  }

  // For colored hues
  const baseLch = base.lch();
  const baseLightness = baseLch[0];
  const baseChroma = baseLch[1];
  const baseHue = baseLch[2] || 0;

  // Generate optimized lightness scale
  const lightnessSteps = [
    Math.min(MAX_LIGHTNESS, baseLightness + 30),  // 100
    Math.min(88, baseLightness + 22),             // 200
    Math.min(84, baseLightness + 14),             // 300
    Math.min(80, baseLightness + 7),              // 400
    baseLightness,                                // 500
    Math.max(35, baseLightness - 8),              // 600
    Math.max(25, baseLightness - 16),             // 700
    Math.max(15, baseLightness - 23),             // 800
    Math.max(MIN_LIGHTNESS, baseLightness - 30)   // 900
  ];

  return lightnessSteps.map(lightness => {
    // Smart chroma adjustment
    let chromaRatio;
    if (lightness > baseLightness) {
      // Light tints: gently reduce chroma
      chromaRatio = 0.6 + 0.4 * (1 - (lightness - baseLightness) / 30);
    } else {
      // Dark shades: preserve more chroma initially
      chromaRatio = 0.8 - 0.3 * (baseLightness - lightness) / 30;
    }
    
    const adjustedChroma = baseChroma * Math.min(1, chromaRatio);
    
    // Extra desaturation at extremes
    const finalChroma = (lightness >= 88 || lightness <= 15)
      ? adjustedChroma * 0.7
      : adjustedChroma;
      
    return chroma.lch(lightness, finalChroma, baseHue).hex();
  });
}

// ====================================================================
//  HELPER FUNCTIONS
// ====================================================================

function toShortHex(hex) {
  if (hex.length === 7 && hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
    return `#${hex[1]}${hex[3]}${hex[5]}`;
  }
  return hex;
}

function generateStaticPalette(name, color) {
  const scale = generateProperScale(color);
  let colorVars = [];
  let textVars = [];

  scale.forEach((hex, index) => {
    const step = (index + 1) * 100;
    colorVars.push(`  --color-${name}-${step}: ${toShortHex(hex)};`);
    
    const contrastWithBlack = chroma.contrast(hex, "#000000");
    const textColorVar = contrastWithBlack >= wcag_aa_ratio
      ? "var(--color-text-on-light)"
      : "var(--color-text-on-dark)";
    textVars.push(`  --color-${name}-${step}-text: ${textColorVar};`);
  });

  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  return [
    `\n\n  /* --- ${formattedName} Palette --- */`,
    `  --color-${name}: var(--color-${name}-600);`,
    `  --color-${name}-text: var(--color-${name}-600-text);`,
    ...colorVars,
    ...textVars
  ].join("\n");
}

function generateDynamicHslTheme(name, color) {
  const scale = generateProperScale(color);
  const [h, s] = chroma(color).hsl();

  let css = [
    `\n\n  /* --- ${name.charAt(0).toUpperCase() + name.slice(1)} Theme --- */`,
    `  --color-${name}-h: ${isNaN(h) ? 0 : h.toFixed(0)};`,
    `  --color-${name}-s: ${(s * 100).toFixed(0)}%;`
  ].join("\n");

  let lightnessVars = [];
  let colorVars = [];
  let textVars = [];

  scale.forEach((hex, index) => {
    const step = (index + 1) * 100;
    const lightness = (chroma(hex).get("hsl.l") * 100).toFixed(0);
    lightnessVars.push(`  --color-${name}-l-${step}: ${lightness}%;`);
    colorVars.push(`  --color-${name}-${step}: hsl(var(--color-${name}-h) var(--color-${name}-s) var(--color-${name}-l-${step}));`);
    
    const contrastWithBlack = chroma.contrast(hex, "#000000");
    const textColorVar = contrastWithBlack >= wcag_aa_ratio
      ? "var(--color-text-on-light)"
      : "var(--color-text-on-dark)";
    textVars.push(`  --color-${name}-${step}-text: ${textColorVar};`);
  });

  return [
    css,
    ...lightnessVars,
    ...colorVars,
    ...textVars,
    `  --color-${name}-text: var(--color-${name}-600-text);`
  ].join("\n");
}

// ====================================================================
//  SCRIPT EXECUTION
// ====================================================================

try {
  const outputDir = path.join(__dirname, "..", "src", "css", "tokens");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate groundwork-colors.css
  let colorsCss = [
    "/* AUTO-GENERATED: Contains all foundational color palettes. */",
    "",
    ":root {",
    "  --color-white: #fff;",
    "  --color-white-text: var(--color-text-on-light);",
    "  --color-black: #000;",
    "  --color-black-text: var(--color-text-on-dark);"
  ].join("\n");

  for (const [name, color] of Object.entries(foundationalColors)) {
    colorsCss += generateStaticPalette(name, color);
  }
  
  colorsCss += "\n}\n";
  fs.writeFileSync(path.join(outputDir, "groundwork-colors.css"), colorsCss);

  // Generate groundwork-theme-base.css
  let themeCss = [
    "/* AUTO-GENERATED: Contains dynamic HSL components for theming. */",
    "",
    ":root {"
  ].join("\n");

  for (const [name, color] of Object.entries(themeColors)) {
    themeCss += generateDynamicHslTheme(name, color);
  }
  
  themeCss += "\n}\n";
  fs.writeFileSync(path.join(outputDir, "groundwork-theme-base.css"), themeCss);

  console.log("✅ Color generation successful!");
  console.log("Sample outputs:");
  
  // Test output for verification
  const testColors = {
    grey: foundationalColors.grey,
    purple: foundationalColors.purple,
    brown: foundationalColors.brown
  };
  
  for (const [name, color] of Object.entries(testColors)) {
    console.log(`\n${name.toUpperCase()}:`);
    generateProperScale(color).forEach((hex, i) => {
      console.log(`  ${(i + 1) * 100}: ${hex} (Lightness: ${Math.round(chroma(hex).get('hsl.l') * 100)}%)`);
    });
  }
} catch (error) {
  console.error("❌ Color generation failed:", error);
}