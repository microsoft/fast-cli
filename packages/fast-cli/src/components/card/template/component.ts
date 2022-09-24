import { tsTemplate } from "../../../cli.template.js";

export default tsTemplate`import { composedParent, Card as FoundationCard } from "@microsoft/fast-foundation";
import type { Swatch } from "@microsoft/adaptive-ui/dist/dts/color/swatch.d.js"
import {
    fillColor,
    // neutralFillLayerRecipe,
    SwatchRGB
} from "@microsoft/adaptive-ui";
import { attr, Notifier, Observable } from "@microsoft/fast-element";
import { parseColorHexRGB } from '@microsoft/fast-colors';

/**
 * A class derived from the Card foundation component
 */
export class ${c => c.className} extends FoundationCard {
    @attr({
        attribute: 'card-fill-color',
        mode: 'fromView',
    })
    public cardFillColor: string;
    private cardFillColorChanged(prev: string | void, next: string | void): void {
        if (next) {
            const parsedColor = parseColorHexRGB(next);
        
            if (parsedColor !== null) {
                this.neutralPaletteSource = next;
                fillColor.setValueFor(this, SwatchRGB.from(parsedColor));
            }
        }
    }
    
    /**
     * Neutral palette source color for the card component. Sets context for the design system.
     *
     * This allows for tinting the card while maintaining the light or dark context. For a fixed color use card-fill-color instead.
     * @public
     * @remarks
     * HTML Attribute: neutral-palette-source
     */
    @attr({
        attribute: 'neutral-palette-source',
        mode: 'fromView',
    })
    public neutralPaletteSource: string;
    private neutralPaletteSourceChanged(prev: string | void, next: string | void): void {
        if (next) {
            const color = parseColorHexRGB(next)!;
            const swatch = SwatchRGB.from(color);
        //   neutralPalette.setValueFor(this, PaletteRGB.create(swatch));
        }
    }
    
      /**
       * @internal
       */
      public handleChange(source: any, propertyName: string): void {
        if (!this.cardFillColor) {
        //   fillColor.setValueFor(
        //     this,
        //     (target: HTMLElement): Swatch =>
        //       neutralFillLayerRecipe.getValueFor(target).evaluate(target, fillColor.getValueFor(source)).rest,
        //   );
        }
      }
    
      connectedCallback(): void {
        super.connectedCallback();
    
        const parent = composedParent(this);
    
        if (parent) {
            const parentNotifier: Notifier = Observable.getNotifier(parent);
            parentNotifier.subscribe(this, 'fillColor');
            parentNotifier.subscribe(this, 'neutralPalette');
            this.handleChange(parent, 'fillColor');
        }
    }
};` 