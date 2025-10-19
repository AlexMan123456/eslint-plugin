import { describe, expect, test } from "vitest";

import { javaScriptBase, typeScriptBase } from "src/configs";
import createConfigs from "src/utility/createConfigs";

describe("createConfigs", () => {
  test("Creates the config", () => {
    expect(
      createConfigs({
        general: {
          typeScriptBase,
          javaScriptBase,
        },
        plugin: {
          alexPluginBase: [{ rules: { "@alextheman/no-relative-imports": "error" } }],
        },
      }),
    ).toEqual({
      "general/typescript-base": typeScriptBase,
      "general/javascript-base": javaScriptBase,
      "plugin/alex-plugin-base": [{ rules: { "@alextheman/no-relative-imports": "error" } }],
    });
  });
  test("Handles empty groups", () => {
    expect(createConfigs({})).toEqual({});
  });
});
