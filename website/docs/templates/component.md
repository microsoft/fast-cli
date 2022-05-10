# Component templates

These templates will be used in the `add-component` command. Create your own and refer to them locally, or publish an `npm` package and install via the package name.

## Required folder and files

template/
└─ fixture.ts
└─ component.ts
└─ component.template.ts
└─ component.styles.ts
└─ component.definition.ts
└─ component.pw.spec.ts
└─ component.stories.ts
└─ define.ts
└─ fast.add-component.json
└─ README.ts

## File contents

Each file should contain a default export, using the `ComponentTemplateConfig` as an argument.

```ts
import type { ComponentTemplateConfig } from "@microsoft/fast-cli";

export default (config: ComponentTemplateConfig): string => `...your template`;
```

<!-- TODO: add api-extractor information for the ComopnentTemplateConfig -->