import { stripIndent } from "common-tags";
import { ruleTesterWithParser } from "tests/rule-testers";

import rules from "src/rules";

ruleTesterWithParser.run(
  "no-plugin-configs-access-from-src-configs",
  rules["no-plugin-configs-access-from-src-configs"],
  {
    valid: [
      {
        code: stripIndent`
        function myConfig(plugin: AlexPlugin) {
            return createBaseConfig(plugin);
        }

        export default myConfig;
        `,
        filename: "src/configs/myConfig.ts",
      },
      {
        code: stripIndent`
        function myConfig(plugin: AlexPlugin) {
            return plugin.configs.alexTypeScriptBase;
        }

        export default myConfig;
        `,
        filename: "src/myConfig.ts",
      },
    ],
    invalid: [
      {
        code: stripIndent`
        function myConfig(plugin: AlexPlugin) {
            return plugin.configs.alexTypeScriptBase;
        }

        export default myConfig;
        `,
        filename: "src/configs/myConfig.ts",
        errors: [
          {
            messageId: "message",
            data: {
              source: "plugin.configs.alexTypeScriptBase",
            },
          },
        ],
      },
      {
        code: stripIndent`
        function myConfig(plugin: AlexPlugin) {
            return plugin["configs"].alexTypeScriptBase;
        }

        export default myConfig;
        `,
        filename: "src/configs/myConfig.ts",
        errors: [
          {
            messageId: "message",
            data: {
              source: 'plugin["configs"].alexTypeScriptBase',
            },
          },
        ],
      },
    ],
  },
);
