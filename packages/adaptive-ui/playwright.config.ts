import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "dist",
    testMatch: "**/?(*.)+(spec).+(js)",
};

export default config;