import { expect, test } from "@playwright/test";
import { spinalCase } from "./string.js";

test.describe("string", () => {
    test("spinalCase", () => {
        expect(spinalCase("Foo")).toEqual("foo");
        expect(spinalCase("FooBar")).toEqual("foo-bar");
        expect(spinalCase("fooBar")).toEqual("foo-bar");
    });
});