import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import {
    dirname,
    expectedGeneratedComponentTemplateFiles,
    getTempDir,
    getTempComponentDir,
    setup,
    teardown,
    fastCliDir,
} from "./test/helpers.js";

const uuid: string = "cli";
const tempDir: string = getTempDir(uuid);
const tempComponentDir: string = getTempComponentDir(uuid);
const templateDir = path.resolve(dirname, "./cfp-template/template");

function setupBlankAsTemplate() {
    fs.ensureDirSync(tempComponentDir);

    // Initialize the .tmp dir as a blank template
    execSync(`cd ${tempComponentDir} && npm init -y`);

    // Copy over the contents of the blank template
    fs.copySync(path.resolve(fastCliDir, "./dist/esm/components/blank"), tempComponentDir);
    const packageJsonString = fs.readFileSync(
        path.resolve(tempComponentDir, "package.json"),
        { "encoding": "utf8" }
    );
    const packageJson = JSON.parse(packageJsonString);
    packageJson.type = "module";
    fs.writeFileSync(
        path.resolve(tempComponentDir, "package.json"), JSON.stringify(packageJson, null, 2)
    );
}

/**
 * TODO: update these tests when the npm CLI has been updated and added it to
 * the github validation workflow.
 * 
 * Due to issues with npm versions these test should only be run locally
 * https://github.com/npm/cli/issues/3847 for details. Use npm version 7.18.1.
 * 
 * When switching between npm versions if you recieve a permissions error, try
 * npx clear-npx-cache
 */
test.describe("CLI", () => {
    test.describe("init", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:init`);
        });
        test.afterAll(() => {
            teardown(tempDir, tempComponentDir);
        });
        test("should create a package.json file with contents from the fast init", () => {
            const packageJsonFile = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "package.json"), {
                    encoding: "utf8",
                })
            );
            const configFilePackageJson = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fast.init.json"), {
                    encoding: "utf8",
                })
            ).packageJson;
    
            for (const [key, value] of Object.entries(configFilePackageJson)) {
                if (key !== "name") {
                    expect(packageJsonFile[key].toString()).toEqual((value as any).toString());
                }
            }
        });
        test("should create a fast.config file with contents from the fast init", () => {
            const fastConfigFile = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fast.config.json"), {
                    encoding: "utf8",
                })
            );
            const configFilePackageJson = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fast.init.json"), {
                    encoding: "utf8",
                })
            ).fastConfig;
    
            for (const [key, value] of Object.entries(configFilePackageJson)) {
                expect(fastConfigFile[key].toString()).toEqual((value as any).toString());
            }
        });
        test("should copy the template folder contents", () =>{
            const templateDirContents = fs.readdirSync(templateDir);
            const tempDirContents = fs.readdirSync(tempDir);
    
            for (const templateDirItem of templateDirContents) {
                expect(
                    tempDirContents.includes(templateDirItem)
                ).toEqual(true);
            }
        });
        test("should install the dependencies for the default template", async () => {
            let hasNodeModules: boolean = false;
            await fs.pathExists(path.resolve(tempDir, "node_modules")).then((exists) => {
                hasNodeModules = exists;
            });
    
            expect(hasNodeModules).toEqual(true);
        });
    });
    test.describe("config", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:config`);
        });
        test.afterAll(() => {
            teardown(tempDir, tempComponentDir);
        });
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

            expect(config.componentPath).toEqual("./src/components");
        });
    });
    test.describe("add-design-system", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
        });
        test.afterAll(() => {
            teardown(tempDir, tempComponentDir);
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
            const { designSystem: designSystem } = await import(path.resolve(tempDir, "./src/design-system.ts"));

            expect(designSystem.prefix).toEqual("test");
            expect(designSystem.shadowRootMode).toEqual("open");
        });
    });
    test.describe("add-component", () => {
        test.beforeAll(() => {
            setup(tempDir, tempComponentDir);
            execSync(`cd ${tempDir} && npm run fast:init`);
            setup(tempDir, tempComponentDir);
            setupBlankAsTemplate();
            execSync(`cd ${tempDir} && npm run fast:add-component:template`);
        });
        test.afterAll(() => {
            teardown(tempDir, tempComponentDir);
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
            expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
        });
        test("should be able to run the build", () => {
            expect(
                () => {
                    execSync(`cd ${tempDir} && npm run build`);
                }
            ).not.toThrow();
        });
    });
    test.describe("add-foundation-component", () => {
        test.describe("blank", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:blank`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("badge", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:badge`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("disclosure", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:disclosure`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("card", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:card`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("dialog", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:dialog`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("number-field", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:number-field`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("search", () => {
            test.beforeAll(() => {
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup(tempDir, tempComponentDir);
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:search`);
            });
            test.afterAll(() => {
                teardown(tempDir, tempComponentDir);
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
        test.describe("progress-ring", () => {
            test.beforeAll(() => {
                setup();
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup();
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:progress-ring`);
            });
            test.afterAll(() => {
                teardown();
            });
            test("should copy files from the template", () => {
                let files: Array<string> = [];

                function testGeneratedFiles(folderName: string) {
                    const tempDirContents = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName));
                    const tempDirContentsWithFileTypes = fs.readdirSync(path.resolve(tempDir, "src/components/test-component", folderName), {
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
                expect(files).toEqual(expectedGeneratedComponentTemplateFiles);
            });
            test("should be able to run the build", () => {
                expect(
                    () => {
                        execSync(`cd ${tempDir} && npm run build`);
                    }
                ).not.toThrow();
            });
        });
    });
});