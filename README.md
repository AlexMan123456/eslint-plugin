# @alextheman/eslint-plugin

This is my personal ESLint plugin. It provides custom ESLint rules along with some base configs that you can just drop straight into your project with minimal setup.

## Installation

To install this plugin into your project, you can do so with the following command:

```bash
npm install --save-dev @alextheman/eslint-plugin
```

Since most of the time, you will be using this plugin only to check your code as opposed to using it at runtime, we recommend installing it as a dev dependency. If you are using this in your own ESLint plugin, however, we recommend installing it as a peer dependency

```bash
npm install --save-peer @alextheman/eslint-plugin
```

## Creating a new rule

To add a new rule, you must first create the skeleton structure of your rule, following the given template:

```typescript
const myRule = createRule({
  name: "my-rule",
  meta: {
    docs: {
      description: "Description of the rule",
    },
    messages: {
      message: "Message to be displayed on violation",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    
  },
});

export default myRule;
```

The schema may take an array of objects defining what options can be configured. At the very least, these take in a type, but if you specify the type as object, you must also provide the properties. For example:

```typescript
schema: [
    {
        type: "object",
        properties: {
            preference: {
            type: "string",
            },
        },
        additionalProperties: false,
    }
]
```

Add the rule to `src/rules/index.ts`:

```typescript
import consistentTestFunction from "src/rules/consistent-test-function";
import noIsolatedTests from "src/rules/no-isolated-tests";
import noNamespaceImports from "src/rules/no-namespace-imports";
// ...
import myRule from "src/rules/my-rule"

export default {
  "consistent-test-function": consistentTestFunction,
  "no-isolated-tests": noIsolatedTests,
  "no-namespace-imports": noNamespaceImports,
  // ...
  "my-rule": myRule
};
```


Next, create the test suite for the rule. You have two choices for which test runner to use - you may either use the `standardRuleTester` or `ruleTesterWithParser`.

Use the `ruleTesterWithParser` if you are writing a rule that requires context about the current directory structure. You will then have to specify a filename property for every valid and invalid entry, and it must be a path that exists relative to `tests/fixtures`. Note that we are currently looking into the possibility of using something like tempy to generate a temporary directory per test to run the tests in, but this is not quite ready at the moment so this is the best for now. Feel free to create a pull request if you've come up with something, though.

For all other rules, `standardRuleTester` is the best to use.

In both cases, you must first pass the rule name, then the actual rule property, then an object containing all valid and invalid cases:

```typescript
standardRuleTester.run("my-rule", rules["my-rule"], {
    valid: [
        {
            code: "Valid code here"
        }
    ],
    invalid: [
        {
            code: "Invalid code here",
            errors: {
                messageId: "message",
                data: {
                    source: "source"
                }
            }
        }
    ]
})
```

