import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { attr } from "@microsoft/fast-element";
import { Avatar as FoundationAvatar } from "@microsoft/fast-foundation";

/**
 * A class derived from the Avatar foundation component
 */
export class ${c => c.className} extends FoundationAvatar {
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