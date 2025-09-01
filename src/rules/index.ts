import noNamespaceImports from "src/rules/no-namespace-imports";
import noPluginConfigAccessFromSrcConfigs from "src/rules/no-plugin-configs-access-from-src-configs";
import noRelativeImports from "src/rules/no-relative-imports";
import useObjectShorthand from "src/rules/use-object-shorthand";

export default {
  "no-namespace-imports": noNamespaceImports,
  "no-relative-imports": noRelativeImports,
  "no-plugin-configs-access-from-src-configs": noPluginConfigAccessFromSrcConfigs,
  "use-object-shorthand": useObjectShorthand,
};
