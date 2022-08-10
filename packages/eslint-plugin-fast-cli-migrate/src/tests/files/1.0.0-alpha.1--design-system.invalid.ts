export const designSystem = {
    prefix: "fast",
    shadowRootMode: "open"
}

DesignSystem.getOrCreate().withPrefix(
    designSystem.prefix
).register(
    ...components
);