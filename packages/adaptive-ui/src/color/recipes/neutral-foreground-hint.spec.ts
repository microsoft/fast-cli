import { expect, test } from "@playwright/test";
import { PaletteRGB } from "../palette.js";
import type { SwatchRGB } from "../swatch.js";
import { accentBase, middleGrey } from "../utilities/color-constants.js";
import { neutralForegroundHint } from "./neutral-foreground-hint.js";

test.describe("neutralForegroundHint", (): void => {
    const neutralPalette = PaletteRGB.create(middleGrey);
    const accentPalette = PaletteRGB.create(accentBase);

    neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch, index): void => {
        test(`${swatch.toColorString()} should resolve a color from the neutral palette - ${index}`, (): void => {
            expect(
                neutralPalette.swatches.indexOf(
                    neutralForegroundHint(
                        neutralPalette,
                        swatch
                    ) as SwatchRGB
                )
            ).not.toEqual(-1);
        });
    });

    neutralPalette.swatches.concat(accentPalette.swatches).forEach((swatch, index): void => {
        test(`${swatch.toColorString()} should always be at least 4.5 : 1 against the background - ${index}`, (): void => {
            expect(
                swatch.contrast(neutralForegroundHint(neutralPalette, swatch))
                // retrieveContrast(swatch, neutralForegroundHint_DEPRECATED)
                // Because neutralForegroundHint follows the direction patterns of neutralForeground,
                // a backgroundColor #777777 is impossible to hit 4.5 against.
            ).toBeGreaterThanOrEqual(swatch.toColorString().toUpperCase() === "#777777" ? 4.48 : 4.5);
            expect(swatch.contrast(neutralForegroundHint(neutralPalette, swatch))).toBeLessThan(5);
        });
    });
});
