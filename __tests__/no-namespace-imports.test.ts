import { RuleTester } from "@typescript-eslint/rule-tester";
import rules from "src/rules";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest" },
});

ruleTester.run("no-namespace-imports", rules["no-namespace-imports"], {
  valid: [
    {
      code: 'import { useState } from "react"',
    },
  ],
  invalid: [
    {
      code: 'import * as React from "react"',
      errors: [
        {
          messageId: "message",
        },
      ],
    },
  ],
});
