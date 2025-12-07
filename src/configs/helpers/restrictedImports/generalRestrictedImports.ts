const generalRestrictedImports = {
  patterns: [
    {
      group: ["node_modules"],
      message: "Do not import directly from node_modules.",
    },
  ],
};

export default generalRestrictedImports;
