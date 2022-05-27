import Template from "./fixtures/base.html";
import "./define.js";

export default {
    title: "welcome",
};

export const Welcome: () => "*.html" = () => Template;