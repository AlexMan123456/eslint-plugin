import { RuleTester } from "@typescript-eslint/rule-tester";

import path from "path";

export const basePath = path.resolve(__dirname, "../fixtures");

export function getProjectRelativePath(pathname: string): string {
  return path.relative(basePath, path.join(basePath, pathname));
}

const ruleTesterWithParser = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      tsconfigRootDir: basePath,
      project: `${basePath}/tsconfig.json`,
      sourceType: "module",
    },
  },
});

export default ruleTesterWithParser;
