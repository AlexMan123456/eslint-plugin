import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

import { describe, expect, test } from "vitest";

import { fixOnCondition } from "src/utility/public";

describe("fixOnCondition", () => {
  test("Returns a function returning null if the fixable condition is false", () => {
    const fixer: RuleFixer = {} as RuleFixer;

    expect(
      fixOnCondition(false, () => {
        throw new Error("UNEXPECTED_FUNCTION_RUN");
      })(fixer),
    ).toEqual(null);
  });
  test("Returns a function that runs if the fixable condition is true", () => {
    const fixer: RuleFixer = {} as RuleFixer;

    expect(
      fixOnCondition(true, () => {
        const ruleFix: RuleFix = {
          range: [1, 1],
          text: "FUNCTION_RUN_SUCCESSFULLY",
        };
        return ruleFix;
      })(fixer)?.text,
    ).toBe("FUNCTION_RUN_SUCCESSFULLY");
  });
});
