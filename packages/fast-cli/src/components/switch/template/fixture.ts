import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<div style="display: flex; flex-direction: column;">
    <${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}>
        Dark Mode
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} checked>
        New Feature
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}>
        Theme
        <span slot="checked-message">Dark</span>
        <span slot="unchecked-message">Light</span>
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} readonly checked>
        Readonly
        <span slot="checked-message">Yes</span>
        <span slot="unchecked-message">No</span>
    </${config.componentPrefix}-${config.tagName}>
</div>

<h2>Checked</h2>
<${config.componentPrefix}-${config.tagName} checked></${config.componentPrefix}-${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.componentPrefix}-${config.tagName} required></${config.componentPrefix}-${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<div style="display: flex; flex-direction: column;">
    <${config.componentPrefix}-${config.tagName} disabled></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} disabled>label</${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} disabled checked>checked</${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} disabled checked>
        checked
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${config.componentPrefix}-${config.tagName}>
</div>

<h2>Inline</h2>
<${config.componentPrefix}-${config.tagName} style="margin-right: 12px;">Light Speed</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} style="margin-right: 12px;">Ridiculous Speed</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} style="margin-right: 12px;">Ludicrous Speed</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} checked>Plaid Speed</${config.componentPrefix}-${config.tagName}>`;