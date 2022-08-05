module.exports = {
    rules: {
        "import/extensions": ["error", "never"],
    },
    overrides: [
        {
            files: ["**/tests/files/*.ts"],
            rules: {
                "import/extensions": ["error", "always"],
            }
        }
    ]
};
