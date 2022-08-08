import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "packages/eslint-plugin-fast-cli-migrate/src/tests/rules",
    retries: process.env.CI ? 2 : 0,
    testMatch: "**/?(*.)+(spec).+(ts)",
    timeout: 60000
};

export default config;
