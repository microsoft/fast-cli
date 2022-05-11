
import { expect, test } from "@playwright/test";
import { PaletteRGB } from "./palette.js";
import { SwatchRGB, isSwatchRGB } from "./swatch.js";

const rgb: SwatchRGB = {
	r: 0,
	g: 0,
	b: 0,
	relativeLuminance: 0,
	contrast: () => 1,
	toColorString: () => ""
}

test.describe("PaletteRGB.from", () => {
	test("should create a palette from the provided swatch if it matches a SwatchRGB implementation", () => {
		const palette = PaletteRGB.from(rgb);

		expect(palette.source === rgb).toBe(true);
	});

	test("should create a palette from a rgb object", () => {
		const source = {r: 1, g: 1, b: 1};
		const palette = PaletteRGB.from(source);

		expect(palette.source === source).toBe(false);
		expect(isSwatchRGB(palette.source)).toBe(true);
	});
});
