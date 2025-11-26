const sortImports = {
  groups: ["type", "builtin", "external", "internal", "object"],
  ignoreCase: true,
  internalPattern: ["^src/.*"],
  newlinesBetween: 1,
  order: "asc",
  partitionByComment: false,
  partitionByNewLine: false,
  specialCharacters: "keep",
  type: "alphabetical",
};

export default sortImports;
