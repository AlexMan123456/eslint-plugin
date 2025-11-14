import type { Linter } from "eslint";

import perfectionist from "eslint-plugin-perfectionist";

import sortObjects from "src/configs/helpers/sortObjects";

const alexCLineConfig: Linter.Config[] = [
  {
    files: ["src/commands/index.ts"],
    name: "@alextheman/personal/alex-c-line",
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-objects": ["error", sortObjects],
    },
  },
];

export default alexCLineConfig;
