import swaggerJSDoc from "swagger-jsdoc";
import {CONTAINER_SERVER_PORT} from "../envconfig";

const swaggerDefinition = {
	openapi: "3.0.3",
	info: {
		description:
			"Qeusta è la documentazione del backend for frontend del progetto Infotel Asset Locator. Queste API sono state sviluppate per semplificare lo sviluppo dell'applicazione mobile rendendola indipendente da sistemi esterni.",
		title: "Infotel AssetLocator BFF API Documentation",
		version: "2.0.0",
		termsOfService: "http://swagger.io/terms/",
		contact: {email: "remigio.vildacci@gmail.com"},
		license: {name: "Apache 2.0", url: "http://www.apache.org/licenses/LICENSE-2.0.html"},
	},
	servers: [
		{
			url: `http://localhost:${CONTAINER_SERVER_PORT}`,
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
const options = {
	swaggerDefinition,
	apis: ["./**/*.ts"],
};
export const swaggerSpec = swaggerJSDoc(options);
