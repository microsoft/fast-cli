import { expect, test } from "@playwright/test";
import { stringModifier, toCamelCase, toPascalCase } from "./cli.utilities.js";

test.describe("utilities", () => {
    test.describe("toPascalCase", () => {
        test("should convert a kabob case to pascal case", () => {
            expect(toPascalCase("foo-bar")).toEqual("FooBar");
        });
    });
    test.describe("toCamelCase", () => {
        test("should convert a kabob case to camel case", () => {
            expect(toCamelCase("foo-bar")).toEqual("fooBar");
        });
    });
    test.describe("stringModifier", () => {
        test("should append a string to another string", () => {
            expect(
                stringModifier(
                    "bar",
                    {
                        append: "foo"
                    }
                )
            ).toEqual("barfoo");
        });
        test("should prepend a string to another string", () => {
            expect(
                stringModifier(
                    "bar",
                    {
                        prepend: "foo"
                    }
                )
            ).toEqual("foobar");
        });
        test("should throw an error if no changes were made to the string", () => {
            expect(
                () => {
                    stringModifier(
                        "bar",
                        {}
                    )
                }
            ).toThrow();
        });
    });
});