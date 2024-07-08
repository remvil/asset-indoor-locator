"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var envconfig_1 = require("../envconfig");
var swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        description: "Qeusta è la documentazione del backend for frontend del progetto Infotel Asset Locator. Queste API sono state sviluppate per semplificare lo sviluppo dell'applicazione mobile rendendola indipendente da sistemi esterni.",
        title: "Infotel AssetLocator BFF API Documentation",
        version: "2.0.0",
        termsOfService: "http://swagger.io/terms/",
        contact: { email: "remigio.vildacci@gmail.com" },
        license: { name: "Apache 2.0", url: "http://www.apache.org/licenses/LICENSE-2.0.html" },
    },
    servers: [
        {
            url: "http://localhost:".concat(envconfig_1.CONTAINER_SERVER_PORT),
            description: "Blueiot fake API",
        },
    ],
    components: {
        securitySchemes: {
            Authorization: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "Bearer <JWT token here>",
            },
        },
    },
};
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./**/*.ts"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
