import { standardRuleTester } from "__tests__/rule-testers";
import { rules } from "src";

standardRuleTester.run("no-namespace-imports", rules["no-namespace-imports"], {
  valid: [
    {
      code: 'import { useState } from "react"',
    },
    {
      code: 'import * as React from "react"',
      options: [
        {
          allow: ["react"],
        },
      ],
    },
  ],
  invalid: [
    {
      code: 'import * as React from "react"',
      errors: [
        {
          messageId: "message",
          data: {
            source: "react",
          },
        },
      ],
    },
    {
      code: 'import * as MUI from "@mui/material"',
      options: [
        {
          allow: ["react"],
        },
      ],
      errors: [
        {
          messageId: "message",
          data: {
            source: "@mui/material",
          },
        },
      ],
    },
    {
      code: `import defaultExport, * as Utils from 'utils';`,
      errors: [
        {
          messageId: "message",
          data: {
            source: "utils",
          },
        },
      ],
    },
  ],
});
