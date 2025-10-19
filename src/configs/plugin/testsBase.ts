import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createPluginTestsBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      files: ["**/*.test.ts"],
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/consistent-test-function": ["error", { preference: "test" }],
        "@alextheman/no-isolated-tests": "error",
        "@alextheman/no-skipped-tests": "warn",
      },
    },
  ];
}

export default createPluginTestsBaseConfig;
