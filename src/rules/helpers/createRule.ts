import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((ruleName) => {
  return ruleName;
});

export default createRule;
