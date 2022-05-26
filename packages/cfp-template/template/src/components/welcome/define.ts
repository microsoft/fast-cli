import { Welcome } from "./welcome.js";
import { definition } from "./welcome.definition.js";

export const welcome = Welcome.compose(definition);
