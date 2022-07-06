import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<div style="width: 300px;">
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="75"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
</div>
<h2>Paused</h2>
<div style="width: 300px;">
    <${c => c.componentPrefix}-${c => c.tagName} paused="true" min="0" max="100" value="75"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} paused="true"></${c => c.componentPrefix}-${c => c.tagName}>
</div>
<h2>Custom Sizes</h2>
<div style="width: 300px;">
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="20"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="40" style="height: 8px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="60" style="height: 12px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="80" style="height: 16px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="0" max="100" value="100" style="height: 20px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} style="height: 8px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} style="height: 12px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} style="height: 16px;"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} style="height: 20px;"></${c => c.componentPrefix}-${c => c.tagName}>
</div>

<h2>vary min/max</h2>
<div style="width: 300px;">
    <${c => c.componentPrefix}-${c => c.tagName} min="2" max="6" value="2"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="2" max="6" value="3"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="2" max="6" value="4"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="2" max="6" value="5"></${c => c.componentPrefix}-${c => c.tagName}>
    <${c => c.componentPrefix}-${c => c.tagName} min="2" max="6" value="6"></${c => c.componentPrefix}-${c => c.tagName}>
</div>
`;