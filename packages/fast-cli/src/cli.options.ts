export interface FastConfig {
    componentPath: string;
}

export interface PackageJson {
    name: string;
    version: string;
    description: string;
    repository: string;
    keywords: string;
    author: string;
    license: string;
}

export interface FastInit {
    fastConfig: FastConfig,
    packageJson: PackageJson
}