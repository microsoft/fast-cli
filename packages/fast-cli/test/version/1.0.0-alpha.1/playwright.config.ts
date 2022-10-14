import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: "Desktop Chromium",
            use: {
                browserName: "chromium",
            },
        },
    ],
    webServer: {
        command: "npm run serve",
        port: 3000,
        reuseExistingServer: !process.env.CI,
    },
};

export default config;