import { css } from "@microsoft/fast-element";
import { DesignSystem, DesignToken } from "@microsoft/fast-foundation";
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

export const disabledOpacity = DesignToken.create<number>('disabled-opacity').withDefault(0.3);

export const heightNumber = css.partial`32`;