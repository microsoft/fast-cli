import { expect, test } from "@playwright/test";
import { currentConfigVersion, configVersionDictionary } from "./cli.migrate.js";

const dictionaryKeys: Array<string> = Object.keys(configVersionDictionary);
const nonCurrentVersions = dictionaryKeys.filter((key) => {
    return key !== currentConfigVersion;
})

test.describe("migrate", () => {
    test("current version exists in the version dictionary", () => {
        expect(configVersionDictionary[currentConfigVersion]).not.toBeUndefined();
    });
    test("current version has null as next version", () => {
        expect(configVersionDictionary[currentConfigVersion].next).toBeNull();
    });
    test("all non-current versions have next versions", () => {
        nonCurrentVersions.forEach((version) => {
            expect(typeof configVersionDictionary[version].next).toEqual("string");
        });
    });
    test("no versions have repeating next versions", () => {
        const nextVersions: Array<string | null> = [];
        dictionaryKeys.forEach((version) => {
            expect(nextVersions).not.toContain(configVersionDictionary[version].next);
            nextVersions.push(configVersionDictionary[version].next);
        });
    });
    test("all non-current versions have next versions that exist", () => {
        nonCurrentVersions.forEach((version) => {
            expect(dictionaryKeys).toContain(configVersionDictionary[version].next);
        });
    });
});