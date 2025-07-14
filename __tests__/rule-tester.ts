import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest" },
});

export default ruleTester;
