import { standardRuleTester } from "tests/rule-testers";

import alexPlugin from "src/index";

const { rules } = alexPlugin;

standardRuleTester.run("use-normalized-imports", rules["use-normalized-imports"], {
  valid: [
    {
      code: 'import Button from "src/components/Button"',
    },
    {
      code: 'import myFunction from "../utility/myFunction"',
    },
    {
      code: 'import myFunction from "./utility/myFunction"',
    },
  ],
  invalid: [
    {
      code: 'import Button from "src/components//Button"',
      output: 'import Button from "src/components/Button"',
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src/components//Button",
            normalized: "src/components/Button",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src//////utility////myFunction"',
      output: 'import myFunction from "src/utility/myFunction"',
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src//////utility////myFunction",
            normalized: "src/utility/myFunction",
          },
        },
      ],
    },
    {
      code: 'import Button from "src/utility/../components/Button"',
      output: 'import Button from "src/components/Button"',
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src/utility/../components/Button",
            normalized: "src/components/Button",
          },
        },
      ],
    },
    {
      code: "import Button from 'src/utility/../components/Button'",
      output: "import Button from 'src/components/Button'",
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src/utility/../components/Button",
            normalized: "src/components/Button",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src/./utility/myFunction"',
      output: 'import myFunction from "src/utility/myFunction"',
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src/./utility/myFunction",
            normalized: "src/utility/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from ".//utility/myFunction"',
      output: 'import myFunction from "./utility/myFunction"',
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: ".//utility/myFunction",
            normalized: "./utility/myFunction",
          },
        },
      ],
    },
    {
      code: 'import Button from "src/./components/../utility/../components/Button"',
      options: [{ fixable: false }],
      errors: [
        {
          messageId: "pathNotNormalized",
          data: {
            nonNormalized: "src/./components/../utility/../components/Button",
            normalized: "src/components/Button",
          },
        },
      ],
    },
  ],
});
