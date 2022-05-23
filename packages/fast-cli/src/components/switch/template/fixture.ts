import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<div style="display: flex; flex-direction: column;">
    <${config.tagName}></${config.tagName}>
    <${config.tagName}>
        Dark Mode
    </${config.tagName}>
    <${config.tagName} checked>
        New Feature
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${config.tagName}>
    <${config.tagName}>
        Theme
        <span slot="checked-message">Dark</span>
        <span slot="unchecked-message">Light</span>
    </${config.tagName}>
    <${config.tagName} readonly checked>
        Readonly
        <span slot="checked-message">Yes</span>
        <span slot="unchecked-message">No</span>
    </${config.tagName}>
</div>

<h2>Checked</h2>
<${config.tagName} checked></${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.tagName} required></${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<div style="display: flex; flex-direction: column;">
    <${config.tagName} disabled></${config.tagName}>
    <${config.tagName} disabled>label</${config.tagName}>
    <${config.tagName} disabled checked>checked</${config.tagName}>
    <${config.tagName} disabled checked>
        checked
        <span slot="checked-message">On</span>
        <span slot="unchecked-message">Off</span>
    </${config.tagName}>
</div>

<h2>Inline</h2>
<${config.tagName} style="margin-right: 12px;">Light Speed</${config.tagName}>
<${config.tagName} style="margin-right: 12px;">Ridiculous Speed</${config.tagName}>
<${config.tagName} style="margin-right: 12px;">Ludicrous Speed</${config.tagName}>
<${config.tagName} checked>Plaid Speed</${config.tagName}>`;