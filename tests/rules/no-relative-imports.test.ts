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
          messageId: "strictNoRelative",
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
          messageId: "rootOnly",
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
          messageId: "exceededAllowedDepth",
          data: {
            source: "../../utils/myFunction",
            depth: 1,
            s: "",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "../../../utils/myFunction";',
      options: [
        {
          depth: 2,
        },
      ],
      errors: [
        {
          messageId: "exceededAllowedDepth",
          data: {
            source: "../../../utils/myFunction",
            depth: 2,
            s: "s",
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
