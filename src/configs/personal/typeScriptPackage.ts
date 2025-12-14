import type { Linter } from "eslint";

import jsdoc from "eslint-plugin-jsdoc";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";

const personalTypeScriptPackage: Linter.Config[] = [
  jsdoc.configs["flat/recommended-typescript-error"],
  {
    rules: {
      "jsdoc/check-tag-names": ["error", { definedTags: ["note"] }],
      "jsdoc/require-jsdoc": ["warn", requireJsdocOptions],
      "jsdoc/sort-tags": [
        "error",
        {
          tagSequence: [
            { tags: ["template"] },
            { tags: ["param"] },
            { tags: ["throws"] },
            { tags: ["returns"] },
          ],
        },
      ],
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
    },
  },
];

export default personalTypeScriptPackage;
