import type { Rule } from "eslint";
import {
    getTaggedTemplateUpdateRules
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
    return getTaggedTemplateUpdateRules(
        context,
        "css",
        ".styles.ts"
    );
}