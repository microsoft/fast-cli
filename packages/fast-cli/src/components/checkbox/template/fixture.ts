import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.tagName}></${config.tagName}>
<${config.tagName}>label</${config.tagName}>

<h2>Checked</h2>
<${config.tagName} checked></${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.tagName} required></${config.tagName}>

<h2>Indeterminate</h2>
<${config.tagName} class="flag-indeterminate">Unchecked</${config.tagName}>
<${config.tagName} checked class="flag-indeterminate">Checked</${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${config.tagName} disabled></${config.tagName}>
<${config.tagName} disabled>label</${config.tagName}>
<${config.tagName} disabled checked>checked</${config.tagName}>
<${config.tagName} disabled checked class="flag-indeterminate">
    Indeterminate checked
</${config.tagName}>
<${config.tagName} disabled class="flag-indeterminate">
    Indeterminate unchecked
</${config.tagName}>

<h2>Inline</h2>
<${config.tagName} checked>Apples</${config.tagName}>
<${config.tagName} checked>Bananas</${config.tagName}>
<${config.tagName}>Honeydew</${config.tagName}>
<${config.tagName} checked>Oranges</${config.tagName}>

<h2>Vertical</h2>
<fieldset style="display: flex; flex-direction: column; align-items: start;">
    <legend>Fruit</legend>
    <${config.tagName} checked>Apples</${config.tagName}>
    <${config.tagName} checked>Bananas</${config.tagName}>
    <${config.tagName}>Honeydew</${config.tagName}>
    <${config.tagName} checked>Oranges</${config.tagName}>
</fieldset>

<h2>Visual vs audio label</h2>
<${config.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${config.tagName}>
`;