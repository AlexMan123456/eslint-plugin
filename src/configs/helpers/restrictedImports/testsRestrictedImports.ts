import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";
import { combineRestrictedImports } from "src/utility/public";

const testsRestrictedImports: NoRestrictedImportsOptions = combineRestrictedImports(
  generalRestrictedImports,
  {
    paths: [
      {
        message: "Use test functions from vitest instead.",
        name: "node:test",
      },
    ],
  },
);

export default testsRestrictedImports;
