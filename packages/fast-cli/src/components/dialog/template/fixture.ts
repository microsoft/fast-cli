import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<button id="button1">
Show ${c => c.className}
</button>
<p>tab queue detected automatically</p>

<${c => c.componentPrefix}-${c => c.tagName}
    id="dialog1"
    aria-label="Simple dialog"
    modal="true"
    trap-focus="true"
    hidden="true"
>
<h2>Dialog queue detected automatically</h2>
<button>Button</button>
<p>(esc to close)</p>
</${c => c.componentPrefix}-${c => c.tagName}>
`;