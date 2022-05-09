# Add a design system

Before adding your own components, a design system file must be available. The design system will dictate web component configuration options.

## Command line

```bash
$ fast add-design-system
```

## Arguments

Argument | Shorthand | Description | Required | Default | Options
---------|-----------|-------------|----------|---------|--------
`--prefix <prefix>` | `-p <prefix>` | The web component prefix | No | `<project-name>` |
`--shadow-root-mode <mode>` | `-s <mode>` | Determine what the shadowroot mode is | No | "open" | "closed", "open"

## Generated files

Example design-system.ts contents:
```ts
export const designSystem = {
  prefix: "example",
  shadowRootMode: "closed"
};
```
