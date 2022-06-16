import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<style>
    ${config.tagName}-item.disabled::part(button) {
        pointer-events: none;
    }
</style>

<h1>${config.className}Item</h1>

<h2>Default</h2>
<${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}-item expanded>
        <div slot="start">
            <button>1</button>
        </div>
        <div slot="end">
            <button>1</button>
        </div>
        <span slot="heading">Panel one</span>
        Panel one content
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item expanded>
        <span slot="heading">Panel two</span>
        <fast-button tabindex="0">Button</fast-button>
        <fast-button tabindex="0">Button</fast-button>
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item expanded>
        <span slot="heading">Panel three</span>
        Panel three content
    </${config.componentPrefix}-${config.tagName}-item>
</${config.componentPrefix}-${config.tagName}>

<h2>Single expand</h2>
<${config.componentPrefix}-${config.tagName} expand-mode="single">
    <${config.componentPrefix}-${config.tagName}-item>
        <div slot="start">
            <button>1</button>
        </div>
        <div slot="end">
            <button>1</button>
        </div>
        <span slot="heading">Panel one</span>
        Panel one content
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item class="disabled">
        <span slot="heading">Panel Two</span>
        Panel two content
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item>
        <span slot="heading">Panel three</span>
        Panel three content
    </${config.componentPrefix}-${config.tagName}-item>
</${config.componentPrefix}-${config.tagName}>

<h2>With disabled item</h2>
<${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}-item>
        <div slot="start">
            <button>1</button>
        </div>
        <div slot="end">
            <button>1</button>
        </div>
        <span slot="heading">Panel two</span>
        Panel one content
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item class="disabled">
        <div slot="start">
            <button>1</button>
        </div>
        <div slot="end">
            <button>1</button>
        </div>
        <span slot="heading">Disabled</span>
        Disabled content
    </${config.componentPrefix}-${config.tagName}-item>
    <${config.componentPrefix}-${config.tagName}-item expanded>
        <div slot="start">
            <button>1</button>
        </div>
        <div slot="end">
            <button>1</button>
        </div>
        <span slot="heading">Panel three</span>
        Panel three content
    </${config.componentPrefix}-${config.tagName}-item>
</${config.componentPrefix}-${config.tagName}>

<h2>Custom expanded and collapsed icons</h2>
<${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}-item expanded>
        <span slot="heading">Panel one</span>
        <svg
            slot="collapsed-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 14.2037C7 15.0444 7.97434 15.5098 8.62834 14.9816L13.351 11.1671C14.0943 10.5668 14.0943 9.4337 13.351 8.83333L8.62834 5.01887C7.97434 4.49064 7 4.95613 7 5.79681V14.2037Z"
            />
        </svg>
        <svg
            slot="expanded-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.79681 7C4.95612 7 4.49064 7.97434 5.01887 8.62834L8.83333 13.351C9.43371 14.0943 10.5668 14.0943 11.1672 13.351L14.9816 8.62834C15.5098 7.97434 15.0444 7 14.2037 7H5.79681Z"
            />
        </svg>
        Panel one content
    </${config.componentPrefix}-${config.tagName}-item>
</${config.componentPrefix}-${config.tagName}>`;