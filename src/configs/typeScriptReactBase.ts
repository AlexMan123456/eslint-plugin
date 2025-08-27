import type { Linter } from "eslint";

import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import typeScriptBase from "src/configs/typeScriptBase";

const typeScriptReactBase: Linter.Config[] = [
  ...typeScriptBase,
  {
    name: "@alextheman/eslint-config-typescript-react-base",
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material",
              message:
                'Please use `import Component from "@mui/material/Component"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.',
            },
          ],
        },
      ],
    },
  },
];

export default typeScriptReactBase;
