import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { Search as FoundationSearch } from "@microsoft/fast-foundation";
import { attr } from "@microsoft/fast-element";

/**
 * Search appearances
 * @public
 */
export type SearchAppearance = "filled" | "outline";

/**
 * A class derived from the Search foundation component
 */
export class ${c => c.className} extends FoundationSearch {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: SearchAppearance = "outline";
};`