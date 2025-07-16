import { RuleTester } from "@typescript-eslint/rule-tester";

const standardRuleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
  },
});

export default standardRuleTester;
