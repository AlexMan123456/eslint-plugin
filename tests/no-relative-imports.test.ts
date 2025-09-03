import alexPlugin from "src";
import { standardRuleTester } from "tests/rule-testers";
const { rules } = alexPlugin;

standardRuleTester.run("no-relative-imports", rules["no-relative-imports"], {
  valid: [
    {
      code: 'import myFunction from "src/utils/myFunction"',
    },
    {
      code: 'import myFunction from "src/utils/myFunction"',
      options: [
        {
          depth: 1,
        },
      ],
    },
    {
      code: 'import myFunction from "./utils/myFunction";',
      options: [
        {
          depth: 0,
        },
      ],
    },
    {
      code: 'import myFunction from "../utils/myFunction";',
      options: [
        {
          depth: 1,
        },
      ],
    },
    {
      code: 'import myFunction from "../../utils/myFunction";',
      options: [
        {
          depth: 2,
        },
      ],
    },
  ],
  invalid: [
    {
      code: 'import myFunction from "./utils/myFunction";',
      errors: [
        {
          messageId: "message",
          data: {
            source: "./utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "../utils/myFunction";',
      options: [
        {
          depth: 0,
        },
      ],
      errors: [
        {
          messageId: "message",
          data: {
            source: "../utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "../../utils/myFunction";',
      options: [
        {
          depth: 1,
        },
      ],
      errors: [
        {
          messageId: "message",
          data: {
            source: "../../utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "./../utils/myFunction";',
      options: [
        {
          depth: 1,
        },
      ],
      errors: [
        {
          messageId: "stupidPath",
          data: {
            source: "./../utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src/components/../utils/myFunction";',
      options: [
        {
          depth: 1,
        },
      ],
      errors: [
        {
          messageId: "stupidPath",
          data: {
            source: "src/components/../utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src/./utils/myFunction";',
      options: [
        {
          depth: 1,
        },
      ],
      errors: [
        {
          messageId: "stupidPath",
          data: {
            source: "src/./utils/myFunction",
          },
        },
      ],
    },
  ],
});
