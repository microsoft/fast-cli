import { writeTemplateExportFile } from "@microsoft/fast-cli/fs";
import path from "path";

/**
 * This NodeJs script leverates utilities from @microsoft/fast-cli to generate
 * an export file
 */

const templateDirectory = path.resolve("../", "cfp-template-files");
const writeFilePath = path.resolve("./src/index.ts");

writeTemplateExportFile({
    templateDirectory,
    writeFilePath,
    excludedPaths: [
        "**/node_modules/**",
        "**/www/**",
        "**/dist/**"
    ],
    prepend:
`/**
 * This file has been automatically generated from the ./build/generate.js scripts,
 * do not attempt to edit it. To re-generate the file run: npm run generate
 */
`
});