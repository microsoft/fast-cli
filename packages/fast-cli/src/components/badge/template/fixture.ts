import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<style>
    ${config.componentPrefix}-${config.tagName} {
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

    .icon-${config.componentPrefix}-${config.tagName} {
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .image-container {
        position: relative;
        display: inline-flex;
    }

    .image-${config.componentPrefix}-${config.tagName} {
        position: absolute;
        right: 6px;
        top: 6px;
    }
</style>
<h1>${config.className}</h1>
<h2>Default</h2>
<${config.componentPrefix}-${config.tagName}>Accent</${config.componentPrefix}-${config.tagName}>
<h2>Default with color map</h2>
<${config.componentPrefix}-${config.tagName}
    fill="primary"
    style="font-size: 10px; line-height: 16px;"
    color="foo"
    id="foo"
>
    Badge
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} fill="secondary" color="foo" id="foo">
    Badge
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName}
    fill="tertiary"
    style="font-size: 14px; line-height: 20px;"
    color="bar"
    id="foo"
>
    Badge
</${config.componentPrefix}-${config.tagName}>
<h2>Circular</h2>
<${config.componentPrefix}-${config.tagName} fill="primary" color="foo" id="foo" circular="true">
    9
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} fill="secondary" color="foo" id="foo" circular="true">
    99
</${config.componentPrefix}-${config.tagName}>
<${config.componentPrefix}-${config.tagName} fill="tertiary" color="bar" id="foo" circular="true">
    9999999
</${config.componentPrefix}-${config.tagName}>
<h2>Examples</h2>
<div>
    <div class="image-container">
        <img src="https://via.placeholder.com/120x140/DFDFDF/171717" />
        <${config.componentPrefix}-${config.tagName} class="image-${config.componentPrefix}-${config.tagName}" fill="foo" color="foo" id="foo">
            Sale
        </${config.componentPrefix}-${config.tagName}>
    </div>
    <div class="image-container">
        <img src="https://via.placeholder.com/140x140/DFDFDF/171717" />
        <${config.componentPrefix}-${config.tagName} class="image-${config.componentPrefix}-${config.tagName}" fill="secondary" color="foo" id="foo">
            App of the day
        </${config.componentPrefix}-${config.tagName}>
    </div>
</div>
<div>
    <div class="icon">
        <${config.componentPrefix}-${config.tagName} class="icon-${config.componentPrefix}-${config.tagName}" circular="true" fill="bar" color="foo" id="foo">
            3
        </${config.componentPrefix}-${config.tagName}>
    </div>
    <div class="icon">
        <${config.componentPrefix}-${config.tagName} class="icon-${config.componentPrefix}-${config.tagName}" circular="true" fill="bar" color="foo" id="foo">
            35000
        </${config.componentPrefix}-${config.tagName}>
    </div>
    <div class="icon">
        <${config.componentPrefix}-${config.tagName} class="icon-${config.componentPrefix}-${config.tagName}" circular="true" fill="bar" color="foo" id="foo">
            999
        </${config.componentPrefix}-${config.tagName}>
    </div>
    <div class="icon">
        <${config.componentPrefix}-${config.tagName} class="icon-${config.componentPrefix}-${config.tagName}" circular="true" fill="bar" color="foo" id="foo">
            15
        </${config.componentPrefix}-${config.tagName}>
    </div>
</div>`;