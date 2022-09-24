import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<style>
${c => c.componentPrefix}-${c => c.tagName} {
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
    <h1>${c => c.className}</h1>

    <h2>Circle shaped avatar</h2>

    <h3>Circle avatar with image</h3>
    <${c => c.componentPrefix}-${c => c.tagName}
        alt="Annie's profile image"
        link="#"
        shape="circle"
        fill="accent-primary"
        color="bar"
    >
        <img class="image" slot="media" src="https://via.placeholder.com/32" />
    </${c => c.componentPrefix}-${c => c.tagName}>

    <h3>Circle avatar with text content</h3>
    <${c => c.componentPrefix}-${c => c.tagName}
        alt="Carlos's profile image"
        link="#"
        shape="circle"
        fill="accent-primary"
        color="foo"
    >
        CR
    </${c => c.componentPrefix}-${c => c.tagName}>

    <h2>Square shaped avatar</h2>

    <h3>Square avatar with image</h3>
    <${c => c.componentPrefix}-${c => c.tagName}
        src="https://via.placeholder.com/32"
        alt="Fang's profile image"
        link="#"
        shape="square"
        fill="accent-secondary"
    ></${c => c.componentPrefix}-${c => c.tagName}>

</div>`;