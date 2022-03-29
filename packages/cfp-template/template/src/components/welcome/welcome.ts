import { customElement, FASTElement } from "@microsoft/fast-element";
import { welcomeStyles as styles } from "./welcome.styles";
import { welcomeTemplate as template } from "./welcome.template";

/**
 * A Custom HTML Element.
 *
 * @public
 */
@customElement({ name: "fast-welcome", template, styles })
export class Welcome extends FASTElement {}
