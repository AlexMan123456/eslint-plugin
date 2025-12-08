import type { Linter } from "eslint";

import generalReact from "src/configs/general/react";
import personalReact from "src/configs/personal/react";

const combinedReact: Linter.Config[] = [
  { name: "@alextheman/combined/react" },
  ...generalReact,
  ...personalReact,
];

export default combinedReact;
