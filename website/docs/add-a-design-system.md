# Add a design system

Before a user can add components, they must add a design system. The design system **must** appear at the root of the component folder. The design system will dictate web component configuration options.

```bash
$ fast add-design-system
```

Argument | Shorthand | Description | Required | Default | Options
---------|-----------|-------------|----------|---------|--------
`--prefix <prefix>` | `-p <prefix>` | The web component prefix | No | `<project-name>` |
`--shadow-root-mode <mode>` | `-s <mode>` | Determine what the shadowroot mode is | No | "open" | "closed", "open"

Example design-system.ts contents:
```ts
export const designSystem = {
  prefix: "example",
  shadowRootMode: "closed"
};
```

> Important: A fastconfig.json must exist with the `componentPath` property set. If it does not, the user should be prompted to run the `fast config` command.