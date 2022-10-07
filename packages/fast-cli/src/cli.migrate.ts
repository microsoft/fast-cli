interface Dependencies {
    package: string;
    version: string;
}

interface Version {
    next: string | null;
    dependencies: Array<Dependencies>;
}

interface VersionDictionary {
    [key: string]: Version;
}

export const currentConfigVersion: string = "1.0.0-alpha.2";

/**
 * Dictionary of available versions
 */
export const configVersionDictionary: VersionDictionary = {
    "1.0.0-alpha.1": {
        next: "1.0.0-alpha.2",
        dependencies: [
            {
                package: "@microsoft/fast-element",
                version: "1.0.0-alpha.4"
            },
            {
                package: "@microsoft/fast-foundation",
                version: "1.0.0-alpha.4"
            }
        ],
    },
    "1.0.0-alpha.2": {
        next: null,
        dependencies: [
            {
                package: "@microsoft/fast-element",
                version: "2.0.0-beta.12"
            },
            {
                package: "@microsoft/fast-foundation",
                version: "3.0.0-alpha.15"
            }
        ]
    }
}

/**
 * Check to see if the version is latest
 */
export function isLatestConfigVersion(version: string): boolean {
    return configVersionDictionary[version].next === null;
}
