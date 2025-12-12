import alexPlugin from "./dist/index.js";

export default [
  ...alexPlugin.configs["combined/typescript-package"],
  ...alexPlugin.configs["personal/eslint-plugin"],
];
