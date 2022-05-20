import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>
<h2>Default</h2>
<${config.tagName}></${config.tagName}>
<${config.tagName}>Label</${config.tagName}>
<${config.tagName}><span>Span Label</span></${config.tagName}>

<h2>Full Width</h2>
<${config.tagName} style="width: 100%;"></${config.tagName}>

<h2>Placeholder</h2>
<${config.tagName} placeholder="Placeholder"></${config.tagName}>

<!-- Required -->
<h2>Required</h2>
<${config.tagName} required></${config.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${config.tagName} disabled></${config.tagName}>
<${config.tagName} disabled>label</${config.tagName}>
<${config.tagName} disabled placeholder="placeholder"></${config.tagName}>

<!-- Read only -->
<h2>Read only</h2>
<${config.tagName} readonly value="Readonly"></${config.tagName}>
<${config.tagName} readonly value="Readonly">label</${config.tagName}>

<!-- Autofocus -->
<h2>Autofocus</h2>
<${config.tagName} autofocus>autofocus</${config.tagName}>

<!-- Maxlength -->
<h2>Maxlength</h2>
<${config.tagName} maxlength="8">maxlength</${config.tagName}>

<!-- Minlength -->
<h2>Minlength</h2>
<${config.tagName} minlength="8">minlength</${config.tagName}>

<!-- Start -->
<h2>With start</h2>
<${config.tagName}>
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${config.tagName}>

<!-- End -->
<h2>With end</h2>
<${config.tagName}>
    <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${config.tagName}>

<h2>Filled</h2>
<h3>Default</h3>
<${config.tagName} appearance="filled"></${config.tagName}>
<${config.tagName} appearance="filled">label</${config.tagName}>

<h3>Placeholder</h3>
<${config.tagName} appearance="filled" placeholder="Placeholder"></${config.tagName}>

<!-- Required -->
<h3>Required</h3>
<${config.tagName} appearance="filled" required></${config.tagName}>

<!-- Disabled -->
<h3>Disabled</h3>
<${config.tagName} appearance="filled" disabled></${config.tagName}>
<${config.tagName} appearance="filled" disabled>label</${config.tagName}>
<${config.tagName} appearance="filled" disabled placeholder="placeholder"></${config.tagName}>

<!-- Read only -->
<h3>Read only</h3>
<${config.tagName} appearance="filled" readonly value="Readonly"></${config.tagName}>
<${config.tagName} appearance="filled" readonly value="Readonly">label</${config.tagName}>

<!-- With label -->
<h2>Visual vs audio label</h2>
<${config.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${config.tagName}>

<!-- With aria-label -->
<h2>With aria-label</h2>
<${config.tagName} aria-label="Text field with aria-label"></${config.tagName}>

<form class="form" name="myForm" action="javascript:void(0)">
    <!-- In a form -->
    <h2>In a form</h2>
    <${config.tagName} name="fname" aria-label="Text field with aria-label"></${config.tagName}>
    <input type="submit" value="submit" />
</form>

<h2>One default, one with start slot, and one with end slot</h2>
<${config.tagName}></${config.tagName}>
<${config.tagName}>
    <svg slot="start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${config.tagName}>
<${config.tagName}>
    <svg slot="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${config.tagName}>`;