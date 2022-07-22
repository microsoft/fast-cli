# Project templates

These templates will be used in the `init` command. Create your own and refer to them locally, or publish an `npm` package and install via the package name. The default template is the `@microsoft/cfp-template`.

## Required folder and files

```
template/
    fast.init.json
```

## `fast.init.json`

The contents of the file should contain the following properties:

### `fastConfig`

**required**

The `fastConfig` property should be a subset of the [FAST configuration](https://microsoft.github.io/fast-cli/docs/configure/).

Example:
```json
{
    "fastConfig": {
        "rootDir": "./src",
        "componentPath": "./components",
        "prefix": "fast"
    }
}
```

### `packageJson`

**required**

The `packageJson` property should contain all of the package information for the initialized property. Refer to [npm documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) for details.

### `template`

**optional**

These are additional hooks the CLI may use in relation to the template.

Example:
```json
{
    "template": {
        "afterInstallMessage": "Your project has successfully been installed!"
    }
}
```