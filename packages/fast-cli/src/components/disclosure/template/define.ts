import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { ${config.className} } from "./${config.tagName}.js";
import { definition } from "./${config.tagName}.definition.js";

${config.className}.compose(definition);`;