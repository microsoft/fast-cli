import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.tagName}></${config.tagName}>

<${config.tagName}>
    <span>label</span>
</${config.tagName}>

<h2>Full Width</h2>
<${config.tagName} style="width: 100%;"></${config.tagName}>

<h2>Placeholder</h2>
<${config.tagName} placeholder="Placeholder"></${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.tagName} required></${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${config.tagName} disabled></${config.tagName}>
<${config.tagName} disabled>
    <span>label</span>
</${config.tagName}>
<${config.tagName} disabled placeholder="placeholder"></${config.tagName}>

<!-- Read only -->
<h2>Read only</h2>
<${config.tagName} readonly value="Readonly text area"></${config.tagName}>
<${config.tagName} readonly value="Readonly text area">label</${config.tagName}>

<!-- Read only -->
<h2>Autofocus</h2>
<${config.tagName} autofocus>autofocus</${config.tagName}>

<!-- Resize -->
<h2>Resize</h2>
<h3>Both</h3>
<${config.tagName} resize="both">resize both</${config.tagName}>

<h3>Horizontal</h3>
<${config.tagName} resize="horizontal">resize horizontal</${config.tagName}>

<h3>Vertical</h3>
<${config.tagName} resize="vertical">resize vertical</${config.tagName}>

<h2>Filled</h2>
<h3>Default</h3>
<${config.tagName} appearance="filled"></${config.tagName}>
<${config.tagName} appearance="filled">
    <span>label</span>
</${config.tagName}>

<h3>Placeholder</h3>
<${config.tagName} appearance="filled" placeholder="Placeholder"></${config.tagName}>

<!-- Required -->
<h3>Required</h3>
<${config.tagName} appearance="filled" required></${config.tagName}>

<!-- Rows -->
<h3>Rows</h3>
<${config.tagName} rows="5"></${config.tagName}>

<!-- Cols -->
<h3>Cols</h3>
<${config.tagName} cols="2"></${config.tagName}>

<!-- Rows & Cols -->
<h3>Rows & Cols</h3>
<${config.tagName} rows="12" cols="30"></${config.tagName}>

<!-- Disabled -->
<h3>Disabled</h3>
<${config.tagName} appearance="filled" disabled></${config.tagName}>
<${config.tagName} appearance="filled" disabled>
    <span>label</span>
</${config.tagName}>
<${config.tagName} appearance="filled" disabled placeholder="placeholder"></${config.tagName}>

<!-- Read only -->
<h3>Read only</h3>
<${config.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${config.tagName}>
<${config.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${config.tagName}>

<!-- With label -->
<h2>Visual vs audio label</h2>
<${config.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${config.tagName}>

<!-- With aria label -->
<h2>With aria-label</h2>
<${config.tagName} aria-label="Text area with aria-label"></${config.tagName}>`;