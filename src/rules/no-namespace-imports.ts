import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { omitProperties } from "@alextheman/utility";
import z from "zod";

import createRule from "src/createRule";

const noNamespaceImportsOptionsSchema = z
  .object({
    allow: z.array(z.string()),
  })
  .partial();
export type NoNamespaceImportsOptions = z.infer<typeof noNamespaceImportsOptionsSchema>;
export function parseNoNamespaceImportsOptions(data: unknown): NoNamespaceImportsOptions {
  return noNamespaceImportsOptionsSchema.parse(data);
}

const schema = [
  omitProperties(
    z.toJSONSchema(noNamespaceImportsOptionsSchema),
    "$schema",
  ) as unknown as JSONSchema4,
];

const noNamespaceImports = createRule({
  name: "no-namespace-imports",
  meta: {
    docs: {
      description: "Forbid the use of import *",
    },
    messages: {
      message: 'Import * from "{{source}}" is not allowed. Please use named imports instead.',
    },
    type: "suggestion",
    schema,
  },
  defaultOptions: [{ allow: [""] }],
  create(context) {
    const { allow } = parseNoNamespaceImportsOptions(context.options[0] ?? { allow: [] });
    return {
      ImportDeclaration(node) {
        const allSpecifiers = node.specifiers;
        for (const specifier of allSpecifiers) {
          if (
            specifier.type === "ImportNamespaceSpecifier" &&
            !allow?.includes(node.source.value)
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
