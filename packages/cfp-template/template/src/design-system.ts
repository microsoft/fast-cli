import { DesignSystem } from "@microsoft/fast-foundation";
import components from "./components/index.js";

export const designSystem = {
    prefix: "fast",
    shadowRootMode: "open"
}

DesignSystem.getOrCreate().withPrefix(
    designSystem.prefix
).register(
    ...components
);