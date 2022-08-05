import path from "path";
import { expect, test } from "@playwright/test";
import { ESLint } from "eslint";
import fs from "fs-extra";
import * as eslintPlugin from "../../index";

const testItems = [
    {
        rule: "1.0.0-alpha.1--class",
        errorNumber: 2,
        filePath: "foo",
    },
];

function getFixedCode(invalidCode: string, fix) {
    const originalContent = invalidCode.slice(
        fix.range[0],
        fix.range[1]
    );
    
    return invalidCode.replace(originalContent, fix.text);
}

async function getFixedCodeFromMultipleFixes(invalidCode: string, messages, eslint, testItem) {
    let fixedCode = invalidCode;

    if (messages.length > 0) {
        fixedCode = getFixedCode(fixedCode, messages[0].fix);

        return await eslint
            .lintText(fixedCode, {
                filePath: testItem.filePath
            })
            .then((contents: any) => {
                return getFixedCodeFromMultipleFixes(
                    fixedCode,
                    contents[0].messages,
                    eslint,
                    testItem,
                );
            });
    } else {
        return fixedCode;
    }    
}

test.describe("Rules", () => {
    testItems.forEach((testItem) => {
        test.describe(testItem.rule, () => {
            let eslint = new ESLint({
                useEslintrc: false,
                overrideConfigFile: "./src/tests/files/test.config.json",
                rulePaths: ["./dist/rules"],
                overrideConfig: {
                    parserOptions: {
                        fastConfig: {
                            rootDir: "./src",
                            componentPath: "./components",
                            componentPrefix: "fast"
                        }
                    },
                    rules: {
                        [testItem.rule]: 2,
                    },
                },
                cwd: path.dirname(require.resolve("@microsoft/eslint-plugin-fast-cli-migrate/package.json")),
                plugins: { "@microsoft/eslint-plugin-fast-cli-migrate": eslintPlugin },
            });
            let invalidMessages: any;
            let validMessages: any;
            let invalidFileContents: string;
            let validFileContents: string;
        
            test.beforeAll(() => {
                invalidFileContents = fs.readFileSync(
                    path.resolve(__dirname, `../files/${testItem.rule}.invalid.ts`),
                    {
                        encoding: "utf8"
                    }
                );
                validFileContents = fs.readFileSync(
                    path.resolve(__dirname, `../files/${testItem.rule}.valid.ts`),
                    {
                        encoding: "utf8"
                    }
                )

                eslint
                    .lintText(invalidFileContents, {
                        filePath: testItem.filePath,
                    })
                    .then((contents: any) => {
                        invalidMessages = contents[0].messages;
                    });
                eslint
                    .lintText(validFileContents, {
                        filePath: testItem.filePath
                    })
                    .then((contents: any) => {
                        validMessages = contents[0].messages;
                    });
            });
        
            test("valid example does not contain error messages", () => {
                expect(validMessages).toHaveLength(0);
            });

            test("invalid example does contain an error message and a fix message", () => {
                expect(invalidMessages).toHaveLength(testItem.errorNumber);

                for (const invalidMessage of invalidMessages) {
                    expect(invalidMessage.ruleId).toEqual(testItem.rule);
                }
            });
    
            test("fix should convert invalid format to valid format", async () => {
                // replace using the available fixes
                const fixedCode = await getFixedCodeFromMultipleFixes(invalidFileContents, invalidMessages, eslint, testItem);
                let messages: any;

                // lint result
                await eslint.lintText(fixedCode).then((contents: any) => {
                    messages = contents[0].messages;
                });
                
                expect(messages).toHaveLength(0);
            });
        });
    });
});
