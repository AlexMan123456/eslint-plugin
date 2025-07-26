import { name, version } from "package.json";
import rules from "src/rules";
import esLintConfigTypescriptBase, {
  warnOnFixButErrorOnLint,
} from "eslint.config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";

export interface AlexPlugin {
  meta: {
    name: typeof name;
    version: typeof version;
    namespace: "alextheman";
  };
  configs: Record<string, any>;
  rules: Record<string, any>;
}

const plugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: { alexTypeScriptBase: [], alexTypeScriptReactBase: [] },
  rules,
} satisfies AlexPlugin;

Object.assign(plugin.configs, {
  alexTypeScriptBase: [
    ...esLintConfigTypescriptBase,
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        /* In this plugin's config, no-restricted-imports checks checks for relative imports and errors if they're found.
        In practice, though, this is something that would be caught by my custom linting rule, so no-restricted-imports can be disabled here
        in favour of @alextheman/no-relative-imports. */
        "no-restricted-imports": "off",
        "@alextheman/no-namespace-imports": warnOnFixButErrorOnLint,
        "@alextheman/no-relative-imports": warnOnFixButErrorOnLint,
      },
    },
  ],
});

plugin.configs.alexTypeScriptReactBase = [
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
] as any;

export default plugin;
