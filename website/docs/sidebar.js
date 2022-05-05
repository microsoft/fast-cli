import versions from "./versions.json" assert {type: "json"};
const cliPackageName = "@microsoft/fast-cli";

/**
 * The contents of the "documentation" property can either be a "doc" or "category".
 *
 * A "doc" must contain the following properties:
 * {
 *   type: "doc", // identify this item as a document
 *   label: "Example" // the readable label used in the sidebar UI
 *   path: "path/to/example" // the path to the file the doc is referencing without the ".md"
 * }
 *
 * A "category" must contain the following properties:
 * {
 *   type: "category", // identify this item as a category
 *   label: "Example", // the readable label used in the sidebar UI
 *   path: "path/to/example", // the path to use as an index of items
 *   description: "" // a description that will show up as a paragraph on the category page
 *   items: [ // the list of items in this category
 *     {
 *       type: "doc", // nesting only goes one level deep, do not place a category type as a category item
 *       ...see above "doc" type
 *     }
 *   ]
 * }
 */
export default {
    documentation: [
        {
            type: "doc",
            label: "Introduction",
            path: "introduction",
        },
        {
            type: "doc",
            label: "Initialize",
            path: "initialize",
        },
        {
            type: "doc",
            label: "Configure",
            path: "configure"
        },
        {
            type: "doc",
            label: "Add a design system",
            path: "add-a-design-system",
        },
        {
            type: "doc",
            label: "Add a component",
            path: "add-a-component",
        },
        {
            type: "category",
            label: "Templates",
            path: "templates",
            description: "Create your own templates to scaffold a project or component. Template provide scaffolding for entire projects and smaller pieces of code to accelerate developer workflows.",
            items: [
                {
                    type: "doc",
                    label: "Component",
                    path: "templates/component"
                }
            ]
        }
    ],
};
