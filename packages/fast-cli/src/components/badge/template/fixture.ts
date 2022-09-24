import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<style>
    ${c => c.componentPrefix}-${c => c.tagName} {
        --badge-fill-primary: #d223cb;
        --badge-fill-secondary: #3278cd;
        --badge-fill-tertiary: #dfdfdf;
        --badge-fill-foo: #ee1010;
        --badge-fill-bar: rgba(238, 6, 16, 0.7);
        --badge-color-foo: white;
        --badge-color-bar: black;
    }

    .icon {
        position: relative;
        display: inline-flex;
        width: 50px;
        height: 50px;
        background: #dfdfdf;
        margin: 12px;
    }

    .icon-${c => c.componentPrefix}-${c => c.tagName} {
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .image-container {
        position: relative;
        display: inline-flex;
    }

    .image-${c => c.componentPrefix}-${c => c.tagName} {
        position: absolute;
        right: 6px;
        top: 6px;
    }
</style>
<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}>Accent</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Default with color map</h2>
<${c => c.componentPrefix}-${c => c.tagName}
    fill="primary"
    style="font-size: 10px; line-height: 16px;"
    color="foo"
    id="foo"
>
    Badge
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} fill="secondary" color="foo" id="foo">
    Badge
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}
    fill="tertiary"
    style="font-size: 14px; line-height: 20px;"
    color="bar"
    id="foo"
>
    Badge
</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Circular</h2>
<${c => c.componentPrefix}-${c => c.tagName} fill="primary" color="foo" id="foo" circular="true">
    9
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} fill="secondary" color="foo" id="foo" circular="true">
    99
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} fill="tertiary" color="bar" id="foo" circular="true">
    9999999
</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Examples</h2>
<div>
    <div class="image-container">
        <img src="https://via.placeholder.com/120x140/DFDFDF/171717" />
        <${c => c.componentPrefix}-${c => c.tagName} class="image-${c => c.componentPrefix}-${c => c.tagName}" fill="foo" color="foo" id="foo">
            Sale
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="image-container">
        <img src="https://via.placeholder.com/140x140/DFDFDF/171717" />
        <${c => c.componentPrefix}-${c => c.tagName} class="image-${c => c.componentPrefix}-${c => c.tagName}" fill="secondary" color="foo" id="foo">
            App of the day
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
</div>
<div>
    <div class="icon">
        <${c => c.componentPrefix}-${c => c.tagName} class="icon-${c => c.componentPrefix}-${c => c.tagName}" circular="true" fill="bar" color="foo" id="foo">
            3
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon">
        <${c => c.componentPrefix}-${c => c.tagName} class="icon-${c => c.componentPrefix}-${c => c.tagName}" circular="true" fill="bar" color="foo" id="foo">
            35000
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon">
        <${c => c.componentPrefix}-${c => c.tagName} class="icon-${c => c.componentPrefix}-${c => c.tagName}" circular="true" fill="bar" color="foo" id="foo">
            999
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon">
        <${c => c.componentPrefix}-${c => c.tagName} class="icon-${c => c.componentPrefix}-${c => c.tagName}" circular="true" fill="bar" color="foo" id="foo">
            15
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
</div>`;