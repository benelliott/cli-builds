"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const SilentError = require('silent-error');
function findParentModule(projectRoot, appRoot, currentDir) {
    const sourceRoot = path.join(projectRoot, appRoot, 'app');
    // trim currentDir
    currentDir = currentDir.replace(path.join(appRoot, 'app'), '');
    let pathToCheck = path.join(sourceRoot, currentDir);
    while (pathToCheck.length >= sourceRoot.length) {
        if (!fs.existsSync(pathToCheck)) {
            pathToCheck = path.dirname(pathToCheck);
            continue;
        }
        // TODO: refactor to not be based upon file name
        const files = fs.readdirSync(pathToCheck)
            .filter(fileName => !fileName.endsWith('routing.module.ts'))
            .filter(fileName => fileName.endsWith('.module.ts'))
            .filter(fileName => fs.statSync(path.join(pathToCheck, fileName)).isFile());
        if (files.length === 1) {
            return path.join(pathToCheck, files[0]);
        }
        else if (files.length > 1) {
            throw new SilentError(`Multiple module files found: ${JSON.stringify(files)}`);
        }
        // move to parent directory
        pathToCheck = path.dirname(pathToCheck);
    }
    throw new SilentError('No module files found');
}
exports.default = findParentModule;
//# sourceMappingURL=/private/var/folders/lp/5h0nls311ws4fn75nn7kzz600037zs/t/angular-cli-builds11756-34955-heb2o6.8aqm9xjemi/angular-cli/utilities/find-parent-module.js.map