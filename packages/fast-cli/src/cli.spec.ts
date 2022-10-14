import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import {
    getExpectedGeneratedComponentTemplateFiles,
    getTempDir,
    getTempComponentDir,
    setup,
    teardown,
    fastCliDir,
    packagesDir,
    updatePackageJsonScripts,
    getPackageScripts,
    installCli,
    setupMigrate,
} from "./test/helpers.js";
import { requiredComponentTemplateFiles } from "./components/files.js";
import { configVersionDictionary, currentConfigVersion } from "./cli.migrate.js";

const uuid: string = "cli";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);
const templateDir = path.resolve(packagesDir, "./cfp-template-files");

function setupBlankAsTemplate() {
    fs.ensureDirSync(tempComponentDir);

    // Initialize the .tmp dir as a blank template
    execSync(`cd ${tempComponentDir} && npm init -y`);

    // Copy over the contents of the blank template
    fs.copySync(path.resolve(fastCliDir, "./dist/esm/components/blank"), tempComponentDir);
    // Replace the tag template literal import
    Object.keys(requiredComponentTemplateFiles).forEach((templateFileName) => {
        const filePath = path.resolve(tempComponentDir, "template", templateFileName);
        let fileContents = fs.readFileSync(filePath, { "encoding": "utf8" });
        fs.writeFileSync(filePath, fileContents.replace("../../../cli.template.js", "@microsoft/fast-cli/template"));
    });

    const packageJsonString = fs.readFileSync(
        path.resolve(tempComponentDir, "package.json"),
        { "encoding": "utf8" }
    );
    const packageJson = JSON.parse(packageJsonString);
    packageJson.type = "module";
    packageJson.dependencies = {
        ...packageJson.dependencies,
        
    }
    fs.writeFileSync(
        path.resolve(tempComponentDir, "package.json"), JSON.stringify(packageJson, null, 2)
    );
}

function configTests() {
    test("should create a fast.config.json file", () => {
        expect(() => {
            JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fast.config.json"), {
                    encoding: "utf8",
                })
            )
        }).not.toThrow();
    });
    test("should contain a custom component path", () => {
        const config = JSON.parse(
            fs.readFileSync(path.resolve(tempDir, "fast.config.json"), {
                encoding: "utf8",
            })
        );

        expect(config.componentPath).toEqual("./components");
    });
}

function initTests() {
    test("should copy the template folder contents", () =>{
        const templateDirContents = fs.readdirSync(templateDir);
        const tempDirContents = fs.readdirSync(tempDir);

        for (const templateDirItem of templateDirContents) {
            if (templateDirItem !== "dist" && templateDirItem !== "www") {
                expect(
                    tempDirContents.includes(templateDirItem)
                ).toEqual(true);
            }
        }
    });
    test("should install the dependencies for the default template", async () => {
        let hasNodeModules: boolean = false;
        await fs.pathExists(path.resolve(tempDir, "node_modules")).then((exists) => {
            hasNodeModules = exists;
        });

        expect(hasNodeModules).toEqual(true);
    });
}

function migrateTests(versionTempDir: string) {
    test("should be able to run migrate command without throwing", () => {
        expect(() => {
            execSync(`cd ${versionTempDir} && npm run migrate`);
        }).not.toThrow();
    });
    test("should be able to build", () => {
        expect(() => {
            execSync(`cd ${versionTempDir} && npm run build`);
        }).not.toThrow();
    });
}

