import type { Linter } from "eslint";

import type { AlexPlugin } from "src/index";

import combinedReact from "src/configs/combined/react";
import combinedTypeScript from "src/configs/combined/typeScript";

function combinedTypeScriptReact(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript-react" },
    ...combinedTypeScript(plugin),
    ...combinedReact,
  ];
}

export default combinedTypeScriptReact;
