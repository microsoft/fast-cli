export interface ComponentTemplateConfig {
    /**
     * The component's HTML tag name. 
     * e.g. my-component
     */
    tagName: string;

    /**
     * The component's JavaScript class name.
     * e.g. MyComponent
     */
    className: string;

    /**
     * The name used for the composed component
     * which must be executed as an argument in
     * the DesignSystems register method
     * e.g. myComponent
     */
    definitionName: string;

    /**
     * The prefix used by the component
     */
    componentPrefix: string;
}

/**
 * Template callback for ts templates
 */
export type CliConfigCallback = (
    config: ComponentTemplateConfig
) => string;
