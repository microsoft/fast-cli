import { getTemplateFileConfig, writeFiles } from "@microsoft/fast-cli/fs";
import path from "path";

/**
 * This NodeJs script leverates utilities from @microsoft/fast-cli to generate
 * an export file
 */

const templateDirectory = path.resolve("../", "cfp-template-files");
const writeFilePath = path.resolve("./src/index.ts");

(function(){
    const prepend =
`/**
 * This file has been automatically generated from the ./build/generate.js scripts,
 * do not attempt to edit it. To re-generate the file run: npm run generate
 */`
    const templateFiles = getTemplateFileConfig({
        templateDirectory,
        excludedPaths: [
            "**/node_modules/**",
            "**/www/**",
            "**/dist/**"
        ],
    })

    writeFiles([
        {
            directory: path.dirname(writeFilePath),
            name: path.basename(writeFilePath),
            contents:
`${prepend || ""}
const cfpAppTemplate = ${JSON.stringify(templateFiles, null, 2)}
export { cfpAppTemplate };`
        }
    ]);

}());