import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Badge } from "@microsoft/fast-foundation";
import definition from "./${config.tagName}.definition.js";

/**
 * A function that returns a {@link @microsoft/fast-foundation#Badge} registration for configuring the component with a DesignSystem.
 * Implements {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: \`<${config.tagName}>\`
 */
export default Badge.compose(definition);`