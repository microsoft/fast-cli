export const requiredComponentTemplateFiles = {
    "component.definition.js": (name: string): string => `${name}.definition.ts`,
    "component.pw.spec.js": (name: string): string => `${name}.pw.spec.ts`,
    "component.stories.js": (name: string): string => `${name}.stories.ts`,
    "component.styles.js": (name: string): string => `${name}.styles.ts`,
    "component.template.js": (name: string): string => `${name}.template.ts`,
    "component.js": (name: string): string => `${name}.ts`,
    "define.js": (): string => `define.ts`,
    "fixture.js": (): string => `fixtures/base.html`,
    "README.js": (): string => `README.md`
} as const;

export const optionalComponentTemplateFiles: Array<string> = [
    "fast.add-component.json",
];
