import createRule from "create-rule";
import path from "path";

const noRelativeImports = createRule({
  name: "no-relative-imports",
  meta: {
    docs: { description: "Forbid the use of relative imports" },
    messages: {
      message: 'Relative import from "{{source}}" is not allowed.',
      stupidPath:
        'Who the hell imports from "{{source}}"?! Know your own project directory, Goddamnit!',
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
          if (
            !node.source.value.startsWith("./") &&
            !node.source.value.startsWith("../")
          ) {
            /* If the import directory doesn't contain ./ or ../ at the start, but does in the middle,
            that's just beyond stupid and I'm not even giving them an easy fix! They can't get the best of me today. */
            context.report({
              node,
              messageId: "stupidPath",
              data: {
                source: node.source.value,
              },
            });
            return null;
          }
          context.report({
            node,
            messageId: "message",
            data: {
              source: node.source.value,
            },
            fix(fixer) {
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

              if (projectRelativePath.startsWith("..")) {
                // Do not allow this - this takes you outside the project
                return null;
              }

              return fixer.replaceText(
                node.source,
                `${node.source.raw[0]}${path.posix.normalize(projectRelativePath)}${node.source.raw[0]}`,
              );
            },
          });
        }
      },
    };
  },
});

export default noRelativeImports;
