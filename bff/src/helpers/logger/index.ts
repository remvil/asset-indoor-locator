import {error, info} from "console";
import {ENVIRONMENT, VERSION} from "../../envconfig";
import {DevLogger} from "./dev";
import {ProdLogger} from "./prod";

export interface ILogger {
	writeTrace(message: string, severityLevel: number, err?: string): void;
	writeException(err: Error, code?: string, prop?: string): void;
	writeEvent(name: string): void;
}

export let Logger: ILogger;

export const initLogger = () => {
	if (!ENVIRONMENT) {
		error("Environment not specified, please assign a value into envconfig.ts\nServer shutting down");
		return process.exit(1);
	}

	const client = {
		cloudRole: "backend",
		appVersion: VERSION,
		appEnv: ENVIRONMENT,
	};

	switch (ENVIRONMENT) {
		case "dev":
			Logger = new DevLogger();
			break;
		case "prod":
			Logger = new ProdLogger();
			break;
		case "qa":
			Logger = new DevLogger();
			break;
		case "demo":
			Logger = new DevLogger();
			break;
	}

	info({Event: `Logger initialized on '${ENVIRONMENT}' environment`});
	info({client: client});
};
