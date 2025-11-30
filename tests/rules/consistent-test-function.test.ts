import { stripIndent } from "common-tags";
import { standardRuleTester } from "tests/rule-testers";

import rules from "src/rules";

standardRuleTester.run("consistent-test-function", rules["consistent-test-function"], {
  valid: [
    {
      code: stripIndent`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "test",
        },
      ],
    },
    {
      code: stripIndent`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
    },
    {
      code: stripIndent`
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "test",
        },
      ],
    },
    {
      code: stripIndent`
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "it",
        },
      ],
    },
    {
      code: stripIndent`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "it",
        },
      ],
    },
  ],
  invalid: [
    {
      code: stripIndent`
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      output: stripIndent`
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      output: stripIndent`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "it",
        },
      ],
      output: stripIndent`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "test",
            preference: "it",
          },
        },
        {
          messageId: "message",
          data: {
            source: "test",
            preference: "it",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { test, it } from "vitest"
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            test("Does another thing", () => {
                expect(2).toBe(2);
            })
            `,
      output: stripIndent`
            import { test } from "vitest"
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            test("Does another thing", () => {
                expect(2).toBe(2);
            })
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { it as testFunction } from "vitest";
            testFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      output: stripIndent`
            import { test as testFunction } from "vitest";
            testFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { test as itFunction } from "vitest";
            itFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "it",
        },
      ],
      output: stripIndent`
            import { it as itFunction } from "vitest";
            itFunction("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      errors: [
        {
          messageId: "message",
          data: {
            source: "test",
            preference: "it",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { it } from "vitest";
            it("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          fixable: false,
        },
      ],
      errors: [
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
        {
          messageId: "message",
          data: {
            source: "it",
            preference: "test",
          },
        },
      ],
    },
    {
      code: stripIndent`
            import { test } from "vitest";
            test("Does a thing", () => {
                expect(1).toBe(1);
            });
            `,
      options: [
        {
          preference: "it",
          fixable: false,
        },
      ],
      errors: [
        {
          messageId: "message",
          data: {
            source: "test",
            preference: "it",
          },
        },
        {
          messageId: "message",
          data: {
            source: "test",
            preference: "it",
          },
        },
      ],
    },
  ],
});
