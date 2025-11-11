import type { Linter } from "eslint";

import perfectionist from "eslint-plugin-perfectionist";

import sortObjects from "src/configs/miscellaneous/sortObjects";

const alexCLineConfig: Linter.Config[] = [
  {
    files: ["src/commands/index.ts"],
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-objects": ["error", sortObjects],
    },
  },
];

export default alexCLineConfig;
