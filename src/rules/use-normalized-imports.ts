import path from "path";

import createRule from "src/createRule";

const useNormalizedImports = createRule({
  name: "use-normalized-imports",
  meta: {
    docs: {
      description:
        "Enforce the usage of normalised imports (i.e. import paths that you would only get from path.posix.normalize())",
    },
    messages: {
      pathNotNormalized:
        "Import path {{nonNormalized}} is not normalised. Please use {{normalized}} instead.",
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          fixable: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: "code",
  },
  defaultOptions: [{ fixable: true }],
  create(context) {
    const isFixable = context.options[0]?.fixable ?? true;
    return {
      ImportDeclaration(node) {
        const normalizedPath = path.posix.normalize(node.source.value);
        if (node.source.value !== normalizedPath) {
          return context.report({
            node,
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: node.source.value,
              normalized: normalizedPath,
            },
            fix: isFixable
              ? (fixer) => {
                  const [quote] = node.source.raw;
                  return fixer.replaceText(node.source, `${quote}${normalizedPath}${quote}`);
                }
              : undefined,
          });
        }
      },
    };
  },
});

export default useNormalizedImports;
