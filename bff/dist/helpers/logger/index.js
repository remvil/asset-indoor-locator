"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLogger = exports.Logger = void 0;
var console_1 = require("console");
var envconfig_1 = require("../../envconfig");
var dev_1 = require("./dev");
var prod_1 = require("./prod");
var initLogger = function () {
    if (!envconfig_1.ENVIRONMENT) {
        (0, console_1.error)("Environment not specified, please assign a value into envconfig.ts\nServer shutting down");
        return process.exit(1);
    }
    var client = {
        cloudRole: "backend",
        appVersion: envconfig_1.VERSION,
        appEnv: envconfig_1.ENVIRONMENT,
    };
    switch (envconfig_1.ENVIRONMENT) {
        case "dev":
            exports.Logger = new dev_1.DevLogger();
            break;
        case "prod":
            exports.Logger = new prod_1.ProdLogger();
            break;
        case "qa":
            exports.Logger = new dev_1.DevLogger();
            break;
        case "demo":
            exports.Logger = new dev_1.DevLogger();
            break;
    }
    (0, console_1.info)({ Event: "Logger initialized on '".concat(envconfig_1.ENVIRONMENT, "' environment") });
    (0, console_1.info)({ client: client });
};
exports.initLogger = initLogger;
