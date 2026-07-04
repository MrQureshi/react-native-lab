module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['App.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
