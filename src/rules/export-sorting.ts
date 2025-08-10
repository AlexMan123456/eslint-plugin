import { isIdentifier } from "@typescript-eslint/utils/ast-utils";

import createRule from "src/create-rule";

const exportSorting = createRule({
  name: "export-sorting",
  meta: {
    docs: {
      description: "Sorts export statements on --fix",
    },
    messages: {
      alphabetical: "Exports should be sorted alphabetically",
      typeExports: "Types should be exported separately from main exports on a new line",
      lineBetweenGroups: "There should be a new line between export groups",
    },
    type: "suggestion",
    fixable: "code",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (node.specifiers.length === 0) {
          return;
        }

        const typeExports = node.specifiers.filter((specifier) => {
          return specifier.exportKind === "type";
        });
        const valueExports = node.specifiers.filter((specifier) => {
          return specifier.exportKind === "value";
        });

        if (typeExports.length !== 0 && valueExports.length !== 0) {
          context.report({
            node,
            messageId: "typeExports",
            fix(fixer) {
              const exportFrom = node.source
                ? `from ${context.sourceCode.getText(node.source)}`
                : "";
              const fixedValueExports =
                valueExports.length !== 0
                  ? `export { ${valueExports
                      .map((specifier) => {
                        return context.sourceCode.getText(specifier);
                      })
                      .join(", ")} } ${exportFrom};`
                  : "";
              const fixedTypeExports =
                typeExports.length !== 0
                  ? `export type { ${typeExports
                      .map((specifier) => {
                        if (isIdentifier(specifier.exported)) {
                          return specifier.exported.name;
                        }
                        return "";
                      })
                      .join(", ")} } ${exportFrom};`
                  : "";

              return fixer.replaceText(
                node,
                [fixedValueExports, fixedTypeExports].filter(Boolean).join("\n"),
              );
            },
          });
        }
      },
    };
  },
});

export default exportSorting;
