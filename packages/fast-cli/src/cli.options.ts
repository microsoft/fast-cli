#!/usr/bin/env node

/* eslint-disable no-useless-escape */
const folderMatches = process.cwd().match(/[^(\\|\/)]+(?=$)/);
const projectName: string = folderMatches !== null ? folderMatches[0] : "new-project";

/**
 * Configuration options for the package.json file
 */
export interface PackageJsonConfig {
    name: string;
    version: string;
    description: string;
    repository: string;
    keywords: string;
    author: string;
    license: string;
}

/**
 * Default config
 */
export const defaultPackageJsonConfig: PackageJsonConfig = {
    name: projectName,
    version: "0.1.0",
    description: "",
    repository: "",
    keywords: "",
    author: "",
    license: "ISC",
}