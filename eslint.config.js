import alexPlugin from "./dist/index.js";

export default [
    ...alexPlugin.configs.alexTypeScriptBase,
    {
        rules: {
            "@alextheman/no-plugin-configs-access-from-src-configs": "error"
        }
    }
];
