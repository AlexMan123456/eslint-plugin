import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

function checkCallExpression(
  node: TSESTree.CallExpression,
  objectName: string,
  propertyName: string,
) {
  return (
    node.callee.type === AST_NODE_TYPES.MemberExpression &&
    node.callee.object.type === AST_NODE_TYPES.Identifier &&
    node.callee.object.name === objectName &&
    node.callee.property.type === AST_NODE_TYPES.Identifier &&
    node.callee.property.name === propertyName
  );
}

export default checkCallExpression;
