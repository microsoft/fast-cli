import { execSync } from "child_process";
import path from "path";
import { expect } from "chai";
import { describe, it } from "mocha";
import fs from "fs-extra";

const dirname = path.resolve(process.cwd());
const tempDirName = "temp";
const tempDir = path.resolve(dirname, tempDirName);
const templateDir = path.resolve(dirname, "../cfp-template/template");

/**
 * TODO: update these tests when the npm CLI has been updated and added it to
 * the github validation workflow.
 * 
 * Due to issues with npm versions these test should only be run locally
 * https://github.com/npm/cli/issues/3847 for details. Use npm version 7.18.1.
 */
xdescribe("CLI", () => {
    before(() => {
        fs.ensureDirSync(tempDir);
        execSync(`cd ${tempDirName} && npx ${dirname} init -d -t ${path.resolve(dirname, "../cfp-template")}`);
    });
    after(() => {
        fs.removeSync(tempDir);
    });
    it("should create a package.json file with default contents", () => {
        const packageJsonFile = JSON.parse(
            fs.readFileSync(path.resolve(tempDir, "package.json"), {
                encoding: "utf8",
            })
        );
        const configFilePackageJson = JSON.parse(
            fs.readFileSync(path.resolve(tempDir, "fastconfig.json"), {
                encoding: "utf8",
            })
        ).packageJson;

        for (const [key, value] of Object.entries(configFilePackageJson)) {
            expect(packageJsonFile[key].toString()).to.equal((value as any).toString());
        }
    });
    it("should copy the template folder contents", () =>{
        const templateDirContents = fs.readdirSync(templateDir);
        const tempDirContents = fs.readdirSync(tempDir);

        for (const templateDirItem of templateDirContents) {
            expect(
                tempDirContents.includes(templateDirItem)
            ).to.equal(true);
        }
    });
    it("should install the dependencies for the default template", async () => {
        let hasNodeModules: boolean = false;
        await fs.pathExists(path.resolve(tempDir, "node_modules")).then((exists) => {
            hasNodeModules = exists;
        });

        expect(hasNodeModules).to.equal(true);
    });
});