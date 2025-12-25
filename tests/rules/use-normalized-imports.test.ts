import { describe, test } from "vitest";

import createRuleTester from "tests/rule-testers/createRuleTester";

import rules from "src/rules";

describe("use-normalized-imports", () => {
  const { valid, invalid } = createRuleTester({
    name: "use-normalized-imports",
    rule: rules["use-normalized-imports"],
  });

  describe("Valid", () => {
    test("Allows normalised absolute imports", () => {
      valid('import Button from "src/components/Button"');
    });
    test("Allows normalised relative imports from root", () => {
      valid('import myFunction from "./utility/myFunction"');
    });
    test("Allows normalised relative imports with depth 1", () => {
      valid('import myFunction from "../utility/myFunction"');
    });
  });

  describe("Invalid", () => {
    test("Does not allow double-slashes in imports", () => {
      invalid({
        code: 'import Button from "src/components//Button"',
        output: 'import Button from "src/components/Button"',
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: "src/components//Button",
              normalized: "src/components/Button",
            },
          },
        ],
      });
    });
    test("Does not allow more than two consecutive slashes at all", () => {
      invalid({
        code: 'import myFunction from "src//////utility////myFunction"',
        output: 'import myFunction from "src/utility/myFunction"',
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: "src//////utility////myFunction",
              normalized: "src/utility/myFunction",
            },
          },
        ],
      });
    });
    test("Does not allow ../ in the middle of an import path", () => {
      invalid({
        code: 'import Button from "src/utility/../components/Button"',
        output: 'import Button from "src/components/Button"',
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: "src/utility/../components/Button",
              normalized: "src/components/Button",
            },
          },
        ],
      });
    });
    test("Does not allow ./ in the middle of an import path", () => {
      invalid({
        code: 'import myFunction from "src/./utility/myFunction"',
        output: 'import myFunction from "src/utility/myFunction"',
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: "src/./utility/myFunction",
              normalized: "src/utility/myFunction",
            },
          },
        ],
      });
    });
    test("Does not allow root-level imports to contain a double-slash", () => {
      invalid({
        code: 'import myFunction from ".//utility/myFunction"',
        output: 'import myFunction from "./utility/myFunction"',
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: ".//utility/myFunction",
              normalized: "./utility/myFunction",
            },
          },
        ],
      });
    });
    test("Does not allow absolute monstrosity", () => {
      invalid({
        code: 'import Button from "src/./components/../utility/../components///////Button"',
        options: [{ fixable: false }],
        errors: [
          {
            messageId: "pathNotNormalized",
            data: {
              nonNormalized: "src/./components/../utility/../components///////Button",
              normalized: "src/components/Button",
            },
          },
        ],
      });
    });
  });
});
