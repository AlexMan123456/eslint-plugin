import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { omitProperties } from "@alextheman/utility";
import z from "zod";

function createRuleSchema(schema: z.ZodType): JSONSchema4[] {
  return [omitProperties(z.toJSONSchema(schema), "$schema") as unknown as JSONSchema4];
}

export default createRuleSchema;
