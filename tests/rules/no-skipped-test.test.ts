import { normaliseIndents } from "@alextheman/utility";
import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("no-skipped-tests", () => {
  const { valid, invalid } = createRuleTester({
    name: "no-skipped-tests",
    rule: rules["no-skipped-tests"],
  });

  describe("Valid", () => {
    test("Allows non-skipped describe/test blocks", () => {
      valid(normaliseIndents`
            describe("This is a non-skipped describe", () => {
                test("This is a non-skipped test", () => {
                    expect(1).toBe(1);
                })
            })
            `);
    });
  });

  describe("Invalid", () => {
    test("Does not allow skipped describe blocks", () => {
      invalid(normaliseIndents`
            describe.skip("This is a skipped describe", () => {
                test("This is a non-skipped test", () => {
                    expect(1).toBe(1);
                })
            })
            `);
    });
    test("Does not allow skipped test blocks", () => {
      invalid(normaliseIndents`
            describe("This is a non-skipped describe", () => {
                test.skip("This is a skipped test", () => {
                    expect(1).toBe(1);
                })
            })
            `);
    });
    test("Does not allow skipped test and describe blocks", () => {
      invalid({
        code: normaliseIndents`
            describe.skip("This is a skipped describe", () => {
                test.skip("This is a skipped test", () => {
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
      });
    });
  });
});
