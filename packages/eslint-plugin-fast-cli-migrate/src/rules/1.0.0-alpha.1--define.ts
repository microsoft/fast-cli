import path from "path";
import { Rule } from "eslint";
import type {
    ExportNamedDeclaration,
    ImportDeclaration,
    MemberExpression,
    Program
} from "estree";

export const meta = {
    type: "problem",
    docs: {
        description: "Update define",
        category: "Deprecated",
        recommended: true,
        url: "https://github.com/microsoft/fast-cli/tree/main/packages/eslint-plugin-fast-cli-migrate/src/rules/1.0.0-alpha.1--define.ts",
    },
    fixable: true,
    schema: [],
};

function isDefineFile(context: Rule.RuleContext) {
    const fileLocation = context.getPhysicalFilename();
    const fileExtension = "define.ts";
    return fileLocation.slice(-(fileExtension.length)) === fileExtension;
}

function getExportVariable(node: Rule.Node): ExportNamedDeclaration {
    if (node.parent.type === "ExportNamedDeclaration") {
        return node.parent;
    }

    return getExportVariable(node.parent);
}

function getBody(node: Rule.Node): Program {
    if (node.parent.type === "Program") {
        return node.parent;
    }

    return getBody(node.parent)
}

function specifierContainsIdentifier(bodyItem: ImportDeclaration, id: string) {
    let doesContain = false;

    bodyItem.specifiers.forEach((specifier) => {
        if (
            specifier.type === "ImportSpecifier" &&
            specifier.imported.name === id
        ) {
            doesContain = true;
        }
    });

    return doesContain;
}

function getImportClass(body: Program, id: string): null | ImportDeclaration {
    let item: null | ImportDeclaration = null;

    body.body.forEach((bodyItem) => {
        if (
            bodyItem.type === "ImportDeclaration" &&
            specifierContainsIdentifier(bodyItem, id)
        ) {
            item = bodyItem;
        }
    });

    return item;
}

function getFixes(
    fixer: Rule.RuleFixer,
    exportVariable: ExportNamedDeclaration,
    importClass: ImportDeclaration,
    context: Rule.RuleContext,
) {
    const fixes = [
        fixer.replaceText(
            exportVariable,
            "definition.define(designSystem.registry);"
        )
    ];

    if (importClass !== null) {
        const relativeImportPath = path.relative(
            path.join(
                context.parserOptions.fastConfig.rootDir,
                context.parserOptions.fastConfig.componentPath
            ),
            "design-system.js"
        );

        fixes.push(
            fixer.replaceText(
                importClass,
                `import { designSystem } from "${relativeImportPath}";`
            )
        )
    }

    return fixes;
}

export function create(context: Rule.RuleContext) {
    return {
        MemberExpression(node: MemberExpression & Rule.Node) {
            if (isDefineFile(context)) {
                const identifier = node.object.type === "Identifier" ? node.object.name : null;
                const body = getBody(node);

                if (
                    identifier !== null &&
                    node.property.type === "Identifier" &&
                    node.property.name === "compose"
                ) {
                    const exportVariable = getExportVariable(node);
                    const importClass = getImportClass(body, identifier);

                    context.report({
                        node,
                        message: "Update design system export to include a registry.",
                        fix: (fixer) => {
                            return getFixes(fixer, exportVariable, importClass, context);
                        }
                    });
                }
            }
        }
    };
};
