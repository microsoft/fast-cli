import { Foo } from "./foo.js";
import { definition } from "./foo.definition.js";

export const foo = Foo.compose(definition);
