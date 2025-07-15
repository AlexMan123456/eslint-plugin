import createRule from "create-rule";
import path from "path";

const noRelativeImports = createRule({
  name: "",
  meta: {
    docs: { description: "Forbid the use of relative imports" },
    messages: {
      message: "Relative import from '{{source}}' is not allowed.",
    },
    type: "suggestion",
    fixable: "code",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value.includes("./") ||
          node.source.value.includes("../")
        ) {
          context.report({
            node,
            messageId: "message",
            data: {
              source: node.source.value,
            },
            fix(fixer) {
              if (
                !node.source.value.startsWith("./") &&
                !node.source.value.startsWith("../")
              ) {
                return fixer.replaceText(
                  node.source,
                  `"${path.posix.normalize(node.source.value)}"`,
                );
              }
              if (!context.parserOptions.tsconfigRootDir) {
                // If no root directory set in parserOptions, rule is not fixable
                return null;
              }

              const fullImportPath = path.resolve(
                path.dirname(context.physicalFilename),
                node.source.value,
              );
              const projectRelativePath = path.relative(
                context.parserOptions.tsconfigRootDir,
                fullImportPath,
              );

              if (projectRelativePath.startsWith("../")) {
                // Do not allow this - this takes you outside the project
                return null;
              }

              return fixer.replaceText(
                node.source,
                `"${path.posix.normalize(projectRelativePath)}"`,
              );
            },
          });
        }
      },
    };
  },
});

export default noRelativeImports;
