import type { Linter } from "eslint";

const testsBase: Linter.Config[] = [
  {
    files: ["**/*.test.{js,ts}"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          message:
            "Do not use global describe function. Import test functions from vitest instead.",
          name: "describe",
        },
        {
          message: "Do not use global test function. Import test functions from vitest instead.",
          name: "test",
        },
        {
          message: "Do not use global expect function. Import test functions from vitest instead.",
          name: "expect",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message: "Use test functions from vitest instead.",
              name: "node:test",
            },
          ],
        },
      ],
    },
  },
];

export default testsBase;
