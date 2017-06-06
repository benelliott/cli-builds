"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../models/config");
const SilentError = require('silent-error');
const Command = require('../ember-cli/lib/models/command');
const GetCommand = Command.extend({
    name: 'get',
    description: 'Get a value from the configuration. Example: ng get [key]',
    works: 'everywhere',
    availableOptions: [
        {
            name: 'global',
            type: Boolean,
            'default': false,
            description: 'Get the value in the global configuration (in your home directory).'
        }
    ],
    run: function (commandOptions, rawArgs) {
        return new Promise(resolve => {
            const config = commandOptions.global ? config_1.CliConfig.fromGlobal() : config_1.CliConfig.fromProject();
            if (config === null) {
                throw new SilentError('No config found. If you want to use global configuration, '
                    + 'you need the --global argument.');
            }
            const value = config.get(rawArgs[0]);
            if (value === null || value === undefined) {
                throw new SilentError('Value cannot be found.');
            }
            else if (typeof value == 'object') {
                console.log(JSON.stringify(value, null, 2));
            }
            else {
                console.log(value);
            }
            resolve();
        });
    }
});
exports.default = GetCommand;
//# sourceMappingURL=/private/var/folders/lp/5h0nls311ws4fn75nn7kzz600037zs/t/angular-cli-builds11756-34955-heb2o6.8aqm9xjemi/angular-cli/commands/get.js.map