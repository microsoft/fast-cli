import { mdTemplate } from "../../../cli.template.js";

export default mdTemplate`# ${c => c.className}

Add a description of ${c => c.tagName}, use cases, and any attributes or API configuration options.
`;
