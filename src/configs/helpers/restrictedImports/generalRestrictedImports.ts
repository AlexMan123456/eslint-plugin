import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

const generalRestrictedImports: NoRestrictedImportsOptions = {
  patterns: [
    {
      group: ["node_modules"],
      message: "Do not import directly from node_modules.",
    },
  ],
};

export default generalRestrictedImports;
