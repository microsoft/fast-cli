import type { Palette } from "../palette.js";
import type { Swatch } from "../swatch.js";
import { baseLayerLuminanceSwatch } from "../utilities/base-layer-luminance.js";

export function neutralLayer1(palette: Palette, baseLayerLuminance: number): Swatch {
    return palette.get(
        palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance))
    );
}
