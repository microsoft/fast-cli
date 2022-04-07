import { customElement, FASTElement } from "@microsoft/fast-element";
import { welcomeStyles as styles } from "./welcome_styles.js";
import { welcomeTemplate as template } from "./welcome_template.js";

/**
 * A Custom HTML Element.
 *
 * @public
 */
@customElement({ name: "fast-welcome", template, styles })
export class Welcome extends FASTElement {}
