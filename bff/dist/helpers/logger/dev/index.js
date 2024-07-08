"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevLogger = void 0;
var envconfig_1 = require("./../../../envconfig");
var console_1 = require("console");
var DevLogger = /** @class */ (function () {
    function DevLogger() {
    }
    DevLogger.prototype.writeTrace = function (message, severityLevel, err) {
        var trace = err
            ? {
                message: message,
                severity: severityLevel,
                properties: {
                    stack: err,
                },
            }
            : {
                message: message,
                severity: severityLevel,
            };
        (0, console_1.info)(trace);
    };
    DevLogger.prototype.writeException = function (err, code, prop) {
        if (code === void 0) { code = "001-Unknown"; }
        if (prop === void 0) { prop = "unhandled"; }
        (0, console_1.error)({
            properties: { code: code, handledAt: prop },
            error: err.message,
        });
    };
    DevLogger.prototype.writeEvent = function (name) {
        (0, console_1.info)({ Event: name, Environment: envconfig_1.ENVIRONMENT, Version: envconfig_1.VERSION });
    };
    return DevLogger;
}());
exports.DevLogger = DevLogger;
