import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * Checks if a given node matches the expected object and property names.
 *
 * @category Utility
 *
 * @param node - The node to check.
 * @param objectName - The object name to compare against the node.
 * @param propertyName - The property name to compare against the node.
 *
 * @returns A value of `true` if the given `objectName` and `propertyName` matches those of the node, and `false` otherwise.
 */
function checkCallExpression(
  node: TSESTree.CallExpression,
  objectName: string,
  propertyName: string,
): boolean {
  return (
    node.callee.type === AST_NODE_TYPES.MemberExpression &&
    node.callee.object.type === AST_NODE_TYPES.Identifier &&
    node.callee.object.name === objectName &&
    node.callee.property.type === AST_NODE_TYPES.Identifier &&
    node.callee.property.name === propertyName
  );
}

export default checkCallExpression;
