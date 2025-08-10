import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((ruleName) => {
  return `https://alextheman-package-docs.netlify.app/eslint-plugin/${ruleName}`;
});

export default createRule;
