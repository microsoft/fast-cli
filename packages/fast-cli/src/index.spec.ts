import { exec } from "child_process";
import path from "path";
import { expect } from "chai";
import { describe, it } from "mocha";
import fs from "fs-extra";

const __dirname = path.resolve(path.dirname(""));
const tempDirName = "temp";
const tempDir = path.resolve(__dirname, tempDirName);
const templateDir = path.resolve(__dirname, "../cfp-template/template");

describe("CLI", async () => {
    before(async () => {
        await fs.ensureDir(tempDir, async (err: Error) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        await new Promise<void>((resolve, reject)=> {
            exec("cd temp && npx ../ init -d -t ../../cfp-template", function(err: Error) {
                if (err) {
                    console.error(err);
                    reject();
                }

                resolve();
            });
        }).catch((reason) => {
            console.error(reason);
            throw reason;
        });
    });
    after(() => {
        fs.removeSync(tempDir);
    });
    it("should create a package.json file with default contents", async () => {
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
    it("should copy the template folder contents", async () =>{
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