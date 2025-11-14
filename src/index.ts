import alexPlugin from "src/alexPlugin";

export { default as prettierRules } from "src/configs/helpers/prettierRules";
export { default as sortObjects } from "src/configs/helpers/sortObjects";
export { parseTestFunction } from "src/rules/consistent-test-function";

export type { AlexPlugin } from "src/alexPlugin";
export type {
  GeneralConfig,
  PluginConfig,
  CombinedConfig,
  PersonalConfig,
  AlexPluginConfigGroup,
  ConfigKey,
  ConfigGroupName,
} from "src/configs/AlexPluginConfigGroup";
export type {
  TestFunction,
  ConsistentTestFunctionOptions,
} from "src/rules/consistent-test-function";
export type { NoNamespaceImportsOptions } from "src/rules/no-namespace-imports";
export type { NoRelativeImportsOptions } from "src/rules/no-relative-imports";
export type { StandardiseErrorMessagesOptions } from "src/rules/standardise-error-messages";
export type { UseNormalizedImportsOptions } from "src/rules/use-normalized-imports";

export default alexPlugin;
