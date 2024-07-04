import {Logger} from "./logger";
import {ErrorPayload, ErrorType} from "../api/types";
import {load} from "cheerio";

/**
 * @swagger
 * components:
 *   schemas:
 *     GenericError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 *     GetAssetsError:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         message:
 *           type: string
 *     GetAssetError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 */

export const formatError = (error: ErrorType, code: string = "001-Unknown", handledAt?: string): ErrorPayload => {
	return error.response ? formatResponseData(error, code, handledAt) : formatInternalServerError(error, code, handledAt);
};

const formatInternalServerError = (error: any, code: string, handledAt: string | undefined): ErrorPayload => {
	const message = error.toString();
	Logger.writeException(new Error(error), code, handledAt);
	return {
		status: 500,
		error: {code, message},
	};
};

const formatResponseData = (error: any, code: string, handledAt: string | undefined): ErrorPayload => {
	const data = error.response.data.message ?? error.response.data;
	const message = error.response.data ? formatMessageData(data) : "Oops, something went wrong";
	Logger.writeException(new Error(error), code, handledAt);
	return {
		status: error.response.status,
		error: {code, message},
	};
};

const formatMessageData = (data: any) => {
	if (!data) return "Missing Error Information";
	if (typeof data !== "string") return data.toString();
	if (data.includes("doctype")) return getHTMLInnerText(data, "p");
	if (data.includes("DOCTYPE")) return getHTMLInnerText(data, "pre");
	if (data.includes("html")) return getHTMLInnerText(data, "html");
	return data;
};

const getHTMLInnerText = (data: any, tag: string) => {
	const $ = load(data);
	return $(tag).text() ?? "Server error: Cannot find text";
};
