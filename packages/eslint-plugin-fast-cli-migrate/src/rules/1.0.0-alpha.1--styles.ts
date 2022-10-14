import type { Rule } from "eslint";
import type {
    ImportDeclaration
} from "estree";
import {
    getRemovableNamedImportRange,
    getTaggedTemplateUpdateRules, removeNamedImport
} from "./1.0.0-alpha.1.utilities";

export const meta = {
    type: "problem",
    docs: {
        description: "Update stories files.",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--styles.ts",
    },
    fixable: true,
    schema: [],
};

export function create(context: Rule.RuleContext) {
    return {
        ...getTaggedTemplateUpdateRules(
            context,
            "css",
            ".styles.ts"
        ),
        ImportDeclaration(node: ImportDeclaration & Rule.Node) {
            const removableRanges = [];
            const elementStylesImport = removeNamedImport(
                node,
                "@microsoft/fast-element",
                "ElementStyles"
            );
            const elementDefinitionContextImport = removeNamedImport(
                node,
                "@microsoft/fast-foundation",
                "ElementDefinitionContext"
            );

            if (elementStylesImport[0]) {
                removableRanges.push(getRemovableNamedImportRange(elementStylesImport));
            }

            if (elementDefinitionContextImport[0]) {
                removableRanges.push(getRemovableNamedImportRange(elementDefinitionContextImport))
            }

            if (removableRanges.length > 0) {
                context.report({
                    node,
                    message: "ElementStyles has been removed, this type export is unnecessary",
                    *fix(fixer: Rule.RuleFixer) {
                        for (const range of removableRanges) {
                            yield fixer.removeRange(range);
                        }
                    }
                });
            }
        },
    };
}