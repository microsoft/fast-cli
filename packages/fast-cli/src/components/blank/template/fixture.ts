import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>`;