import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";

const testsRestrictedImports = {
  paths: [
    {
      message: "Use test functions from vitest instead.",
      name: "node:test",
    },
  ],
  patterns: generalRestrictedImports.patterns,
};

export default testsRestrictedImports;
