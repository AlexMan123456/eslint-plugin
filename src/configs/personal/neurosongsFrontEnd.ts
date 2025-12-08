import type { Linter } from "eslint";

import neurosongsFrontEndRestrictedImports from "src/configs/helpers/restrictedImports/neurosongsFrontEndRestrictedImports";

const personalNeurosongsFrontEnd: Linter.Config[] = [
  {
    name: "@alextheman/personal/neurosongs-front-end",
    rules: {
      "no-restricted-imports": ["error", neurosongsFrontEndRestrictedImports],
    },
  },
];

export default personalNeurosongsFrontEnd;
