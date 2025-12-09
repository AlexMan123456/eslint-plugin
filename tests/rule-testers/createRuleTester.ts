import type { RuleTester, RuleTesterInitOptions } from "eslint-vitest-rule-tester";

// eslint-disable-next-line no-restricted-imports
import { createRuleTester as createVitestRuleTester } from "eslint-vitest-rule-tester";

function createRuleTester<RuleOptions = any, MessageId extends string = string>(
  options: RuleTesterInitOptions,
): RuleTester<RuleOptions, MessageId> {
  const { languageOptions } = options;
  return createVitestRuleTester<RuleOptions, MessageId>({
    languageOptions: {
      ecmaVersion: "latest",
      ...languageOptions,
    },
    ...options,
  });
}

export default createRuleTester;
