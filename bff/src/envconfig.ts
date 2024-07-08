import dotenv from "dotenv";
dotenv.config();

export type EnvType = keyof typeof EnvTypeEnum;
enum EnvTypeEnum {
	"dev" = "dev",
	"prod" = "prod",
	"qa" = "qa",
	"demo" = "demo",
}

export const CORSHOSTS = process.env.ENABLE_CORS || "*";
export const CONTAINER_SERVER_PORT = process.env.CONTAINER_SERVER_PORT || 3001;
export const HOST_SERVER_PORT = process.env.HOST_SERVER_PORT || 3001;
export const ENVIRONMENT = process.env.ENVIRONMENT_NAME as EnvType;
export const VERSION = require("../package.json").version;
export const SECRETKEY = process.env.SECRET_KEY ?? "thisIsAVerySecretKey!";
