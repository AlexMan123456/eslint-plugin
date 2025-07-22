import { name, version } from "package.json";
import rules from "src/rules";
import esLintConfigTypescriptBase from "eslint.config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";

const plugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: { alexTypeScriptBase: [] },
  rules,
};

Object.assign(plugin.configs, {
  alexTypeScriptBase: [
    ...esLintConfigTypescriptBase,
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/no-relative-imports": "error",
      },
    },
  ],
});

Object.assign(plugin.configs, {
  alexTypescriptReactBase: [
    ...plugin.configs.alexTypeScriptBase,
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
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "react-hooks/exhaustive-deps": "off",
      },
    },
  ],
});

export default plugin;
