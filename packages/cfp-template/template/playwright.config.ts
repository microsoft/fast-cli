const config = {
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
    testMatch: "**/*_pw_spec.ts"
};

module.exports = config;
