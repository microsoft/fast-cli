import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { attr, DOM } from "@microsoft/fast-element";
import { Badge as FoundationBadge } from "@microsoft/fast-foundation";

/**
 * ${c => c.className} appearance options.
 * @public
 */
export type ${c => c.className}Appearance = "accent" | "lightweight" | "neutral" | string;

/**
 * A class derived from the Badge foundation component
 */
export class ${c => c.className} extends FoundationBadge {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: ${c => c.className}Appearance = "accent";
    private appearanceChanged(oldValue: ${c => c.className}Appearance, newValue: ${c => c.className}Appearance): void {
        DOM.queueUpdate(() => {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        });
    }
};`
