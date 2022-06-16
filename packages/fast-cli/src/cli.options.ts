export interface FastConfig {
    componentPath: string;
    rootDir: string;
    componentPrefix: string;
}

export interface FastConfigOptionMessages {
    componentPath: string;
    rootDir: string;
    componentPrefix: string;
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

export interface RequiredComponentsNameModifierConfig {
    prepend: string;
    append: string;
}

export interface RequiredComponents {
    template: string;
    nameModifier: RequiredComponentsNameModifierConfig
}

export interface FastAddComponent {
    packageJson: PackageJsonAddComponent;
    requiredComponents?: Array<RequiredComponents>;
}

export interface FastInitOptionMessages {
    template: string;
}

export interface AddDesignSystemOptions {
    useDefaults: boolean;
    shadowRootMode?: "open" | "closed";
}

export interface AddDesignSystemOptionMessages {
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
    all?: boolean;
    useDefaults?: boolean;
}

export interface AddFoundationComponentOptionMessages {
    name: string;
    template: string;
}