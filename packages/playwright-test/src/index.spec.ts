
import { test } from "@playwright/test";
import { expect } from "chai";
import { foo } from "./";

test.describe("PW test", () => {
    const total = 10000;
    for (let i = 0; i < total; i++) {
        test(`1.${i}`, () => {
            expect(foo(1, i)).to.equal(1 + i);
        });
    }
});
