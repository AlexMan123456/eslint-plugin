import { describe, expect, test } from "vitest";

import { javaScriptBase, reactBase, typeScriptBase } from "src/configs";
import createConfigGroup from "src/utility/createConfigGroup";

describe("createConfigGroup", () => {
  test("Converts an object to a valid config group", () => {
    expect(createConfigGroup("general", { reactBase })).toEqual({
      "general/react-base": reactBase,
    });
  });
  test("Converts TypeScript and JavaScript to typescript and javascript", () => {
    expect(createConfigGroup("general", { typeScriptBase, javaScriptBase })).toEqual({
      "general/typescript-base": typeScriptBase,
      "general/javascript-base": javaScriptBase,
    });
    expect(
      createConfigGroup("general", {
        TypeScriptBase: typeScriptBase,
        JavaScriptBase: javaScriptBase,
      }),
    ).toEqual({
      "general/typescript-base": typeScriptBase,
      "general/javascript-base": javaScriptBase,
    });
  });
});
