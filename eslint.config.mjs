import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      // Disable prop-types validation (TypeScript handles this)
      "react/prop-types": "off",

      // Disable the React-in-JSX-scope rule (React 17+ doesn't require `React` in scope)
      "react/react-in-jsx-scope": "off",
    },
  },	  
];
