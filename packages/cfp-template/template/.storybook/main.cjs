const ResolveTypescriptPlugin = require("resolve-typescript-plugin");

module.exports = {
    features: {
        babelModeV7: true,
    },
    framework: "@storybook/html",
    stories: ["../src/**/*.stories.ts"],
    core: {
        builder: "webpack5"
    },
    webpackFinal: async config => {
        config.resolve.alias["@storybook/html"] = require.resolve("@storybook/html");
        Array.isArray(config.resolve.plugins)
            ? config.resolve.plugins.push(new ResolveTypescriptPlugin({
                includeNodeModules: true,
            }))
            : [new ResolveTypescriptPlugin({
                includeNodeModules: true,
            })];
        config.module.rules.push({
            test: /\.ts$/,
            sideEffects: true,
            loader: "ts-loader",
            options: {
                transpileOnly: true,
            },
        });
        config.module.rules.push({
            test: /\.html$/,
            use: "html-loader",
        });

        return config;
    },
};
