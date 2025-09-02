import alexPlugin from "./dist/index.js";

export default [
  ...alexPlugin.configs.alexTypeScriptBase,
  {
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
    files: ["src/rules/index.ts"],
    rules: {
      "perfectionist/sort-objects": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: "ignore",
          objectDeclarations: true,
          destructuredObjects: true,
          styledComponents: true,
          ignorePattern: [],
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],
    },
  },
];
