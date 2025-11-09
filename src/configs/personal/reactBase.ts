import type { Linter } from "eslint";

import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const personalReactBaseConfig: Linter.Config[] = [
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
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              message:
                'Please use `import Component from "@mui/[package]/Component"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.',
              regex: "^@mui/[^/]+$",
            },
          ],
        },
      ],
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": "off",
      "react/jsx-boolean-value": "error",
    },
  },
];

export default personalReactBaseConfig;
