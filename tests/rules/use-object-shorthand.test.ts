import { normaliseIndents } from "@alextheman/utility";
import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("use-object-shorthand", () => {
  const { valid, invalid } = createRuleTester({
    name: "use-object-shorthand",
    rule: rules["use-object-shorthand"],
  });

  describe("Valid", () => {
    test("Allows object shorthand usage", () => {
      valid(normaliseIndents`
            const property = "Hello";
            const myObject = { property };
            `);
    });
    test("Allows non-shorthand usage when the value is genuinely different to the key", () => {
      valid(normaliseIndents`
            const value = "Hello";
            const myObject = { property: value };
            `);
      valid(normaliseIndents`
            const property = "Hello";
            const myObject = { property: property.toUpperCase() };
          `);
    });
    test("Allows non-shorthand usage when the value is a string of the key name", () => {
      valid('const myObject = { property: "property" }');
    });
  });

  describe("Invalid", () => {
    test("Does not allow non-object shorthand", () => {
      invalid({
        code: normaliseIndents`
            const property = "Hello";
            const myObject = { property: property };
            `,
        output: normaliseIndents`
            const property = "Hello";
            const myObject = { property };
            `,
        errors: [
          {
            messageId: "useShorthand",
          },
        ],
      });
    });
    test("Does not produce an output if fixable option is set to false", () => {
      invalid({
        code: normaliseIndents`
            const property = "Hello";
            const myObject = { property: property };
            `,
        options: [{ fixable: false }],
        errors: [
          {
            messageId: "useShorthand",
          },
        ],
      });
    });
    test("Flags multiple properties", () => {
      invalid({
        code: normaliseIndents`
              const firstProperty = 1;
              const secondProperty = 2;
              const myObject = { firstProperty: firstProperty, secondProperty: secondProperty };
            `,
        output: normaliseIndents`
              const firstProperty = 1;
              const secondProperty = 2;
              const myObject = { firstProperty, secondProperty };
            `,
        errors: [{ messageId: "useShorthand" }, { messageId: "useShorthand" }],
      });
    });
  });
});
