import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testDir: "dist",
    testMatch: "**/?(*.)+(spec).+(js)",
    webServer: {
        command: "npm run serve:storybook",
        port: 3000,
        reuseExistingServer: !process.env.CI,
    }
};

export default config;