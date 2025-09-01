import type { TSESTree } from "@typescript-eslint/utils";

import createRule from "src/create-rule";
import checkCallExpression from "src/utility/checkCallExpression";

const noIsolatedTests = createRule({
  name: "no-isolated-tests",
  meta: {
    docs: {
      description: "Forbid the use of describe.only() and test.only()",
    },
    messages: {
      message: "Unexpected isolated {{source}}.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          checkCallExpression(node, "describe", "only") ||
          checkCallExpression(node, "test", "only")
        ) {
          return context.report({
            node,
            messageId: "message",
            data: {
              source: ((node.callee as TSESTree.MemberExpression).object as TSESTree.Identifier)
                .name,
            },
          });
        }
      },
    };
  },
});

export default noIsolatedTests;
