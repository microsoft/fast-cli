import { DesignSystem } from "@microsoft/fast-foundation";
import { designSystem } from "../../design-system.js";
import Template from "./fixtures/base.html";
import "./define.js";
import { foo } from "./define.js";

DesignSystem.getOrCreate().withPrefix(
    designSystem.prefix
).register(
    foo()
);

export default {
    title: "foo",
};

export const Foo: () => "*.html" = () => Template;