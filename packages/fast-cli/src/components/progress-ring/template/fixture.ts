import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<div style="width: 300px;">
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="75"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>
</div>
<h2>Paused</h2>
<div style="width: 300px;">
    <${config.componentPrefix}-${config.tagName} paused="true" min="0" max="100" value="75"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} paused="true"></${config.componentPrefix}-${config.tagName}>
</div>
<h2>Custom Sizes</h2>
<div style="width: 300px;">
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="20"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="40" style="height: 8px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="60" style="height: 12px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="80" style="height: 16px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="0" max="100" value="100" style="height: 20px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} style="height: 8px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} style="height: 12px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} style="height: 16px;"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} style="height: 20px;"></${config.componentPrefix}-${config.tagName}>
</div>

<h2>vary min/max</h2>
<div style="width: 300px;">
    <${config.componentPrefix}-${config.tagName} min="2" max="6" value="2"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="2" max="6" value="3"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="2" max="6" value="4"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="2" max="6" value="5"></${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} min="2" max="6" value="6"></${config.componentPrefix}-${config.tagName}>
</div>
`;