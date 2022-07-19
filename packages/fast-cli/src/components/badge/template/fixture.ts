import { htmlTemplate } from "../../../cli.template.js";

export default htmlTemplate`<style>
    .icon-container {
        position: relative;
        display: inline-flex;
        width: 50px;
        height: 50px;
        background: #dfdfdf;
        margin: 12px;
    }

    .icon-container ${c => c.componentPrefix}-${c => c.tagName} {
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .image-container {
        position: relative;
        display: inline-flex;
    }

    .image-container ${c => c.componentPrefix}-${c => c.tagName} {
        position: absolute;
        right: 6px;
        top: 6px;
    }
</style>
<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}>Accent</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Lightweight</h2>
<${c => c.componentPrefix}-${c => c.tagName}>Lightweight</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Neutral</h2>
<${c => c.componentPrefix}-${c => c.tagName}>Neutral</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Circular</h2>
<${c => c.componentPrefix}-${c => c.tagName} circular>9</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} circular>99</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} circular>9999999</${c => c.componentPrefix}-${c => c.tagName}>
<h2>Examples</h2>
<div>
    <div class="image-container">
        <img src="https://via.placeholder.com/120x140/DFDFDF/171717" />
        <${c => c.componentPrefix}-${c => c.tagName}>
            Sale
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="image-container">
        <img src="https://via.placeholder.com/140x140/DFDFDF/171717" />
        <${c => c.componentPrefix}-${c => c.tagName}>
            App of the day
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
</div>
<div>
    <div class="icon-container">
        <${c => c.componentPrefix}-${c => c.tagName} circular>
            3
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon-container">
        <${c => c.componentPrefix}-${c => c.tagName} circular>
            35000
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon-container">
        <${c => c.componentPrefix}-${c => c.tagName} circular>
            999
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
    <div class="icon-container">
        <${c => c.componentPrefix}-${c => c.tagName} circular>
            15
        </${c => c.componentPrefix}-${c => c.tagName}>
    </div>
</div>`;