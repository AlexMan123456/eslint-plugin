const sortImports = {
  customGroups: [
    {
      elementNamePattern: ["package.json"],
      groupName: "package-json",
    },
    {
      elementNamePattern: ["^tests/.*"],
      groupName: "type-tests",
      selector: "type",
    },
    {
      elementNamePattern: ["^tests/.*"],
      groupName: "value-tests",
    },
  ],
  groups: [
    "type-builtin",
    "type-external",
    "type-tests",
    "type-internal",
    "value-external",
    "value-builtin",
    "value-tests",
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
