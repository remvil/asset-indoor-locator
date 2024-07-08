"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {swaggerJSDoc} from "swagger-jsdoc";
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var index_1 = require("./api/index");
var envconfig_1 = require("./envconfig");
var logger_1 = require("./helpers/logger");
var swagger_1 = require("./swagger");
var path_1 = __importDefault(require("path"));
if (!envconfig_1.CONTAINER_SERVER_PORT || !envconfig_1.ENVIRONMENT)
    process.exit(1);
(0, logger_1.initLogger)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
if (envconfig_1.CORSHOSTS) {
    app.use((0, cors_1.default)());
    app.options(envconfig_1.CORSHOSTS, (0, cors_1.default)());
}
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use("/api", index_1.apiRouter);
// Content Security Policy (CSP) Middleware on  "/"
app.get("/", function (_req, res, next) {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:");
    // next();
});
// Avvia il server
app.listen(envconfig_1.CONTAINER_SERVER_PORT, function () {
    logger_1.Logger.writeEvent("BFF listening at http://localhost:".concat(envconfig_1.CONTAINER_SERVER_PORT, " on ").concat(envconfig_1.ENVIRONMENT, " environment"));
});
