import type { Palette } from "../palette.js";
import type { Swatch } from "../swatch.js";

/**
 * @internal
 */
export function neutralForeground(palette: Palette, reference: Swatch): Swatch {
    return palette.colorContrast(reference, 14);
}
