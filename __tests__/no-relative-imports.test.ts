import ruleTester from "rule-tester";
import rules from "src/rules";

ruleTester.run("no-relative-imports", rules["no-relative-imports"], {
  valid: [
    {
      code: 'import myFunction from "src/utils/myFunction"',
    },
  ],
  invalid: [
    {
      code: 'import myFunction from "../utils/myFunction"',
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
      errors: [
        {
          messageId: "message",
          data: {
            source: "src/components/../utils/myFunction",
          },
        },
      ],
    },
    {
      code: 'import myFunction from "src/utils/./myFunction"',
      errors: [
        {
          messageId: "message",
          data: {
            source: "src/utils/./myFunction",
          },
        },
      ],
    },
  ],
});
