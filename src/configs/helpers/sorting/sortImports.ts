const sortImports = {
  customGroups: [
    {
      elementNamePattern: ["package.json"],
      groupName: "package-json",
    },
  ],
  groups: [
    "type-builtin",
    "type-external",
    "type-internal",
    "value-external",
    "value-builtin",
    "value-internal",
    "package-json",
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
