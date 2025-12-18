import type { Linter } from "eslint";

import type { AlexPlugin } from "src/index";

import combinedJavaScript from "src/configs/combined/javaScript";
import { generalTypeScript } from "src/configs/general";
import { personalTypeScript } from "src/configs/personal";

function combinedTypeScript(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript" },
    ...combinedJavaScript(plugin),
    ...generalTypeScript,
    ...personalTypeScript(plugin),
  ];
}

export default combinedTypeScript;
