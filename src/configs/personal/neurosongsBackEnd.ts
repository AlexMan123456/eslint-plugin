import type { Linter } from "eslint";

import neurosongsBackEndRestrictedImports from "src/configs/helpers/restrictedImports/neurosongsBackEndRestrictedImports";

const personalNeurosongsBackEnd: Linter.Config[] = [
  {
    name: "@alextheman/personal/neurosongs-back-end",
    rules: {
      "no-restricted-imports": ["error", neurosongsBackEndRestrictedImports],
    },
  },
  {
    files: ["src/database/**/*.ts", "tests/test-utilities/setup.ts"],
    rules: {
      // Setup files should be able to set the PrismaClient and use the regular PrismaClient from @neurosongs/prisma-client/prisma.
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["src/server/routers/errors.ts", "src/server/validators/**/*.ts"],
    rules: {
      /* Function declarations in these files need to be arrow functions so we can type the whole signature
      using the Express types. */
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
    },
  },
];

export default personalNeurosongsBackEnd;
