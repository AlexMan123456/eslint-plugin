import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export type RuleFixerFunction = (fixer: RuleFixer) => RuleFix | null;

/**
 * Returns a rule fixer function to run based on a given condition
 *
 * @category Utility
 *
 * @param fixable - Whether the rule should be treated as fixable or not, and therefore whether the fixer should run.
 * @param fix - The rule fixer function to run.
 *
 * @returns The rule fixer function invoked with the fixer, provided the fixable condition is met.
 */
function fixOnCondition(fixable: boolean, fix: RuleFixerFunction): RuleFixerFunction {
  return (fixer: RuleFixer) => {
    if (!fixable) {
      return null;
    }
    return fix(fixer);
  };
}

export default fixOnCondition;
