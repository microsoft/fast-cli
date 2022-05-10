import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";
import { requiredComponentTemplateFiles } from "./components/files.js";

const dirname = path.resolve(process.cwd());
const tempDirRelativeLocation = "../temp";
const tempComponentDirRelativeLocation = "../temp-component"
const tempDir = path.resolve(dirname, tempDirRelativeLocation);
const tempComponentDir = path.resolve(dirname, tempComponentDirRelativeLocation);
const templateDir = path.resolve(dirname, "../cfp-template/template");
const expectedGeneratedComponentTemplateFiles = [
    "README.md",
    "define.ts",
    "fixtures/base.html",
    "test-component.definition.ts",
    "test-component.pw.spec.ts",
    "test-component.stories.ts",
    "test-component.styles.ts",
    "test-component.template.ts",
    "test-component.ts"
];

function setupBlankAsTemplate() {
    fs.ensureDirSync(tempComponentDir);

    // Initialize the .tmp dir as a blank template
    execSync(`cd ${tempComponentDir} && npm init -y`);

    // Copy over the contents of the blank template
    fs.copySync(path.resolve(dirname, "../fast-cli/dist/esm/components/blank"), tempComponentDir);
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

function setup() {
    fs.ensureDirSync(tempDir);

    // Create a temp project
    execSync(`cd ${tempDir} && npm init -y`);

    // Install the FAST CLI
    execSync(`cd ${tempDir} && npm install --save-dev ${dirname}`);

    // Update the scripts for testable CLI commands
    const packageJsonString = fs.readFileSync(path.resolve(tempDir, "package.json"), { "encoding": "utf8" });
    const packageJson = JSON.parse(packageJsonString);
    packageJson.scripts = {
        "build": "webpack --config=./webpack.prod.cjs",
        "fast:init": `fast init -t ${path.resolve(dirname, "../cfp-template")}`,
        "fast:config": `fast config -p ./src/components`,
        "fast:add-design-system": `fast add-design-system -p test -s open`,
        "fast:add-component:template": `fast add-component -n test-component -t ${path.resolve(dirname, "../temp-component")}`,
        "fast:add-foundation-component:blank": `fast add-foundation-component -n test-component -t blank`,
    };
    fs.writeFileSync(path.resolve(tempDir, "package.json"), JSON.stringify(packageJson, null, 2));
}

function teardown() {
    fs.removeSync(tempDir);
    fs.removeSync(tempComponentDir);
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
            setup();
            execSync(`cd ${tempDir} && npm run fast:init`);
        });
        test.afterAll(() => {
            teardown();
        });
        test("should create a package.json file with contents from the fast init", () => {
            const packageJsonFile = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "package.json"), {
                    encoding: "utf8",
                })
            );
            const configFilePackageJson = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fastinit.json"), {
                    encoding: "utf8",
                })
            ).packageJson;
    
            for (const [key, value] of Object.entries(configFilePackageJson)) {
                if (key !== "name") {
                    expect(packageJsonFile[key].toString()).toEqual((value as any).toString());
                } else {
                    expect(packageJsonFile[key].toString()).toEqual("temp");
                }
            }
        });
        test("should create a fastconfig file with contents from the fast init", () => {
            const fastConfigFile = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fastconfig.json"), {
                    encoding: "utf8",
                })
            );
            const configFilePackageJson = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fastinit.json"), {
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
            setup();
            execSync(`cd ${tempDir} && npm run fast:config`);
        });
        test.afterAll(() => {
            teardown();
        });
        test("should create a fastconfig.json file", () => {
            expect(() => {
                JSON.parse(
                    fs.readFileSync(path.resolve(tempDir, "fastconfig.json"), {
                        encoding: "utf8",
                    })
                )
            }).not.toThrow();
        });
        test("should contain a custom component path", () => {
            const config = JSON.parse(
                fs.readFileSync(path.resolve(tempDir, "fastconfig.json"), {
                    encoding: "utf8",
                })
            );

            expect(config.componentPath).toEqual("./src/components");
        });
    });
    test.describe("add-design-system", () => {
        test.beforeAll(() => {
            setup();
        });
        test.afterAll(() => {
            teardown();
        });
        test("should throw if there is no fastconfig.json file", () => {
            expect(() => {
                execSync(`cd ${tempDir} && npm run fast:add-design-system`);
            }).toThrow();
        });
        test("should throw if the fastconfig.json file does not contain a component path", () => {
            execSync(`cd ${tempDir} && npm run fast:config`);

            fs.writeFileSync(path.resolve(tempDir, "fastconfig.json"), "{}");

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
            setup();
            execSync(`cd ${tempDir} && npm run fast:init`);
            setup();
            setupBlankAsTemplate();
            execSync(`cd ${tempDir} && npm run fast:add-component:template`);
        });
        test.afterAll(() => {
            teardown();
        });
        test("should copy files from a provided template", () => {
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
    test.describe("add-foundation-component", () => {
        test.describe("blank", () => {
            test.beforeAll(() => {
                setup();
                execSync(`cd ${tempDir} && npm run fast:init`);
                setup();
                execSync(`cd ${tempDir} && npm run fast:add-foundation-component:blank`);
            });
            test.afterAll(() => {
                teardown();
            });
            test("should copy files from the blank template", () => {
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