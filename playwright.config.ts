import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "packages/fast-cli/dist",
    retries: process.env.CI ? 2 : 0,
    testMatch: "**/?(*.)+(spec).+(js)",
    testIgnore: "**/components/*/*/?(*.)+(spec).+(js)",
    retries: process.env.CI ? 2 : 0,
};

export default config;