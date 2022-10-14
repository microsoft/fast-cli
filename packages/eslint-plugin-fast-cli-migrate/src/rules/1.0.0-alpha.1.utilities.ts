import type { Rule } from "eslint";
import type {
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportSpecifier,
    TaggedTemplateExpression
} from "estree";

function isTypeImport(node: ImportDeclaration & any) {
    return node?.importKind === "type";
}

function getParentVariableDeclarator(node: Rule.Node) {
    if (node.parent.type === "VariableDeclarator" || node.parent === null) {
        return node.parent;
    }

    return getParentVariableDeclarator(node.parent);
}

function hasFileExtension(context: Rule.RuleContext, extension: string) {
    const fileLocation = context.getPhysicalFilename();
    const fileExtension = extension;
    return fileLocation.slice(-(fileExtension.length)) === fileExtension;
}

export function getTaggedTemplateUpdateRules(
    context: Rule.RuleContext,
    tagName: string,
    fileExtension: string,
) {
    return {
        ImportDeclaration(node: ImportDeclaration) {
            if (
                hasFileExtension(context, fileExtension) &&
                isTypeImport(node)
            ) {
                context.report({
                    node,
                    message: "Remove type imports.",
                    fix: (fixer) => {
                        return fixer.remove(node);
                    }
                });
            }
        },
        TaggedTemplateExpression(node: TaggedTemplateExpression & Rule.Node) {
            if (
                hasFileExtension(context, fileExtension) &&
                node.tag.type === "Identifier" &&
                node.tag.name === tagName &&
                node.parent.type === "ArrowFunctionExpression"
            ) {
                const parentVariableDeclarator = getParentVariableDeclarator(node);

                if (parentVariableDeclarator) {
                    const sourceCode = context.getSourceCode();
                    const templateContent = sourceCode.getText(node);

                    context.report({
                        node,
                        message: "Remove wrapping function from template literal.",
                        fix: (fixer) => {
                            return fixer.replaceText(
                                parentVariableDeclarator,
                                `${parentVariableDeclarator.id.name} = ${templateContent}`
                            );
                        }
                    });
                }
            }
        },
    }
}

function getNamedImport(
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[],
    importName: string
) {
    return specifiers.findIndex((specifier) => {
        if (specifier.type === "ImportSpecifier") {
            return specifier.imported.name === importName;
        }

        return false;
    });
}

export function removeNamedImport(node: ImportDeclaration & Rule.Node, sourceValue: string, importName: string) {
    if (node.source.value === sourceValue) {
        const namedImportIndex = getNamedImport(node.specifiers, importName);
        const trailingComma = namedImportIndex !== node.specifiers.length - 1;

        return [node.specifiers[namedImportIndex], trailingComma] || false;
    }
    return false;
}

export function getRemovableNamedImportRange(
    importElement: false | (boolean | ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]
) {
    const rangeEnd = importElement[1]
        ? importElement[0].range[1] + 1
        : importElement[0].range[1];
    return importElement[0].parent.specifiers.length === 1
        ? importElement[0].parent.range
        : [
            importElement[0].range[0],
            rangeEnd
        ];
}