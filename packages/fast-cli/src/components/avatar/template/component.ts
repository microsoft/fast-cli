import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { attr } from "@microsoft/fast-element";
import { Avatar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Avatar foundation component
 */
export class ${config.className} extends Avatar {
    /**
     * Indicates the Avatar should have an image source
     *
     * @public
     * @remarks
     * HTML Attribute: src
     */
    @attr({ attribute: "src" })
    public imgSrc: string | undefined;

    /**
     * Indicates the Avatar should have alt text
     *
     * @public
     * @remarks
     * HTML Attribute: alt
     */
    @attr public alt: string | undefined;
};`