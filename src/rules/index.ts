import noIsolatedTests from "src/rules/no-isolated-tests";
import noNamespaceImports from "src/rules/no-namespace-imports";
import noPluginConfigAccessFromSrcConfigs from "src/rules/no-plugin-configs-access-from-src-configs";
import noRelativeImports from "src/rules/no-relative-imports";
import noSkippedTests from "src/rules/no-skipped-tests";
import useObjectShorthand from "src/rules/use-object-shorthand";

export default {
  "no-isolated-tests": noIsolatedTests,
  "no-namespace-imports": noNamespaceImports,
  "no-plugin-configs-access-from-src-configs": noPluginConfigAccessFromSrcConfigs,
  "no-relative-imports": noRelativeImports,
  "no-skipped-tests": noSkippedTests,
  "use-object-shorthand": useObjectShorthand,
};
