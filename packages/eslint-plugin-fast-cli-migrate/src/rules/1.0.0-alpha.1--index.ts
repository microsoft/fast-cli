import path from "path";
import type { Rule } from "eslint";
import type {
    ImportDeclaration
} from "estree";

export const meta = {
    type: "problem",
    docs: {
        description: "Update the index file.",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--index.ts",
    },
    fixable: true,
    schema: [],
};

function isIndexFile(context: Rule.RuleContext) {
    const fileLocation = context.getPhysicalFilename();
    const componentDir = path.join(
        context.parserOptions.fastConfig.rootDir,
        "index.ts"
    );
    return fileLocation.slice(-(componentDir.length)) === componentDir;
}

export function create(context: Rule.RuleContext) {
    return {
        ImportDeclaration(node: ImportDeclaration) {
            if (
                isIndexFile(context) &&
                node.source.type === "Literal" &&
                node.source.value === "./design-system.js"
            ) {
                context.report({
                    node,
                    message: "The definitions are now exported from the component index file.",
                    fix: (fixer) => {
                        return fixer.replaceText(
                            node,
                            `import "./components/index.js";`
                        );
                    }
                });
            }
        }
    }
}