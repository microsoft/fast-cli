import { mdTemplate } from "../../../cli.template.js";

export default mdTemplate`# ${c => c.className}

The ${c => c.tagName} component is used in conjunction with ${c => c.tagName}.

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/accordion`;
