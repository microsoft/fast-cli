# Add a foundation component

Foundation components are similar to adding a component except they are based on the `@microsoft/fast-foundation` templates. These are bundled with flexible styles to provide an easy method for component creation and modification.

## Command line

```bash
$ fast add-foundation-component
```

## Arguments

### Adding a single component

| Argument | Shorthand | Description | Required | Value(s) | Default |
|-|-|-|-|-|-|
`--template <template>` | `-t <template>` | The name of the foundation element | Yes | "accordion", "avatar", "badge", "blank", "calendar", "card", "checkbox", "dialog", "disclosure", "divider", "flipper", "number-field", "progress", "progress-ring", "search", "switch", "text-area", "text-field", "toolbar", "tooltip" | |
`--name <name>` | `-n <name>` | The name of the component to be added | Yes | `string` | The name of the foundation template |


### Adding all components

| Argument | Shorthand | Description | Required |
|-|-|-|-|
`--all` | `-a` | Add all available components | No | 