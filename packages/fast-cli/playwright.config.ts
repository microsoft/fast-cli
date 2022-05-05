import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "dist",
    testMatch: "**/?(*.)+(spec).+(js)",
    webServer: {
        command: "npm run start:storybook",
        port: 3000,
        timeout: 240 * 1000,
        reuseExistingServer: !process.env.CI,
    }
};

export default config;