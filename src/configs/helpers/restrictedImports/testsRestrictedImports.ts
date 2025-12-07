import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";

const testsRestrictedImports: NoRestrictedImportsOptions = {
  paths: [
    {
      message: "Use test functions from vitest instead.",
      name: "node:test",
    },
  ],
  patterns: generalRestrictedImports.patterns,
};

export default testsRestrictedImports;
