import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import createRule from "src/create-rule";

const useObjectShorthand = createRule({
  name: "use-object-shorthand",
  meta: {
    docs: {
      description:
        'Encourage the use of object shorthand (e.g. const property = "Hello"; const object = { property });',
    },
    messages: {
      useShorthand: "{ {{source}} } is not allowed. Please use the object shorthand.",
    },
    type: "suggestion",
    fixable: "code",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Property(node) {
        if (
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.value.type === AST_NODE_TYPES.Identifier &&
          node.key.name === node.value.name &&
          !node.shorthand
        ) {
          context.report({
            node,
            messageId: "useShorthand",
            data: {
              source: context.sourceCode.getText(node),
            },
            fix(fixer) {
              const key = node.key as TSESTree.Identifier;
              return fixer.replaceTextRange([node.range[0], node.range[1]], key.name);
            },
          });
        }
      },
    };
  },
});

export default useObjectShorthand;
