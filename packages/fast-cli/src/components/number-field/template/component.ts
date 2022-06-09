import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { NumberField as FoundationNumberField } from "@microsoft/fast-foundation";
import { attr } from "@microsoft/fast-element";

/**
 * Number field appearances
 * @public
 */
export type NumberFieldAppearance = "filled" | "outline";

/**
 * A class derived from the NumberField foundation component
 */
export class ${config.className} extends FoundationNumberField {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: NumberFieldAppearance = "outline";
};` 