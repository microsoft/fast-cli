# Initialize

Creating a new FAST project can be done easily, either using the `@microsoft/fast-cli` or by leveraging our initalizer.

## Creating a project using the initializer

### npx

`npx @microsoft/create-fast-project`

### npm

`npm init @microsoft/fast-project`

## Creating a project using the CLI

Install the `@microsoft/fast-cli` locally or globally.

```bash
$ fast init
```

## Using a non-default template

In order to use a template other than the default, ensure you include both the template package name or local location if installing locally, as well as the file path to the export script (relative to the template location).

```bash
$ fast init -t ../my-local-template -f dist/index.js
```

## Arguments

Argument | Shorthand | Description | Required | Default
---------|-----------|-------------|----------|--------
`--template <path/to/template-package>` | `-t <path/to/template-package>` | Use template package | No | "@microsoft/cfp-template"
`--filePath <path/to/file>` | `-f <path/to/file>` | Path to the file | No | "dist/esm/index.js"
`--exportName <export-name>` | `-n <export-name>` | Name of the export | No | "default"
