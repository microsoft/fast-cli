import type { Palette } from "../palette.js";
import type { InteractiveSwatchSet } from "../recipe.js";
import type { Swatch } from "../swatch.js";
import { directionByIsDark } from "../utilities/direction-by-is-dark.js";

/**
 * @internal
 */
export function neutralFillInput(
    palette: Palette,
    reference: Swatch,
    restDelta: number,
    hoverDelta: number,
    activeDelta: number,
    focusDelta: number
): InteractiveSwatchSet {
    const direction = directionByIsDark(reference);
    const referenceIndex = palette.closestIndexOf(reference);

    return {
        rest: palette.get(referenceIndex - direction * restDelta),
        hover: palette.get(referenceIndex - direction * hoverDelta),
        active: palette.get(referenceIndex - direction * activeDelta),
        focus: palette.get(referenceIndex - direction * focusDelta),
    };
}
