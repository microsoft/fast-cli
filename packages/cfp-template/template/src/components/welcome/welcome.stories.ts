import Template from "./fixtures/base.html";
import "./define.js";
import { DesignSystem } from "@microsoft/fast-foundation";
import { welcome } from "./define.js";
import { designSystem } from "../../design-system";

DesignSystem.getOrCreate().withPrefix(
    designSystem.prefix
).register(
    welcome()
);

export default {
    title: "welcome",
};

export const Welcome: () => "*.html" = () => Template;