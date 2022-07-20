# Add a component

Adding a component from a template allows a user to leverage an `npm` package or a local template they have created themselves.

## Command line
```bash
$ fast add-component
```

## Arguments

Argument | Shorthand | Description | Required | Default | Options
---------|-----------|-------------|----------|---------|--------
`--name <name>` | `-n <name>` | The name of the component to be added | Yes | |
`--template <path/to/template>` | `-t <path/to/template>` | Template which includes all of the required component template files | No | | `<path/to/template>`

A template `npm` package or local package can be specified. Or a selection of pre-configured named templates can be used.
