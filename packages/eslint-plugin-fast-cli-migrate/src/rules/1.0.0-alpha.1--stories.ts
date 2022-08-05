import type { Rule } from "eslint";
import type {
    ExpressionStatement,
    Identifier,
    ImportDeclaration
} from "estree";

export const meta = {
    type: "problem",
    docs: {
        description: "Update stories files.",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--stories.ts",
    },
    fixable: true,
    schema: [],
};

function isStoriesFile(context: Rule.RuleContext): boolean {
    const fileLocation = context.getPhysicalFilename();
    const fileExtension = ".stories.ts";
    return fileLocation.slice(-(fileExtension.length)) === fileExtension;
}

function isComponentImport(node: ImportDeclaration): boolean {
    return node.source.value === "./define.js" && node.specifiers.length === 1
}

function isDesignSystemImport(node: ImportDeclaration): boolean {
    return node.source.value === "@microsoft/fast-foundation";
}

function isDesignSystemConfigImport(node: ImportDeclaration): boolean {
    return node.source.value === "../../design-system.js";
}

function getParentExpressionStatement(node: Rule.Node): null | ExpressionStatement {
    if (node.parent) {
        if (node.parent.type === "ExpressionStatement") {
            return node.parent;
        }

        return getParentExpressionStatement(node.parent);
    }

    return null;
}


export function create(context: Rule.RuleContext) {
    return {
        Identifier(node: Identifier & Rule.Node) {
            if (isStoriesFile(context) && node.name === "DesignSystem") {
                const parentExpressionStatement = getParentExpressionStatement(node);

                if (parentExpressionStatement) {
                    context.report({
                        node,
                        message: "Remove registry by the DesignSystem",
                        fix: (fixer) => {
                            return fixer.remove(parentExpressionStatement);
                        }
                    });
                }
            }
        },
        ImportDeclaration(node: ImportDeclaration) {
            if (
                isStoriesFile(context) &&
                (
                    isComponentImport(node) ||
                    isDesignSystemImport(node) ||
                    isDesignSystemConfigImport(node)
                )
            ) {
                context.report({
                    node,
                    message: "Remove",
                    fix: (fixer) => {
                        return fixer.remove(node);
                    }
                });
            }
        }
    }
}