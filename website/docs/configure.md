# Configure

Running the `config` command will create a `fastconfig.json` file. This should be useful in existing projects which could take advantage of the CLI once it has been initialized.

```bash
$ fast config
```

### Arguments

Argument | Shorthand | Description | Required | Default |
---------|-----------|-------------|----------|---------|
`--component-path <path/to/components>` | `-p <path/to/components>` | The relative path of the FAST components folder | Yes | |

### Example fastconfig.json file

```json
{
    "componentPath": "./src/components"
}
```

> Important: The paths of components and design system must be relative to each other, therefore only the path to the component folder is required as the design system file path is assumed. In an app the path may be `"./src/components"` as shown above, or in the case of a component library the path may be `"./src"`.
