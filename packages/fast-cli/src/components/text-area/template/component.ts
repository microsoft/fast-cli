import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { attr } from "@microsoft/fast-element";
import { TextArea } from "@microsoft/fast-foundation";

/**
 * Text area appearances
 * @public
 */
export type TextAreaAppearance = "filled" | "outline";

/**
 * A class derived from the TextArea foundation component
 */
export class ${config.className} extends TextArea {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: TextAreaAppearance = "outline";
};`