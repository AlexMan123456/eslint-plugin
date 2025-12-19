import { stripIndent } from "common-tags";

import { standardRuleTester } from "tests/rule-testers";

import rules from "src/rules";

standardRuleTester.run("no-skipped-tests", rules["no-skipped-tests"], {
  valid: [
    {
      code: stripIndent`
            describe("This is a non-skipped describe", () => {
                test("This is a non-skipped test", () => {
                    expect(1).toBe(1);
                })
            })
            `,
    },
  ],
  invalid: [
    {
      code: stripIndent`
            describe.skip("This is an skipped describe", () => {
                test("This is a non-skipped test", () => {
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
            describe("This is a non-skipped describe", () => {
                test.skip("This is an skipped test", () => {
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
            describe.skip("This is an skipped describe", () => {
                test.skip("This is an skipped test", () => {
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
