import { tsTemplate } from "../../../cli.js";

export default tsTemplate`import Template from "./fixtures/base.html";
import { DesignSystem } from "@microsoft/fast-foundation";
import { ${c => c.definitionName} } from "./define.js";

DesignSystem.getOrCreate().withPrefix(
    "${c => c.componentPrefix}"
).register(
    ${c => c.definitionName}()
);

export default {
    title: "${c => c.tagName}",
};
export const ${c => c.className}: () => "*.html" = () => Template;
`; 