import alexPlugin from "src/alexPlugin";

export { prettierRules } from "src/configs/general";
export { parseTestFunction } from "src/rules/consistent-test-function";

export type { AlexPlugin } from "src/alexPlugin";
export type {
  GeneralConfig,
  PluginConfig,
  CombinedConfig,
  PersonalConfig,
  AlexPluginConfigGroup,
  ConfigKey,
} from "src/alexPlugin/AlexPluginConfigGroup";
export type { TestFunction } from "src/rules/consistent-test-function";

export default alexPlugin;
