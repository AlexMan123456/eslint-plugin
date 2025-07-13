import createRule from "src/createRule";

const noNamespaceImports = createRule({
  name: "no-namespace-imports",
  meta: {
    docs: {
      description: "Forbid the use of import *",
    },
    messages: {
      message: "Import * is not allowed. Please use named imports instead.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.specifiers[0].type === "ImportNamespaceSpecifier") {
          context.report({
            node,
            messageId: "message",
            data: {
              source: node.source,
            },
          });
        }
      },
    };
  },
});

export default noNamespaceImports;
