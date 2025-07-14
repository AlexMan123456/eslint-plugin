import createRule from "create-rule";

const noRelativeImports = createRule({
  name: "",
  meta: {
    docs: { description: "Forbid the use of relative imports" },
    messages: {
      message: "Relative import from '{{source}}' is not allowed.",
    },
    type: "suggestion",
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
          });
        }
      },
    };
  },
});

export default noRelativeImports;
