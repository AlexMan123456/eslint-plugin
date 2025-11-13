import type { Linter } from "eslint";
import type { AlexPlugin, ConsistentTestFunctionOptions } from "src/index";

function createPluginTestsBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      files: ["**/*.test.ts"],
      name: "@alextheman/plugin/tests",
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/consistent-test-function": [
          "error",
          { preference: "test" } as ConsistentTestFunctionOptions,
        ],
        "@alextheman/no-isolated-tests": "error",
        "@alextheman/no-skipped-tests": "warn",
      },
    },
  ];
}

export default createPluginTestsBaseConfig;
