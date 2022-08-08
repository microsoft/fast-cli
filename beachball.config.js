module.exports = {
    disallowedChangeTypes: ["major"],
    groups: [
        {
            name: "cli",
            include: ["packages/*"],
            exclude: ["packages/**/*.md", "packages/**/*.spec.ts", "packages/**/README.ts"],
        }
    ]
};
