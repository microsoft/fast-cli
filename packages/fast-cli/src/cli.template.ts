import type { CliConfigCallback, ComponentTemplateConfig } from "./utilities/template.js";

type IterableTemplateContent = Array<string | CliConfigCallback>;

/**
 * The return class for the ts template literal tag in which the config
 * is passed.
 */
export class RenderableTemplate {
    private contents: IterableTemplateContent;

    constructor(contents: IterableTemplateContent) {
        this.contents = contents;
    }

    /**
     * The render method for the string output of the template file
     */
    render(config: ComponentTemplateConfig): string {
        return this.contents.reduce<string>((previousValue, currentValue): string => {
            if (typeof currentValue === "string") {
                previousValue += currentValue;
            } else {
                previousValue += currentValue(config);
            }

            return previousValue;
        }, "");
    }
}

/**
 * A template literal tag function for typescript component templates
 */
function tagTemplate(
    strings: TemplateStringsArray,
    ...config: IterableTemplateContent
): RenderableTemplate {
    const contents: IterableTemplateContent = [];

    strings.forEach((stringItem: string, index: number) => {
        contents.push(stringItem, config[index] || "");
    });

    return new RenderableTemplate(contents);
}

export const tsTemplate = tagTemplate;
export const htmlTemplate = tagTemplate;
export const mdTemplate = tagTemplate;
