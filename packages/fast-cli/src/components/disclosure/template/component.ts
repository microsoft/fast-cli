import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`import { Disclosure } from "@microsoft/fast-foundation";
import { attr } from "@microsoft/fast-element";

/**
 * Types of disclosure appearance.
 * @public
 */
export type DisclosureAppearance = "accent" | "lightweight";

/**
 * A class derived from the Disclosure foundation component
 */
export class ${config.className} extends Disclosure {
    /**
     * Disclosure default height
     */
    private height: number = 0;
    /**
     * Disclosure height after it's expanded
     */
    private totalHeight: number = 0;

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.appearance) {
            this.appearance = "accent";
        }
    }

    /**
     * The appearance the anchor should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance?: DisclosureAppearance;
    public appearanceChanged(
        oldValue: DisclosureAppearance,
        newValue: DisclosureAppearance
    ): void {
        if (oldValue !== newValue) {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        }
    }

    /**
     * Set disclosure height while transitioning
     * @override
     */
    protected onToggle() {
        super.onToggle();
        this.details.style.setProperty("height", \`\${this.disclosureHeight}px\`);
    }

    /**
     * Calculate disclosure height before and after expanded
     * @override
     */
    protected setup() {
        super.setup();

        const getCurrentHeight = () => this.details.getBoundingClientRect().height;
        this.show();
        this.totalHeight = getCurrentHeight();
        this.hide();
        this.height = getCurrentHeight();

        if (this.expanded) {
            this.show();
        }
    }

    get disclosureHeight(): number {
        return this.expanded ? this.totalHeight : this.height;
    }
};`