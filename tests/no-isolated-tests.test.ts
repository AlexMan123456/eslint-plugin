import { stripIndent } from "common-tags";
import { standardRuleTester } from "tests/rule-testers";

import alexPlugin from "src/index";

const { rules } = alexPlugin;

standardRuleTester.run("no-isolated-tests", rules["no-isolated-tests"], {
  valid: [
    {
      code: stripIndent`
            describe("This is a non-isolated describe", () => {
                test("This is a non-isolated test", () => {
                    expect(1).toBe(1);
                })
            })
            `,
    },
  ],
  invalid: [
    {
      code: stripIndent`
            describe.only("This is an isolated describe", () => {
                test("This is a non-isolated test", () => {
                    expect(1).toBe(1);
                })
            })
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "describe",
          },
        },
      ],
    },
    {
      code: stripIndent`
            describe("This is a non-isolated describe", () => {
                test.only("This is an isolated test", () => {
                    expect(1).toBe(1);
                })
            })
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            describe.only("This is an isolated describe", () => {
                test.only("This is an isolated test", () => {
                    expect(1).toBe(1);
                })
            })
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "describe",
          },
        },
        {
          messageId: "message",
          data: {
            source: "test",
          },
        },
      ],
    },
  ],
});
