import alexPlugin from "./dist/index.js";

export default [
    ...alexPlugin.configs.alexTypeScriptBase,
    {
        rules: {
            /* When we pass the plugin into the config creator functions from the index, there's no guarantee that the configs will already be
            on the plugin when you access them from src/configs, since they're in the process of being created. It is generally better to import 
            another creator function directly from the creator function should you need to refer to another config in the newly added config. */
            "@alextheman/no-plugin-configs-access-from-src-configs": "error"
        }
    }
];
