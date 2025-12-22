const sortClasses = {
  customGroups: [],
  fallbackSort: { type: "unsorted" },
  groups: [
    "index-signature",
    ["private-static-property", "private-property"],
    ["static-property", "property"],
    "constructor",
    "get-method",
    "set-method",
    ["private-static-method", "private-static-function-property"],
    ["static-method", "static-function-property"],
    ["private-method", "private-function-property"],
    ["method", "function-property"],
    "unknown",
  ],
  ignoreCase: true,
  newlinesBetween: 1,
  order: "asc",
  partitionByComment: false,
  partitionByNewLine: false,
  specialCharacters: "keep",
  type: "alphabetical",
};

export default sortClasses;
