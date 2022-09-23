
import path from "path";
import fs from "fs-extra";
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