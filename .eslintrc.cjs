/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports"],
  root: true,
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/*.test.tsx",
    "**/*.stories.tsx",
  ],
  rules: {
    quotes: ["error", "double"],
    // disable generator-star-spacing rule
    "generator-star-spacing": "off",
    indent: 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "arrow-parens": 0,
    "@typescript-eslint/no-explicit-any": "off",
    // allowed mostly because its annoying
    "max-len": [
      "error",
      {
        ignorePattern: "^import [^,]+ from |^export | implements | `.{30,}`",
        ignoreComments: true,
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
