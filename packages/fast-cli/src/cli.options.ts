export interface FastConfig {
    componentPath: string;
}

export interface FastConfigOptionMessages {
    componentPath: string;
}

export interface PackageJsonInit {
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
    packageJson: PackageJsonInit
}

export interface PackageJsonAddComponent {
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
    peerDependencies: { [key: string]: string };
}

export interface FastAddComponent {
    packageJson: PackageJsonAddComponent
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

export interface AddComponentOptions {
    name?: string;
    template?: string;
}

export interface AddComponentOptionMessages {
    name: string;
    template: string;
}

export interface AddFoundationComponentOptions {
    name?: string;
    template?: string;
}

export interface AddFoundationComponentOptionMessages {
    name: string;
    template: string;
}