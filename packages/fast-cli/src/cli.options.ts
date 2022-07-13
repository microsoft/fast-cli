import type { StringModifierConfig, XOR } from "./cli.types";

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

export interface RequiredComponents {
    template: string;
    nameModifier: StringModifierConfig
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

/**
 * Config command options
 */
 export interface ConfigOptions {
    /**
     * Use defaults
     */
    useDefaults: boolean;

    /**
     * The component path
     */
    componentPath: string;

    /**
     * The root directory
     */
    rootDir: string;

    /**
     * The web components prefix
     */
    componentPrefix: string;
}

/**
 * Init command options
 */
export interface InitOptions {
    /**
     * Use defaults
     */
    useDefaults: boolean;

    /**
     * Path to template
     */
    template: string;
}

export interface TemplateFileConfig {
    /**
     * The root directory of the project
     */
    rootDir: string;

    /**
     * The project config
     */
    fastConfig: FastConfig;

    /**
     * The user provided path to the template
     */
    pathToTemplatePackage: string;

    /**
     * Whether the template is a CLI provided named template
     */
    cliTemplate: boolean;

    /**
     * The name passed to the template files
     */
    name: string;
}

export interface CopyTemplateConfig {
    /**
     * The user provided path to the template
     */
    pathToTemplatePackage: string;

    /**
     * Contents of the package.json file
     */
    packageJson: XOR<PackageJsonInit, PackageJsonAddComponent>;

    /**
     * The template destination
     */
    destDir: string;
}