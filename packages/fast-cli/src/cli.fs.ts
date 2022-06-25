
import path from "path";
import fs from "fs-extra";
import type { WriteFileConfig } from "./cli.types.js";

/**
 * This file includes utilities for file system updates
 */

export function readFile<T>(path: string, json: boolean): T {
    if (json) {
        return JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
    }
    
    return fs.readFileSync(path, { encoding: "utf8" });
}

export function readDir(path: string): Array<string> {
    return fs.readdirSync(path);
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

export function createEmptyDir(path: string): void {
    fs.emptydirSync(path);
}

export async function localPathExists(path: string): Promise<boolean> {
    return await fs.pathExists(path);
}