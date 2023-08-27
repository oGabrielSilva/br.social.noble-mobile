module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'prettier/prettier': 'off',
    'import/order': 'off',
    'no-param-reassign': 'error',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-void': 'off',
  },
};
