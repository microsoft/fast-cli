import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string => `
import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * ${config.className} styles
 * @public
 */
export const styles: ElementStyles = css\`\`;
`;
