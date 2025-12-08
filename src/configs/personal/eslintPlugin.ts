import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import perfectionist from "eslint-plugin-perfectionist";

import eslintPluginRestrictedImports from "src/configs/helpers/restrictedImports/eslintPluginRestrictedImports";
import sortObjects from "src/configs/helpers/sorting/sortObjects";

function personalEslintPlugin(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      name: "@alextheman/personal/eslint-plugin",
      plugins: {
        "@alextheman": plugin,
        perfectionist,
      },
      rules: {
        "@alextheman/no-plugin-configs-access-from-src-configs": "error",
        "no-restricted-imports": ["error", eslintPluginRestrictedImports],
      },
    },
    {
      files: ["src/rules/index.ts", "src/configs/**"],
      rules: {
        "perfectionist/sort-objects": ["error", sortObjects],
      },
    },
  ];
}

export default personalEslintPlugin;
