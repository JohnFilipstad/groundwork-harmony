module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
  rules: {
    // Prefer modern CSS; allow nesting if added later.
    'color-hex-case': 'lower',
    'property-no-unknown': true,
    'declaration-block-no-duplicate-properties': true,
    'order/properties-order': [],
    'no-descending-specificity': null
  }
};
