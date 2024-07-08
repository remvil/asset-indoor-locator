"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
var logger_1 = require("./logger");
var cheerio_1 = require("cheerio");
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
var formatError = function (error, code, handledAt) {
    if (code === void 0) { code = "001-Unknown"; }
    return error.response ? formatResponseData(error, code, handledAt) : formatInternalServerError(error, code, handledAt);
};
exports.formatError = formatError;
var formatInternalServerError = function (error, code, handledAt) {
    var message = error.toString();
    logger_1.Logger.writeException(new Error(error), code, handledAt);
    return {
        status: 500,
        error: { code: code, message: message },
    };
};
var formatResponseData = function (error, code, handledAt) {
    var _a;
    var data = (_a = error.response.data.message) !== null && _a !== void 0 ? _a : error.response.data;
    var message = error.response.data ? formatMessageData(data) : "Oops, something went wrong";
    logger_1.Logger.writeException(new Error(error), code, handledAt);
    return {
        status: error.response.status,
        error: { code: code, message: message },
    };
};
var formatMessageData = function (data) {
    if (!data)
        return "Missing Error Information";
    if (typeof data !== "string")
        return data.toString();
    if (data.includes("doctype"))
        return getHTMLInnerText(data, "p");
    if (data.includes("DOCTYPE"))
        return getHTMLInnerText(data, "pre");
    if (data.includes("html"))
        return getHTMLInnerText(data, "html");
    return data;
};
var getHTMLInnerText = function (data, tag) {
    var _a;
    var $ = (0, cheerio_1.load)(data);
    return (_a = $(tag).text()) !== null && _a !== void 0 ? _a : "Server error: Cannot find text";
};
