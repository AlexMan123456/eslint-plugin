import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { createPluginTestsBaseConfig } from "src/configs/plugin";

function createCombinedTestsBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...createPluginTestsBaseConfig(plugin),
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
            message:
              "Do not use global expect function. Import test functions from vitest instead.",
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
}

export default createCombinedTestsBaseConfig;
