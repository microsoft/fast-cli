import { expect, test } from "@playwright/test";
import fs from "fs-extra";
import { getPackageName, stringModifier, toCamelCase, toPascalCase } from "./cli.utilities.js";
import { getTempDir } from "./test/helpers.js";

const uuid: string = "cli-utilities";
const tempDir: string = getTempDir(uuid);

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
    test.describe("getPackageName", () => {
        test("should return a name for the package if a name has been provided", () => {
            expect(
                getPackageName(
                    {
                        name: "foo"
                    } as any,
                    null
                )
            ).toEqual("foo");
        });
        test("should return a name for the package using the folder name if a name has not been provided", () => {
            expect(
                getPackageName(
                    {} as any,
                    [
                        "bar"
                    ]
                )
            ).toEqual("bar");
        });
    });
});