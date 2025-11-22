import type { Linter } from "eslint";

import packageJson from "eslint-plugin-package-json";

const packageJsonConfig: Linter.Config[] = [
  packageJson.configs.recommended,
  {
    plugins: {
      "package-json": packageJson as any,
    },
    rules: {
      "package-json/scripts-name-casing": "error",
    },
  },
];

export default packageJsonConfig;
