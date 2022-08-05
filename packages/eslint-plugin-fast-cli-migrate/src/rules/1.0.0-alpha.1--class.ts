import { Rule } from "eslint";
import type {
    Identifier,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportSpecifier
} from "estree";

export const meta = {
    type: "problem",
    docs: {
        description: "Update classes relying on FoundationElement to use FASTElement",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--class.ts",
    },
    fixable: true,
    schema: [],
};

function getFoundateElementImport(
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[]
) {
    return specifiers.findIndex((specifier) => {
        if (specifier.type === "ImportSpecifier") {
            return specifier.imported.name === "FoundationElement";
        }

        return false;
    });
}

function importsFoundationElement(node: ImportDeclaration & Rule.Node) {
    if (node.source.value === "@microsoft/fast-foundation") {
        const foundationElementImportIndex = getFoundateElementImport(node.specifiers);
        const trailingComma = foundationElementImportIndex !== node.specifiers.length - 1;

        return [node.specifiers[foundationElementImportIndex], trailingComma] || false;
    }
    return false;
}

function getFoundationElementImport(node: ImportDeclaration & Rule.Node) {
    return importsFoundationElement(node);
}

export function create(context: Rule.RuleContext) {
    return {
        ImportDeclaration(node: ImportDeclaration & Rule.Node) {
            const foundationElementImport = getFoundationElementImport(node);

            if (foundationElementImport[0]) {
                const rangeEnd = foundationElementImport[1]
                    ? foundationElementImport[0].range[1] + 1
                    : foundationElementImport[0].range[1];

                context.report({
                    node,
                    message: "FoundationElement has been removed, import FASTElement instead",
                    *fix(fixer: Rule.RuleFixer) {
                        yield fixer.removeRange([
                            foundationElementImport[0].range[0],
                            rangeEnd
                        ]);
                        yield fixer.insertTextAfter(
                            node,
                            `\nimport { FASTElement } from "@microsoft/fast-element";`
                        );
                    }
                });
            }
        },
        Identifier(node: Identifier & Rule.Node) {
            if (
                node.parent.type === "ClassDeclaration" &&
                node.name === "FoundationElement"
            ) {
                context.report({
                    node,
                    message: "FoundationElement has been removed, use FASTElement instead",
                    fix: (fixer) => {
                        return fixer.replaceText(node, "FASTElement");
                    }
                });
            }
        }
    };
}