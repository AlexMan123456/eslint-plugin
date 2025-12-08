import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";
import { combineRestrictedImports } from "src/utility";

const eslintPluginRestrictedImports: NoRestrictedImportsOptions = combineRestrictedImports(
  generalRestrictedImports,
  {
    paths: [
      ...["src/alexPlugin", "src/index", "src"].map((name) => {
        return {
          importNames: ["default"],
          message:
            "Do not import the plugin directly from the config files. Please create a function that takes in the plugin and returns the config instead.",
          name,
        };
      }),
      {
        importNames: ["default"],
        message: 'Please import from "src/configs/helpers/eslint-plugin-react-hooks" instead.',
        name: "eslint-plugin-react-hooks",
      },
    ],
  },
);

export default eslintPluginRestrictedImports;
