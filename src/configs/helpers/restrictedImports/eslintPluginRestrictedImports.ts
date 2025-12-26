import type {
  NoRestrictedImportsOptions,
  RestrictedPathImport,
} from "src/utility/public/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";
import { combineRestrictedImports } from "src/utility/public";

const eslintPluginRestrictedImports: NoRestrictedImportsOptions = combineRestrictedImports(
  generalRestrictedImports,
  {
    paths: [
      {
        importNames: ["default"],
        message:
          "Do not import the plugin directly from the config files. Please create a function that takes in the plugin and returns the config instead.",
        name: "src/alexPlugin",
      },
      ...["src/index", "src"].map((name): RestrictedPathImport => {
        return {
          message: "Do not import directly from the index file.",
          name,
        };
      }),
      {
        importNames: ["default"],
        message: 'Please import from "src/configs/helpers/eslint-plugin-react-hooks" instead.',
        name: "eslint-plugin-react-hooks",
      },
      {
        importNames: ["createRuleTester"],
        message:
          'Please import createRuleTester from "tests/rule-testers/createRuleTester" instead.',
        name: "eslint-vitest-rule-tester",
      },
    ],
  },
);

export default eslintPluginRestrictedImports;
