# FAST CLI migrate ESLint Plugin

This package's primary use is for use in the `@microsoft/fast-cli` package `migrate` command, you may not want to use it directly. The rules are based on versioning based on the CLI configuration file.

If you'd like to leverage these rules individually as a path to migrate through the different versions available, check out our [version matrix](#version-matrix) for which rules to use.

## Setup

### First steps

#### Install the package with NPM

To add this package as a dependency with NPM, run `npm install @microsoft/eslint-plugin-fast-cli-migrate` in your project. To add this package as a development dependency, use the `--save-dev` flag.

### Usage

`.eslintrc.json`
```json
{
    "extends": [
        "plugin:@microsoft/fast-cli-migrate/<version-matrix>"
    ],
    "plugins": [
        "@microsoft/fast-cli-migrate"
    ]
}
```

## Version matrix

| Config Version | Dependencies | Rule Migration Documentation |
|-|-|-|
`1.0.0-alpha.1` | <ul><li>`@microsoft/adaptive-ui@1.0.0-alpha.4`</li><li>`@microsoft/fast-foundation@3.0.0-alpha.4`</li> | 
<ul>
<li>[class](https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--class.ts)</li>
</ul> |

## Contributing

Interested in contributing? Read our [contributing docs](https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/CONTRIBUTING.md) to get started.