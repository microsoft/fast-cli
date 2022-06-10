# Add a foundation comopnent

Foundation components are similar to adding a component except they are based on the `@microsoft/fast-foundation` templates. These are bundled with flexible styles to provide an easy method for component creation and modification.

## Command line

```bash
$ fast add-foundation-component
```

## Arguments

Argument | Shorthand | Description | Required | Default
---------|-----------|-------------|----------|--------
`--template <template>` | `-t <template>` | The name of the foundation element | Yes | "accordion", "anchor", "anchored-region", "avatar", "badge", "blank", "breadcrumb", "button", "calendar", "card", "checkbox", "combobox", "data-grid", "dialog", "disclosure", "divider", "flipper", "horizontal-scroll", "listbox", "menu", "number-field", "picker", "progress", "progress-ring", "radio-group", "search", "select", "skeleton", "slider", "switch", "tabs", "text-area", "text-field", "toolbar", "tooltip", "tree-view" |
`--name <name>` | `-n <name>` | The name of the component to be added | Yes | The name of the foundation template |
`--all` | `-a` | Add all available components | No | 