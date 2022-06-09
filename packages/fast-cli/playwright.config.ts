import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "dist",
    retries: process.env.CI ? 2 : 0,
    testMatch: "**/?(*.)+(spec).+(js)",
    retries: process.env.CI ? 2 : 0,
    webServer: {
        command: "npm run serve:storybook",
        port: 3000,
        reuseExistingServer: !process.env.CI,
    }
};

export default config;