const ResolveTypescriptPlugin = require("resolve-typescript-plugin");

module.exports = {
    features: {
        postcss: false,
    },
    stories: ["../temp/storybook/**/*.stories.ts"],
    core: {
        builder: "webpack5"
    },
    webpackFinal: async config => {
        Array.isArray(config.resolve.plugins)
            ? config.resolve.plugins.push(new ResolveTypescriptPlugin())
            : [new ResolveTypescriptPlugin()];
        config.module.rules.push({
            test: /\.ts$/,
            sideEffects: true,
            use: "ts-loader",
        });

        return config;
    },
};
