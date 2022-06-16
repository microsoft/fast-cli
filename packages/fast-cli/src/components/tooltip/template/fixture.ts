import type { ComponentTemplateConfig } from "../../../utilities/template";

export default (config: ComponentTemplateConfig): string =>
`<h1>${config.className}</h1>

<h2>Default</h2>
<div style="height: 400px; width: 400px; background: lightgray; overflow: scroll;">
    <${config.componentPrefix}-${config.tagName} anchor="anchor-default">
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <button id="anchor-default" style="margin: 200px; height: 150px; width: 150px;">
        anchor
    </button>
</div>

<h2>Show/Hide with auto updating and lock to viewport</h2>
<div style="height: 400px; width: 100%; background: lightgray; overflow: scroll;">
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-1"
        anchor="anchor-show"
        position="top"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-2"
        anchor="anchor-show"
        position="right"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-3"
        anchor="anchor-show"
        position="bottom"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-4"
        anchor="anchor-show"
        position="left"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <button id="anchor-show" style="margin: 600px 600px 600px 600px;">
        Toggle tooltips
    </button>
</div>

<h2>Show/Hide with auto updating and lock to viewport for Corner Positions</h2>
<div style="height: 400px; width: 100%; background: lightgray; overflow: scroll;">
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-corners-1"
        anchor="anchor-show-corners"
        position="top-left"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-corners-2"
        anchor="anchor-show-corners"
        position="top-right"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-corners-3"
        anchor="anchor-show-corners"
        position="bottom-left"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName}
        id="tooltip-show-corners-4"
        anchor="anchor-show-corners"
        position="bottom-right"
        auto-update-mode="auto"
        vertical-viewport-lock="true"
        horizontal-viewport-lock="true"
    >
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>
    <button id="anchor-show-corners" style="margin: 600px 600px 600px 600px;">
        Toggle tooltips
    </button>
</div>

<h2>Fixed positions</h2>
<div style="height: 400px; width: 400px; background: lightgray; overflow: scroll;">
    <${config.componentPrefix}-${config.tagName} anchor="anchor-positions" position="top" style="position: absolute;">
        Top
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-positions" position="right" style="position: absolute;">
        Right
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-positions" position="bottom" style="position: absolute;">
        Bottom
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-positions" position="left" style="position: absolute;">
        Left
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName}
        anchor="anchor-positions"
        position="top-left"
        style="position: absolute;"
    >
        Top Left
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName}
        anchor="anchor-positions"
        position="top-right"
        style="position: absolute;"
    >
        Top Right
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName}
        anchor="anchor-positions"
        position="bottom-left"
        style="position: absolute;"
    >
        Bottom Left
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName}
        anchor="anchor-positions"
        position="bottom-right"
        style="position: absolute;"
    >
        Bottom Right
    </${config.componentPrefix}-${config.tagName}>

    <button id="anchor-positions" style="margin: 200px;">
        anchor
    </button>
</div>

<h2>in a flex container</h2>
<div
    style="
        height: 400px;
        width: 400px;
        background: lightgray;
        overflow: scroll;
        display: flex;
        align-items: center;
        justify-content: center;
    "
>
    <div style="height: 40px; width: 40px; background-color: blue;"></div>
    <div style="height: 40px; width: 40px; background-color: red;"></div>
    <button id="anchor-flex" style="margin: 20px;">
        anchor
    </button>
    <div style="height: 40px; width: 40px; background-color: orange;"></div>
    <div style="height: 40px; width: 40px; background-color: yellow;"></div>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="top">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="bottom">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="left">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="right">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="top-left">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="top-right">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="bottom-left">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
    <${config.componentPrefix}-${config.tagName} anchor="anchor-flex" position="bottom-right">
        Tooltip
    </${config.componentPrefix}-${config.tagName}>
</div>

<h2>Switch anchors</h2>
<div style="height: 400px; width: 400px; background: lightgray; overflow: scroll;">
    <${config.componentPrefix}-${config.tagName} id="tooltip-anchor-switch">
        Helpful text is helpful
    </${config.componentPrefix}-${config.tagName}>

    <button id="anchor-anchor-switch-prop-1" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-prop-2" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-prop-3" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-prop-4" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-attribute-5" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-attribute-6" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-attribute-7" style="margin: 40px;">
        anchor
    </button>

    <button id="anchor-anchor-switch-attribute-8" style="margin: 40px;">
        anchor
    </button>
</div>

<h2>RTL</h2>
<div
    style="height: 400px; width: 400px; background: lightgray; overflow: scroll;"
    dir="rtl"
>
    <button id="anchor-rtl" style="margin: 200px;">
        anchor
    </button>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-rtl" position="left">
        Left
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-rtl" position="right">
        Right
    </${config.componentPrefix}-${config.tagName}>
</div>

<h2>start/end</h2>
<div style="height: 400px; width: 400px; background: lightgray; overflow: scroll;">
    <button id="anchor-se" style="margin: 200px;">
        anchor
    </button>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="start">
        Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="end">
        End
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="top-start">
        Top Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="top-end">
        Top End
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="bottom-start">
        Bottom Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-se" position="bottom-end">
        Bottom End
    </${config.componentPrefix}-${config.tagName}>
</div>

<h2>start/end RTL</h2>
<div
    style="height: 400px; width: 400px; background: lightgray; overflow: scroll;"
    dir="rtl"
>
    <button id="anchor-sertl" style="margin: 200px;">
        anchor
    </button>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="start">
        Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="end">
        End
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="top-start">
        Top Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="top-end">
        Top End
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="bottom-start">
        Bottom Start
    </${config.componentPrefix}-${config.tagName}>

    <${config.componentPrefix}-${config.tagName} anchor="anchor-sertl" position="bottom-end">
        Bottom End
    </${config.componentPrefix}-${config.tagName}>
</div>`;