import type { AddDesignSystemOptions, FastConfig } from "../cli.options";

export default (config: FastConfig, designSystem: AddDesignSystemOptions): string => 
`import { DesignSystem } from "@microsoft/fast-foundation";
import components from "${config.componentPath}/index.js";

export const designSystem = {
    prefix: "${config.componentPrefix}",
    shadowRootMode: "${designSystem.shadowRootMode}",
};

DesignSystem.getOrCreate().withPrefix(
    designSystem.prefix
).register(
    ...components
);
`