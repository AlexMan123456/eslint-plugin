import type { Linter } from "eslint";

import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import typeScriptBase from "src/configs/typeScriptBase";

const typeScriptReactBase: Linter.Config[] = [
  ...typeScriptBase,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    name: "@alextheman/eslint-config-typescript-react-base",
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
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
    },
  },
];

export default typeScriptReactBase;
