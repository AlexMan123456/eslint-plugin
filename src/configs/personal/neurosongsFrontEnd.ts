import type { Linter } from "eslint";

import neurosongsFrontEndRestrictedImports from "src/configs/helpers/restrictedImports/neurosongsFrontEndRestrictedImports";

const neurosongsFrontEndConfig: Linter.Config[] = [
  {
    name: "@alextheman/personal/neurosongs-front-end",
    rules: {
      "no-restricted-imports": ["error", neurosongsFrontEndRestrictedImports],
    },
  },
];

export default neurosongsFrontEndConfig;
