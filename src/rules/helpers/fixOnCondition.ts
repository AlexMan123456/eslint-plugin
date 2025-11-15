import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export type RuleFixerFunction = (fixer: RuleFixer) => RuleFix | null;

function fixOnCondition(fixable: boolean, fix: RuleFixerFunction): RuleFixerFunction {
  return (fixer: RuleFixer) => {
    if (!fixable) {
      return null;
    }
    return fix(fixer);
  };
}

export default fixOnCondition;
