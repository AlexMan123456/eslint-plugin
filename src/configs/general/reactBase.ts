import type { Linter } from "eslint";

import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import reactLanguageOptions from "src/configs/miscellaneous/reactLanguageOptions";

const reactBase: Linter.Config[] = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: reactLanguageOptions,
    name: "@alextheman/general/react",
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