Finally, you may create your rule by adding code to the `create(context)` method. Creating an ESLint rule is one of things that is very involved and goes beyond the scope of this README, but you can check out [the ESLint docs](https://eslint.org/docs/latest/extend/custom-rule-tutorial) for more information.

## Configs
### The Config Groups

The configs of this plugin are structured in a very particular way. We have our general configs in `src/configs/general`, our plugin configs in `src/configs/plugin`, and our combined configs in `src/configs/combined`. In all three cases, we use the [ESLint flat config style](https://eslint.org/blog/2022/08/new-config-system-part-2/) as that's the most up-to-date config style and allows for more flexibility than just using a package.json or .eslintrc.


The general configs are to be used for defining a ruleset that does NOT rely on the custom plugin rules. They must ONLY use external rules. These rules have already been broken down into `javaScriptBase`, `reactBase`, `testsBase`, and `typeScriptBase` (and also `prettierRules` because Prettier can sneak into this ESLint plugin because why not?). Try and keep the configs as separate and scoped to their main point of focus as possible. The only one that extends another is `typeScriptBase` extending `javaScriptBase` as of now. That one is fine, but otherwise, try not to extend another custom config from another unless there is good reason to. This allows the user more freedom to truly customise the rules to their usage.

The plugin configs are to be used for defining a ruleset that ONLY relies on the custom plugin rules. They must NOT use any external rules. This ensures that, for any users who just want a few recommended configs for only the plugin's rules, they can choose from the ones provided without also having to deal with a bunch of other external rules polluting it as well.

Lastly, the combined configs may use combinations of both external rules and custom rules. They will most frequently extend configs from both the general rules and plugin rules, but we may also add/disable rules specifically in these combined rules, in case there may be some overlap that none of the other configs account for. This is the most flexible group of the three, but is also the most likely one to break on new updates. As such, I would recommend against using configs from this group in production code and go with one of the other more stable ones (unless you're me and actually control the plugin entirely).

### Usage

The configs are defined on the configs property of the plugin. All general rules are prefixed with `general/`, and likewise for the plugin and combined rules. All rulesets themselves are given in `kebab-case`. With that in mind, an example usage in `eslint.config.js` may look like this:

```javascript
import plugin from "@alextheman/eslint-plugin"

export default plugin.configs["general/typescript-base"]
```

If you want to extend this, you can do so by spreading the rules into an array and adding extra configuration properties:

```javascript
import plugin from "@alextheman/eslint-plugin"

export default [
    ...plugin.configs["general/typescript-base"],
    {
        rules: {
            "no-unused-vars": "off"
        }
    }
]
```

### Adding a config

Starting with the general config because that's the easiest - you can create a config file in `src/configs/general` and define a config in the same way you would define any regular ESLint flat config. Again, please make sure you do NOT include any plugin-specific rules.

Once you have done this, export it from `src/configs/general/index.ts`, then in `src/alexPlugin.ts`, go to where `alexPlugin.configs`is defined and add the config to the object defined under the `general` property.

```typescript
alexPlugin.configs = createPluginConfigs({
  general: {
    javaScript: javaScriptBase,
    typeScript: typeScriptBase,
    react: reactBase,
    tests: testsBase,
  },
  // ...
});
```

The `createPluginConfigs` helper will map this to a more standard ESLint naming convention. That is, something like `{ general: { myRuleset } }` will be accessible on the plugin from `plugin.configs["general/my-ruleset"]`.

For plugin/combined configs, this is where it gets trickier. These rulesets tend to rely on the usage of the plugin itself, but we also need to define the plugin to be able to use it in configs. As such, the workaround for this is to provide a function that takes in the plugin and returns the config. For example:

```typescript
import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

function createPluginBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": "error",
        "@alextheman/no-relative-imports": "error",
        "@alextheman/use-normalized-imports": "error",
        "@alextheman/use-object-shorthand": "error",
      },
    },
  ];
}

export default createPluginBaseConfig;
```

This then gets exported from the relevant folder's `index.ts` file again, and then where we define our configs in `src/alexPlugin.ts`, we invoke the function passing in the plugin.

```typescript
alexPlugin.configs = createPluginConfigs({
  // ...
  plugin: {
    base: createPluginBaseConfig(alexPlugin),
    tests: createPluginTestsBaseConfig(alexPlugin),
  },
  combined: {
    javaScript: createCombinedJavaScriptBaseConfig(alexPlugin),
    typeScript: createCombinedTypeScriptBaseConfig(alexPlugin),
    react: createCombinedReactBaseConfig(alexPlugin),
    tests: createCombinedTestsBaseConfig(alexPlugin),
    typeScriptReact: createCombinedTypeScriptReactBaseConfig(alexPlugin),
    javaScriptReact: createCombinedJavaScriptReactBaseConfig(alexPlugin),
  },
});
```

Note that this also means that, in config files that provide them using this functional approach, we should NEVER import the plugin directly. This would most likely create circular imports where the plugin ends up calling itself while trying to define itself. Instead, always use the given plugin argument if you want to access the plugin. In the combined configs, if you want to refer to an existing plugin ruleset, it's best to import the function for that ruleset, then call it and pass in the plugin, like so:

```typescript
import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { typeScriptBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...typeScriptBase];
}

export default createCombinedTypeScriptBaseConfig;
```