test.describe("CLI", () => {
    test.describe("init", () => {
        test.describe("local template", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init:local`);
            });
            test.afterAll(() => {
                teardown(tempDir);
            });
            initTests();
        });
        // These tests are skipped as npm installing a remote package is
        // not allowed by the build server, unskip to run them locally.
        test.describe.skip("remote template", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init:remote`);
            });
            test.afterAll(() => {
                teardown(tempDir);
            });
            initTests();
        });
    });
    test.describe("config", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:config`);
        });
        test.afterAll(() => {
            teardown(tempDir);
        });
        configTests();
    });
    test.describe("config with defaults", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:config:default`);
        });
        test.afterAll(() => {
            teardown(tempDir);
        });
        configTests();
    });
    test.describe("add-design-system", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
        });
        test.afterAll(() => {
            teardown(tempDir);
        });
        test("should throw if there is no fast.config.json file", () => {
            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:add-design-system`);
            }).toThrow();
        });
        test("should throw if the fast.config.json file does not contain a component path", () => {
            execSync(`cd ${tempDir} && npm run fast:config`);

            fs.writeFileSync(path.resolve(tempDir, "fast.config.json"), "{}");

            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:add-design-system`);
            }).toThrow();
        });
        test("should create a design-system.ts file relative to a component path", async () => {
            execSync(`cd ${tempDir} && npm run fast:config && npm run fast:add-design-system`);

            expect(await fs.pathExists(path.resolve(tempDir, "src"))).toBeTruthy();
        });
        test("should contain a design system export with the provided options", async () => {
            // The contents of this file have to be read as this is expected to work in browser and therefore will throw errors if imported
            const designSystemFileContents = fs.readFileSync(path.resolve(tempDir, "./src/design-system.ts"), { encoding: "utf8" });
            
    
            expect(designSystemFileContents).toContain(`prefix: "test"`);
            expect(designSystemFileContents).toContain(`shadowRootMode: "open"`);
        });
    });
    test.describe("add-design-system with defaults", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
        });
        test.afterAll(() => {
            teardown(tempDir);
        });
        test("should throw if there is no fast.config.json file", () => {
            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:add-design-system:default`);
            }).toThrow();
        });
        test("should throw if the fast.config.json file does not contain a component path", () => {
            execSync(`cd ${tempDir} && npm run fast:config`);
    
            fs.writeFileSync(path.resolve(tempDir, "fast.config.json"), "{}");
    
            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:add-design-system:default`);
            }).toThrow();
        });
        test("should create a design-system.ts file relative to a component path", async () => {
            execSync(`cd ${tempDir} && npm run fast:config && npm run fast:add-design-system:default`);
    
            expect(await fs.pathExists(path.resolve(tempDir, "src"))).toBeTruthy();
        });
        test("should contain a design system export with the provided options", async () => {
            // The contents of this file have to be read as this is expected to work in browser and therefore will throw errors if imported
            const designSystemFileContents = fs.readFileSync(path.resolve(tempDir, "./src/design-system.ts"), { encoding: "utf8" });
            
    
            expect(designSystemFileContents).toContain(`prefix: "test"`);
            expect(designSystemFileContents).toContain(`shadowRootMode: "open"`);
        });
    });
    test.describe("add-component", () => {
        test.beforeAll(() => {
            setupBlankAsTemplate();
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:init:local`);
            installCli(tempDir);
            updatePackageJsonScripts(tempDir, getPackageScripts(tempComponentDir));
            execSync(`cd ${tempDir} && npm run fast:add-component:template`);
        });
        test.afterAll(() => {
            teardown(tempDir);
            teardown(tempComponentDir);
        });
        test("should copy files from a provided template", () => {
            let files: Array<string> = [];

            function testGeneratedFiles(folderName: string) {
                const tempDirContents = fs.readdirSync(path.resolve(tempDir, "./src/components/test-component", folderName));
                const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "./src/components/test-component", folderName), {
                    withFileTypes: true
                });
                for (let i = 0, contentLength = tempDirContents.length; i < contentLength; i++) {
                    if (tempDirContentsWithFileTypes[i].isDirectory()) {
                        testGeneratedFiles(tempDirContents[i]);
                    } else {
                        files.push(
                            folderName
                                ? `${folderName}/${tempDirContents[i]}`
                                : tempDirContents[i]
                        );
                    }
                }
            }
            
            testGeneratedFiles("");
            expect(files.sort()).toEqual(getExpectedGeneratedComponentTemplateFiles("test-component").sort());
        });
        test("should be able to run the build", () => {
            expect(
                () => {
                    execSync(`cd ${tempDir} && npm run build`);
                }
            ).not.toThrow();
        });
    });
    test.describe("version", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
        });
        test.afterAll(() => {
            teardown(tempDir);
        });
        test("should not throw", () => {
            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:version`);
            }).not.toThrow();
        });
    });
    test.describe("migrate", () => {
        const dictionaryKeys: Array<string> = Object.keys(configVersionDictionary);
        const nonCurrentVersions = dictionaryKeys.filter((key) => {
            return key !== currentConfigVersion;
        });

        nonCurrentVersions.forEach((version) => {
            test.describe(version, () => {
                test.beforeAll(() => {
                    setupMigrate(`${tempDir}-${version}`, version);
                });
                test.afterAll(() => {
                    teardown(`${tempDir}-${version}`);
                });
                migrateTests(`${tempDir}-${version}`);
            });
        })
    });
});