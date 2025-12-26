import type { NoRestrictedImportsOptions } from "src/utility/public/NoRestrictedImportsOptions";

const generalRestrictedImports: NoRestrictedImportsOptions = {
  patterns: [
    {
      group: ["node_modules"],
      message: "Do not import directly from node_modules.",
    },
  ],
};

export default generalRestrictedImports;
