import { stripIndent } from "common-tags";
import { standardRuleTester } from "tests/rule-testers";

import alexPlugin from "src/index";

const { rules } = alexPlugin;

standardRuleTester.run("use-object-shorthand", rules["use-object-shorthand"], {
  valid: [
    {
      code: stripIndent`
            const property = "Hello";
            const myObject = { property };
            `,
    },
    {
      code: stripIndent`
            const property = "Hello";
            const myObject = { key: property };
            `,
    },
    {
      code: stripIndent`
            const myObject = { property: "property" };
            `,
    },
  ],
  invalid: [
    {
      code: stripIndent`
            const property = "Hello";
            const myObject = { property: property };
            `,
      output: stripIndent`
            const property = "Hello";
            const myObject = { property };
            `,
      errors: [
        {
          messageId: "useShorthand",
        },
      ],
    },
  ],
});
