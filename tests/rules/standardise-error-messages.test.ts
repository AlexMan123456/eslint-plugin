import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("standardise-error-messages", () => {
  const { valid, invalid } = createRuleTester({
    name: "standardise-error-messages",
    rule: rules["standardise-error-messages"],
  });

  describe("Valid", () => {
    test("Allows UPPER_SNAKE_CASE on thrown errors", () => {
      valid('throw new Error("TEST_ERROR")');
    });
    test("Allows UPPER_SNAKE_CASE when just calling the error constructor", () => {
      valid('Error("SOMETHING_WENT_WRONG")');
    });
    test("Allows UPPER_SNAKE_CASE when instantiating a new Error", () => {
      valid('new Error("SOMETHING_WENT_WRONG")');
    });
  });

  describe("Invalid", () => {
    test("Does not allow non-standardised error messages on thrown errors", () => {
      invalid('throw new Error("An error has occurred. Please try again later.")');
    });
    test("Requires UPPER_SNAKE_CASE when just calling the error constructor", () => {
      invalid('Error("Please try again.")');
    });
    test("Requires UPPER_SNAKE_CASE when instantiating a new Error", () => {
      invalid('new Error("Please try again.")');
    });
  });
});
