# Configure

Running the `config` command will create a `fast.config.json` file. This should be useful in existing projects which could take advantage of the CLI once it has been initialized.

## Command line

```bash
$ fast config
```

## Arguments

Argument | Shorthand | Description | Required | Default |
---------|-----------|-------------|----------|---------|
`--component-path <path/to/components>` | `-p <path/to/components>` | The relative path of the FAST components folder | Yes | |
`--root-dir <path/to/directory>` | `-r <path/to/directory` | The root directory of the code where the design system may be found. | Yes | |
`--prefix <name>` | `-n <name>` | The components prefix | Yes | |

## Generated files

Example fast.config.json file:
```json
{
    "rootDir": "./src",
    "componentPath": "./src/components",
    "prefix": "fast"
}
```
