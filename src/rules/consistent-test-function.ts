import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import z from "zod";

import createRule from "src/create-rule";
import getImportSpecifiersAfterRemoving from "src/utility/getImportSpecifiersAfterRemoving";

const validTestFunctionsSchema = z.enum(["test", "it"]);

export type ValidTestFunctions = z.infer<typeof validTestFunctionsSchema>;

const consistentTestFunction = createRule({
  name: "consistent-test-function",
  meta: {
    docs: {
      description: "Enforce a consistent function (either `test` or `it`)",
    },
    messages: {
      message: "Unexpected {{source}}. Please use {{preference}} instead.",
    },
    type: "suggestion",
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          preference: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ preference: "test" }],
  create(context) {
    const preference = context.options[0]?.preference;
    const validatedPreference = validTestFunctionsSchema.parse(preference ?? "test");
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "it" &&
          validatedPreference === "test"
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: (node.callee as TSESTree.Identifier).name,
              preference: validatedPreference,
            },
            fix(fixer) {
              return fixer.replaceText(node.callee, "test");
            },
          });
        }

        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "test" &&
          validatedPreference === "it"
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: (node.callee as TSESTree.Identifier).name,
              preference: validatedPreference,
            },
            fix(fixer) {
              return fixer.replaceText(node.callee, "it");
            },
          });
        }
      },

      ImportDeclaration(node) {
        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === "it" &&
            validatedPreference === "test"
          ) {
            return context.report({
              node,
              messageId: "message",
              data: {
                source: specifier.imported.name,
                preference: validatedPreference,
              },
              fix(fixer) {
                const importedNames = node.specifiers.map((specifier) => {
                  return specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                    specifier.imported.type === AST_NODE_TYPES.Identifier
                    ? specifier.imported.name
                    : "";
                });

                if (importedNames.includes("it") && importedNames.includes("test")) {
                  const newSpecifiers = getImportSpecifiersAfterRemoving(
                    context,
                    node.specifiers,
                    "it",
                  );
                  return fixer.replaceTextRange(
                    [
                      node.specifiers[0].range[0],
                      node.specifiers[node.specifiers.length - 1].range[1],
                    ],
                    newSpecifiers,
                  );
                }
                return fixer.replaceTextRange(
                  [specifier.imported.range[0], specifier.imported.range[1]],
                  validatedPreference,
                );
              },
            });
          }

          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === "test" &&
            validatedPreference === "it"
          ) {
            return context.report({
              node,
              messageId: "message",
              data: {
                source: specifier.imported.name,
                preference: validatedPreference,
              },
              fix(fixer) {
                const importedNames = node.specifiers.map((specifier) => {
                  return specifier.type === AST_NODE_TYPES.ImportSpecifier &&
                    specifier.imported.type === AST_NODE_TYPES.Identifier
                    ? specifier.imported.name
                    : "";
                });

                if (importedNames.includes("it") && importedNames.includes("test")) {
                  const newSpecifiers = getImportSpecifiersAfterRemoving(
                    context,
                    node.specifiers,
                    "test",
                  );
                  return fixer.replaceTextRange(
                    [
                      node.specifiers[0].range[0],
                      node.specifiers[node.specifiers.length - 1].range[1],
                    ],
                    newSpecifiers,
                  );
                }
                return fixer.replaceTextRange(
                  [specifier.imported.range[0], specifier.imported.range[1]],
                  validatedPreference,
                );
              },
            });
          }
        }
      },
    };
  },
});

export default consistentTestFunction;
