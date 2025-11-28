import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createPluginBaseConfig(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    {
      name: "@alextheman/plugin/base",
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/use-normalized-imports": "error",
        "@alextheman/use-object-shorthand": "error",
      },
    },
  ];
}

export default createPluginBaseConfig;
