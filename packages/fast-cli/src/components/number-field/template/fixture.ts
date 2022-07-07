import { htmlTemplate } from "../../../cli.js";

export default htmlTemplate`<h1>${c => c.className}</h1>
<h2>Default</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}>Label</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Hide step</h2>
<${c => c.componentPrefix}-${c => c.tagName} hide-step>Label</${c => c.componentPrefix}-${c => c.tagName}>

<h2>With value</h2>
<${c => c.componentPrefix}-${c => c.tagName} value="10"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>With min 10 and max 100</h2>
<${c => c.componentPrefix}-${c => c.tagName} value="5" min="10" max="100"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>0.1 stepping</h2>
<${c => c.componentPrefix}-${c => c.tagName} value="0.2" step=".1"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Full Width</h2>
<${c => c.componentPrefix}-${c => c.tagName} style="width: 100%;"></${c => c.componentPrefix}-${c => c.tagName}>

<h2>Placeholder</h2>
<${c => c.componentPrefix}-${c => c.tagName} placeholder="Placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h2>Required</h2>
<${c => c.componentPrefix}-${c => c.tagName} required></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h2>Disabled</h2>
<${c => c.componentPrefix}-${c => c.tagName} disabled></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled>label</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} disabled placeholder="placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Read only -->
<h2>Read only</h2>
<${c => c.componentPrefix}-${c => c.tagName} readonly value="10"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} readonly value="20">label</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Autofocus -->
<h2>Autofocus</h2>
<${c => c.componentPrefix}-${c => c.tagName} autofocus>autofocus</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Maxlength -->
<h2>Maxlength</h2>
<${c => c.componentPrefix}-${c => c.tagName} maxlength="8">maxlength</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Minlength -->
<h2>Minlength</h2>
<${c => c.componentPrefix}-${c => c.tagName} minlength="8">minlength</${c => c.componentPrefix}-${c => c.tagName}>

<!-- Start -->
<h2>With start</h2>
<${c => c.componentPrefix}-${c => c.tagName}>
    <svg
        slot="start"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.5,7.7h-1v-1h1V7.7z M10.6,7.7h-1v-1h1V7.7z M14.7,6.7v2.1h-1v2.6c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.1-0.3,0.3-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1H10l-3.5,3v-3H3.9c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.1-0.6V8.8h-1V6.7h1V5.2c0-0.2,0-0.4,0.1-0.6c0.1-0.2,0.2-0.4,0.3-0.5c0.1-0.1,0.3-0.3,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.1h3.6V1.9C7.3,1.8,7.2,1.7,7.1,1.5C7,1.4,7,1.2,7,1C7,0.9,7,0.8,7,0.6c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2C7.7,0,7.9,0,8,0c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.1,0.3,0.2C8.8,0.4,8.9,0.5,9,0.6C9,0.8,9,0.9,9,1c0,0.2,0,0.4-0.1,0.5C8.8,1.7,8.7,1.8,8.5,1.9v1.7h3.6c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.4,0.2,0.5,0.3c0.1,0.1,0.3,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.1,0.6v1.5H14.7z M12.6,5.2c0-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2H3.9c-0.1,0-0.3,0.1-0.4,0.2C3.4,4.9,3.4,5,3.4,5.2v6.2c0,0.1,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.2,0.4,0.2h3.6v1.8l2.1-1.8h2.5c0.1,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.2-0.4V5.2z M5.8,8.9c0.3,0.3,0.6,0.5,1,0.7C7.2,9.7,7.6,9.8,8,9.8s0.8-0.1,1.2-0.2c0.4-0.2,0.7-0.4,1-0.7l0.7,0.7c-0.4,0.4-0.8,0.7-1.4,0.9c-0.5,0.2-1,0.3-1.6,0.3s-1.1-0.1-1.6-0.3c-0.5-0.2-1-0.5-1.3-0.9L5.8,8.9z"
        />
    </svg>
</${c => c.componentPrefix}-${c => c.tagName}>

<!-- End -->
<h2>With end</h2>
<${c => c.componentPrefix}-${c => c.tagName}>
    <svg
        slot="end"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.5,7.7h-1v-1h1V7.7z M10.6,7.7h-1v-1h1V7.7z M14.7,6.7v2.1h-1v2.6c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.1-0.3,0.3-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.1H10l-3.5,3v-3H3.9c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.4-0.2-0.5-0.3c-0.1-0.1-0.3-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.1-0.6V8.8h-1V6.7h1V5.2c0-0.2,0-0.4,0.1-0.6c0.1-0.2,0.2-0.4,0.3-0.5c0.1-0.1,0.3-0.3,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.1h3.6V1.9C7.3,1.8,7.2,1.7,7.1,1.5C7,1.4,7,1.2,7,1C7,0.9,7,0.8,7,0.6c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2C7.7,0,7.9,0,8,0c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.1,0.3,0.2C8.8,0.4,8.9,0.5,9,0.6C9,0.8,9,0.9,9,1c0,0.2,0,0.4-0.1,0.5C8.8,1.7,8.7,1.8,8.5,1.9v1.7h3.6c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.4,0.2,0.5,0.3c0.1,0.1,0.3,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.1,0.6v1.5H14.7z M12.6,5.2c0-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2H3.9c-0.1,0-0.3,0.1-0.4,0.2C3.4,4.9,3.4,5,3.4,5.2v6.2c0,0.1,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.2,0.4,0.2h3.6v1.8l2.1-1.8h2.5c0.1,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.2-0.4V5.2z M5.8,8.9c0.3,0.3,0.6,0.5,1,0.7C7.2,9.7,7.6,9.8,8,9.8s0.8-0.1,1.2-0.2c0.4-0.2,0.7-0.4,1-0.7l0.7,0.7c-0.4,0.4-0.8,0.7-1.4,0.9c-0.5,0.2-1,0.3-1.6,0.3s-1.1-0.1-1.6-0.3c-0.5-0.2-1-0.5-1.3-0.9L5.8,8.9z"
        />
    </svg>
</${c => c.componentPrefix}-${c => c.tagName}>

<h2>Filled</h2>
<h5>Default</h5>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled">label</${c => c.componentPrefix}-${c => c.tagName}>

<h5>Placeholder</h5>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" placeholder="Placeholder"></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Required -->
<h5>Required</h5>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" required></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Disabled -->
<h5>Disabled</h5>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" disabled></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" disabled>label</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}
    appearance="filled"
    disabled
    placeholder="placeholder"
></${c => c.componentPrefix}-${c => c.tagName}>

<!-- Read only -->
<h5>Read only</h5>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" readonly value="Readonly"></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName} appearance="filled" readonly value="Readonly">
    label
</${c => c.componentPrefix}-${c => c.tagName}>

<!-- With label -->
<h2>Visual vs audio label</h2>
<${c => c.componentPrefix}-${c => c.tagName}>
    <span aria-label="Audio label">Visible label</span>
</${c => c.componentPrefix}-${c => c.tagName}>

<!-- With aria-label -->
<h2>With aria-label</h2>
<${c => c.componentPrefix}-${c => c.tagName} aria-label="Text field with aria-label"></${c => c.componentPrefix}-${c => c.tagName}>

<form class="form" name="myForm" action="#">
    <!-- In a form -->
    <h2>In a form</h2>
    <${c => c.componentPrefix}-${c => c.tagName}
        name="fname"
        aria-label="Text field with aria-label"
    ></${c => c.componentPrefix}-${c => c.tagName}>
    <input type="submit" value="submit" />
</form>

<h2>One default, one with start slot, and one with end slot</h2>
<${c => c.componentPrefix}-${c => c.tagName}></${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}>
    <svg slot="start" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${c => c.componentPrefix}-${c => c.tagName}>
<${c => c.componentPrefix}-${c => c.tagName}>
    <svg slot="end" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.5 7.7h-1v-1h1v1zm4.1 0h-1v-1h1v1zm4.1-1v2.1h-1v2.6l-.1.6-.3.5c-.1.1-.3.3-.5.3l-.6.1H10l-3.5 3v-3H3.9l-.6-.1-.5-.3c-.1-.1-.3-.3-.3-.5l-.1-.6V8.8h-1V6.7h1V5.2l.1-.6.3-.5c.1-.1.3-.3.5-.3l.6-.1h3.6V1.9a.8.8 0 01-.4-.4L7 1V.6l.2-.3.3-.2L8 0l.4.1.3.2.3.3V1l-.1.5-.4.4v1.7h3.6l.6.1.5.3c.1.1.3.3.3.5l.1.6v1.5h1.1zm-2.1-1.5l-.2-.4-.4-.2H3.9l-.4.2-.1.4v6.2l.2.4.4.2h3.6v1.8L9.7 12h2.5l.4-.2.2-.4V5.2zM5.8 8.9l1 .7 1.2.2a5 5 0 001.2-.2l1-.7.7.7c-.4.4-.8.7-1.4.9-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3A3 3 0 015 9.6l.8-.7z"
        />
    </svg>
</${c => c.componentPrefix}-${c => c.tagName}>
`;