# Contributing

## Rules

Rules are the foundation of the ESLint plugin ecosystem, they contain the logic that will be applied when the plugin is used.

### Creating a new rule

When creating a new rule, the following files should be added:

```
src/
└─ rules
   └─ <my-rule-name>.ts
   └─ <my-rule-name>.md
tests/
└─ files
   └─ <my-rule-name>.invalid.ts
   └─ <my-rule-name>.valid.ts
```

The `invalid` and `valid` test files should contain content that should be considered valid or invalid.

To determine the logic necessary for a rule, use the https://astexplorer.net/, the sample code will be in the top left that will be linted, the plugin code you are creating will be in the bottom left, in the top right you will see what information is available to you for calling various methods, and in the bottom right you will see the error/warning etc., messages appear around your code.

**Other changes**
- Ensure the rule is added in the `src/index.ts`
- Ensure the rule has a `src/rules/<version-matrix>-<rule-name>.md` file and this file is a URL in the rules `meta` object
- Ensure the rule has been added to the tested rule list in `src/tests/rules/rules.spec.ts`
- Ensure the rule is added to its dependency matrix documentation in `./README.md`
- Ensure the rule is added to its dependency matrix in `./src/configs/<version-matrix>.ts`
