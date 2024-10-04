import globals from "globals";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";

export default [
  {
    files: ["src/**/*.js"], // Specify files to lint
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      import: importPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      "no-console": "warn", // Enable console log warnings
      "quotes": ["warn", "single"], // Ensure single quotes
      "semi": ["warn", "always"], // Ensure semicolons
      "jsdoc/require-param": "warn", // Require parameters in JSDoc comments
      "jsdoc/require-returns": "warn", // Require returns in JSDoc comments
      "jsdoc/check-alignment": "warn", // Enforce JSDoc comments alignment
      "jsdoc/check-types": "warn", // Enforce valid types in JSDoc comments
      ...airbnbBase.rules, // Spread the Airbnb rules into the rules object
    },
  },
];
