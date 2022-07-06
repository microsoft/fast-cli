import { mdTemplate } from "../../../cli.js";

export default mdTemplate`# ${c => c.className}

${c => c.tagName} is a web component implementation of an [Accordion](https://w3c.github.io/aria-practices/#accordion).

For more information on the building blocks used to create this component, please refer to https://www.fast.design/docs/components/accordion`;
