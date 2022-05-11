
import { expect, test } from "@playwright/test";
import { SwatchRGB, isSwatchRGB } from "./swatch.js";

const rgb: SwatchRGB = {
	r: 0,
	g: 0,
	b: 0,
	relativeLuminance: 0,
	contrast: () => 1,
	toColorString: () => ""
}

test.describe("isSwatchRGB", () => {
	test("should return true when called with the product of SwatchRGB.create()", () => {
		expect(isSwatchRGB(SwatchRGB.create(1, 1, 1))).toBe(true);
	});

	test("should return true when called with an object conforming to the interface", () => {
		expect(isSwatchRGB(rgb)).toBe(true);
	})

	for (const key in rgb ) {
		test(`should return false when called with an object missing the ${key} property`, () => {
			const _test = {...rgb};
			delete _test[key];

			expect(isSwatchRGB(_test)).toBe(false);
		});

		test(`should return false when called with an object with the ${key} property assigned to a mismatching type`, () => {
			const _test = {...rgb};
			_test[key] = "foobar";

			expect(isSwatchRGB(_test)).toBe(false);
		})
	}
});
