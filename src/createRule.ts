import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((ruleName) => {
  return `https://github.com/AlexMan123456/eslint-plugin/${ruleName}`;
});

export default createRule;
