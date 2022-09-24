import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>

<${c => c.componentPrefix}-${c => c.tagName}>
    <span>label</span>
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Full Width</h2>
<${c => c.componentPrefix}-${c => c.tagName} style="width: 100%;"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Placeholder</h2>
<${c => c.componentPrefix}-${c => c.tagName} placeholder="Placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h2>Required</h2>
<${c => c.componentPrefix}-${c => c.tagName} required></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${c => c.componentPrefix}-${c => c.tagName} disabled></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled>
    <span>label</span>
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled placeholder="placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Read only -->
<h2>Read only</h2>
<${c => c.componentPrefix}-${c => c.tagName} readonly value="Readonly text area"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} readonly value="Readonly text area">label</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Read only -->
<h2>Autofocus</h2>
<${c => c.componentPrefix}-${c => c.tagName} autofocus>autofocus</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Resize -->
<h2>Resize</h2>
<h3>Both</h3>
<${c => c.componentPrefix}-${c => c.tagName} resize="both">resize both</${c => c.componentPrefix}-${c => c.tagName}>

<h3>Horizontal</h3>
<${c => c.componentPrefix}-${c => c.tagName} resize="horizontal">resize horizontal</${c => c.componentPrefix}-${c => c.tagName}>

<h3>Vertical</h3>
<${c => c.componentPrefix}-${c => c.tagName} resize="vertical">resize vertical</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Filled</h2>
<h3>Default</h3>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled">
    <span>label</span>
</${c => c.componentPrefix}-${c => c.tagName}>

<h3>Placeholder</h3>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" placeholder="Placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h3>Required</h3>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" required></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Rows -->
<h3>Rows</h3>
<${c => c.componentPrefix}-${c => c.tagName} rows="5"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Cols -->
<h3>Cols</h3>
<${c => c.componentPrefix}-${c => c.tagName} cols="2"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Rows & Cols -->
<h3>Rows & Cols</h3>
<${c => c.componentPrefix}-${c => c.tagName} rows="12" cols="30"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h3>Disabled</h3>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" disabled></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" disabled>
    <span>label</span>
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" disabled placeholder="placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Read only -->
<h3>Read only</h3>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" value="Readonly text area" readonly>
    label
</${c => c.componentPrefix}-${c => c.tagName}>

<!-- With label -->
<h2>Visual vs audio label</h2>
<${c => c.componentPrefix}-${c => c.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${c => c.componentPrefix}-${c => c.tagName}>

<!-- With aria label -->
<h2>With aria-label</h2>
<${c => c.componentPrefix}-${c => c.tagName} aria-label="Text area with aria-label"></${c => c.componentPrefix}-${c => c.tagName}>`;