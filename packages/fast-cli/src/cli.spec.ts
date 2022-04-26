import { expect, test } from "@playwright/test";
import { execSync } from "child_process";
import path from "path";
import fs from "fs-extra";

const dirname = path.resolve(process.cwd());
const tempDirRelativeLocation = "../temp";
const tempDir = path.resolve(dirname, tempDirRelativeLocation);
const templateDir = path.resolve(dirname, "../cfp-template/template");

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
        "fast:init": `fast init -t ${path.resolve(dirname, "../cfp-template")}`,
        "fast:config": `fast config -p ./src/components`,
        "fast:add-design-system": `fast add-design-system -p test -s open`,
    };
    fs.writeFileSync(path.resolve(tempDir, "package.json"), JSON.stringify(packageJson, null, 2));
}

function teardown() {
    fs.removeSync(tempDir);
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
test.describe.skip("CLI", () => {
    test.describe("init", () => {
        test.beforeAll(() => {
            setup();
            execSync(`cd ${tempDir} && npm run fast:init`);
        });
        test.afterAll(() => {
            teardown();
        })
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
});