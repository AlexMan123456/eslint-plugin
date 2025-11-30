import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import type { ConsistentTestFunctionOptions } from "src/rules/consistent-test-function";

function getImportSpecifiersAfterRemoving(
  context: Readonly<RuleContext<"message", [ConsistentTestFunctionOptions]>>,
  specifiers: TSESTree.ImportClause[],
  importToRemove: string,
) {
  return specifiers
    .filter((specifier) => {
      return !(
        ((specifier as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name ===
        importToRemove
      );
    })
    .map((specifier) => {
      return context.sourceCode.getText(specifier);
    })
    .join(", ");
}

export default getImportSpecifiersAfterRemoving;
