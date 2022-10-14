import { Rule } from "eslint";
import type {
    Identifier,
    ImportDeclaration,
} from "estree";
import { getRemovableNamedImportRange, removeNamedImport } from "./1.0.0-alpha.1.utilities";

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

export function create(context: Rule.RuleContext) {
    return {
        ImportDeclaration(node: ImportDeclaration & Rule.Node) {
            const foundationElementImport = removeNamedImport(
                node,
                "@microsoft/fast-foundation",
                "FoundationElement"
            );

            if (foundationElementImport[0]) {
                const removableRange = getRemovableNamedImportRange(foundationElementImport);

                context.report({
                    node,
                    message: "FoundationElement has been removed, import FASTElement instead",
                    *fix(fixer: Rule.RuleFixer) {
                        yield fixer.removeRange(removableRange);
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