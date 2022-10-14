import { css, ElementStyles } from "@microsoft/fast-element";
import type { ElementDefinitionContext } from "@microsoft/fast-foundation";
import type { FooOptions } from "./foo.js";

export const styles: (
    context: ElementDefinitionContext,
    definition: FooOptions
) => ElementStyles = (context: ElementDefinitionContext, definition: FooOptions) =>
css`
    :host {
        background: red;
    }
`;