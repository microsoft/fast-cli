#!/usr/bin/env node

import spawn from "cross-spawn";

function installCli(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const args = [
            "install",
            "@microsoft/fast-cli",
        ];
        const child = spawn("npm", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "npm install @microsoft/fast-cli",
                });
                return;
            }
            resolve();
        });
    }).catch(reason => {
        throw reason;
    });
}

function init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const args = ["init"];
        const child = spawn("fast", args, { stdio: "inherit" });
        child.on("close", code => {
            if (code !== 0) {
                reject({
                    command: "fast init",
                });
                return;
            }
            resolve();
        });
    }).catch(reason => {
        throw reason;
    });
}

/**
 * This package only initializes a project from the FAST CLI
 */
(function () {
    installCli().then(init);
})();
