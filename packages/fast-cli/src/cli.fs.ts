
import path from "path";
import fs from "fs-extra";
import minimatch from "minimatch";
import type { WriteFileConfig } from "./cli.types.js";

/**
 * This file includes utilities for file system updates
 */

export function readFile<T>(currentPath: string, json: boolean): T {
    if (json) {
        return JSON.parse(fs.readFileSync(currentPath, { encoding: "utf8" }));
    }
    
    return fs.readFileSync(currentPath, { encoding: "utf8" });
}

export function readDir(currentPath: string): Array<string> {
    return fs.readdirSync(currentPath);
}

export function copyFiles(fromDir: string, toDir: string): void {
    fs.copySync(
        fromDir,
        toDir,
        {
            overwrite: true,
        },
        (error: string) => {
            if (error) {
                throw new Error(error);
            }
        }
    );
}

export function writeFiles(files: Array<WriteFileConfig>): void {
    files.forEach((file: WriteFileConfig) => {
        fs.ensureDirSync(file.directory);
        fs.writeFileSync(path.resolve(file.directory, file.name), file.contents)
    });

    return;
}

export function createEmptyDir(currentPath: string): void {
    fs.emptydirSync(currentPath);
}

export async function localPathExists(currentPath: string): Promise<boolean> {
    return await fs.pathExists(currentPath);
}

export function readAll(currentPath: string, originalPath: string = currentPath): Array<string> {
    const allFiles: Array<string> = [];
    const status = fs.statSync(currentPath);

    if (status.isDirectory()) {
        readDir(currentPath).forEach((dirPath) => {
            allFiles.push(
                ...readAll(path.join(currentPath, dirPath), originalPath)
            );
        });
    } else {
        allFiles.push(path.relative(originalPath, currentPath));
    }

    return allFiles;
}

export interface InitializeProjectTemplateConfig {
    templateDirectory: string;
    writeFilePath: string;
    excludedPaths?: string[];
    prepend?: string;
}

function containsExcludedPath(filePath: string, excludedPaths: string[]): boolean {
    let contained: boolean = false;

    excludedPaths.forEach((excludedPath) => {
        if (minimatch(filePath, excludedPath)) {
            contained = true;
        }
    })

    return contained;
}

export function writeTemplateExportFile(
    config: InitializeProjectTemplateConfig
): void {
    const templateFiles: Array<WriteFileConfig> = readAll(
        config.templateDirectory
    ).map((filePath: string): WriteFileConfig | void => {
        if (!containsExcludedPath(filePath, config.excludedPaths || [])) {
            const absolutePath = path.join(config.templateDirectory, filePath);
            return {
                directory: path.dirname(path.relative(config.templateDirectory, absolutePath)),
                name: path.basename(absolutePath),
                contents: readFile(absolutePath, false)
            };
        }
    }).filter((item: WriteFileConfig | void): boolean => {
        return typeof item !== "undefined";
    }) as Array<WriteFileConfig>;

    writeFiles([
        {
            directory: path.dirname(config.writeFilePath),
            name: path.basename(config.writeFilePath),
            contents: `${config.prepend || ""}export default ${JSON.stringify(templateFiles, null, 2)}`
        }
    ]);
}