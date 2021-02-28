module.exports = {
  plugins: ['prettier'],
  extends: ['react-app'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'space-in-parens': [2, 'never'],
    'arrow-parens': [2],
    'object-curly-spacing': [2, 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'quotes': [2, 'single'],
    'space-infix-ops': 2,
    'no-multi-spaces': 2,
  },
};
