import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<div style="display: flex; flex-direction: column;">
    <${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName}>
        Dark Mode
    </${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} checked>
        New Feature
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName}>
        Theme
        <span slot="checked-message">Dark</span>
        <span slot="unchecked-message">Light</span>
    </${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} readonly checked>
        Readonly
        <span slot="checked-message">Yes</span>
        <span slot="unchecked-message">No</span>
    </${c => c.componentPrefix}-${c => c.tagName}>
</div>

<h2>Checked</h2>
<${c => c.componentPrefix}-${c => c.tagName} checked></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h2>Required</h2>
<${c => c.componentPrefix}-${c => c.tagName} required></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<div style="display: flex; flex-direction: column;">
    <${c => c.componentPrefix}-${c => c.tagName} disabled></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} disabled>label</${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} disabled checked>checked</${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} disabled checked>
        checked
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${c => c.componentPrefix}-${c => c.tagName}>
</div>

<h2>Inline</h2>
<${c => c.componentPrefix}-${c => c.tagName} style="margin-right: 12px;">Light Speed</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} style="margin-right: 12px;">Ridiculous Speed</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} style="margin-right: 12px;">Ludicrous Speed</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} checked>Plaid Speed</${c => c.componentPrefix}-${c => c.tagName}>`;