/**
 * These templates are not typically stand-alone
 * but are used as part of another component, usually nested.
 */
export const companionTemplates = [
    "accordion-item"
]

/**
 * The suggested templates are used by the CLI to suggest
 * foundation templates for the user
 */
export const suggestedTemplates = [
    "accordion",
    "avatar",
    "badge",
    "blank",
    "calendar",
    "card",
    "checkbox",
    "dialog",
    "disclosure",
    "divider",
    "flipper",
    "number-field",
    "progress",
    "progress-ring",
    "search",
    "switch",
    "text-area",
    "text-field",
    "toolbar",
    "tooltip",
];

/**
 * The disallowed names for templates to prevent
 * naming conflicts
 */
export const disallowedTemplateNames = [
    "foundation-accordion",
    "foundation-avatar",
    "foundation-badge",
    "foundation-calendar",
    "foundation-card",
    "foundation-checkbox",
    "foundation-dialog",
    "foundation-disclosure",
    "foundation-divider",
    "foundation-flipper",
    "foundation-number-field",
    "base-progress",
    "foundation-search",
    "foundation-switch",
    "foundation-text-area",
    "foundation-text-field",
    "foundation-toolbar",
    "foundation-tooltip"
]

/**
 * All available templates
 */
export const availableTemplates = suggestedTemplates.concat(companionTemplates);