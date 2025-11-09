import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createPersonalEslintPluginConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        // When we pass the plugin into the config creator functions from the index, there's no guarantee that the configs will already be
        // on the plugin when you access them from src/configs, since they're in the process of being created. It is generally better to import
        // another creator function directly from the creator function should you need to refer to another config in the newly added config. */
        "@alextheman/no-plugin-configs-access-from-src-configs": "error",
      },
    },
    {
      // Since the object exported in the rules index serves the same function as the exports in other projects, it's best to sort them in alphabetical order
      // as well to make it easier to compare against the file directory.
      files: ["src/rules/index.ts", "src/configs/**"],
      rules: {
        "perfectionist/sort-objects": [
          "error",
          {
            customGroups: [],
            destructuredObjects: true,
            fallbackSort: { type: "unsorted" },
            groups: [],
            ignoreCase: true,
            ignorePattern: [],
            newlinesBetween: "ignore",
            objectDeclarations: true,
            order: "asc",
            partitionByComment: false,
            partitionByNewLine: false,
            specialCharacters: "keep",
            styledComponents: true,
            type: "alphabetical",
            useConfigurationIf: {},
          },
        ],
      },
    },
  ];
}

export default createPersonalEslintPluginConfig;
