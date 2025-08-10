import alexPlugin from "./dist/index.js";

export default [
  ...alexPlugin.configs.alexTypeScriptBase,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["./", "../"],
              message: "Relative imports are not allowed.",
            },
          ],
        },
      ],
    },
  },
];
