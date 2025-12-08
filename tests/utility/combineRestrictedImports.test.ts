import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

import { describe, expect, test } from "vitest";

import { combineRestrictedImports } from "src/utility";

describe("combineRestrictedImports", () => {
  test("Combines two restricted import groupings based on paths", () => {
    const first: NoRestrictedImportsOptions = {
      paths: [
        {
          name: "@alextheman/utility",
          message: "Test restriction",
        },
      ],
    };
    const second: NoRestrictedImportsOptions = {
      paths: [
        {
          name: "@alextheman/components",
          message: "Second test restriction",
        },
      ],
    };

    expect(combineRestrictedImports(first, second)).toEqual({
      paths: [
        {
          name: "@alextheman/utility",
          message: "Test restriction",
        },
        {
          name: "@alextheman/components",
          message: "Second test restriction",
        },
      ],
    });
  });
  test("Combines two restricted import groupings based on patterns", () => {
    const first: NoRestrictedImportsOptions = {
      patterns: [
        {
          group: ["node_modules"],
          message: "Do not import from node_modules",
        },
      ],
    };
    const second: NoRestrictedImportsOptions = {
      patterns: [
        {
          regex: "^@mui/[^/]+$",
          message: 'Please use `import Component from "@mui/[package]/Component"` instead.',
        },
      ],
    };

    expect(combineRestrictedImports(first, second)).toEqual({
      patterns: [
        {
          group: ["node_modules"],
          message: "Do not import from node_modules",
        },
        {
          regex: "^@mui/[^/]+$",
          message: 'Please use `import Component from "@mui/[package]/Component"` instead.',
        },
      ],
    });
  });
  test("Combines two restricted imports on both paths and patterns", () => {
    const first: NoRestrictedImportsOptions = {
      paths: [
        {
          name: "@alextheman/utility",
          message: "Test restriction",
        },
      ],
      patterns: [
        {
          group: ["node_modules"],
          message: "Do not import from node_modules",
        },
      ],
    };
    const second: NoRestrictedImportsOptions = {
      paths: [
        {
          name: "@alextheman/components",
          message: "Second test restriction",
        },
      ],
      patterns: [
        {
          regex: "^@mui/[^/]+$",
          message: 'Please use `import Component from "@mui/[package]/Component"` instead.',
        },
      ],
    };

    expect(combineRestrictedImports(first, second)).toEqual({
      paths: [
        {
          name: "@alextheman/utility",
          message: "Test restriction",
        },
        {
          name: "@alextheman/components",
          message: "Second test restriction",
        },
      ],
      patterns: [
        {
          group: ["node_modules"],
          message: "Do not import from node_modules",
        },
        {
          regex: "^@mui/[^/]+$",
          message: 'Please use `import Component from "@mui/[package]/Component"` instead.',
        },
      ],
    });
  });
});
