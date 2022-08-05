import { Rule } from "eslint";
import type {
    ExportNamedDeclaration
} from "estree";

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

function getBaseName(properties) {
    return properties.find((property) => {
        return property.key.name === "baseName";
    });
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
                const baseClassName = baseName.value.value.charAt(0).toUpperCase() + baseName.value.value.slice(1);

                context.report({
                    node,
                    message: "Update definition export to use FASTElementDefinition and remove deprecated baseName property.",
                    *fix(fixer) {
                        yield fixer.insertTextBefore(
                            body,
                            `import { FASTElementDefinition } from "@microsoft/fast-element";\n` +
                            `import { designSystem } from "../../design-system.js";\n` +
                            `import { ${baseClassName} } from "./${baseName.value.value}.js";\n\n`
                        );
                        yield fixer.replaceText(
                            objectNode,
                            `new FASTElementDefinition(${baseClassName}, {\n` +
                            `    name: \`\${designSystem.prefix}-${baseName.value.value}\`,\n` +
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
        },
    }
}