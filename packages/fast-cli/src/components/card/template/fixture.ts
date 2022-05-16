import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<style>
    .class-override {
        height: 163px;
        width: 300px;
    }

    .state-override:hover {
        --elevation: 12;
        /* --background-luminance: -2; */
    }

    .has-controls {
        --${config.tagName}-height: 400px;
        --${config.tagName}-width: 500px;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
</style>

<h2>Default</h2>
<${config.tagName}>${config.className} with text</${config.tagName}>

<h2>Custom width and height</h2>
<${config.tagName} style="--${config.tagName}-height: 400px; --${config.tagName}-width: 500px;"></${config.tagName}>

<h2>Custom depth with class-based height/width</h2>
<${config.tagName} class="class-override" style="--elevation: 12;"></${config.tagName}>

<h2>Custom depth on hover using CSS</h2>
<${config.tagName} class="class-override state-override">
    Custom depth on hover using CSS
</${config.tagName}>

<h2>Slotted controls</h2>
<${config.tagName} class="has-controls">
    With controls
    <fast-button appearance="stealth">Test Button</fast-button>
</${config.tagName}>
`;