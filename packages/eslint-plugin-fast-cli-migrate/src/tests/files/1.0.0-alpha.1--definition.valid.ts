import { designSystem } from "../../design-system.js";
import { Foo } from "./foo.js";
import { template } from "./foo.template.js";
import { styles } from "./foo.styles.js";

export const definition = Foo.compose({
    name: `${designSystem.prefix}-foo`,
    template,
    styles,
});