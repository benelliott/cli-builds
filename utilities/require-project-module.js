"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolve = require('resolve');
// require dependencies within the target project
function requireProjectModule(root, moduleName) {
    return require(resolve.sync(moduleName, { basedir: root }));
}
exports.requireProjectModule = requireProjectModule;
//# sourceMappingURL=/private/var/folders/lp/5h0nls311ws4fn75nn7kzz600037zs/t/angular-cli-builds11756-34955-heb2o6.8aqm9xjemi/angular-cli/utilities/require-project-module.js.map