import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import perfectionist from "eslint-plugin-perfectionist";

import sortObjects from "src/configs/miscellaneous/sortObjects";

function createPersonalEslintPluginConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      plugins: {
        "@alextheman": plugin,
        perfectionist,
      },
      rules: {
        "@alextheman/no-plugin-configs-access-from-src-configs": "error",
      },
    },
    {
      files: ["src/configs/**"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: ["src/alexPlugin", "src/index", "src"].map((name) => {
              return {
                importNames: ["default"],
                message:
                  "Do not import the plugin directly from the config files. Please create a function that takes in the plugin and returns the config instead.",
                name,
              };
            }),
          },
        ],
      },
    },
    {
      // Since the object exported in the rules index serves the same function as the exports in other projects, it's best to sort them in alphabetical order
      // as well to make it easier to compare against the file directory.
      files: ["src/rules/index.ts", "src/configs/**"],
      rules: {
        "perfectionist/sort-objects": ["error", sortObjects],
      },
    },
  ];
}

export default createPersonalEslintPluginConfig;
