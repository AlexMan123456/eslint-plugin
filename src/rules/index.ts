import noNamespaceImports from "src/rules/no-namespace-imports";
import noPluginConfigAccessFromSrcConfigs from "src/rules/no-plugin-configs-access-from-src-configs";
import noRelativeImports from "src/rules/no-relative-imports";

export default {
  "no-namespace-imports": noNamespaceImports,
  "no-relative-imports": noRelativeImports,
  "no-plugin-configs-access-from-src-configs": noPluginConfigAccessFromSrcConfigs,
};
