import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Presentation</h2>
<${c => c.componentPrefix}-${c => c.tagName} role="presentation"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Vertical</h2>
<${c => c.componentPrefix}-${c => c.tagName} orientation="vertical"></${c => c.componentPrefix}-${c => c.tagName}>`;