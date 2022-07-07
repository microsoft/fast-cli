import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}>label</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Checked</h2>
<${c => c.componentPrefix}-${c => c.tagName} checked></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h2>Required</h2>
<${c => c.componentPrefix}-${c => c.tagName} required></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Indeterminate</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="flag-indeterminate">Unchecked</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} checked class="flag-indeterminate">Checked</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${c => c.componentPrefix}-${c => c.tagName} disabled></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled>label</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled checked>checked</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled checked class="flag-indeterminate">
    Indeterminate checked
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled class="flag-indeterminate">
    Indeterminate unchecked
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Inline</h2>
<${c => c.componentPrefix}-${c => c.tagName} checked>Apples</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} checked>Bananas</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}>Honeydew</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} checked>Oranges</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Vertical</h2>
<fieldset style="display: flex; flex-direction: column; align-items: start;">
    <legend>Fruit</legend>
    <${c => c.componentPrefix}-${c => c.tagName} checked>Apples</${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} checked>Bananas</${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName}>Honeydew</${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} checked>Oranges</${c => c.componentPrefix}-${c => c.tagName}>
</fieldset>

<h2>Visual vs audio label</h2>
<${c => c.componentPrefix}-${c => c.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${c => c.componentPrefix}-${c => c.tagName}>
`;