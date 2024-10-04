import globals from "globals";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["src/**/*.js"], // Specify files to lint
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "require-jsdoc": "warn",
      "valid-jsdoc": "warn",
      "no-console": "warn", // Enable console log warnings
      "quotes": ["warn", "single"], // Ensure single quotes
      "semi": ["warn", "always"], // Ensure semicolons
      ...airbnbBase.rules, // Spread the Airbnb rules into the rules object
    },
  },
];
