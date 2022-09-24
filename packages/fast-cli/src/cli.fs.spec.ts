import { expect, test } from "@playwright/test";
import path from "path";
import fs from "fs-extra";
import {
    getTempDir,
} from "./test/helpers.js";
import {
    readAll,
    readFile,
    writeFiles,
    writeTemplateExportFile
} from "./cli.fs.js";
import { execSync } from "child_process";

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
        test.afterAll(() => {
            fs.removeSync(path.resolve(tempDir, "baz1", "foo1.txt"));
            fs.removeSync(path.resolve(tempDir, "baz2", "foo2.txt"));
        });
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
        test.afterAll(() => {
            fs.removeSync(path.resolve(tempDir, "read.txt"));
            fs.removeSync(path.resolve(tempDir, "read.json"));
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

    test.describe("readAll", () => {
        test.beforeAll(() => {
            fs.writeFileSync(path.resolve(tempDir, "read.txt"), "Hello world");
            fs.emptydirSync(path.resolve(tempDir, "foo"));
            fs.writeFileSync(path.resolve(tempDir, "foo", "read.json"), `{}`);
        });
        test.afterAll(() => {
            fs.removeSync(path.resolve(tempDir, "read.txt"));
            fs.removeSync(path.resolve(tempDir, "foo", "read.json"));
            fs.removeSync(path.resolve(tempDir, "foo"));
        });
        test("should get all file paths", () => {
            expect(JSON.stringify(readAll(tempDir))).toEqual(JSON.stringify(["foo/read.json", "read.txt"]));
        });
    });

    test.describe("writeTemplateExportFile", () => {
        test.beforeAll(() => {
            fs.writeFileSync(path.resolve(tempDir, "read.txt"), "Hello world");
            fs.emptydirSync(path.resolve(tempDir, "foo"));
            fs.writeFileSync(path.resolve(tempDir, "foo", "read.json"), `{}`);
        });
        test.afterAll(() => {
            fs.removeSync(path.resolve(tempDir, "read.txt"));
            fs.removeSync(path.resolve(tempDir, "foo", "read.json"));
            fs.removeSync(path.resolve(tempDir, "foo"));
        });
        test("should write an export file", async () => {
            writeTemplateExportFile({
                templateDirectory: path.resolve(tempDir),
                writeFilePath: path.resolve(tempDir, "export1.ts")
            });

            execSync(`tsc ${path.resolve(tempDir, "export1.ts")}`);
            const exportTemplate = await import(path.resolve(tempDir, "export1.js"));

            expect(Array.isArray(exportTemplate.default.default)).toBeTruthy();
        });
        test("should write an export file and ignore excluded paths", async () => {
            writeTemplateExportFile({
                templateDirectory: path.resolve(tempDir),
                writeFilePath: path.resolve(tempDir, "export2.ts"),
                excludedPaths: [
                    "**/foo/*.*",
                    "**/export1.*"
                ]
            });

            execSync(`tsc ${path.resolve(tempDir, "export2.ts")}`);
            const exportTemplate = await import(path.resolve(tempDir, "export2.js"));

            expect(exportTemplate.default.default).toHaveLength(1);
        });
        test("should prepend the excluded file with custom text", async () => {
            const prependComment = "// hello";
            writeTemplateExportFile({
                templateDirectory: path.resolve(tempDir),
                writeFilePath: path.resolve(tempDir, "export3.ts"),
                prepend: prependComment
            });

            const fileContents: string = readFile(path.resolve(tempDir, "export3.ts"), false);

            expect(fileContents.startsWith(prependComment)).toBeTruthy();
        });
    });
});
