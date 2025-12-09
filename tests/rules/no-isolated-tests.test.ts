import { normaliseIndents } from "@alextheman/utility";
import createRuleTester from "tests/rule-testers/createRuleTester";
import { describe, test } from "vitest";

import rules from "src/rules";

describe("no-isolated-tests", () => {
  const { valid, invalid } = createRuleTester({
    name: "no-isolated-tests",
    rule: rules["no-isolated-tests"],
  });

  describe("Valid", () => {
    test("Allows describe/test blocks that are not isolated", () => {
      valid(normaliseIndents`
              describe("This is a non-isolated describe", () => {
                  test("This is a non-isolated test", () => {
                      expect(1).toBe(1);
                  })
              })
              `);
    });
  });

  describe("Invalid", () => {
    test("Does not allow describe to be isolated", () => {
      invalid({
        code: normaliseIndents`
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
      });
    });
    test("Does not allow test to be isolated", () => {
      invalid({
        code: normaliseIndents`
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
      });
    });
    test("Does not allow both describe and test to be isolated at the same time", () => {
      invalid({
        code: normaliseIndents`
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
      });
    });
    test("Does not allow it to be isolated", () => {
      invalid({
        code: normaliseIndents`
            describe("This is a non-isolated describe", () => {
              it.only("This is an isolated it", () => {
                expect(1).toBe(1);
              })
            })
        `,
        errors: [
          {
            messageId: "message",
            data: {
              source: "it",
            },
          },
        ],
      });
    });
  });
});
