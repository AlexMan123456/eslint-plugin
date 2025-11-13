import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import createRule from "src/createRule";

function checkCurrentNode(
  context: Readonly<
    RuleContext<
      "message",
      [
        {
          regex: string;
        },
      ]
    >
  >,
  node: TSESTree.CallExpression | TSESTree.NewExpression,
) {
  const errorRegex = context.options[0]?.regex ?? "^[A-Z]+(?:_[A-Z]+)*$";
  if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === "Error") {
    const [errorArgument] = node.arguments;
    const errorMessage = errorArgument.type === AST_NODE_TYPES.Literal ? errorArgument.value : "";
    if (!RegExp(errorRegex).test(typeof errorMessage === "string" ? errorMessage : "")) {
      return context.report({
        node,
        messageId: "message",
        data: {
          error: errorMessage,
          regex: errorRegex,
        },
      });
    }
  }
}

const standardiseErrorMessages = createRule({
  name: "standardise-error-messages",
  meta: {
    docs: {
      description: "Enforce a consistent standard for error messages.",
    },
    messages: {
      message: "Expected error message {{error}} to match {{regex}}.",
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          regex: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ regex: "^[A-Z]+(?:_[A-Z]+)*$" }],
  create(context) {
    return {
      CallExpression(node) {
        return checkCurrentNode(context, node);
      },
      NewExpression(node) {
        return checkCurrentNode(context, node);
      },
    };
  },
});

export default standardiseErrorMessages;
