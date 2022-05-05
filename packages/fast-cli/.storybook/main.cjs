const ResolveTypescriptPlugin = require("resolve-typescript-plugin");

module.exports = {
    features: {
        postcss: false,
    },
    stories: ["../src/**/*.stories.ts"],
    webpackFinal: async config => {
        config.resolve.plugins.push(new ResolveTypescriptPlugin());
        config.module.rules.push({
            test: /\.ts$/,
            sideEffects: true,
            use: "ts-loader",
        });

        return config;
    },
};
