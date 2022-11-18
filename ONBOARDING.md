# FAST CLI Project

The FAST CLI Project is a mono-repository that contains both private and public packages which make up the CLI.

## Packages

This is an overview of the packages and their relationship with each other.

### `@microsoft/cfp-template`

This package contains the default app template and any other templates we decide to provide to the user for their project. They are intended to be the most common use cases for FAST projects. They take a dependency on the `@microsoft/cfp-template-files` and through a script generate an export that can be imported by the CLI. This is done prior to publishing this package.

### `@microsoft/cfp-template-files`

This package is the executable template files, it is intended to be private and provides an easily testable project ready-made for consumption and export by `@microsoft/cfp-template`.

### `@microsoft/eslint-plugin-fast-cli-migrate`

This package is an experimental package that uses the ESLint `fix` command to update files. It makes some assumptions about the file naming patterns as well as structure while doing so, this assists in both maintaining FAST CLI configured projects as well as helping to document the changes necessary when moving up versions for `@microsoft/fast-element` and `@microsoft/fast-foundation`. Instead of modifying template files directly, the CLIs `migrate` command should be used with updated ESLint rules for each version upgrade.

### `@microsoft/fast-cli`

This package contains the bulk of the CLI logic and leverages various libraries to allow for both user prompts and command line arguments when executing commands.

### `@microsoft/create-fast-project`

This package is used for quickly creating a default FAST application, where a user may point to it with `npm init` or `npx`. For more information refer to the [user docs](https://microsoft.github.io/fast-cli/docs/initialize/).

## How does a Node CLI work?

There are two requirements for creating a Node CLI, the first is to identify in your CLI package the `bin` property of the `package.json` file which will enable you to name your CLI and point to its executable.

In the `@microsoft/fast-cli` it will look something like this:

package.json
```json
{
    "bin": {
        "fast": "./dist/esm/cli.js"
    }
}
```

You will then be able to execute in the command line with `fast`.

The other requirement is that the file that is being pointed to is marked at the top so that node knows it is an executable in the node environment.

In the `@microsoft/fast-cli` you will see the `cli.ts` file includes at the top the following line:

```ts
#!/usr/bin/env node
```
