import { ruleTesterWithParser } from "tests/rule-testers";
import { getProjectRelativePath } from "tests/rule-testers/rule-tester-with-parser";
import plugin from "src";
const { rules } = plugin;

ruleTesterWithParser.run("no-relative-imports", rules["no-relative-imports"], {
  valid: [
    {
      code: 'import myFunction from "src/utils/myFunction"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
    },
    {
      code: 'import myFunction from "src/utils/myFunction";',
      filename: getProjectRelativePath("src/components/Button.tsx"),
    },
  ],
  invalid: [
    {
      code: 'import myFunction from "../utils/myFunction"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: 'import myFunction from "src/utils/myFunction"',
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
      code: 'import myFunction from "../utils/myFunction";',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: 'import myFunction from "src/utils/myFunction";',
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
      code: 'import myFunction from "./myFunction"',
      filename: getProjectRelativePath("src/utils/myOtherFunction.ts"),
      output: 'import myFunction from "src/utils/myFunction"',
      errors: [
        {
          messageId: "message",
          data: {
            source: "./myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src/components/../utils/myFunction"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: null,
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
      code: 'import myFunction from "src/utils/./myFunction"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: null,
      errors: [
        {
          messageId: "stupidPath",
          data: {
            source: "src/utils/./myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "../components/../utils/./myFunction"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: 'import myFunction from "src/utils/myFunction"',
      errors: [
        {
          messageId: "message",
          data: {
            source: "../components/../utils/./myFunction",
          },
        },
      ],
    },
    {
      code: 'import { standardRuleTester } from "./../../../rule-testers"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: null,
      errors: [
        {
          messageId: "message",
          data: {
            source: "./../../../rule-testers",
          },
        },
      ],
    },
    {
      code: 'import { standardRuleTester } from "src/../../rule-testers"',
      filename: getProjectRelativePath("src/components/Button.tsx"),
      output: null,
      errors: [
        {
          messageId: "stupidPath",
          data: {
            source: "src/../../rule-testers",
          },
        },
      ],
    },
  ],
});
