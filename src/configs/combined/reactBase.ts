import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import reactBase from "src/configs/general/reactBase";
import createPluginBaseConfig from "src/configs/plugin/pluginBase";

function createCombinedReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...createPluginBaseConfig(plugin),
    ...reactBase,
    {
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                message:
                  'Please use `import Component from "@mui/[package]/Component"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.',
                regex: "^@mui/[^/]+$",
              },
            ],
          },
        ],
        "react-hooks/exhaustive-deps": "off",
        "react-refresh/only-export-components": "off",
        "react/jsx-boolean-value": "error",
      },
    },
  ];
}

export default createCombinedReactBaseConfig;
