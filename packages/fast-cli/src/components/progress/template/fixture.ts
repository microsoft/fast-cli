import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<div style="width: 300px;">
    <${config.tagName} min="0" max="100" value="75"></${config.tagName}>
    <${config.tagName}></${config.tagName}>
</div>
<h2>Paused</h2>
<div style="width: 300px;">
    <${config.tagName} paused="true" min="0" max="100" value="75"></${config.tagName}>
    <${config.tagName} paused="true"></${config.tagName}>
</div>
<h2>Custom Sizes</h2>
<div style="width: 300px;">
    <${config.tagName} min="0" max="100" value="20"></${config.tagName}>
    <${config.tagName} min="0" max="100" value="40" style="height: 8px;"></${config.tagName}>
    <${config.tagName} min="0" max="100" value="60" style="height: 12px;"></${config.tagName}>
    <${config.tagName} min="0" max="100" value="80" style="height: 16px;"></${config.tagName}>
    <${config.tagName} min="0" max="100" value="100" style="height: 20px;"></${config.tagName}>
    <${config.tagName}></${config.tagName}>
    <${config.tagName} style="height: 8px;"></${config.tagName}>
    <${config.tagName} style="height: 12px;"></${config.tagName}>
    <${config.tagName} style="height: 16px;"></${config.tagName}>
    <${config.tagName} style="height: 20px;"></${config.tagName}>
</div>

<h2>vary min/max</h2>
<div style="width: 300px;">
    <${config.tagName} min="2" max="6" value="2"></${config.tagName}>
    <${config.tagName} min="2" max="6" value="3"></${config.tagName}>
    <${config.tagName} min="2" max="6" value="4"></${config.tagName}>
    <${config.tagName} min="2" max="6" value="5"></${config.tagName}>
    <${config.tagName} min="2" max="6" value="6"></${config.tagName}>
</div>
`;