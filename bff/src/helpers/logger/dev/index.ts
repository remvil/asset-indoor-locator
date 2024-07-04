import {ENVIRONMENT, VERSION} from "./../../../envconfig";
import {ILogger} from "..";
import {error, info} from "console";

export class DevLogger implements ILogger {
	writeTrace(message: string, severityLevel: number, err?: string) {
		const trace = err
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
		info(trace);
	}
	writeException(err: Error, code: string = "001-Unknown", prop: string = "unhandled") {
	error({
			properties: {code: code, handledAt: prop},
			error: err.message,
		});
	}
	writeEvent(name: string) {
		info({Event: name, Environment: ENVIRONMENT, Version: VERSION});
	}
}
