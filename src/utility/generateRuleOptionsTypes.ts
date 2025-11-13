import { appendFile, mkdir, rm, writeFile } from "fs/promises";
import path from "path";

import { kebabToCamel } from "@alextheman/utility";
import { compile } from "json-schema-to-typescript";

import alexPlugin from "src/index";

const rulesTypesDir = "src/rules/types";

(async () => {
  await rm(path.join(process.cwd(), rulesTypesDir), { recursive: true, force: true });
  await mkdir(path.join(process.cwd(), rulesTypesDir));
  for (const [ruleName, rule] of Object.entries(alexPlugin.rules)) {
    const typeName = `${kebabToCamel(ruleName, { startWithUpper: true })}Options`;
    if (rule.meta.schema[0]) {
      const typeFileContents = await compile(rule.meta.schema[0], typeName, {
        bannerComment:
          "/** Generated from src/utility/generateRuleOptionsTypes.ts.\n* You may execute the above file to re-generate this type using `npm run generate-rule-options-types` */",
      });
      await writeFile(path.join(process.cwd(), rulesTypesDir, `${typeName}.ts`), typeFileContents);
      await appendFile(
        path.join(process.cwd(), rulesTypesDir, "index.ts"),
        `export type { ${typeName} } from "${path.join(rulesTypesDir, typeName)}";\n`,
      );
    }
  }
})();
