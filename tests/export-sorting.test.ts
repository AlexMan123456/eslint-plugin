import { stripIndent } from "common-tags";

import plugin from "src";
import { standardRuleTester } from "tests/rule-testers";
const { rules } = plugin;

standardRuleTester.run("export-sorting", rules["export-sorting"], {
  valid: [
    {
      code: stripIndent`
            export { default as DropdownMenu } from "src/components/DropdownMenu";
            export type { DropdownMenuProps } from "src/components/DropdownMenu";
            `,
    },
    // {
    //     code: stripIndent`
    //         export { default as CollapsableItem } from "src/components/CollapsableItem";
    //         export type { CollapsableItemProps } from "src/components/CollapsableItem";

    //         export { default as DropdownMenu } from "src/components/DropdownMenu";
    //         export type { DropdownMenuProps } from "src/components/DropdownMenu";
    //     `
    // }
  ],
  invalid: [
    {
      code: 'export { default as DropdownMenu, type DropdownMenuProps, type DropdownMenuItem } from "src/components/DropdownMenu";',
      output: stripIndent`
            export { default as DropdownMenu } from "src/components/DropdownMenu";
            export type { DropdownMenuProps, DropdownMenuItem } from "src/components/DropdownMenu";
            `,
      errors: [
        {
          messageId: "typeExports",
          data: {
            source:
              'export { default as DropdownMenu, type DropdownMenuProps, type DropdownMenuItem } from "src/components/DropdownMenu";',
          },
        },
      ],
    },
    // {
    //     code: stripIndent`
    //         export { default as CollapsableItem } from "src/components/CollapsableItem";
    //         export type { CollapsableItemProps } from "src/components/CollapsableItem";
    //         export { default as DropdownMenu } from "src/components/DropdownMenu";
    //         export type { DropdownMenuProps } from "src/components/DropdownMenu";
    //     `,
    //     output: stripIndent`
    //         export { default as CollapsableItem } from "src/components/CollapsableItem";
    //         export type { CollapsableItemProps } from "src/components/CollapsableItem";

    //         export { default as DropdownMenu } from "src/components/DropdownMenu";
    //         export type { DropdownMenuProps } from "src/components/DropdownMenu";
    //     `,
    //     errors: [
    //         {
    //             messageId: "lineBetweenGroups",
    //             data: {
    //                 source: stripIndent`
    //                     export { default as CollapsableItem } from "src/components/CollapsableItem";
    //                     export type { CollapsableItemProps } from "src/components/CollapsableItem";
    //                     export { default as DropdownMenu } from "src/components/DropdownMenu";
    //                     export type { DropdownMenuProps } from "src/components/DropdownMenu";
    //                 `
    //             }
    //         }
    //     ]
    // }
  ],
});
