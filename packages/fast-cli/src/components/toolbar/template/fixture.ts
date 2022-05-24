import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <defs>
        <symbol id="icon" viewBox="0 0 16 16">
            <path
                d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
            />
        </symbol>
    </defs>
</svg>

<h1>${config.className}</h1>

<h2>Default</h2>
<${config.tagName}>
    <button>Button</button>
    <button slot="end">End Slot Button</button>
    <button slot="start">Start Slot Button</button>
    <select>
        <option>Option 1</option>
        <option>Second option</option>
        <option>Option 3</option>
    </select>
    <label for="check-1">
        <input type="checkbox" name="checkbox" id="check-1" />
        Checkbox 1
    </label>
    <label for="check-2">
        <input type="checkbox" name="checkbox" id="check-2" />
        Checkbox 2
    </label>
    <label for="check-3">
        <input type="checkbox" name="checkbox" id="check-3" />
        Checkbox 3
    </label>
    <input type="text" name="text" id="text-input" />
</${config.tagName}>

<h2>Toolbar with slotted label</h2>
<${config.tagName} id="toolbar-slotted-label">
    <label slot="label">Slotted label</label>
    <button>One</button>
    <button>Two</button>
    <button>Three</button>
</${config.tagName}>

<h2>Toolbar with external label</h2>
<label id="toolbar-label" for="toolbar-external-label">External label</label>
<${config.tagName} id="toolbar-external-label" aria-labelledby="toolbar-label">
    <button>One</button>
    <button>Two</button>
    <button>Three</button>
</${config.tagName}>

<h2>Toolbar with invisible label</h2>
<${config.tagName} id="toolbar-invisible-label" aria-label="Invisible label">
    <button>One</button>
    <button>Two</button>
    <button>Three</button>
</${config.tagName}>

<h2>Vertical orientation</h2>
<${config.tagName} id="toolbar-vertical-orientation" orientation="vertical">
    <button>One</button>
    <button>Two</button>
    <button>Three</button>
    <button slot="end">End Slot Button</button>
    <button slot="start">Start Slot Button</button>
</${config.tagName}>

<h2>Disabled Elements</h2>
<${config.tagName} id="toolbar-first-disabled" orientation="vertical">
    <input type="checkbox" disabled name="a" /><label for="a">One</label>
    <input type="checkbox" name="b" /><label for="b">Two</label>
    <input type="checkbox" name="c" /><label for="c">.*</label>
</${config.tagName}>

<${config.tagName} id="toolbar-second-disabled" orientation="vertical">
    <input type="checkbox" name="d" /><label for="d">.*</label>
    <input type="checkbox" disabled name="e" /><label for="e">Two</label>
    <input type="checkbox" name="f" /><label for="f">.*</label>
</${config.tagName}>

<${config.tagName} id="toolbar-last-disabled" orientation="vertical">
    <input type="checkbox" name="g" /><label for="g">.*</label>
    <input type="checkbox" name="h" /><label for="h">.*</label>
    <input type="checkbox" disabled name="i" /><label for="i">Three</label>
</${config.tagName}>

<${config.tagName} id="toolbar-last-two-disabled" orientation="vertical">
    <input type="checkbox" name="j" /><label for="j">.*</label>
    <input type="checkbox" disabled name="k" /><label for="k">Two</label>
    <input type="checkbox" disabled name="l" /><label for="l">Three</label>
</${config.tagName}>

<${config.tagName} id="toolbar-first-last-disabled" orientation="vertical">
    <input type="checkbox" disabled name="m" /><label for="m">One</label>
    <input type="checkbox" name="n" /><label for="n">.*</label>
    <input type="checkbox" disabled name="o" /><label for="o">Three</label>
</${config.tagName}>

<${config.tagName} id="toolbar-first-two-disabled" orientation="vertical">
    <input type="checkbox" disabled name="p" /><label for="q">One</label>
    <input type="checkbox" disabled name="q" /><label for="q">Two</label>
    <input type="checkbox" name="r" /><label for="r">.*</label>
</${config.tagName}>

<${config.tagName} id="toolbar-disabled-all" orientation="vertical">
    <input type="checkbox" disabled name="s" /><label for="s">One</label>
    <input type="checkbox" disabled name="t" /><label for="t">Two</label>
    <input type="checkbox" disabled name="u" /><label for="u">Three</label>
</${config.tagName}>

<h2>RTL Mode</h2>
<${config.tagName} id="toolbar-rtl" dir="rtl">
    <input type="checkbox" name="v" /><label for="v">.*</label>
    <input type="checkbox" name="w" /><label for="w">.*</label>
    <input type="checkbox" name="x" /><label for="x">.*</label>
</${config.tagName}>

<${config.tagName} id="toolbar-rtl-vertical" dir="rtl" orientation="vertical">
    <input type="checkbox" name="y" /><label for="y">.*</label>
    <input type="checkbox" name="z" /><label for="z">.*</label>
    <input type="checkbox" name="a1" /><label for="a1">.*</label>
</${config.tagName}>

<h2>Start/End Slots</h2>
<${config.tagName} id="toolbar-start-end-slots">
    <svg slot="start"><use href="#icon" /></svg>
    <svg slot="end"><use href="#icon" /></svg>
    <button slot="end">End Slot Button</button>
    <button slot="start">Start Slot Button</button>
</${config.tagName}>

<${config.tagName} id="toolbar-start-end-slots-vertical" orientation="vertical">
    <svg slot="start"><use href="#icon" /></svg>
    <svg slot="end"><use href="#icon" /></svg>
    <button slot="end">End Slot Button</button>
    <button slot="start">Start Slot Button</button>
</${config.tagName}>`;