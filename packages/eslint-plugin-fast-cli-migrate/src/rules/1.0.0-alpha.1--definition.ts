import { Rule } from "eslint";
import type {
    ExportNamedDeclaration,
    Literal,
    Property,
    SpreadElement
} from "estree";
import { spinalCase } from "./utilities/string";

export const meta = {
    type: "problem",
    docs: {
        description: "Update the definition files for components",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--definition.ts",
    },
    fixable: true,
    schema: [],
};

function getBaseName(properties: (Property | SpreadElement)[]): Property | void {
    return properties.find((property) => {
        if (
            property.type === "Property" &&
            property.key.type === "Identifier"
        ) {
            return property.key.name === "baseName";
        }
    }) as Property;
}

function isDefinitionFile(context: Rule.RuleContext) {
    const fileLocation = context.getPhysicalFilename();
    const fileExtension = ".definition.ts";
    return fileLocation.slice(-(fileExtension.length)) === fileExtension;
}

export function create(context: Rule.RuleContext) {
    return {
        ExportNamedDeclaration(node: ExportNamedDeclaration & Rule.Node) {
            if (
                isDefinitionFile(context) &&
                node.declaration.type === "VariableDeclaration" &&
                node.declaration.declarations.length === 1 &&
                node.declaration.declarations[0].type === "VariableDeclarator" &&
                node.declaration.declarations[0].init.type === "ObjectExpression"
            ) {
                const objectNode = node.declaration.declarations[0].init;
                const body = node.parent;
                const baseName = getBaseName(objectNode.properties);

                if (
                    baseName &&
                    baseName.value.type === "Literal" &&
                    typeof baseName.value.value === "string"
                ) {
                    const baseClassName = baseName.value.value.charAt(0).toUpperCase() + baseName.value.value.slice(1);
                    const baseSpinalCaseName = spinalCase(baseName.value.value);

                    context.report({
                        node,
                        message: "Update definition export to use FASTElementDefinition and remove deprecated baseName property.",
                        *fix(fixer: Rule.RuleFixer) {
                            yield fixer.insertTextBefore(
                                body,
                                `import { designSystem } from "../../design-system.js";\n` +
                                `import { template } from "./${baseSpinalCaseName}.template.js";\n` +
                                `import { styles } from "./${baseSpinalCaseName}.styles.js";\n` +
                                `import { ${baseClassName} } from "./${(baseName.value as Literal).value}.js";\n\n`
                            );
                            yield fixer.replaceText(
                                objectNode,
                                `${baseClassName}.compose({\n` +
                                `    name: \`\${designSystem.prefix}-${baseSpinalCaseName}\`,\n` +
                                `    template,\n` +
                                `    styles,\n` +
                                `    shadowOptions: {\n` +
                                `        mode: designSystem.shadowRootMode,\n` +
                                `        delegatesFocus: true\n` +
                                `    }\n` +
                                `});`
                            );
                        }
                    });
                }
            }
        },
    }
}