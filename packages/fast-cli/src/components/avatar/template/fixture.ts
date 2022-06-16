import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<style>
${config.componentPrefix}-${config.tagName} {
    --avatar-fill-accent-primary: #cf4073;
    --avatar-fill-accent-secondary: #0078d4;
    --avatar-color-foo: hsl(0, 0%, 100%);
    --avatar-color-bar: grey;
    --avatar-text-ratio: 3;
}

.container {
    padding: 1em;
}
</style>
<div class="container">
    <h1>${config.className}</h1>

    <h2>Circle shaped avatar</h2>

    <h3>Circle avatar with image</h3>
    <${config.componentPrefix}-${config.tagName}
        alt="Annie's profile image"
        link="#"
        shape="circle"
        fill="accent-primary"
        color="bar"
    >
        <img class="image" slot="media" src="https://via.placeholder.com/32" />
    </${config.componentPrefix}-${config.tagName}>

    <h3>Circle avatar with text content</h3>
    <${config.componentPrefix}-${config.tagName}
        alt="Carlos's profile image"
        link="#"
        shape="circle"
        fill="accent-primary"
        color="foo"
    >
        CR
    </${config.componentPrefix}-${config.tagName}>

    <h2>Square shaped avatar</h2>

    <h3>Square avatar with image</h3>
    <${config.componentPrefix}-${config.tagName}
        src="https://via.placeholder.com/32"
        alt="Fang's profile image"
        link="#"
        shape="square"
        fill="accent-secondary"
    ></${config.componentPrefix}-${config.tagName}>

</div>`;