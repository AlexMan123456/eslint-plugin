import { standardRuleTester } from "tests/rule-testers";

import alexPlugin from "src/index";

const { rules } = alexPlugin;

standardRuleTester.run("standardise-error-messages", rules["standardise-error-messages"], {
  valid: [
    {
      code: 'throw new Error("TEST_ERROR")',
    },
    {
      code: 'Error("SOMETHING_WENT_WRONG")',
    },
  ],
  invalid: [
    {
      code: 'throw new Error("An error has occurred. Please try again later.")',
      errors: [
        {
          messageId: "message",
          data: {
            error: "An error has occurred. Please try again later.",
            regex: "^[A-Z]+(?:_[A-Z]+)*$",
          },
        },
      ],
    },
    {
      code: 'Error("Please try again.")',
      errors: [
        {
          messageId: "message",
          data: {
            error: "Please try again.",
            regex: "^[A-Z]+(?:_[A-Z]+)*$",
          },
        },
      ],
    },
  ],
});
