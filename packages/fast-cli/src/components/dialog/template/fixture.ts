import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<button id="button1">
Show ${config.className}
</button>
<p>tab queue detected automatically</p>

<${config.tagName}
    id="dialog1"
    aria-label="Simple dialog"
    modal="true"
    trap-focus="true"
    hidden="true"
>
<h2>Dialog queue detected automatically</h2>
<button>Button</button>
<p>(esc to close)</p>
</${config.tagName}>
`;