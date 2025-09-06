import createRule from "src/createRule";

const noRelativeImports = createRule({
  name: "no-relative-imports",
  meta: {
    docs: { description: "Forbid the use of relative imports" },
    messages: {
      strictNoRelative: 'Relative import from "{{source}}" is not allowed.',
      rootOnly: 'Relative import from "{{source}}" is not allowed to leave the current folder.',
      exceededAllowedDepth:
        'Relative import from "{{source}}" is not allowed. Relative imports must be no more than {{depth}} level{{s}} deep.',
      stupidPath:
        "For the love of God, please do not mix relative path parts in your import statements like that! How can you possibly be ok with {{source}}?!",
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          depth: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ depth: undefined }],
  create(context) {
    const allowedDepth = context.options[0]?.depth;

    if (allowedDepth !== undefined) {
      if (allowedDepth % 1 !== 0) {
        throw new Error("NON_INTEGER_DEPTH_NOT_ALLOWED");
      }
      if (allowedDepth < 0) {
        throw new Error("NEGATIVE_DEPTH_NOT_ALLOWED");
      }
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value.includes("./") || node.source.value.includes("../")) {
          if (allowedDepth === undefined) {
            return context.report({
              node,
              messageId: "strictNoRelative",
              data: {
                source: node.source.value,
              },
            });
          }

          const importPathParts = node.source.value.split("/");
          // If the path includes both ./ and ../, it's a stupid path and the user deserves to be mocked for trying to do this
          if (importPathParts.includes(".") && importPathParts.includes("..")) {
            return context.report({
              node,
              messageId: "stupidPath",
              data: {
                source: node.source.value,
              },
            });
          }

          // If the path includes ./ but doesn't start with ./ (and likewise for ../), it's also a stupid path that the user deserves to be mocked for
          if (
            (importPathParts.includes(".") && importPathParts[0] !== ".") ||
            (importPathParts.includes("..") && importPathParts[0] !== "..")
          ) {
            return context.report({
              node,
              messageId: "stupidPath",
              data: {
                source: node.source.value,
              },
            });
          }

          // Depth checks

          if (allowedDepth === 0 && importPathParts[0] === ".") {
            return;
          }

          let endOfRelativePathFound = false;
          for (const part of importPathParts.slice(0, allowedDepth + 1)) {
            if (part !== "..") {
              endOfRelativePathFound = true;
              break;
            }
          }

          if (!endOfRelativePathFound) {
            if (allowedDepth === 0) {
              return context.report({
                node,
                messageId: "rootOnly",
                data: {
                  source: node.source.value,
                },
              });
            }
            return context.report({
              node,
              messageId: "exceededAllowedDepth",
              data: {
                source: node.source.value,
                depth: allowedDepth,
                s: allowedDepth !== 1 ? "s" : "",
              },
            });
          }
        }
      },
    };
  },
});

export default noRelativeImports;
