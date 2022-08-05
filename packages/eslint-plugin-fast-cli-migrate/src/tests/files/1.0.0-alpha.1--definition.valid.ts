import { FASTElementDefinition } from "@microsoft/fast-element";
import { designSystem } from "../../design-system.js";
import { Foo } from "./foo.js";

export const definition = new FASTElementDefinition(Foo, {
    name: `${designSystem.prefix}-foo`,
    template,
    styles,
    shadowOptions: {
        mode: designSystem.shadowRootMode,
        delegatesFocus: true 
    }
});