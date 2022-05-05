import type { ComponentTemplateConfig } from "@microsoft/fast-cli";

export default (config: ComponentTemplateConfig): string => `
import { css, ElementStyles } from "@microsoft/fast-element";

/**
 * ${config.className} styles
 * @public
 */
export const styles: ElementStyles = css\`\`;
`;
