"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRETKEY = exports.CLIENTS = exports.VERSION = exports.ENVIRONMENT = exports.HOST_SERVER_PORT = exports.CONTAINER_SERVER_PORT = exports.SERVER_PORT = exports.CORSHOSTS = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var EnvTypeEnum;
(function (EnvTypeEnum) {
    EnvTypeEnum["dev"] = "dev";
    EnvTypeEnum["prod"] = "prod";
    EnvTypeEnum["qa"] = "qa";
    EnvTypeEnum["demo"] = "demo";
})(EnvTypeEnum || (EnvTypeEnum = {}));
exports.CORSHOSTS = process.env.ENABLE_CORS || "*";
exports.SERVER_PORT = process.env.SERVER_PORT || 3001;
exports.CONTAINER_SERVER_PORT = process.env.CONTAINER_SERVER_PORT || 3001;
exports.HOST_SERVER_PORT = process.env.HOST_SERVER_PORT || 3001;
exports.ENVIRONMENT = process.env.ENVIRONMENT_NAME;
exports.VERSION = require("../package.json").version;
exports.CLIENTS = new Map();
exports.SECRETKEY = (_a = process.env.SECRET_KEY) !== null && _a !== void 0 ? _a : "thisIsAVerySecretKey!";
