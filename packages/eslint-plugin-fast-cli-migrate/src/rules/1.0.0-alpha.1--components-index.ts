import { Rule } from "eslint";
import type {
    ImportDeclaration,
} from "estree";
import path from "path";

export const meta = {
    type: "problem",
    docs: {
        description: "Update the imports for components",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--components-index.ts",
    },
    fixable: true,
    schema: [],
};

function isComponentsIndexFile(context: Rule.RuleContext) {
    const fileLocation = context.getPhysicalFilename();
    const componentDir = path.join(
        context.parserOptions.fastConfig.rootDir,
        context.parserOptions.fastConfig.componentPath,
        "index.ts"
    );
    return fileLocation.slice(-(componentDir.length)) === componentDir;
}

export function create(context: Rule.RuleContext) {
    return {
        ImportDeclaration(node: ImportDeclaration) {
            if (isComponentsIndexFile(context) && node.specifiers.length > 0) {
                const importPath = node.source.value;
                
                context.report({
                    node,
                    message: "Update component imports to purely import component define file which should now register itself.",
                    fix: (fixer) => {
                        return fixer.replaceText(
                            node,
                            `import "${importPath}";`
                        );
                    }
                });
            }
        },
        ExportDefaultDeclaration(node: ImportDeclaration) {
            if (isComponentsIndexFile(context)) {
                context.report({
                    node,
                    message: "Remove unnecessary component exports as they are now no longer executables.",
                    fix: (fixer) => {
                        return fixer.remove(node);
                    }
                });
            }
        }
    }
}