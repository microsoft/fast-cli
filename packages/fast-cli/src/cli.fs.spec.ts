import { expect, test } from "@playwright/test";
import path from "path";
import fs from "fs-extra";
import {
    getTempDir,
} from "./test/helpers.js";
import {
    readFile,
    writeFiles
} from "./cli.fs.js";

const uuid: string = "cli-fs";
const tempDir: string = getTempDir(uuid);

test.describe("fs", () => {
    test.beforeAll(() => {
        fs.ensureDirSync(tempDir);
    });
    test.afterAll(() => {
        fs.removeSync(tempDir)
    });
    test.describe("writeFiles", () => {
        test("should write multiple files", () => {
            const name1 = "foo1.txt";
            const directory1 = path.resolve(tempDir, "baz1");
            const contents1 = "bar1";
            const name2 = "foo2.txt";
            const directory2 = path.resolve(tempDir, "baz2");
            const contents2 = "bar2";
    
            writeFiles([
                {
                    name: name1,
                    directory: directory1,
                    contents: contents1
                },
                {
                    name: name2,
                    directory: directory2,
                    contents: contents2
                }
            ]);
    
            const file1 = fs.readFileSync(path.resolve(directory1, name1), { encoding: "utf8" });
            const file2 = fs.readFileSync(path.resolve(directory2, name2), { encoding: "utf8" });
    
            expect(file1).toEqual(contents1);
            expect(file2).toEqual(contents2);
        });
    });
    
    test.describe("readFile", () => {
        test.beforeAll(() => {
            fs.writeFileSync(path.resolve(tempDir, "read.txt"), "Hello world");
            fs.writeFileSync(path.resolve(tempDir, "read.json"), `{}`);
        });
        test("should read a JSON file", () => {
            const file = readFile(path.resolve(tempDir, "read.json"), true);
            expect(file).toEqual({});
        });
        test("should read a non-JSON file", () => {
            const file = readFile(path.resolve(tempDir, "read.txt"), false);
            expect(file).toEqual("Hello world");
        });
    });    
});
