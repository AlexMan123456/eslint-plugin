import type { Linter } from "eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import createAlexTypeScriptBaseConfig from "src/configs/alex-typescript-base";
import { warnOnFixButErrorOnLint } from "src/configs/eslint-config-typescript-base";
import type { AlexPlugin } from "src/index";

function createAlexTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...createAlexTypeScriptBaseConfig(plugin),
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
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-hooks/exhaustive-deps": "off",
        "no-restricted-imports": [
          warnOnFixButErrorOnLint,
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
  ] satisfies Linter.Config[];
}

export default createAlexTypeScriptReactBaseConfig;
