import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>

<${config.componentPrefix}-${config.tagName}>
    <span>label</span>
</${config.componentPrefix}-${config.tagName}>

<h2>Full Width</h2>
<${config.componentPrefix}-${config.tagName} style="width: 100%;"></${config.componentPrefix}-${config.tagName}>

<h2>Placeholder</h2>
<${config.componentPrefix}-${config.tagName} placeholder="Placeholder"></${config.componentPrefix}-${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.componentPrefix}-${config.tagName} required></${config.componentPrefix}-${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${config.componentPrefix}-${config.tagName} disabled></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled>
    <span>label</span>
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} disabled placeholder="placeholder"></${config.componentPrefix}-${config.tagName}>

<!-- Read only -->
<h2>Read only</h2>
<${config.componentPrefix}-${config.tagName} readonly value="Readonly text area"></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} readonly value="Readonly text area">label</${config.componentPrefix}-${config.tagName}>

<!-- Read only -->
<h2>Autofocus</h2>
<${config.componentPrefix}-${config.tagName} autofocus>autofocus</${config.componentPrefix}-${config.tagName}>

<!-- Resize -->
<h2>Resize</h2>
<h3>Both</h3>
<${config.componentPrefix}-${config.tagName} resize="both">resize both</${config.componentPrefix}-${config.tagName}>

<h3>Horizontal</h3>
<${config.componentPrefix}-${config.tagName} resize="horizontal">resize horizontal</${config.componentPrefix}-${config.tagName}>

<h3>Vertical</h3>
<${config.componentPrefix}-${config.tagName} resize="vertical">resize vertical</${config.componentPrefix}-${config.tagName}>

<h2>Filled</h2>
<h3>Default</h3>
<${config.componentPrefix}-${config.tagName} appearance="filled"></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} appearance="filled">
    <span>label</span>
</${config.componentPrefix}-${config.tagName}>

<h3>Placeholder</h3>
<${config.componentPrefix}-${config.tagName} appearance="filled" placeholder="Placeholder"></${config.componentPrefix}-${config.tagName}>

<!-- Required -->
<h3>Required</h3>
<${config.componentPrefix}-${config.tagName} appearance="filled" required></${config.componentPrefix}-${config.tagName}>

<!-- Rows -->
<h3>Rows</h3>
<${config.componentPrefix}-${config.tagName} rows="5"></${config.componentPrefix}-${config.tagName}>

<!-- Cols -->
<h3>Cols</h3>
<${config.componentPrefix}-${config.tagName} cols="2"></${config.componentPrefix}-${config.tagName}>

<!-- Rows & Cols -->
<h3>Rows & Cols</h3>
<${config.componentPrefix}-${config.tagName} rows="12" cols="30"></${config.componentPrefix}-${config.tagName}>

<!-- Disabled -->
<h3>Disabled</h3>
<${config.componentPrefix}-${config.tagName} appearance="filled" disabled></${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} appearance="filled" disabled>
    <span>label</span>
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} appearance="filled" disabled placeholder="placeholder"></${config.componentPrefix}-${config.tagName}>

<!-- Read only -->
<h3>Read only</h3>
<${config.componentPrefix}-${config.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${config.componentPrefix}-${config.tagName}>

<!-- With label -->
<h2>Visual vs audio label</h2>
<${config.componentPrefix}-${config.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${config.componentPrefix}-${config.tagName}>

<!-- With aria label -->
<h2>With aria-label</h2>
<${config.componentPrefix}-${config.tagName} aria-label="Text area with aria-label"></${config.componentPrefix}-${config.tagName}>`;