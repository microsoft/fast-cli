export interface FastConfig {
    componentPath: string;
}

export interface FastConfigOptionMessages {
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

export interface FastInitOptionMessages {
    template: string;
}

export interface AddDesignSystemOptions {
    prefix?: string;
    shadowRootMode?: "open" | "closed";
}

export interface AddDesignSystemOptionMessages {
    prefix: string;
    shadowRootMode: string;
}