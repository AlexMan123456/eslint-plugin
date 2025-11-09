import alexPlugin from "./dist/index.js";

export default [
  ...alexPlugin.configs["combined/typescript"],
  ...alexPlugin.configs["personal/eslint-plugin"],
];
