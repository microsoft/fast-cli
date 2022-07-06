import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import { ${c => c.className} } from "./${c => c.tagName}.js";
import { definition } from "./${c => c.tagName}.definition.js";

export const ${c => c.definitionName} = ${c => c.className}.compose(definition);`;