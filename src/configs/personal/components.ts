import type { Linter } from "eslint";

import personalTypeScriptPackage from "src/configs/personal/typeScriptPackage";

const personalComponents: Linter.Config[] = [
  ...personalTypeScriptPackage,
  {
    rules: {
      // Not really helpful in components, since most of the time, they will be returning a ReactNode. It's more helpful to
      // document the prop types and purpose of the component instead.
      "jsdoc/require-returns": "off",
    },
  },
];

export default personalComponents;
