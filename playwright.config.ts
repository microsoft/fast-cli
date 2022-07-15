import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "packages/fast-cli/dist",
    retries: process.env.CI ? 2 : 0,
    testMatch: "**/?(*.)+(spec).+(js)",
    testIgnore: "**/components/*/*/?(*.)+(spec).+(js)",
    timeout: 60000
};

export default config;