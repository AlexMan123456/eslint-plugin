import type { Linter } from "eslint";

import type { AlexPlugin } from "src/index";

import jsdoc from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";
import eslintPluginRestrictedImports from "src/configs/helpers/restrictedImports/eslintPluginRestrictedImports";
import sortObjects from "src/configs/helpers/sorting/sortObjects";

function personalEslintPlugin(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      name: "@alextheman/personal/eslint-plugin",
      plugins: {
        "@alextheman": plugin,
        jsdoc,
        perfectionist,
      },
      rules: {
        "@alextheman/no-plugin-configs-access-from-src-configs": "error",
        "jsdoc/require-jsdoc": "off",
        "no-restricted-imports": ["error", eslintPluginRestrictedImports],
      },
    },
    {
      files: ["src/rules/index.ts", "src/configs/**"],
      rules: {
        "perfectionist/sort-objects": ["error", sortObjects],
      },
    },
    {
      files: ["src/utility/public/**"],
      rules: {
        "jsdoc/require-jsdoc": ["error", requireJsdocOptions],
      },
    },
  ];
}

export default personalEslintPlugin;
