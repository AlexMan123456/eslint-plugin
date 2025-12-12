import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import combinedTypeScript from "src/configs/combined/typeScript";
import { personalTypeScriptPackage } from "src/configs/personal";

function combinedTypeScriptPackage(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript-package" },
    ...combinedTypeScript(plugin),
    ...personalTypeScriptPackage,
  ];
}

export default combinedTypeScriptPackage;
