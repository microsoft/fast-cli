import type { Rule } from "eslint";
import type {
    ExportNamedDeclaration,
    Identifier,
    ImportDeclaration,
    Property,
    SpreadElement,
    VariableDeclaration,
    VariableDeclarator
} from "estree";
import { getRemovableNamedImportRange, removeNamedImport } from "./1.0.0-alpha.1.utilities";

export const meta = {
    type: "problem",
    docs: {
        description: "Update design system",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--design-system.ts",
    },
    fixable: true,
    schema: [],
};

function getExpressionStatement(node: any) {
    if (node?.parent?.type === "ExpressionStatement") {
        return node.parent;
    } else if (node?.parent) {
        return getExpressionStatement(node?.parent);
    }

    return null;
}

function getDesignSystemObject(node: VariableDeclarator): Array<Property | SpreadElement> {
    if (node.init) { // node is an object
      if (node.init.type === "ObjectExpression") {
        return node.init.properties;
      } else if ( // node is in an Object method such as freeze
        node.init.type === "CallExpression" &&
        node.init.arguments[0].type === "ObjectExpression"
      ) {
        return node.init.arguments[0].properties;
      }
    }
  
    return [];
}

function getPrefixAndRegistry(
    node: Array<Property | SpreadElement>
): { [key: string]: unknown } {
    let prefixAndRegistry: { [key: string]: unknown } = {};
    
    for (const item of node) {
        if (
            item.type === "Property" &&
            item.key &&
            item.value &&
            item.key.type === "Identifier"
        ) {
            if (item.value.type === "Identifier") {
                prefixAndRegistry = {
                    ...prefixAndRegistry,
                    [item.key.name]: item.value.name
                };
            } else if (item.value.type === "Literal") {
                prefixAndRegistry = {
                    ...prefixAndRegistry,
                    [item.key.name]: item.value.value
                };
            }
        }
    }

    return prefixAndRegistry;
}

function isComponentsImport(node: ImportDeclaration & Rule.Node) {
    return (
        node.source.type === "Literal" &&
        node.specifiers.length === 1 &&
        node.specifiers[0].type === "ImportDefaultSpecifier" &&
        node.specifiers[0].local.name === "components"
    );
}

export function create(context: Rule.RuleContext) {
    return {
        ExportNamedDeclaration(node: ExportNamedDeclaration) {
            if (
                node.declaration.type === "VariableDeclaration" &&
                node.declaration.declarations.length === 1 &&
                node.declaration.declarations[0].type === "VariableDeclarator" &&
                node.declaration.declarations[0].id.type === "Identifier" &&
                node.declaration.declarations[0].id.name === "designSystem"
            ) {
                const designSystemObjectProperties = getDesignSystemObject(
                    (node.declaration as VariableDeclaration).declarations[0]
                );
                const prefixAndRegistry = getPrefixAndRegistry(
                    designSystemObjectProperties
                );
                if (prefixAndRegistry.registry !== "customElements") {
                    context.report({
                        node,
                        message: `Update design system export to include a registry.`,
                        fix: (fixer) => {
                            return fixer.replaceText(
                                node,
                                `export const designSystem = Object.freeze({\n` +
                                `    prefix: "${prefixAndRegistry.prefix}",\n` +
                                `    shadowRootMode: "open",\n` +
                                `    registry: customElements\n` +
                                `});`
                            )
                        }
                    });
                }
            }
        },
        Identifier(node: Identifier) {
            if (node.name === "DesignSystem") {
                const parentExpressionStatement = getExpressionStatement(node);

                if (parentExpressionStatement) {
                    context.report({
                        node,
                        message: "Remove deprecated registration override API.",
                        fix: (fixer) => {
                            return fixer.replaceText(
                                parentExpressionStatement,
                                ""
                            );
                        }
                    });
                }
            }
        },
        ImportDeclaration(node: ImportDeclaration & Rule.Node) {
            const designSystemImport = removeNamedImport(
                node,
                "@microsoft/fast-foundation",
                "DesignSystem"
            );
            
            if (isComponentsImport(node)) {
                context.report({
                    node,
                    message: "The components export has been removed as the registration API has changed and replaced with a direct import",
                    *fix(fixer: Rule.RuleFixer) {
                        yield fixer.replaceText(node, `import "${node.source.value}";`);
                    }
                });
            }

            if (designSystemImport[0]) {
                const removableRange = getRemovableNamedImportRange(designSystemImport);

                context.report({
                    node,
                    message: "DesignSystem has been removed, this type export is deprecated",
                    *fix(fixer: Rule.RuleFixer) {
                        yield fixer.removeRange(removableRange);
                    }
                });
            }
        },
    };
}