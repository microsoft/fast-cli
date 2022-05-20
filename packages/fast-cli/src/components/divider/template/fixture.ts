import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.tagName}></${config.tagName}>

<h2>Presentation</h2>
<${config.tagName} role="presentation"></${config.tagName}>

<h2>Vertical</h2>
<${config.tagName} orientation="vertical"></${config.tagName}>`;