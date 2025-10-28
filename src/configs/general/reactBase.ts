import type { Linter } from "eslint";

import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const reactBase: Linter.Config[] = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    name: "@alextheman/eslint-config-react-base",
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/destructuring-assignment": ["error", "always", { destructureInSignature: "always" }],
      "react/hook-use-state": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { children: "never", propElementValues: "always", props: "never" },
      ],
      "react/jsx-props-no-spread-multi": "error",
      "react/no-danger": "error",
      "react/no-unescaped-entities": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default reactBase;
