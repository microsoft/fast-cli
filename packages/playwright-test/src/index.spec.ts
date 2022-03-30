import { expect, test } from "@playwright/test";
import { foo } from "./";

test.describe("1", () => {
    const total = 10000;
    for (let i = 0; i < total; i++) {
        test(`1.${i}`, () => {
            expect(foo(1, i)).toEqual(1 + i);
        });
    }
});