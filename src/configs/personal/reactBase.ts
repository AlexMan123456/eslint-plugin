import type { Linter } from "eslint";

import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";

import reactHooks from "src/configs/helpers/reactHooks";
import reactLanguageOptions from "src/configs/helpers/reactLanguageOptions";

const personalReactBaseConfig: Linter.Config[] = [
  {
    languageOptions: reactLanguageOptions,
    name: "@alextheman/personal/react",
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
      "react-hooks/refs": "off",
      "react-refresh/only-export-components": "off",
      "react/jsx-boolean-value": "error",
    },
  },
];

export default personalReactBaseConfig;
