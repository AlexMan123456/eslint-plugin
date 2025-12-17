const sortImports = {
  groups: [
    "type-builtin",
    "type-external",
    "type-internal",
    "value-external",
    "value-builtin",
    "value-internal",
  ],
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
