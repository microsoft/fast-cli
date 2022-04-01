import { expect } from '@esm-bundle/chai';
import { foo } from "./";

describe("1", () => {
    const total = 10000;
    for (let i = 0; i < total; i++) {
        it(`1.${i}`, () => {
            expect(foo(1, i)).to.equal(1 + i);
        });
    }
}); 