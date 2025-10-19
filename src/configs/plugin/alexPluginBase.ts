import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createAlexPluginBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/no-relative-imports": "error",
        "@alextheman/use-object-shorthand": "error",
      },
    },
    {
      files: ["**/*.test.ts"],
      rules: {
        "@alextheman/consistent-test-function": ["error", { preference: "test" }],
        "@alextheman/no-isolated-tests": "error",
        "@alextheman/no-skipped-tests": "warn",
      },
    },
  ];
}

export default createAlexPluginBaseConfig;
