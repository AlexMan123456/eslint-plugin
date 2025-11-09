import type { Linter } from "eslint";
import type { ToKebabCase } from "src/utility/camelToKebab";

import createConfigGroup from "src/utility/createConfigGroup";

export type GeneralConfigs = "javaScript" | "typeScript" | "react";
export type PluginConfigs = "base" | "tests";
export type PersonalConfigs =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "eslintPlugin"
  | "neurosongsBackEnd"
  | "neurosongsFrontEnd"
  | "utility";
export type CombinedConfigs =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "typeScriptReact"
  | "javaScriptReact";

export interface AlexPluginConfigs {
  general: Record<GeneralConfigs, Linter.Config[]>;
  plugin: Record<PluginConfigs, Linter.Config[]>;
  personal: Record<PersonalConfigs, Linter.Config[]>;
  combined: Record<CombinedConfigs, Linter.Config[]>;
}

export type ConfigKey = {
  [G in keyof AlexPluginConfigs &
    string]: `${ToKebabCase<G>}/${ToKebabCase<keyof AlexPluginConfigs[G] & string>}`;
}[keyof AlexPluginConfigs & string];

function createPluginConfigs(config: AlexPluginConfigs): Record<ConfigKey, Linter.Config[]> {
  const allConfigs: Record<string, Linter.Config[]> = {};
  for (const group in config) {
    Object.assign(allConfigs, createConfigGroup(group, config[group as keyof AlexPluginConfigs]));
  }
  return allConfigs;
}

export default createPluginConfigs;
