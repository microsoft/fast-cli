import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName}>label</${config.componentPrefix}-${config.tagName}>

<h2>Checked</h2>
<${config.componentPrefix}-${config.tagName} checked></${config.componentPrefix}-${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.componentPrefix}-${config.tagName} required></${config.componentPrefix}-${config.tagName}>

<h2>Indeterminate</h2>
<${config.componentPrefix}-${config.tagName} class="flag-indeterminate">Unchecked</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} checked class="flag-indeterminate">Checked</${config.componentPrefix}-${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${config.componentPrefix}-${config.tagName} disabled></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled>label</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled checked>checked</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled checked class="flag-indeterminate">
    Indeterminate checked
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled class="flag-indeterminate">
    Indeterminate unchecked
</${config.componentPrefix}-${config.tagName}>

<h2>Inline</h2>
<${config.componentPrefix}-${config.tagName} checked>Apples</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} checked>Bananas</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName}>Honeydew</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} checked>Oranges</${config.componentPrefix}-${config.tagName}>

<h2>Vertical</h2>
<fieldset style="display: flex; flex-direction: column; align-items: start;">
    <legend>Fruit</legend>
    <${config.componentPrefix}-${config.tagName} checked>Apples</${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} checked>Bananas</${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}>Honeydew</${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} checked>Oranges</${config.componentPrefix}-${config.tagName}>
</fieldset>

<h2>Visual vs audio label</h2>
<${config.componentPrefix}-${config.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${config.componentPrefix}-${config.tagName}>
`;