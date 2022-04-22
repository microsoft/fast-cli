# FAST CLI Specification

This is a draft specification and subject to change prior to 1.x release.

## Abstract

The FAST CLI is intended to be used as a creation and maintenance tool for [FAST](https://www.fast.design) based projects. These projects should rely on a `fastconfig.json` file that stores information about the project to facilitate use of the CLI which can be generated from the [config](#configuration) command.

## Workflows

The following workflows should be considered:

- Creation of FAST based sites and applications
    - Default template - see the `@microsoft/cfp-template` package 
    - Custom templates, either published or local
- Creation of FAST based web components
    - Blank templates
    - Based on `@microsoft/fast-foundation` using default styles
    - Selection of custom templates and styles

## Considerations

There are some issues with scaffolding projects outlined below:
- The folder structure of the project must remain the same with relation to the component folder and the `design-system.ts` file. This is due to the relative nature of the imports in scaffolded files
- At this stage, all templates must use TypeScript

## Requirements

- Allow both command line arguments and user prompt to be available, there should always be a command line argument for any user prompt which will circumvent prompts
- Allow project (website/app/component library) creation based on templates
- Allow component creation based on templates
    - Ensure [DSaC (Design System as Code)](#future-considerations) can be implemented in future iterations

## Top level commands

- [fast](#cli-information)
- [fast init](#initializing)
- [fast config](#configuration)
- [fast add-design-system](#add-a-design-system)
- [fast add-component](#add-a-component)

## CLI information

The `fast -h` command should show a list of commands and their arguments on the screen.

The `fast -v` command should show the current version of the CLI.

## Initializing

This initialization creates a new project from scratch which could ultimately be a website, web application, or package containing components. It is assumed to be a project in which FAST based web components are used. The `package.json` will be based on a `fastinit.json` file in the template, with the name of the project replaced with the folder name the project is initialized in (if possible). 

```bash
$ fast init
```

### Arguments

Argument | Shorthand | Description | Required | Default
---------|-----------|-------------|----------|--------
`--template <path/to/template>` | `-t <path/to/template>` | Use a local template or npm package | No | `@microsoft/cfp-template`

## Configuration

The creation of a configuration is similar to `npm init` in that it will create a `fastconfig.json` file. This should be useful in existing projects which could take advantage of the CLI once it has been initialized.

```bash
$ fast config
```

### Arguments

Argument | Shorthand | Description | Required | Default |
---------|-----------|-------------|----------|---------|
`--component-path` | `-p` | The relative path of the FAST components folder | Yes | |

### Example fastconfig.json file

```json
{
    "componentPath": "./src/components"
}
```

> Important: The paths of components and design system must be relative to each other, therefore only the path to the component folder is required as the design system file path is assumed. In an app the path may be `"./src/components"` as shown above, or in the case of a component library the path may be `"./src"`.

## Add a design system

Before a user can add components, they must add a design system. The design system **must** appear at the root of the component folder.

```bash
$ fast add-design-system
```

Argument | Shorthand | Description | Required | Default | Options
---------|-----------|-------------|----------|---------|--------
`--prefix <prefix>` | `-p <prefix>` | The web component prefix | No | `<project-name>` |
`--shadow-root-mode <mode>` | `-s <mode>` | Determine what the shadowroot mode is | No | "open" | "closed", "open"

If the component path is not available, create it. If the design system is not available in the path specified, create the file with the contents, assuming "example" is the name property of the `package.json`:

```ts
export const designSystem = {
  prefix: "example",
  shadowRootMode: "closed"
};
```

> Important: A fastconfig.json must exist with the "componentPath" property set. If it does not, the user should be prompted to run the `fast config` command.

## Add a component

Components are added and configured based on a design system.

```bash
$ fast add-component
```

### Arguments

Argument | Shorthand | Description | Required | Default
---------|-----------|-------------|----------|--------
`--name <name>` | `-n <name>` | The name of the functionality to be added | Yes | |
`--template <path/to/template>` | `-t <path/to/template>` | Template including HTML, CSS, and [other files](#component-templates) | No |
`--foundation <foundation-component>` | `-f <foundation-component>` | Foundation template | No | 

Should no template or foundation component be selected, a blank component will be created.

TBD list available foundation components.

> Important: The user should be prompted if no design system is present when attempting to add a new component to run the command `fast add-design-system`.

> Important: During implementation the `define.ts` which will be part of a components template may require a `package.json` update to include a list of `sideEffects`.

## Templates

Template provide scaffolding for entire projects and smaller pieces of code to accelerate developer workflows.

### Project templates

Project templates can be for web sites, web apps, and/or component packages. They should include the following structure:

```text
cfp-example-template/
└─ package.json
└─ fastconfig.json
└─ template/
   └─ fastinit.json
   └─ // files
```

### Component templates

Component templates are intended to be used for FAST based web components. They should include the following structure:

```text
example-component-template/
└─ example-component.ts
└─ example-component.template.ts
└─ example-component.style.ts
└─ example-component.definition.ts
└─ example-component.spec.ts
└─ define.ts
```

## Example scenarios

### Creating a project from a custom template

```bash
$ fast init ../my-custom-template
```

### Creating a project with a foundation button component

```bash
$ fast config -p ./src/components
$ fast add-design-system -p foo
$ fast add-component -n button -f button
```

The following folders and files should be added to the project using the above commands:

```text
fastconfig.json
src/
└─ components/
   └─ design-system.ts
   └─ button/
      └─ foo-button.ts
      └─ foo-button.template.ts
      └─ foo-button.style.ts
      └─ foo-button.definition.ts
      └─ foo-button.spec.ts
      └─ define.ts
```

## Test plan

Due to arguments either being supplied via command line or as a dialog tree, the tests will use Playwright and `@playwright/test` assertions to execute commands using command line arguments and check the results.

## Future considerations

- Adding a linting service to ensure web component best practices
- Add optional arguments for DSaC (Design System as Code) during component creation
- Allow configuration within templates that will create additional prompts or command line arguments, an example might be implementing a foundation template that can have a slot "start", you are prompted to allow certain slots
