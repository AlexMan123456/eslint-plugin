import createRule from "src/create-rule";

const noNamespaceImports = createRule({
  name: "no-namespace-imports",
  meta: {
    docs: {
      description: "Forbid the use of import *",
    },
    messages: {
      message:
        'Import * from "{{source}}" is not allowed. Please use named imports instead.',
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          allow: {
            type: "array",
            items: {
              type: "string",
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ allow: [""] }],
  create(context) {
    const allowableNamedImports = context.options[0]?.allow;
    return {
      ImportDeclaration(node) {
        const allSpecifiers = node.specifiers;
        for (const specifier of allSpecifiers) {
          if (
            specifier.type === "ImportNamespaceSpecifier" &&
            !allowableNamedImports?.includes(node.source.value)
          ) {
            context.report({
              node,
              messageId: "message",
              data: {
                source: node.source.value,
              },
            });
            return;
          }
        }
      },
    };
  },
});

export default noNamespaceImports;
