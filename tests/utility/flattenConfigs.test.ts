import type { Linter } from "eslint";

import { describe, expect, expectTypeOf, test } from "vitest";

import flattenConfigs from "src/utility/public/flattenConfigs";

describe("flattenConfigs", () => {
  test("Flattens a nested object, combining the keys into a single key separated by slash", () => {
    const inputObject = { hello: { world: [] } };
    const configKeys = Object.keys(flattenConfigs(inputObject));
    expect(configKeys).toContain("hello/world");
  });

  test("Converts the keys to kebab-case", () => {
    const inputObject = {
      hello: {
        testConfig: [],
      },
      thisIs: {
        anotherTest: [],
      },
    };
    const configKeys = Object.keys(flattenConfigs(inputObject));

    expect(configKeys).toContain("hello/test-config");
    expect(configKeys).toContain("this-is/another-test");
  });

  test("Does not convert the 's' in JavaScript and TypeScript", () => {
    const inputObject = {
      general: {
        javaScript: [],
      },
      secondGroup: {
        typeScript: [],
      },
      useTypeScript: {
        insteadOfPureJavaScript: [],
        becausePureJavaScriptIsNotTypeSafe: [],
      },
    };

    const configKeys = Object.keys(flattenConfigs(inputObject));
    expect(configKeys).toContain("general/javascript");
    expect(configKeys).toContain("second-group/typescript");
    expect(configKeys).toContain("use-typescript/instead-of-pure-javascript");
    expect(configKeys).toContain("use-typescript/because-pure-javascript-is-not-type-safe");
  });

  test("Does not converts consecutive capitals", () => {
    const inputObject = {
      backEnd: {
        configAPI: [],
      },
    };

    const configKeys = Object.keys(flattenConfigs(inputObject));
    expect(configKeys).toContain("back-end/config-a-p-i");
  });

  test("The types of the config keys match what we get at runtime", () => {
    const inputObject = {
      hello: {
        testConfig: [],
      },
      thisIs: {
        anotherTest: [],
      },
      useTypeScript: {
        insteadOfPureJavaScript: [],
        becausePureJavaScriptIsNotTypeSafe: [],
      },
      backEnd: {
        configAPI: [],
      },
    };

    const _flattenedObject = flattenConfigs(inputObject);
    expectTypeOf<keyof typeof _flattenedObject>().toEqualTypeOf<
      | "hello/test-config"
      | "this-is/another-test"
      | "use-typescript/instead-of-pure-javascript"
      | "use-typescript/because-pure-javascript-is-not-type-safe"
      | "back-end/config-a-p-i"
    >();
  });

  test("The function returns the configs themselves as well", () => {
    const inputObject = {
      hello: {
        testConfig: [
          {
            rules: {
              "no-restricted-imports": "error",
            },
          },
        ] satisfies Linter.Config[],
      },
      useTypeScript: {
        insteadOfPureJavaScript: [
          {
            rules: {
              "no-pure-javascript": ["error", { allow: "dist" }],
            },
          },
        ] satisfies Linter.Config[],
      },
    };

    const flattenedObject = flattenConfigs(inputObject);
    expect(flattenedObject["hello/test-config"]).toEqual([
      {
        rules: {
          "no-restricted-imports": "error",
        },
      },
    ]);
    expect(flattenedObject["use-typescript/instead-of-pure-javascript"]).toEqual([
      {
        rules: {
          "no-pure-javascript": ["error", { allow: "dist" }],
        },
      },
    ]);
  });
});
