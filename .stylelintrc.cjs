module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
    '**/*.min.css',
    '_admin/**/*',    
  ],
  rules: {
    // Prefer modern CSS; allow nesting if added later.
    'color-function-notation': 'modern', // Use modern color syntax like rgb(R G B / A)
    'alpha-value-notation': 'number',      // Use numbers for alpha values (e.g., 0.5)
    'property-no-unknown': true,
    'order/properties-order': [],
    'no-descending-specificity': null,
    'value-keyword-case': [
      "lower",
      {
        "camelCaseSvgKeywords": true
      }
    ]
  }
};