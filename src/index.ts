import alexPlugin from "src/alexPlugin";

export { default as prettierRules } from "src/configs/miscellaneous/prettierRules";
export { default as sortObjects } from "src/configs/miscellaneous/sortObjects";
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
export type { TestFunction } from "src/rules/consistent-test-function";

export default alexPlugin;
