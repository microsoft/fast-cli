import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
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
        --${c => c.componentPrefix}-${c => c.tagName}-height: 400px;
        --${c => c.componentPrefix}-${c => c.tagName}-width: 500px;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
</style>

<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}>${c => c.className} with text</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Custom width and height</h2>
<${c => c.componentPrefix}-${c => c.tagName} style="--${c => c.componentPrefix}-${c => c.tagName}-height: 400px; --${c => c.componentPrefix}-${c => c.tagName}-width: 500px;"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Custom depth with class-based height/width</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="class-override" style="--elevation: 12;"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Custom depth on hover using CSS</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="class-override state-override">
    Custom depth on hover using CSS
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Slotted controls</h2>
<${c => c.componentPrefix}-${c => c.tagName} class="has-controls">
    With controls
    <fast-button appearance="stealth">Test Button</fast-button>
</${c => c.componentPrefix}-${c => c.tagName}>
`;